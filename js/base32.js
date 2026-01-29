/**
 * Base32 Encoding/Decoding (RFC 4648)
 *
 * Base32 is commonly used for HOTP/TOTP secret keys because:
 * 1. It uses only A-Z and 2-7 (no confusing 0/O, 1/I/L)
 * 2. Case-insensitive
 * 3. Easier to type and read than hex
 * 4. More compact than hex (5 bits per character vs 4)
 *
 * Encoding process:
 * - Take input bytes
 * - Treat as a stream of bits
 * - Group into 5-bit chunks
 * - Map each 5-bit value to a character
 *
 * Example:
 *   "Hello!" (0x48656C6C6F21)
 *   Binary: 01001000 01100101 01101100 01101100 01101111 00100001
 *   5-bit groups: 01001 00001 10010 10110 11000 11011 00011 01111 00100 001(00)
 *   Encoded: JBSWY3DPEHPK3PXP (with padding stripped)
 */

// RFC 4648 Base32 alphabet
const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';

// Create reverse lookup table for decoding
const DECODE_TABLE = {};
for (let i = 0; i < ALPHABET.length; i++) {
  DECODE_TABLE[ALPHABET[i]] = i;
  DECODE_TABLE[ALPHABET[i].toLowerCase()] = i;
}

/**
 * Encode a byte array to Base32 string.
 *
 * @param {Uint8Array} bytes - Input bytes to encode
 * @returns {string} Base32 encoded string (without padding)
 */
export function encode(bytes) {
  if (bytes.length === 0) {
    return '';
  }

  let result = '';
  let bits = 0;
  let value = 0;

  for (let i = 0; i < bytes.length; i++) {
    // Accumulate bits from the current byte
    value = (value << 8) | bytes[i];
    bits += 8;

    // Extract 5-bit groups while we have enough bits
    while (bits >= 5) {
      bits -= 5;
      // Extract top 5 bits
      const index = (value >>> bits) & 0x1F;
      result += ALPHABET[index];
    }
  }

  // Handle remaining bits (if any)
  if (bits > 0) {
    // Pad remaining bits to 5 bits by shifting left
    const index = (value << (5 - bits)) & 0x1F;
    result += ALPHABET[index];
  }

  return result;
}

/**
 * Decode a Base32 string to byte array.
 *
 * @param {string} str - Base32 encoded string (padding optional)
 * @returns {Uint8Array} Decoded bytes
 * @throws {Error} If the string contains invalid characters
 */
export function decode(str) {
  // Remove whitespace and padding
  const clean = str.replace(/[\s=]/g, '').toUpperCase();

  if (clean.length === 0) {
    return new Uint8Array(0);
  }

  // Validate characters
  for (const char of clean) {
    if (!(char in DECODE_TABLE)) {
      throw new Error(`Invalid Base32 character: ${char}`);
    }
  }

  // Calculate output length
  // 8 Base32 chars = 5 bytes
  // n Base32 chars = floor(n * 5 / 8) bytes
  const outputLength = Math.floor((clean.length * 5) / 8);
  const result = new Uint8Array(outputLength);

  let bits = 0;
  let value = 0;
  let outputIndex = 0;

  for (let i = 0; i < clean.length; i++) {
    // Get the 5-bit value for this character
    const charValue = DECODE_TABLE[clean[i]];

    // Accumulate bits
    value = (value << 5) | charValue;
    bits += 5;

    // Extract bytes while we have enough bits
    if (bits >= 8) {
      bits -= 8;
      result[outputIndex++] = (value >>> bits) & 0xFF;
    }
  }

  return result;
}

/**
 * Format Base32 string for display (groups of 4).
 *
 * @param {string} base32 - Base32 string
 * @returns {string} Formatted string with spaces
 */
export function format(base32) {
  return base32.match(/.{1,4}/g)?.join(' ') || base32;
}
