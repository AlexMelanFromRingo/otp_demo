/**
 * HOTP (HMAC-based One-Time Password) Implementation
 * RFC 4226 - December 2005
 *
 * This module implements the HOTP algorithm as specified in RFC 4226.
 * Each function is heavily commented for educational purposes.
 */

import { encode as base32Encode, decode as base32Decode } from './base32.js';

/**
 * Generate a cryptographically secure random secret key.
 *
 * RFC 4226 Section 4 - Key Requirements:
 * - Minimum length: 128 bits (16 bytes)
 * - Recommended length: 160 bits (20 bytes) - matches SHA-1 output
 *
 * @param {number} length - Key length in bytes (default: 20)
 * @returns {Uint8Array} Random bytes for the secret key
 */
export function generateSecret(length = 20) {
  const bytes = new Uint8Array(length);
  // Use Web Crypto API for cryptographically secure random bytes
  crypto.getRandomValues(bytes);
  return bytes;
}

/**
 * Convert a byte array to a hexadecimal string.
 *
 * @param {Uint8Array} bytes - Input byte array
 * @returns {string} Hexadecimal representation (lowercase)
 */
export function bytesToHex(bytes) {
  return Array.from(bytes)
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

/**
 * Convert a hexadecimal string to a byte array.
 *
 * @param {string} hex - Hexadecimal string (with or without separators)
 * @returns {Uint8Array} Byte array
 */
export function hexToBytes(hex) {
  // Remove common separators (spaces, colons)
  const clean = hex.replace(/[\s:]/g, '');
  const bytes = new Uint8Array(clean.length / 2);
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = parseInt(clean.slice(i * 2, i * 2 + 2), 16);
  }
  return bytes;
}

/**
 * Convert a 64-bit counter to an 8-byte array (big-endian).
 *
 * RFC 4226 Section 5.2:
 * "C is the 8-byte counter value, the moving factor."
 * The counter must be stored as a big-endian 64-bit integer.
 *
 * Example:
 *   Counter 1 → 0x0000000000000001
 *   Counter 256 → 0x0000000000000100
 *
 * @param {number} counter - The counter value (0 to 2^53-1 in JS)
 * @returns {Uint8Array} 8-byte big-endian representation
 */
export function counterToBytes(counter) {
  const buf = new ArrayBuffer(8);
  const view = new DataView(buf);

  // JavaScript numbers are 64-bit floats, safe for integers up to 2^53-1
  // Split into high 32 bits and low 32 bits
  const high = Math.floor(counter / 0x100000000); // counter / 2^32
  const low = counter >>> 0; // Unsigned 32-bit

  view.setUint32(0, high); // Big-endian: high bits first
  view.setUint32(4, low);  // Then low bits

  return new Uint8Array(buf);
}

/**
 * Compute HMAC-SHA1 using the Web Crypto API.
 *
 * RFC 4226 Section 5.2:
 * "The HOTP algorithm is based on an increasing counter value and
 * a static symmetric key known only to the token and the validation service."
 *
 * HMAC-SHA1 produces a 160-bit (20-byte) output.
 *
 * @param {Uint8Array} key - The secret key K
 * @param {Uint8Array} data - The counter bytes C
 * @returns {Promise<Uint8Array>} HMAC-SHA1 result (20 bytes)
 */
export async function hmacSHA1(key, data) {
  // Import the key for HMAC-SHA1
  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    key,
    { name: 'HMAC', hash: 'SHA-1' },
    false,    // Not extractable
    ['sign']  // Only for signing
  );

  // Compute HMAC
  const signature = await crypto.subtle.sign('HMAC', cryptoKey, data);

  return new Uint8Array(signature);
}

/**
 * Dynamic Truncation (DT) function.
 *
 * RFC 4226 Section 5.3 - Generating an HOTP Value:
 *
 * Step 1: Generate HMAC-SHA1 value (done before this function)
 * Step 2: Generate a 4-byte string (Dynamic Truncation)
 *
 * The dynamic truncation works as follows:
 * 1. Take the last byte of HMAC output
 * 2. Use lower 4 bits as offset (0-15)
 * 3. Take 4 bytes starting at offset
 * 4. Clear the most significant bit (to avoid signed/unsigned issues)
 * 5. Return as 31-bit unsigned integer
 *
 * @param {Uint8Array} hmacBytes - The 20-byte HMAC-SHA1 result
 * @returns {Object} { offset, extractedBytes, binCode }
 */
export function dynamicTruncate(hmacBytes) {
  // Step 1: offset = hmac[19] & 0x0F
  // The offset is determined by the low-order 4 bits of the last byte
  const offset = hmacBytes[19] & 0x0F;

  // Step 2: Extract 4 bytes at position offset
  // P = hmac[offset]...hmac[offset+3]
  const extractedBytes = hmacBytes.slice(offset, offset + 4);

  // Step 3: Compute the 31-bit code
  // The first byte has its MSB masked to ensure the value is always positive
  // This is important for languages that use signed integers
  const binCode =
    ((hmacBytes[offset] & 0x7F) << 24) |     // Clear MSB, shift to bits 24-30
    ((hmacBytes[offset + 1] & 0xFF) << 16) | // Bits 16-23
    ((hmacBytes[offset + 2] & 0xFF) << 8) |  // Bits 8-15
    (hmacBytes[offset + 3] & 0xFF);          // Bits 0-7

  return { offset, extractedBytes, binCode };
}

/**
 * Generate the final HOTP code.
 *
 * RFC 4226 Section 5.3:
 * "Let Snum = StToNum(Sbits) ... HOTP = Snum mod 10^Digit"
 *
 * @param {number} binCode - The 31-bit binary code from dynamic truncation
 * @param {number} digits - Number of digits in the OTP (default: 6)
 * @returns {string} The OTP as a zero-padded string
 */
export function generateCode(binCode, digits = 6) {
  // Calculate modulo 10^digits
  const code = binCode % Math.pow(10, digits);

  // Pad with leading zeros if necessary
  return code.toString().padStart(digits, '0');
}

/**
 * Compute all intermediate steps for a single HOTP calculation.
 * This is the main function used by the demo to show each step.
 *
 * @param {Uint8Array} secret - The shared secret key K
 * @param {number} counter - The counter value C
 * @param {number} digits - Number of digits in the OTP (default: 6)
 * @returns {Promise<Object>} All intermediate values for visualization
 */
export async function computeAllSteps(secret, counter, digits = 6) {
  // Step 1: Prepare the key representations
  const secretHex = bytesToHex(secret);
  const secretBase32 = base32Encode(secret);

  // Step 2: Convert counter to 8 bytes (big-endian)
  const counterBytes = counterToBytes(counter);
  const counterHex = bytesToHex(counterBytes);

  // Step 3: Compute HMAC-SHA1(K, C)
  const hmacBytes = await hmacSHA1(secret, counterBytes);
  const hmacHex = bytesToHex(hmacBytes);

  // Step 4: Dynamic Truncation
  const { offset, extractedBytes, binCode } = dynamicTruncate(hmacBytes);
  const extractedHex = bytesToHex(extractedBytes);

  // Step 5: Generate final code
  const code = generateCode(binCode, digits);

  return {
    // Input data
    secret,
    secretHex,
    secretBase32,
    counter,
    digits,

    // Step 1 output
    counterBytes,
    counterHex,

    // Step 2 output
    hmacBytes,
    hmacHex,

    // Step 3 output
    offset,
    extractedBytes,
    extractedHex,
    binCode,

    // Final output
    code,
  };
}

/**
 * Server-side verification with look-ahead window.
 *
 * RFC 4226 Section 7.2 - Resynchronization of the Counter:
 * "The server computes the next s HOTP values... and checks them
 * against the received HOTP client value."
 *
 * This allows the client to be slightly ahead of the server
 * (e.g., if the user generated OTPs without using them).
 *
 * @param {Uint8Array} secret - The shared secret key
 * @param {number} serverCounter - Server's current counter
 * @param {string} clientOtp - OTP provided by the client
 * @param {number} windowSize - Look-ahead window (default: 5)
 * @param {number} digits - Number of digits (default: 6)
 * @returns {Promise<Object>} { success, usedCounter, details }
 */
export async function verifyOtp(secret, serverCounter, clientOtp, windowSize = 5, digits = 6) {
  const details = [];

  // Check each counter value in the window
  for (let i = 0; i <= windowSize; i++) {
    const testCounter = serverCounter + i;
    const { code } = await computeAllSteps(secret, testCounter, digits);

    const match = code === clientOtp;
    details.push({
      counter: testCounter,
      expectedOtp: code,
      match,
    });

    if (match) {
      return {
        success: true,
        usedCounter: testCounter,
        newServerCounter: testCounter + 1, // Update to next counter
        details,
      };
    }
  }

  return {
    success: false,
    usedCounter: null,
    newServerCounter: serverCounter, // Counter unchanged on failure
    details,
  };
}

/**
 * Check if a string is valid Base32.
 *
 * @param {string} str - The string to check
 * @returns {boolean} True if valid Base32
 */
export function isValidBase32(str) {
  // Base32 uses A-Z and 2-7, with optional = padding
  return /^[A-Z2-7]+=*$/i.test(str.replace(/\s/g, ''));
}

/**
 * Check if a string is valid hexadecimal.
 *
 * @param {string} str - The string to check
 * @returns {boolean} True if valid hex
 */
export function isValidHex(str) {
  const clean = str.replace(/[\s:]/g, '');
  return /^[0-9a-f]+$/i.test(clean) && clean.length % 2 === 0;
}

/**
 * Parse a key string (either hex or base32) to bytes.
 *
 * @param {string} input - Key string in hex or base32 format
 * @returns {Uint8Array|null} Byte array or null if invalid
 */
export function parseKey(input) {
  const trimmed = input.trim();

  if (isValidHex(trimmed)) {
    return hexToBytes(trimmed);
  }

  if (isValidBase32(trimmed)) {
    try {
      return base32Decode(trimmed);
    } catch {
      return null;
    }
  }

  return null;
}

// Re-export base32 functions for convenience
export { base32Encode, base32Decode };
