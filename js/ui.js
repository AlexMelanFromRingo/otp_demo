/**
 * UI Module
 * Handles all DOM interactions and visualization
 */

import {
  generateSecret,
  bytesToHex,
  computeAllSteps,
  verifyOtp,
  parseKey,
  base32Encode,
} from './hotp.js';
import { t, setLanguage, getLanguage, updateAllTranslations } from './i18n.js';
import { toggleTheme } from './theme.js';

// ===== Application State =====
const state = {
  secret: null,           // Uint8Array - shared secret
  clientCounter: 0,       // Client's counter
  serverCounter: 0,       // Server's counter
  windowSize: 5,          // Look-ahead window
  lastOtp: null,          // Last generated OTP
  lastSteps: null,        // Last computation steps
  logs: [],               // Server logs
};

// ===== DOM References =====
let elements = {};

/**
 * Cache DOM element references.
 */
function cacheElements() {
  elements = {
    // Setup
    setupSection: document.getElementById('setup-section'),
    demoContent: document.getElementById('demo-content'),
    btnGenerate: document.getElementById('btn-generate'),
    btnImport: document.getElementById('btn-import'),
    btnPreset: document.getElementById('btn-preset'),
    importSection: document.getElementById('import-section'),
    importInput: document.getElementById('import-input'),
    btnImportOk: document.getElementById('btn-import-ok'),
    btnImportCancel: document.getElementById('btn-import-cancel'),
    importError: document.getElementById('import-error'),

    // Server panel
    serverSecretHex: document.getElementById('server-secret-hex'),
    serverSecretBase32: document.getElementById('server-secret-base32'),
    serverCounter: document.getElementById('server-counter'),
    windowSize: document.getElementById('window-size'),
    windowVisual: document.getElementById('window-visual'),
    verifyInput: document.getElementById('verify-input'),
    btnVerify: document.getElementById('btn-verify'),
    verifyResult: document.getElementById('verify-result'),
    verifyDetails: document.getElementById('verify-details'),
    serverLog: document.getElementById('server-log'),
    btnClearLog: document.getElementById('btn-clear-log'),

    // Client panel
    clientSecretHex: document.getElementById('client-secret-hex'),
    clientCounter: document.getElementById('client-counter'),
    clientOtp: document.getElementById('client-otp'),
    btnGenerateOtp: document.getElementById('btn-generate-otp'),
    btnExpandSteps: document.getElementById('btn-expand-steps'),
    expandText: document.getElementById('expand-text'),
    algorithmSteps: document.getElementById('algorithm-steps'),

    // Algorithm steps
    step1Value: document.getElementById('step1-value'),
    step2Value: document.getElementById('step2-value'),
    step3Offset: document.getElementById('step3-offset'),
    byteDiagram: document.getElementById('byte-diagram'),
    step3Extracted: document.getElementById('step3-extracted'),
    step3Int: document.getElementById('step3-int'),
    step4Calc: document.getElementById('step4-calc'),
    step4Result: document.getElementById('step4-result'),

    // Sync section
    btnDesyncOk: document.getElementById('btn-desync-ok'),
    btnDesyncFail: document.getElementById('btn-desync-fail'),
    btnDesyncManual: document.getElementById('btn-desync-manual'),
    desyncAmount: document.getElementById('desync-amount'),
    btnTestVerify: document.getElementById('btn-test-verify'),
    btnResync: document.getElementById('btn-resync'),
    syncServer: document.getElementById('sync-server'),
    syncClient: document.getElementById('sync-client'),
    syncWindow: document.getElementById('sync-window'),
    diffValue: document.getElementById('diff-value'),
    windowStatus: document.getElementById('window-status'),
    syncTestResult: document.getElementById('sync-test-result'),

    // Language & theme
    langUk: document.getElementById('lang-uk'),
    langEn: document.getElementById('lang-en'),
    langRu: document.getElementById('lang-ru'),
    themeToggle: document.getElementById('theme-toggle'),

    // Tabs
    tabBtns: document.querySelectorAll('.tab-btn'),
    tabContents: document.querySelectorAll('.tab-content'),
  };
}

// ===== Initialization =====

/**
 * Initialize the UI module.
 */
export function initUI() {
  cacheElements();
  setupEventListeners();
  updateLanguageButtons();
}

/**
 * Set up all event listeners.
 */
function setupEventListeners() {
  // Setup buttons
  elements.btnGenerate.addEventListener('click', handleGenerateKey);
  elements.btnImport.addEventListener('click', showImportSection);
  elements.btnPreset.addEventListener('click', handlePreset);
  elements.btnImportOk.addEventListener('click', handleImportKey);
  elements.btnImportCancel.addEventListener('click', hideImportSection);
  elements.importInput.addEventListener('keypress', e => {
    if (e.key === 'Enter') handleImportKey();
  });

  // Server panel
  elements.windowSize.addEventListener('change', handleWindowSizeChange);
  elements.btnVerify.addEventListener('click', handleVerify);
  elements.verifyInput.addEventListener('keypress', e => {
    if (e.key === 'Enter') handleVerify();
  });
  elements.btnClearLog.addEventListener('click', clearLog);

  // Client panel
  elements.btnGenerateOtp.addEventListener('click', handleGenerateOtp);
  elements.btnExpandSteps.addEventListener('click', toggleStepsExpansion);

  // Sync section
  elements.btnDesyncOk.addEventListener('click', () => handleDesync(3));
  elements.btnDesyncFail.addEventListener('click', () => handleDesync(state.windowSize + 3));
  elements.btnDesyncManual.addEventListener('click', handleDesyncManual);
  elements.btnTestVerify.addEventListener('click', handleTestVerify);
  elements.btnResync.addEventListener('click', handleResync);

  // Language buttons
  elements.langUk.addEventListener('click', () => switchLanguage('uk'));
  elements.langEn.addEventListener('click', () => switchLanguage('en'));
  elements.langRu.addEventListener('click', () => switchLanguage('ru'));

  // Theme toggle
  elements.themeToggle.addEventListener('click', toggleTheme);

  // Tabs
  elements.tabBtns.forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.dataset.tab));
  });
}

// ===== Key Management =====

/**
 * Generate a new random secret key.
 */
function handleGenerateKey() {
  state.secret = generateSecret(20);
  state.clientCounter = 0;
  state.serverCounter = 0;
  state.lastOtp = null;
  state.lastSteps = null;

  initializeDemo();
  addLog('log-init', {}, 'info');
}

/**
 * Show the import key section.
 */
function showImportSection() {
  elements.importSection.classList.remove('hidden');
  elements.importInput.focus();
  elements.importError.textContent = '';
}

/**
 * Hide the import key section.
 */
function hideImportSection() {
  elements.importSection.classList.add('hidden');
  elements.importInput.value = '';
  elements.importError.textContent = '';
}

/**
 * Handle importing a key from user input.
 */
function handleImportKey() {
  const input = elements.importInput.value.trim();
  if (!input) return;

  const bytes = parseKey(input);

  if (!bytes) {
    elements.importError.textContent = t('import-error-invalid');
    return;
  }

  if (bytes.length < 10) {
    elements.importError.textContent = t('import-error-short');
    return;
  }

  state.secret = bytes;
  state.clientCounter = 0;
  state.serverCounter = 0;
  state.lastOtp = null;
  state.lastSteps = null;

  hideImportSection();
  initializeDemo();
  addLog('log-init', {}, 'info');
}

/**
 * Load a preset example key.
 * Using the classic "Hello!" key for demonstration.
 */
function handlePreset() {
  // "12345678901234567890" in ASCII - classic RFC 4226 test vector
  state.secret = new Uint8Array([
    0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x30,
    0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x30,
  ]);
  state.clientCounter = 0;
  state.serverCounter = 0;
  state.lastOtp = null;
  state.lastSteps = null;

  initializeDemo();
  addLog('log-init', {}, 'info');
}

// ===== Demo Initialization =====

/**
 * Initialize the demo UI after key is set.
 */
function initializeDemo() {
  // Show demo content
  elements.demoContent.classList.remove('hidden');

  // Update key displays
  const secretHex = bytesToHex(state.secret);
  const secretBase32 = base32Encode(state.secret);

  elements.serverSecretHex.textContent = secretHex;
  elements.serverSecretBase32.textContent = secretBase32;
  elements.clientSecretHex.textContent = secretHex;

  // Update counters
  updateCounterDisplays();

  // Update window visualization
  updateWindowVisual();

  // Update sync visualization
  updateSyncVisual();

  // Reset OTP display
  elements.clientOtp.textContent = '------';
  resetStepsDisplay();

  // Clear verification
  elements.verifyInput.value = '';
  elements.verifyResult.className = 'verify-result';
  elements.verifyResult.style.display = 'none';
  elements.verifyDetails.classList.add('hidden');

  // Clear logs
  state.logs = [];
  renderLogs();
}

// ===== Counter Management =====

/**
 * Update all counter displays.
 */
function updateCounterDisplays() {
  elements.serverCounter.textContent = state.serverCounter;
  elements.clientCounter.textContent = state.clientCounter;
  elements.syncServer.textContent = state.serverCounter;
  elements.syncClient.textContent = state.clientCounter;
}

// ===== Window Visualization =====

/**
 * Handle window size change.
 */
function handleWindowSizeChange() {
  state.windowSize = parseInt(elements.windowSize.value) || 5;
  updateWindowVisual();
  updateSyncVisual();
}

/**
 * Update the look-ahead window visualization.
 */
function updateWindowVisual() {
  const { windowVisual } = elements;
  windowVisual.innerHTML = '';

  for (let i = 0; i <= state.windowSize; i++) {
    const counter = state.serverCounter + i;
    const cell = document.createElement('div');
    cell.className = 'window-cell';

    if (i === 0) {
      cell.classList.add('current');
    } else {
      cell.classList.add('in-window');
    }

    cell.textContent = counter;
    windowVisual.appendChild(cell);
  }
}

// ===== OTP Generation =====

/**
 * Handle OTP generation.
 */
async function handleGenerateOtp() {
  if (!state.secret) return;

  const currentCounter = state.clientCounter;

  // Compute all steps for visualization
  const steps = await computeAllSteps(state.secret, currentCounter, 6);

  state.lastSteps = steps;
  state.lastOtp = steps.code;

  // Increment client counter AFTER generation (as per RFC 4226)
  state.clientCounter++;

  // Update displays
  elements.clientOtp.textContent = steps.code;
  updateCounterDisplays();
  updateSyncVisual();
  updateStepsDisplay(steps);

  // Log
  addLog('log-otp-generated', { otp: steps.code, counter: currentCounter }, 'info');
}

/**
 * Update the algorithm steps display.
 *
 * @param {Object} steps - Computed steps from computeAllSteps
 */
function updateStepsDisplay(steps) {
  // Step 1: Counter bytes
  elements.step1Value.textContent = steps.counterHex;

  // Step 2: HMAC
  elements.step2Value.textContent = steps.hmacHex;

  // Step 3: Dynamic truncation
  elements.step3Offset.textContent = steps.offset;
  elements.step3Extracted.textContent = steps.extractedHex;
  elements.step3Int.textContent = steps.binCode.toLocaleString();

  // Update byte diagram
  updateByteDiagram(steps.hmacBytes, steps.offset);

  // Step 4: Modulo
  const modCalc = `${steps.binCode.toLocaleString()} mod 1000000 = ${parseInt(steps.code)}`;
  elements.step4Calc.textContent = modCalc;
  elements.step4Result.textContent = steps.code;
}

/**
 * Reset the steps display to initial state.
 */
function resetStepsDisplay() {
  elements.step1Value.textContent = '0000000000000000';
  elements.step2Value.textContent = '--------------------';
  elements.step3Offset.textContent = '0';
  elements.step3Extracted.textContent = '00000000';
  elements.step3Int.textContent = '0';
  elements.step4Calc.textContent = '0 mod 1000000 = 0';
  elements.step4Result.textContent = '000000';
  elements.byteDiagram.innerHTML = '';
}

/**
 * Update the byte diagram showing HMAC bytes and extraction.
 *
 * @param {Uint8Array} hmacBytes - The 20 HMAC bytes
 * @param {number} offset - The extraction offset
 */
function updateByteDiagram(hmacBytes, offset) {
  const { byteDiagram } = elements;
  byteDiagram.innerHTML = '';

  for (let i = 0; i < hmacBytes.length; i++) {
    const wrapper = document.createElement('div');
    wrapper.className = 'byte-wrapper';

    // Is this the offset source byte (byte 19)?
    if (i === 19) {
      wrapper.classList.add('byte-offset-source');
    }

    // Is this one of the 4 extracted bytes?
    if (i >= offset && i < offset + 4) {
      wrapper.classList.add('byte-extracted');
    }

    // Index label
    const indexEl = document.createElement('span');
    indexEl.className = 'byte-index';
    indexEl.textContent = i;
    wrapper.appendChild(indexEl);

    // Byte value
    const byteEl = document.createElement('span');
    byteEl.className = 'byte-cell';
    byteEl.textContent = hmacBytes[i].toString(16).padStart(2, '0').toUpperCase();
    wrapper.appendChild(byteEl);

    byteDiagram.appendChild(wrapper);
  }
}

/**
 * Toggle the expansion of algorithm steps.
 */
function toggleStepsExpansion() {
  const isHidden = elements.algorithmSteps.classList.toggle('hidden');
  elements.btnExpandSteps.classList.toggle('expanded', !isHidden);
  elements.expandText.textContent = isHidden ? t('expand-text') : t('collapse-text');
}

// ===== Verification =====

/**
 * Handle OTP verification.
 */
async function handleVerify() {
  if (!state.secret) return;

  const otp = elements.verifyInput.value.trim();
  if (otp.length !== 6 || !/^\d{6}$/.test(otp)) {
    elements.verifyResult.textContent = t('verify-failure');
    elements.verifyResult.className = 'verify-result failure';
    return;
  }

  const result = await verifyOtp(
    state.secret,
    state.serverCounter,
    otp,
    state.windowSize,
    6
  );

  if (result.success) {
    // Update server counter
    state.serverCounter = result.newServerCounter;
    updateCounterDisplays();
    updateWindowVisual();
    updateSyncVisual();

    elements.verifyResult.textContent = t('verify-success', { counter: result.usedCounter });
    elements.verifyResult.className = 'verify-result success';

    addLog('log-verify-success', { otp, counter: result.usedCounter }, 'success');
  } else {
    elements.verifyResult.textContent = t('verify-failure');
    elements.verifyResult.className = 'verify-result failure';

    addLog('log-verify-failure', { otp }, 'failure');
  }

  // Show details
  showVerificationDetails(result);

  // Clear input
  elements.verifyInput.value = '';
}

/**
 * Show verification details.
 *
 * @param {Object} result - Verification result
 */
function showVerificationDetails(result) {
  const { verifyDetails } = elements;
  verifyDetails.classList.remove('hidden');

  let html = t('verify-details-header') + '\n';
  for (const detail of result.details) {
    const status = detail.match ? '✓' : '✗';
    html += `Counter ${detail.counter}: ${detail.expectedOtp} ${status}\n`;
  }

  verifyDetails.textContent = html;
}

// ===== Synchronization Demo =====

/**
 * Handle desynchronization (client gets ahead).
 *
 * @param {number} amount - How much to advance the client counter
 */
function handleDesync(amount) {
  state.clientCounter += amount;
  updateCounterDisplays();
  updateSyncVisual();
  clearSyncTestResult();

  addLog('log-desync', { counter: state.clientCounter }, 'info');
}

/**
 * Handle manual desynchronization with custom amount.
 */
function handleDesyncManual() {
  const amount = parseInt(elements.desyncAmount.value) || 1;
  handleDesync(amount);
}

/**
 * Test verification with current client counter.
 * Shows what would happen if client tried to verify now.
 */
async function handleTestVerify() {
  if (!state.secret) return;

  // Generate OTP for current client counter (without incrementing)
  const { code } = await computeAllSteps(state.secret, state.clientCounter, 6);

  // Verify against server
  const result = await verifyOtp(
    state.secret,
    state.serverCounter,
    code,
    state.windowSize,
    6
  );

  const diff = state.clientCounter - state.serverCounter;
  const inWindow = diff >= 0 && diff <= state.windowSize;

  let html = '';
  if (result.success) {
    html = `
      <div class="test-success">
        <h4>✓ Верифікація успішна!</h4>
        <p>OTP для лічильника ${state.clientCounter}: <code>${code}</code></p>
        <p>Сервер знайшов співпадіння на позиції ${result.usedCounter}.</p>
        <p>Різниця лічильників: ${diff} (в межах вікна ${state.windowSize})</p>
        <p class="note">Після справжньої верифікації сервер оновив би лічильник до ${result.newServerCounter}.</p>
      </div>
    `;
  } else {
    html = `
      <div class="test-failure">
        <h4>✗ Верифікація провалена!</h4>
        <p>OTP для лічильника ${state.clientCounter}: <code>${code}</code></p>
        <p>Сервер перевірив лічильники від ${state.serverCounter} до ${state.serverCounter + state.windowSize}.</p>
        <p>Різниця лічильників: ${diff} (за межами вікна ${state.windowSize})</p>
        <p class="note">Клієнт випередив сервер занадто сильно. Потрібна ресинхронізація!</p>
      </div>
    `;
  }

  // Show detailed check
  html += '<div class="test-details"><strong>Деталі перевірки:</strong><ul>';
  for (const detail of result.details) {
    const status = detail.match ? '✓' : '✗';
    const highlight = detail.match ? 'class="match"' : '';
    html += `<li ${highlight}>Лічильник ${detail.counter}: очікуваний OTP = ${detail.expectedOtp} ${status}</li>`;
  }
  html += '</ul></div>';

  elements.syncTestResult.innerHTML = html;
  elements.syncTestResult.className = 'sync-test-result ' + (result.success ? 'success' : 'failure');

  addLog(result.success ? 'log-verify-success' : 'log-verify-failure', { otp: code, counter: state.clientCounter }, result.success ? 'success' : 'failure');
}

/**
 * Clear the sync test result display.
 */
function clearSyncTestResult() {
  elements.syncTestResult.innerHTML = '';
  elements.syncTestResult.className = 'sync-test-result';
}

/**
 * Handle resynchronization.
 */
function handleResync() {
  // Sync both to the higher counter
  const max = Math.max(state.clientCounter, state.serverCounter);
  state.clientCounter = max;
  state.serverCounter = max;

  updateCounterDisplays();
  updateWindowVisual();
  updateSyncVisual();
  clearSyncTestResult();

  addLog('log-resync', { counter: max }, 'info');
}

/**
 * Update the sync visualization with detailed window display.
 */
function updateSyncVisual() {
  const { syncWindow, diffValue, windowStatus } = elements;
  syncWindow.innerHTML = '';

  const serverC = state.serverCounter;
  const clientC = state.clientCounter;
  const windowSize = state.windowSize;
  const diff = clientC - serverC;

  // Update difference display
  diffValue.textContent = diff >= 0 ? `+${diff}` : diff;
  diffValue.style.color = diff <= windowSize ? 'var(--green)' : 'var(--red)';

  // Calculate range to display
  const minDisplay = Math.max(0, Math.min(serverC - 2, clientC - 2));
  const maxDisplay = Math.max(serverC + windowSize + 2, clientC + 2);

  for (let i = minDisplay; i <= maxDisplay; i++) {
    const cell = document.createElement('div');
    cell.className = 'window-cell';

    const isServer = i === serverC;
    const isClient = i === clientC;
    const inWindow = i >= serverC && i <= serverC + windowSize;
    const isOutside = i > serverC + windowSize;

    // Apply classes based on state
    if (isServer) {
      cell.classList.add('server-pos');
    }

    if (isClient) {
      cell.classList.add('client-pos');
    }

    if (inWindow && !isServer) {
      cell.classList.add('in-window');
    }

    if (isOutside) {
      cell.classList.add('outside');
    }

    // Special case: client is at server position
    if (isServer && isClient) {
      cell.classList.add('synced');
    }

    cell.textContent = i;
    cell.title = `Лічильник ${i}${isServer ? ' (сервер)' : ''}${isClient ? ' (клієнт)' : ''}`;
    syncWindow.appendChild(cell);
  }

  // Update status message
  let statusHtml = '';
  if (diff === 0) {
    statusHtml = '<span class="status-ok">✓ Лічильники синхронізовані</span>';
  } else if (diff > 0 && diff <= windowSize) {
    statusHtml = `<span class="status-ok">✓ Клієнт випереджає на ${diff}. Це в межах вікна (${windowSize}). Верифікація пройде!</span>`;
  } else if (diff > windowSize) {
    statusHtml = `<span class="status-error">✗ Клієнт випереджає на ${diff}. Це за межами вікна (${windowSize}). Верифікація провалиться!</span>`;
  } else {
    statusHtml = `<span class="status-warning">⚠ Сервер випереджає клієнта на ${-diff}. Це неможливо в нормальній ситуації.</span>`;
  }
  windowStatus.innerHTML = statusHtml;
}

// ===== Logging =====

/**
 * Add a log entry.
 *
 * @param {string} key - Translation key for the message
 * @param {Object} params - Parameters for translation
 * @param {'info' | 'success' | 'failure'} type - Log type
 */
function addLog(key, params, type) {
  const now = new Date();
  const time = now.toLocaleTimeString('uk-UA', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  state.logs.push({
    time,
    message: t(key, params),
    type,
  });

  renderLogs();
}

/**
 * Render the log entries.
 */
function renderLogs() {
  const { serverLog } = elements;

  if (state.logs.length === 0) {
    serverLog.innerHTML = `<div class="log-empty">${t('log-empty')}</div>`;
    return;
  }

  serverLog.innerHTML = state.logs
    .slice()
    .reverse()
    .map(log => `
      <div class="log-entry">
        <span class="log-time">[${log.time}]</span>
        <span class="log-message log-${log.type}">${log.message}</span>
      </div>
    `)
    .join('');
}

/**
 * Clear the log.
 */
function clearLog() {
  state.logs = [];
  renderLogs();
}

// ===== Language =====

/**
 * Switch language.
 *
 * @param {string} lang - Language code
 */
function switchLanguage(lang) {
  setLanguage(lang);
  updateAllTranslations();
  updateLanguageButtons();

  // Re-render logs with new language
  // (We'd need to store log keys to re-translate, skipping for simplicity)
}

/**
 * Update language button states.
 */
function updateLanguageButtons() {
  const lang = getLanguage();
  elements.langUk.classList.toggle('active', lang === 'uk');
  elements.langEn.classList.toggle('active', lang === 'en');
  elements.langRu.classList.toggle('active', lang === 'ru');
}

// ===== Tabs =====

/**
 * Switch to a tab.
 *
 * @param {string} tabId - Tab content element ID
 */
function switchTab(tabId) {
  // Update tab buttons
  elements.tabBtns.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tabId);
  });

  // Update tab contents
  elements.tabContents.forEach(content => {
    content.classList.toggle('active', content.id === tabId);
  });
}
