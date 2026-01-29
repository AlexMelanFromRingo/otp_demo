/**
 * Internationalization (i18n) Module
 * Supports Ukrainian (uk), English (en), and Russian (ru)
 */

export const translations = {
  uk: {
    // Header
    'page-title': 'HOTP Демо — Одноразові паролі на основі лічильника (RFC 4226)',

    // Tabs
    'tab-demo': 'Демо',
    'tab-algorithm': 'Алгоритм HOTP',
    'tab-data': 'Структура даних',
    'tab-about': 'Про RFC 4226',

    // Setup section
    'setup-title': 'Налаштування системи',
    'setup-desc': 'Спочатку потрібно налаштувати спільний секретний ключ між клієнтом та сервером. Це робиться один раз при реєстрації.',
    'btn-generate': 'Згенерувати секретний ключ',
    'btn-import': 'Імпортувати ключ',
    'btn-preset': 'Завантажити приклад',
    'import-label': 'Введіть секретний ключ (Hex або Base32):',
    'import-error-invalid': 'Невірний формат ключа. Використовуйте Hex або Base32.',
    'import-error-short': 'Ключ занадто короткий. Мінімум 10 байт.',

    // Server panel
    'server-title': '🖥️ Сервер',
    'server-badge': 'Аутентифікація',
    'server-secret-title': 'Секретний ключ (зберігається в БД)',
    'server-counter-title': 'Лічильник сервера',
    'server-counter-desc': 'Сервер зберігає останній успішно використаний лічильник. Це запобігає повторному використанню того ж пароля.',
    'server-counter-label': 'Поточний лічильник',
    'server-window-title': 'Вікно допуску (Look-ahead)',
    'server-window-desc': 'Сервер перевіряє паролі для лічильників від поточного до поточного + вікно. Це дозволяє клієнту "випередити" сервер на кілька генерацій.',
    'window-label': 'Розмір вікна:',
    'verify-title': 'Перевірка пароля',
    'btn-verify': 'Перевірити',
    'server-log-title': 'Журнал подій',
    'log-empty': 'Журнал порожній',
    'btn-clear-log': 'Очистити журнал',

    // Client panel
    'client-title': '📱 Клієнт (Токен)',
    'client-badge': 'Генератор OTP',
    'client-secret-title': 'Секретний ключ (в пам\'яті токена)',
    'client-secret-note': '⚠️ Цей ключ ніколи не передається по мережі після початкової реєстрації!',
    'client-counter-title': 'Лічильник клієнта',
    'client-counter-desc': 'Клієнт збільшує лічильник після кожної генерації пароля.',
    'client-counter-label': 'Поточний лічильник',
    'client-otp-title': 'Одноразовий пароль',
    'btn-generate-otp': 'Згенерувати пароль',
    'client-otp-note': 'Натисніть кнопку, щоб згенерувати новий OTP. Лічильник збільшиться на 1.',

    // Algorithm steps
    'expand-text': 'Показати кроки алгоритму',
    'collapse-text': 'Сховати кроки алгоритму',
    'step1-title': 'Крок 1: Лічильник → Байти',
    'step1-desc': 'Лічильник перетворюється в 8 байт (big-endian).',
    'step1-label': 'Лічильник (hex, 8 байт)',
    'step2-title': 'Крок 2: HMAC-SHA1',
    'step2-desc': 'Обчислюємо HMAC-SHA1(secret, counter_bytes).',
    'step2-label': 'HMAC результат (20 байт)',
    'step3-title': 'Крок 3: Динамічне обрізання',
    'step3-desc': 'Витягуємо 4 байти з позиції offset = hmac[19] & 0x0F.',
    'step3-offset-label': 'Offset:',
    'step3-extracted-label': 'Витягнуті байти',
    'step3-int-label': '31-бітне число',
    'step4-title': 'Крок 4: Модуло 10⁶',
    'step4-desc': 'Залишок від ділення на 1,000,000 дає 6-значний код.',
    'step4-calc-label': 'Обчислення',

    // Sync section
    'sync-title': 'Демонстрація синхронізації',
    'sync-desc': 'Ця секція показує, що відбувається, коли лічильники клієнта та сервера розходяться.',
    'btn-desync': 'Розсинхронізувати (+3 на клієнті)',
    'btn-resync': 'Ресинхронізувати',
    'sync-server-label': 'Сервер',
    'sync-client-label': 'Клієнт',

    // Verification results
    'verify-success': '✓ Пароль прийнято! Використано лічильник: {counter}',
    'verify-failure': '✗ Пароль відхилено! Не знайдено у вікні допуску.',
    'verify-details-header': 'Деталі перевірки:',

    // Log messages
    'log-init': 'Система ініціалізована. Секретний ключ встановлено.',
    'log-otp-generated': 'Згенеровано OTP: {otp} (лічильник: {counter})',
    'log-verify-success': 'Верифікація успішна. OTP: {otp}, лічильник: {counter}',
    'log-verify-failure': 'Верифікація невдала. OTP: {otp} не знайдено.',
    'log-desync': 'Клієнт розсинхронізовано. Новий лічильник: {counter}',
    'log-resync': 'Лічильники синхронізовано до: {counter}',
  },

  en: {
    // Header
    'page-title': 'HOTP Demo — Counter-Based One-Time Passwords (RFC 4226)',

    // Tabs
    'tab-demo': 'Demo',
    'tab-algorithm': 'HOTP Algorithm',
    'tab-data': 'Data Structure',
    'tab-about': 'About RFC 4226',

    // Setup section
    'setup-title': 'System Setup',
    'setup-desc': 'First, you need to set up a shared secret key between the client and server. This is done once during registration.',
    'btn-generate': 'Generate Secret Key',
    'btn-import': 'Import Key',
    'btn-preset': 'Load Example',
    'import-label': 'Enter secret key (Hex or Base32):',
    'import-error-invalid': 'Invalid key format. Use Hex or Base32.',
    'import-error-short': 'Key is too short. Minimum 10 bytes.',

    // Server panel
    'server-title': '🖥️ Server',
    'server-badge': 'Authentication',
    'server-secret-title': 'Secret Key (stored in DB)',
    'server-counter-title': 'Server Counter',
    'server-counter-desc': 'The server stores the last successfully used counter. This prevents reuse of the same password.',
    'server-counter-label': 'Current counter',
    'server-window-title': 'Look-ahead Window',
    'server-window-desc': 'The server checks passwords for counters from current to current + window. This allows the client to be slightly ahead.',
    'window-label': 'Window size:',
    'verify-title': 'Password Verification',
    'btn-verify': 'Verify',
    'server-log-title': 'Event Log',
    'log-empty': 'Log is empty',
    'btn-clear-log': 'Clear Log',

    // Client panel
    'client-title': '📱 Client (Token)',
    'client-badge': 'OTP Generator',
    'client-secret-title': 'Secret Key (in token memory)',
    'client-secret-note': '⚠️ This key is never transmitted over the network after initial registration!',
    'client-counter-title': 'Client Counter',
    'client-counter-desc': 'The client increments the counter after each password generation.',
    'client-counter-label': 'Current counter',
    'client-otp-title': 'One-Time Password',
    'btn-generate-otp': 'Generate Password',
    'client-otp-note': 'Click the button to generate a new OTP. The counter will increase by 1.',

    // Algorithm steps
    'expand-text': 'Show algorithm steps',
    'collapse-text': 'Hide algorithm steps',
    'step1-title': 'Step 1: Counter → Bytes',
    'step1-desc': 'The counter is converted to 8 bytes (big-endian).',
    'step1-label': 'Counter (hex, 8 bytes)',
    'step2-title': 'Step 2: HMAC-SHA1',
    'step2-desc': 'Calculate HMAC-SHA1(secret, counter_bytes).',
    'step2-label': 'HMAC result (20 bytes)',
    'step3-title': 'Step 3: Dynamic Truncation',
    'step3-desc': 'Extract 4 bytes from position offset = hmac[19] & 0x0F.',
    'step3-offset-label': 'Offset:',
    'step3-extracted-label': 'Extracted bytes',
    'step3-int-label': '31-bit integer',
    'step4-title': 'Step 4: Modulo 10⁶',
    'step4-desc': 'The remainder when divided by 1,000,000 gives a 6-digit code.',
    'step4-calc-label': 'Calculation',

    // Sync section
    'sync-title': 'Synchronization Demo',
    'sync-desc': 'This section shows what happens when client and server counters diverge.',
    'btn-desync': 'Desynchronize (+3 on client)',
    'btn-resync': 'Resynchronize',
    'sync-server-label': 'Server',
    'sync-client-label': 'Client',

    // Verification results
    'verify-success': '✓ Password accepted! Used counter: {counter}',
    'verify-failure': '✗ Password rejected! Not found in look-ahead window.',
    'verify-details-header': 'Verification details:',

    // Log messages
    'log-init': 'System initialized. Secret key set.',
    'log-otp-generated': 'Generated OTP: {otp} (counter: {counter})',
    'log-verify-success': 'Verification successful. OTP: {otp}, counter: {counter}',
    'log-verify-failure': 'Verification failed. OTP: {otp} not found.',
    'log-desync': 'Client desynchronized. New counter: {counter}',
    'log-resync': 'Counters synchronized to: {counter}',
  },

  ru: {
    // Header
    'page-title': 'HOTP Демо — Одноразовые пароли на основе счётчика (RFC 4226)',

    // Tabs
    'tab-demo': 'Демо',
    'tab-algorithm': 'Алгоритм HOTP',
    'tab-data': 'Структура данных',
    'tab-about': 'О RFC 4226',

    // Setup section
    'setup-title': 'Настройка системы',
    'setup-desc': 'Сначала нужно настроить общий секретный ключ между клиентом и сервером. Это делается один раз при регистрации.',
    'btn-generate': 'Сгенерировать секретный ключ',
    'btn-import': 'Импортировать ключ',
    'btn-preset': 'Загрузить пример',
    'import-label': 'Введите секретный ключ (Hex или Base32):',
    'import-error-invalid': 'Неверный формат ключа. Используйте Hex или Base32.',
    'import-error-short': 'Ключ слишком короткий. Минимум 10 байт.',

    // Server panel
    'server-title': '🖥️ Сервер',
    'server-badge': 'Аутентификация',
    'server-secret-title': 'Секретный ключ (хранится в БД)',
    'server-counter-title': 'Счётчик сервера',
    'server-counter-desc': 'Сервер хранит последний успешно использованный счётчик. Это предотвращает повторное использование того же пароля.',
    'server-counter-label': 'Текущий счётчик',
    'server-window-title': 'Окно допуска (Look-ahead)',
    'server-window-desc': 'Сервер проверяет пароли для счётчиков от текущего до текущего + окно. Это позволяет клиенту "опередить" сервер на несколько генераций.',
    'window-label': 'Размер окна:',
    'verify-title': 'Проверка пароля',
    'btn-verify': 'Проверить',
    'server-log-title': 'Журнал событий',
    'log-empty': 'Журнал пуст',
    'btn-clear-log': 'Очистить журнал',

    // Client panel
    'client-title': '📱 Клиент (Токен)',
    'client-badge': 'Генератор OTP',
    'client-secret-title': 'Секретный ключ (в памяти токена)',
    'client-secret-note': '⚠️ Этот ключ никогда не передаётся по сети после начальной регистрации!',
    'client-counter-title': 'Счётчик клиента',
    'client-counter-desc': 'Клиент увеличивает счётчик после каждой генерации пароля.',
    'client-counter-label': 'Текущий счётчик',
    'client-otp-title': 'Одноразовый пароль',
    'btn-generate-otp': 'Сгенерировать пароль',
    'client-otp-note': 'Нажмите кнопку, чтобы сгенерировать новый OTP. Счётчик увеличится на 1.',

    // Algorithm steps
    'expand-text': 'Показать шаги алгоритма',
    'collapse-text': 'Скрыть шаги алгоритма',
    'step1-title': 'Шаг 1: Счётчик → Байты',
    'step1-desc': 'Счётчик преобразуется в 8 байт (big-endian).',
    'step1-label': 'Счётчик (hex, 8 байт)',
    'step2-title': 'Шаг 2: HMAC-SHA1',
    'step2-desc': 'Вычисляем HMAC-SHA1(secret, counter_bytes).',
    'step2-label': 'HMAC результат (20 байт)',
    'step3-title': 'Шаг 3: Динамическое обрезание',
    'step3-desc': 'Извлекаем 4 байта с позиции offset = hmac[19] & 0x0F.',
    'step3-offset-label': 'Offset:',
    'step3-extracted-label': 'Извлечённые байты',
    'step3-int-label': '31-битное число',
    'step4-title': 'Шаг 4: Модуло 10⁶',
    'step4-desc': 'Остаток от деления на 1,000,000 даёт 6-значный код.',
    'step4-calc-label': 'Вычисление',

    // Sync section
    'sync-title': 'Демонстрация синхронизации',
    'sync-desc': 'Эта секция показывает, что происходит, когда счётчики клиента и сервера расходятся.',
    'btn-desync': 'Рассинхронизировать (+3 на клиенте)',
    'btn-resync': 'Ресинхронизировать',
    'sync-server-label': 'Сервер',
    'sync-client-label': 'Клиент',

    // Verification results
    'verify-success': '✓ Пароль принят! Использован счётчик: {counter}',
    'verify-failure': '✗ Пароль отклонён! Не найден в окне допуска.',
    'verify-details-header': 'Детали проверки:',

    // Log messages
    'log-init': 'Система инициализирована. Секретный ключ установлен.',
    'log-otp-generated': 'Сгенерирован OTP: {otp} (счётчик: {counter})',
    'log-verify-success': 'Верификация успешна. OTP: {otp}, счётчик: {counter}',
    'log-verify-failure': 'Верификация неудачна. OTP: {otp} не найден.',
    'log-desync': 'Клиент рассинхронизирован. Новый счётчик: {counter}',
    'log-resync': 'Счётчики синхронизированы до: {counter}',
  },
};

let currentLang = 'uk';

/**
 * Get translation for a key with optional parameter substitution.
 *
 * @param {string} key - Translation key
 * @param {Object} params - Parameters to substitute (e.g., {counter: 5})
 * @returns {string} Translated string
 */
export function t(key, params = {}) {
  let text = translations[currentLang]?.[key] || translations.uk[key] || key;

  // Substitute parameters: {param} → value
  for (const [param, value] of Object.entries(params)) {
    text = text.replace(new RegExp(`\\{${param}\\}`, 'g'), value);
  }

  return text;
}

/**
 * Set the current language.
 *
 * @param {string} lang - Language code ('uk', 'en', 'ru')
 */
export function setLanguage(lang) {
  if (translations[lang]) {
    currentLang = lang;
    document.documentElement.lang = lang;
    localStorage.setItem('hotp-lang', lang);
  }
}

/**
 * Get the current language.
 *
 * @returns {string} Current language code
 */
export function getLanguage() {
  return currentLang;
}

/**
 * Initialize language from localStorage or browser settings.
 */
export function initLanguage() {
  const saved = localStorage.getItem('hotp-lang');
  if (saved && translations[saved]) {
    currentLang = saved;
  } else {
    // Try to detect from browser
    const browserLang = navigator.language?.slice(0, 2);
    if (browserLang === 'uk' || browserLang === 'ru') {
      currentLang = browserLang;
    } else {
      currentLang = 'uk'; // Default
    }
  }
  document.documentElement.lang = currentLang;
}

/**
 * Update all elements with data-i18n attribute.
 */
export function updateAllTranslations() {
  // Update elements with id matching translation keys
  for (const key of Object.keys(translations.uk)) {
    const el = document.getElementById(key);
    if (el) {
      el.textContent = t(key);
    }
  }

  // Update elements with data-i18n attribute
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    el.textContent = t(key);
  });

  // Update placeholders
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    el.placeholder = t(key);
  });
}
