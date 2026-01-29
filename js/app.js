/**
 * HOTP Demo Application
 * RFC 4226 Educational Implementation
 *
 * This is the main entry point for the HOTP demo application.
 * It initializes all modules and starts the application.
 *
 * Project Structure:
 * ├── index.html        - Main HTML with two-panel layout (server/client)
 * ├── styles.css        - CSS with light/dark theme support
 * └── js/
 *     ├── app.js        - This file (entry point)
 *     ├── hotp.js       - HOTP algorithm implementation (RFC 4226)
 *     ├── base32.js     - Base32 encoding/decoding (RFC 4648)
 *     ├── i18n.js       - Internationalization (UK/EN/RU)
 *     ├── theme.js      - Light/dark theme management
 *     └── ui.js         - DOM interactions and visualization
 *
 * The HOTP Algorithm (RFC 4226):
 * 1. K = shared secret key (20 bytes recommended)
 * 2. C = 8-byte counter (big-endian)
 * 3. HMAC = HMAC-SHA1(K, C)
 * 4. Offset = HMAC[19] & 0x0F
 * 5. Binary = (HMAC[offset] & 0x7F) << 24 | HMAC[offset+1] << 16 | ...
 * 6. OTP = Binary mod 10^6
 */

import { initLanguage, updateAllTranslations } from './i18n.js';
import { initTheme } from './theme.js';
import { initUI } from './ui.js';

/**
 * Initialize the application when DOM is ready.
 */
function init() {
  // Initialize theme (light/dark)
  initTheme();

  // Initialize language (uk/en/ru)
  initLanguage();
  updateAllTranslations();

  // Initialize UI (event listeners, etc.)
  initUI();

  console.log('HOTP Demo initialized');
  console.log('RFC 4226 - HMAC-Based One-Time Password Algorithm');
}

// Wait for DOM to be ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
