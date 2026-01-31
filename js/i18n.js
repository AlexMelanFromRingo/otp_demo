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
    'sync-problem-title': 'Проблема десинхронізації',
    'sync-problem-desc': 'Клієнт може "випередити" сервер, якщо користувач згенерував паролі, але не використав їх. Сервер вирішує це через <strong>вікно допуску</strong> — перевіряє не тільки поточний лічильник, а й кілька наступних.',
    'sync-scenarios-title': 'Спробуйте сценарії',
    'sync-within-window': 'В межах вікна',
    'sync-within-desc': 'Клієнт випередив на 3, вікно = 5. Пароль буде прийнято.',
    'sync-outside-window': 'За межами вікна',
    'sync-outside-desc': 'Клієнт випередив занадто сильно. Пароль відхилено!',
    'sync-custom-value': 'Своє значення',
    'btn-desync-ok': '+3 (в межах)',
    'btn-desync-fail': '+вікно+3',
    'sync-visualization': 'Візуалізація',
    'sync-server-label': '🖥️ Сервер',
    'sync-client-label': '📱 Клієнт',
    'sync-diff-label': 'Різниця',
    'legend-server': 'Сервер',
    'legend-window': 'Вікно',
    'legend-client': 'Клієнт',
    'legend-outside': 'Поза вікном',
    'btn-test-verify': 'Спробувати верифікацію',
    'btn-resync': 'Скинути лічильники',
    // Resync section
    'resync-title': 'Як відновити синхронізацію?',
    'resync-intro': 'Якщо клієнт випередив сервер за межі вікна, є кілька способів відновлення:',
    'resync-method1-title': '1. Протокол ресинхронізації (RFC 4226 §7.4)',
    'resync-method1-desc': 'Користувач вводить <strong>2-3 послідовних OTP</strong>. Сервер шукає цю послідовність у великому вікні (100-1000). Якщо знайдено — синхронізація відновлена.',
    'resync-method2-title': '2. Адміністративне скидання',
    'resync-method2-desc': 'Адміністратор вручну скидає лічильник сервера до значення клієнта. Потребує додаткової автентифікації (пароль, email, телефон).',
    'resync-method3-title': '3. Перереєстрація токена',
    'resync-method3-desc': 'Видалення старого секрету і створення нового. Найбезпечніший, але найменш зручний спосіб.',
    'resync-note-title': 'Чому не просто збільшити вікно?',
    'resync-note-desc': 'Велике вікно (наприклад, 1000) знижує безпеку. Зловмисник, який перехопив OTP, має більше часу на brute-force атаку. RFC рекомендує вікно 3-10 для звичайної роботи.',

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

    // Algorithm section
    'algo-title': 'Алгоритм HOTP — Покрокова інструкція',
    'algo-intro': '<strong>HOTP</strong> (HMAC-based One-Time Password) — алгоритм генерації одноразових паролів з RFC 4226 (грудень 2005).',
    'algo-important-note': 'Важливо: Динамічне усічення (Dynamic Truncation) — це винахід саме HOTP! TOTP (RFC 6238, 2011) просто використовує HOTP всередині, замінюючи лічильник на <code>floor(unix_time / 30)</code>.',
    'algo-formula-title': 'Загальна формула',
    'algo-formula-k': '<strong>K</strong> — секретний ключ (20 байт)',
    'algo-formula-c': '<strong>C</strong> — лічильник (8 байт)',
    'algo-formula-truncate': '<strong>Truncate</strong> — динамічне усічення',
    'algo-step0-title': 'Крок 0: Що ми маємо на початку',
    'algo-secret-title': 'Секретний ключ (K)',
    'algo-secret-desc': 'Секретний ключ — це послідовність випадкових байтів, яка зберігається і на клієнті, і на сервері. Це єдиний секрет, який вони ділять між собою.',
    'algo-secret-example': 'Приклад: текст "12345678901234567890" (20 символів ASCII)',
    'algo-secret-note': 'Це тестовий ключ з RFC 4226. В реальності ключ — випадкові байти!',
    'algo-counter-title': 'Лічильник (C)',
    'algo-counter-desc': 'Лічильник — це просто число, яке збільшується на 1 після кожної генерації паролю. Починається з 0.',
    'algo-counter-label': 'Лічильник =',
    'algo-counter-note': '(звичайне ціле число)',
    'algo-step1-title': 'Крок 1: Перетворення лічильника в байти',
    'algo-why-convert': 'Навіщо перетворювати?',
    'algo-why-convert-desc': 'HMAC-SHA1 працює з <em>байтами</em>, а не з числами. Тому ми повинні перетворити число (наприклад, 5) в послідовність байтів.',
    'algo-why-8bytes': 'Чому саме 8 байт?',
    'algo-why-8bytes-desc': 'RFC 4226 вимагає використовувати 64-бітний (8-байтний) лічильник. Це дозволяє мати до 2<sup>64</sup> = 18,446,744,073,709,551,616 можливих значень — достатньо на мільярди років!',
    'algo-endian-title': 'Big-Endian vs Little-Endian — що це?',
    'algo-endian-intro': 'Коли ми записуємо число як послідовність байтів, постає питання: <strong>з якого кінця починати?</strong>',
    'algo-big-endian': 'Big-Endian (старший байт першим)',
    'algo-big-endian-desc': 'Як ми читаємо числа: зліва направо, старші розряди спочатку.',
    'algo-little-endian': 'Little-Endian (молодший байт першим)',
    'algo-little-endian-desc': 'Як зберігають дані більшість процесорів (Intel, AMD).',
    'algo-endian-key': '<strong>RFC 4226 вимагає Big-Endian!</strong> Це важливо для сумісності між різними системами.',
    'algo-practical-example': 'Практичний приклад',
    'algo-more-examples': 'Ще приклади:',
    'algo-table-counter': 'Лічильник',
    'algo-table-bytes': '8 байт (Big-Endian)',
    'algo-step2-title': 'Крок 2: Обчислення HMAC-SHA1',
    'algo-what-hmac': 'Що таке HMAC?',
    'algo-what-hmac-desc': '<strong>HMAC</strong> (Hash-based Message Authentication Code) — це спосіб створити "підпис" для повідомлення, використовуючи секретний ключ.',
    'algo-why-sha1': 'Чому SHA-1?',
    'algo-why-sha1-desc': 'RFC 4226 був написаний у 2005 році, коли SHA-1 був стандартом. Хоча SHA-1 має теоретичні вразливості для колізій, для HMAC це не критично — HMAC захищений від таких атак.',
    'algo-sha1-note': 'Сучасний TOTP часто використовує SHA-256 або SHA-512, але SHA-1 залишається сумісним.',
    'algo-hmac-result': 'Результат HMAC-SHA1',
    'algo-hmac-result-desc': 'HMAC-SHA1 <strong>завжди</strong> повертає рівно 20 байт (160 біт), незалежно від розміру вхідних даних.',
    'algo-hmac-example': 'Для ключа "12345678901234567890" і лічильника 5:',
    'algo-hmac-note': 'Індекси від 0 до 19. Останній байт (індекс 19) виділено — він буде важливим!',
    'algo-step3-title': 'Крок 3: Динамічне усічення (Dynamic Truncation)',
    'algo-truncation-origin': 'Звідки взялось динамічне усічення?',
    'algo-truncation-origin-desc': 'Це <strong>винахід RFC 4226 (HOTP)</strong>! TOTP просто використовує його без змін.',
    'algo-truncation-problem': 'Проблема: У нас є 20 байт (160 біт), а потрібен 6-значний код. Як вибрати, які байти використати?',
    'algo-step31': 'Крок 3.1: Визначення зміщення (offset)',
    'algo-step31-desc': 'Беремо <strong>останній байт</strong> HMAC результату (індекс 19) і застосовуємо маску <code>0x0F</code>:',
    'algo-offset-result': '<strong>offset = 10</strong> — це позиція, з якої ми почнемо витягувати байти.',
    'algo-why-mask': 'Чому маска 0x0F?',
    'algo-why-mask-desc': 'Маска <code>0x0F = 00001111</code> залишає тільки молодші 4 біти. Це дає числа від 0 до 15.',
    'algo-why-last-byte': 'Чому саме останній байт?',
    'algo-why-last-byte-desc': 'Це додає <strong>непередбачуваності</strong>. Зловмисник не може знати заздалегідь, які байти будуть використані.',
    'algo-step32': 'Крок 3.2: Витягування 4 байтів',
    'algo-step32-desc': 'Починаючи з позиції <code>offset = 10</code>, витягуємо 4 послідовні байти:',
    'algo-step33': 'Крок 3.3: Обнулення старшого біту — чому 31 біт, а не 32?',
    'algo-step33-intro': 'Це <strong>ключовий момент</strong>, який часто викликає плутанину!',
    'algo-signed-problem': 'Проблема знакових чисел',
    'algo-signed-desc': 'У багатьох мовах програмування (Java, старий JavaScript, C з signed int) 32-бітні числа є <strong>знаковими</strong>.',
    'algo-solution-title': 'Рішення: обнулити старший біт',
    'algo-solution-desc': 'Застосовуємо маску <code>0x7F</code> до першого байту:',
    'algo-31bit-result': '<strong>Тепер у нас гарантовано 31-бітне додатне число!</strong>',
    'algo-step34': 'Крок 3.4: Збірка 32-бітного числа',
    'algo-step34-desc': 'Тепер збираємо 4 байти в одне число (Big-Endian):',
    'algo-step4-title': 'Крок 4: Операція модуло',
    'algo-why-modulo': 'Навіщо модуло?',
    'algo-why-modulo-desc': 'У нас є велике число (до 2 мільярдів), а потрібен 6-значний код (від 000000 до 999999).',
    'algo-modulo-def': '<strong>Модуло</strong> — це залишок від ділення. Він завжди менший за дільник.',
    'algo-padding-title': 'Доповнення нулями',
    'algo-padding-desc': 'Якщо результат менший за 100000, додаємо нулі зліва:',
    'algo-server-verify-title': 'Як сервер перевіряє пароль?',
    'algo-server-same-math': 'Так, сервер виконує ту саму математику!',
    'algo-server-desc': 'Сервер має копію секретного ключа і свій лічильник. При перевірці він:',
    'algo-test-vectors': 'Справжні тестові вектори з RFC 4226',
    'algo-test-vectors-desc': 'Для ключа "12345678901234567890":',
    'algo-window-title': 'Вікно допуску (Look-ahead Window)',
    'algo-window-desc': 'Клієнт може "випередити" сервер (наприклад, натиснув кнопку генерації кілька разів, але не використав паролі). Тому сервер перевіряє не тільки поточний лічильник, а й кілька наступних.',
    'algo-summary-title': 'Підсумок',
    'algo-key-takeaways': 'Ключові моменти',

    // Data Structure section
    'data-title': 'Структура даних HOTP системи',
    'data-overview-title': 'Огляд архітектури',
    'data-client-title': 'Дані на клієнті (токен)',
    'data-server-title': 'Дані на сервері',
    'data-flow-title': 'Потік даних при аутентифікації',
    'data-sync-title': 'Проблема десинхронізації',

    // About section
    'about-title': 'Про HOTP — RFC 4226',
    'about-history-title': 'Історія та розробка',
    'about-vs-totp-title': 'HOTP vs TOTP',
    'about-usage-title': 'Використання в реальному світі',
    'about-security-title': 'Аналіз безпеки',
    'about-links-title': 'Посилання',
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
    'sync-problem-title': 'Desynchronization Problem',
    'sync-problem-desc': 'The client can get "ahead" of the server if the user generated passwords but didn\'t use them. The server solves this with a <strong>look-ahead window</strong> — it checks not only the current counter but also several subsequent ones.',
    'sync-scenarios-title': 'Try the Scenarios',
    'sync-within-window': 'Within Window',
    'sync-within-desc': 'Client ahead by 3, window = 5. Password will be accepted.',
    'sync-outside-window': 'Outside Window',
    'sync-outside-desc': 'Client too far ahead. Password rejected!',
    'sync-custom-value': 'Custom Value',
    'btn-desync-ok': '+3 (within)',
    'btn-desync-fail': '+window+3',
    'sync-visualization': 'Visualization',
    'sync-server-label': '🖥️ Server',
    'sync-client-label': '📱 Client',
    'sync-diff-label': 'Difference',
    'legend-server': 'Server',
    'legend-window': 'Window',
    'legend-client': 'Client',
    'legend-outside': 'Outside',
    'btn-test-verify': 'Try Verification',
    'btn-resync': 'Reset Counters',
    // Resync section
    'resync-title': 'How to Restore Synchronization?',
    'resync-intro': 'If the client got ahead of the server beyond the window, there are several recovery methods:',
    'resync-method1-title': '1. Resynchronization Protocol (RFC 4226 §7.4)',
    'resync-method1-desc': 'User enters <strong>2-3 consecutive OTPs</strong>. Server searches for this sequence in a large window (100-1000). If found — synchronization is restored.',
    'resync-method2-title': '2. Administrative Reset',
    'resync-method2-desc': 'Administrator manually resets the server counter to the client value. Requires additional authentication (password, email, phone).',
    'resync-method3-title': '3. Token Re-registration',
    'resync-method3-desc': 'Deleting the old secret and creating a new one. The safest but least convenient method.',
    'resync-note-title': 'Why not just increase the window?',
    'resync-note-desc': 'A large window (e.g., 1000) reduces security. An attacker who intercepted an OTP has more time for brute-force attacks. RFC recommends a window of 3-10 for normal operation.',

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

    // Algorithm section
    'algo-title': 'HOTP Algorithm — Step by Step Guide',
    'algo-intro': '<strong>HOTP</strong> (HMAC-based One-Time Password) — one-time password generation algorithm from RFC 4226 (December 2005).',
    'algo-important-note': 'Important: Dynamic Truncation is an invention of HOTP! TOTP (RFC 6238, 2011) simply uses HOTP inside, replacing the counter with <code>floor(unix_time / 30)</code>.',
    'algo-formula-title': 'General Formula',
    'algo-formula-k': '<strong>K</strong> — secret key (20 bytes)',
    'algo-formula-c': '<strong>C</strong> — counter (8 bytes)',
    'algo-formula-truncate': '<strong>Truncate</strong> — dynamic truncation',
    'algo-step0-title': 'Step 0: What We Have Initially',
    'algo-secret-title': 'Secret Key (K)',
    'algo-secret-desc': 'The secret key is a sequence of random bytes stored on both client and server. It\'s the only secret they share.',
    'algo-secret-example': 'Example: text "12345678901234567890" (20 ASCII characters)',
    'algo-secret-note': 'This is the test key from RFC 4226. In reality, the key should be random bytes!',
    'algo-counter-title': 'Counter (C)',
    'algo-counter-desc': 'The counter is simply a number that increments by 1 after each password generation. Starts from 0.',
    'algo-counter-label': 'Counter =',
    'algo-counter-note': '(regular integer)',
    'algo-step1-title': 'Step 1: Converting Counter to Bytes',
    'algo-why-convert': 'Why convert?',
    'algo-why-convert-desc': 'HMAC-SHA1 works with <em>bytes</em>, not numbers. So we must convert the number (e.g., 5) to a sequence of bytes.',
    'algo-why-8bytes': 'Why exactly 8 bytes?',
    'algo-why-8bytes-desc': 'RFC 4226 requires a 64-bit (8-byte) counter. This allows up to 2<sup>64</sup> = 18,446,744,073,709,551,616 possible values — enough for billions of years!',
    'algo-endian-title': 'Big-Endian vs Little-Endian — What\'s This?',
    'algo-endian-intro': 'When we write a number as a sequence of bytes, the question arises: <strong>from which end to start?</strong>',
    'algo-big-endian': 'Big-Endian (most significant byte first)',
    'algo-big-endian-desc': 'How we read numbers: left to right, most significant digits first.',
    'algo-little-endian': 'Little-Endian (least significant byte first)',
    'algo-little-endian-desc': 'How most processors (Intel, AMD) store data.',
    'algo-endian-key': '<strong>RFC 4226 requires Big-Endian!</strong> This is important for compatibility between different systems.',
    'algo-practical-example': 'Practical Example',
    'algo-more-examples': 'More examples:',
    'algo-table-counter': 'Counter',
    'algo-table-bytes': '8 bytes (Big-Endian)',
    'algo-step2-title': 'Step 2: Computing HMAC-SHA1',
    'algo-what-hmac': 'What is HMAC?',
    'algo-what-hmac-desc': '<strong>HMAC</strong> (Hash-based Message Authentication Code) — a way to create a "signature" for a message using a secret key.',
    'algo-why-sha1': 'Why SHA-1?',
    'algo-why-sha1-desc': 'RFC 4226 was written in 2005 when SHA-1 was the standard. Although SHA-1 has theoretical collision vulnerabilities, for HMAC this is not critical — HMAC is protected from such attacks.',
    'algo-sha1-note': 'Modern TOTP often uses SHA-256 or SHA-512, but SHA-1 remains compatible.',
    'algo-hmac-result': 'HMAC-SHA1 Result',
    'algo-hmac-result-desc': 'HMAC-SHA1 <strong>always</strong> returns exactly 20 bytes (160 bits), regardless of input data size.',
    'algo-hmac-example': 'For key "12345678901234567890" and counter 5:',
    'algo-hmac-note': 'Indices from 0 to 19. The last byte (index 19) is highlighted — it will be important!',
    'algo-step3-title': 'Step 3: Dynamic Truncation',
    'algo-truncation-origin': 'Where did dynamic truncation come from?',
    'algo-truncation-origin-desc': 'This is an <strong>invention of RFC 4226 (HOTP)</strong>! TOTP simply uses it unchanged.',
    'algo-truncation-problem': 'Problem: We have 20 bytes (160 bits), but need a 6-digit code. How to choose which bytes to use?',
    'algo-step31': 'Step 3.1: Determining the Offset',
    'algo-step31-desc': 'Take the <strong>last byte</strong> of the HMAC result (index 19) and apply mask <code>0x0F</code>:',
    'algo-offset-result': '<strong>offset = 10</strong> — this is the position from which we\'ll start extracting bytes.',
    'algo-why-mask': 'Why mask 0x0F?',
    'algo-why-mask-desc': 'Mask <code>0x0F = 00001111</code> keeps only the lower 4 bits. This gives numbers from 0 to 15.',
    'algo-why-last-byte': 'Why the last byte?',
    'algo-why-last-byte-desc': 'This adds <strong>unpredictability</strong>. An attacker cannot know in advance which bytes will be used.',
    'algo-step32': 'Step 3.2: Extracting 4 Bytes',
    'algo-step32-desc': 'Starting from position <code>offset = 10</code>, extract 4 consecutive bytes:',
    'algo-step33': 'Step 3.3: Clearing the High Bit — Why 31 Bits, Not 32?',
    'algo-step33-intro': 'This is a <strong>key point</strong> that often causes confusion!',
    'algo-signed-problem': 'Signed Numbers Problem',
    'algo-signed-desc': 'In many programming languages (Java, old JavaScript, C with signed int) 32-bit numbers are <strong>signed</strong>.',
    'algo-solution-title': 'Solution: Clear the High Bit',
    'algo-solution-desc': 'Apply mask <code>0x7F</code> to the first byte:',
    'algo-31bit-result': '<strong>Now we have a guaranteed 31-bit positive number!</strong>',
    'algo-step34': 'Step 3.4: Assembling the 32-bit Number',
    'algo-step34-desc': 'Now assemble 4 bytes into one number (Big-Endian):',
    'algo-step4-title': 'Step 4: Modulo Operation',
    'algo-why-modulo': 'Why modulo?',
    'algo-why-modulo-desc': 'We have a large number (up to 2 billion), but need a 6-digit code (from 000000 to 999999).',
    'algo-modulo-def': '<strong>Modulo</strong> is the remainder after division. It\'s always less than the divisor.',
    'algo-padding-title': 'Zero Padding',
    'algo-padding-desc': 'If the result is less than 100000, add zeros on the left:',
    'algo-server-verify-title': 'How Does the Server Verify the Password?',
    'algo-server-same-math': 'Yes, the server performs the same math!',
    'algo-server-desc': 'The server has a copy of the secret key and its own counter. During verification it:',
    'algo-test-vectors': 'Actual Test Vectors from RFC 4226',
    'algo-test-vectors-desc': 'For key "12345678901234567890":',
    'algo-window-title': 'Look-ahead Window',
    'algo-window-desc': 'The client can get "ahead" of the server (e.g., pressed the generate button several times but didn\'t use the passwords). So the server checks not only the current counter but also several subsequent ones.',
    'algo-summary-title': 'Summary',
    'algo-key-takeaways': 'Key Takeaways',

    // Data Structure section
    'data-title': 'HOTP System Data Structure',
    'data-overview-title': 'Architecture Overview',
    'data-client-title': 'Client Data (Token)',
    'data-server-title': 'Server Data',
    'data-flow-title': 'Authentication Data Flow',
    'data-sync-title': 'Desynchronization Problem',

    // About section
    'about-title': 'About HOTP — RFC 4226',
    'about-history-title': 'History and Development',
    'about-vs-totp-title': 'HOTP vs TOTP',
    'about-usage-title': 'Real-World Usage',
    'about-security-title': 'Security Analysis',
    'about-links-title': 'References',
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
    'sync-problem-title': 'Проблема десинхронизации',
    'sync-problem-desc': 'Клиент может "опередить" сервер, если пользователь сгенерировал пароли, но не использовал их. Сервер решает это через <strong>окно допуска</strong> — проверяет не только текущий счётчик, но и несколько следующих.',
    'sync-scenarios-title': 'Попробуйте сценарии',
    'sync-within-window': 'В пределах окна',
    'sync-within-desc': 'Клиент опередил на 3, окно = 5. Пароль будет принят.',
    'sync-outside-window': 'За пределами окна',
    'sync-outside-desc': 'Клиент опередил слишком сильно. Пароль отклонён!',
    'sync-custom-value': 'Своё значение',
    'btn-desync-ok': '+3 (в пределах)',
    'btn-desync-fail': '+окно+3',
    'sync-visualization': 'Визуализация',
    'sync-server-label': '🖥️ Сервер',
    'sync-client-label': '📱 Клиент',
    'sync-diff-label': 'Разница',
    'legend-server': 'Сервер',
    'legend-window': 'Окно',
    'legend-client': 'Клиент',
    'legend-outside': 'Вне окна',
    'btn-test-verify': 'Попробовать верификацию',
    'btn-resync': 'Сбросить счётчики',
    // Resync section
    'resync-title': 'Как восстановить синхронизацию?',
    'resync-intro': 'Если клиент опередил сервер за пределы окна, есть несколько способов восстановления:',
    'resync-method1-title': '1. Протокол ресинхронизации (RFC 4226 §7.4)',
    'resync-method1-desc': 'Пользователь вводит <strong>2-3 последовательных OTP</strong>. Сервер ищет эту последовательность в большом окне (100-1000). Если найдено — синхронизация восстановлена.',
    'resync-method2-title': '2. Административный сброс',
    'resync-method2-desc': 'Администратор вручную сбрасывает счётчик сервера до значения клиента. Требует дополнительной аутентификации (пароль, email, телефон).',
    'resync-method3-title': '3. Перерегистрация токена',
    'resync-method3-desc': 'Удаление старого секрета и создание нового. Самый безопасный, но наименее удобный способ.',
    'resync-note-title': 'Почему не просто увеличить окно?',
    'resync-note-desc': 'Большое окно (например, 1000) снижает безопасность. Злоумышленник, перехвативший OTP, имеет больше времени на brute-force атаку. RFC рекомендует окно 3-10 для обычной работы.',

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

    // Algorithm section
    'algo-title': 'Алгоритм HOTP — Пошаговая инструкция',
    'algo-intro': '<strong>HOTP</strong> (HMAC-based One-Time Password) — алгоритм генерации одноразовых паролей из RFC 4226 (декабрь 2005).',
    'algo-important-note': 'Важно: Динамическое усечение (Dynamic Truncation) — это изобретение именно HOTP! TOTP (RFC 6238, 2011) просто использует HOTP внутри, заменяя счётчик на <code>floor(unix_time / 30)</code>.',
    'algo-formula-title': 'Общая формула',
    'algo-formula-k': '<strong>K</strong> — секретный ключ (20 байт)',
    'algo-formula-c': '<strong>C</strong> — счётчик (8 байт)',
    'algo-formula-truncate': '<strong>Truncate</strong> — динамическое усечение',
    'algo-step0-title': 'Шаг 0: Что мы имеем в начале',
    'algo-secret-title': 'Секретный ключ (K)',
    'algo-secret-desc': 'Секретный ключ — это последовательность случайных байтов, которая хранится и на клиенте, и на сервере. Это единственный секрет, который они разделяют между собой.',
    'algo-secret-example': 'Пример: текст "12345678901234567890" (20 символов ASCII)',
    'algo-secret-note': 'Это тестовый ключ из RFC 4226. В реальности ключ — случайные байты!',
    'algo-counter-title': 'Счётчик (C)',
    'algo-counter-desc': 'Счётчик — это просто число, которое увеличивается на 1 после каждой генерации пароля. Начинается с 0.',
    'algo-counter-label': 'Счётчик =',
    'algo-counter-note': '(обычное целое число)',
    'algo-step1-title': 'Шаг 1: Преобразование счётчика в байты',
    'algo-why-convert': 'Зачем преобразовывать?',
    'algo-why-convert-desc': 'HMAC-SHA1 работает с <em>байтами</em>, а не с числами. Поэтому мы должны преобразовать число (например, 5) в последовательность байтов.',
    'algo-why-8bytes': 'Почему именно 8 байт?',
    'algo-why-8bytes-desc': 'RFC 4226 требует использовать 64-битный (8-байтный) счётчик. Это позволяет иметь до 2<sup>64</sup> = 18,446,744,073,709,551,616 возможных значений — достаточно на миллиарды лет!',
    'algo-endian-title': 'Big-Endian vs Little-Endian — что это?',
    'algo-endian-intro': 'Когда мы записываем число как последовательность байтов, возникает вопрос: <strong>с какого конца начинать?</strong>',
    'algo-big-endian': 'Big-Endian (старший байт первым)',
    'algo-big-endian-desc': 'Как мы читаем числа: слева направо, старшие разряды сначала.',
    'algo-little-endian': 'Little-Endian (младший байт первым)',
    'algo-little-endian-desc': 'Как хранят данные большинство процессоров (Intel, AMD).',
    'algo-endian-key': '<strong>RFC 4226 требует Big-Endian!</strong> Это важно для совместимости между разными системами.',
    'algo-practical-example': 'Практический пример',
    'algo-more-examples': 'Ещё примеры:',
    'algo-table-counter': 'Счётчик',
    'algo-table-bytes': '8 байт (Big-Endian)',
    'algo-step2-title': 'Шаг 2: Вычисление HMAC-SHA1',
    'algo-what-hmac': 'Что такое HMAC?',
    'algo-what-hmac-desc': '<strong>HMAC</strong> (Hash-based Message Authentication Code) — это способ создать "подпись" для сообщения, используя секретный ключ.',
    'algo-why-sha1': 'Почему SHA-1?',
    'algo-why-sha1-desc': 'RFC 4226 был написан в 2005 году, когда SHA-1 был стандартом. Хотя SHA-1 имеет теоретические уязвимости для коллизий, для HMAC это не критично — HMAC защищён от таких атак.',
    'algo-sha1-note': 'Современный TOTP часто использует SHA-256 или SHA-512, но SHA-1 остаётся совместимым.',
    'algo-hmac-result': 'Результат HMAC-SHA1',
    'algo-hmac-result-desc': 'HMAC-SHA1 <strong>всегда</strong> возвращает ровно 20 байт (160 бит), независимо от размера входных данных.',
    'algo-hmac-example': 'Для ключа "12345678901234567890" и счётчика 5:',
    'algo-hmac-note': 'Индексы от 0 до 19. Последний байт (индекс 19) выделен — он будет важен!',
    'algo-step3-title': 'Шаг 3: Динамическое усечение (Dynamic Truncation)',
    'algo-truncation-origin': 'Откуда взялось динамическое усечение?',
    'algo-truncation-origin-desc': 'Это <strong>изобретение RFC 4226 (HOTP)</strong>! TOTP просто использует его без изменений.',
    'algo-truncation-problem': 'Проблема: У нас есть 20 байт (160 бит), а нужен 6-значный код. Как выбрать, какие байты использовать?',
    'algo-step31': 'Шаг 3.1: Определение смещения (offset)',
    'algo-step31-desc': 'Берём <strong>последний байт</strong> HMAC результата (индекс 19) и применяем маску <code>0x0F</code>:',
    'algo-offset-result': '<strong>offset = 10</strong> — это позиция, с которой мы начнём извлекать байты.',
    'algo-why-mask': 'Почему маска 0x0F?',
    'algo-why-mask-desc': 'Маска <code>0x0F = 00001111</code> оставляет только младшие 4 бита. Это даёт числа от 0 до 15.',
    'algo-why-last-byte': 'Почему именно последний байт?',
    'algo-why-last-byte-desc': 'Это добавляет <strong>непредсказуемости</strong>. Злоумышленник не может знать заранее, какие байты будут использованы.',
    'algo-step32': 'Шаг 3.2: Извлечение 4 байтов',
    'algo-step32-desc': 'Начиная с позиции <code>offset = 10</code>, извлекаем 4 последовательных байта:',
    'algo-step33': 'Шаг 3.3: Обнуление старшего бита — почему 31 бит, а не 32?',
    'algo-step33-intro': 'Это <strong>ключевой момент</strong>, который часто вызывает путаницу!',
    'algo-signed-problem': 'Проблема знаковых чисел',
    'algo-signed-desc': 'Во многих языках программирования (Java, старый JavaScript, C с signed int) 32-битные числа являются <strong>знаковыми</strong>.',
    'algo-solution-title': 'Решение: обнулить старший бит',
    'algo-solution-desc': 'Применяем маску <code>0x7F</code> к первому байту:',
    'algo-31bit-result': '<strong>Теперь у нас гарантированно 31-битное положительное число!</strong>',
    'algo-step34': 'Шаг 3.4: Сборка 32-битного числа',
    'algo-step34-desc': 'Теперь собираем 4 байта в одно число (Big-Endian):',
    'algo-step4-title': 'Шаг 4: Операция модуло',
    'algo-why-modulo': 'Зачем модуло?',
    'algo-why-modulo-desc': 'У нас есть большое число (до 2 миллиардов), а нужен 6-значный код (от 000000 до 999999).',
    'algo-modulo-def': '<strong>Модуло</strong> — это остаток от деления. Он всегда меньше делителя.',
    'algo-padding-title': 'Дополнение нулями',
    'algo-padding-desc': 'Если результат меньше 100000, добавляем нули слева:',
    'algo-server-verify-title': 'Как сервер проверяет пароль?',
    'algo-server-same-math': 'Да, сервер выполняет ту же математику!',
    'algo-server-desc': 'Сервер имеет копию секретного ключа и свой счётчик. При проверке он:',
    'algo-test-vectors': 'Настоящие тестовые векторы из RFC 4226',
    'algo-test-vectors-desc': 'Для ключа "12345678901234567890":',
    'algo-window-title': 'Окно допуска (Look-ahead Window)',
    'algo-window-desc': 'Клиент может "опередить" сервер (например, нажал кнопку генерации несколько раз, но не использовал пароли). Поэтому сервер проверяет не только текущий счётчик, но и несколько следующих.',
    'algo-summary-title': 'Итоги',
    'algo-key-takeaways': 'Ключевые моменты',

    // Data Structure section
    'data-title': 'Структура данных HOTP системы',
    'data-overview-title': 'Обзор архитектуры',
    'data-client-title': 'Данные на клиенте (токен)',
    'data-server-title': 'Данные на сервере',
    'data-flow-title': 'Поток данных при аутентификации',
    'data-sync-title': 'Проблема десинхронизации',

    // About section
    'about-title': 'О HOTP — RFC 4226',
    'about-history-title': 'История и разработка',
    'about-vs-totp-title': 'HOTP vs TOTP',
    'about-usage-title': 'Использование в реальном мире',
    'about-security-title': 'Анализ безопасности',
    'about-links-title': 'Ссылки',
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
      const text = t(key);
      // Use innerHTML if translation contains HTML tags
      if (text.includes('<') && text.includes('>')) {
        el.innerHTML = text;
      } else {
        el.textContent = text;
      }
    }
  }

  // Update elements with data-i18n attribute
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const text = t(key);
    // Use innerHTML if translation contains HTML tags
    if (text.includes('<') && text.includes('>')) {
      el.innerHTML = text;
    } else {
      el.textContent = text;
    }
  });

  // Update placeholders
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    el.placeholder = t(key);
  });
}
