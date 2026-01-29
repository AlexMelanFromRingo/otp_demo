/**
 * Theme Module
 * Handles light/dark theme switching
 */

const THEME_KEY = 'hotp-theme';
const DARK_CLASS = 'dark-theme';

/**
 * Check if system prefers dark mode.
 *
 * @returns {boolean} True if system prefers dark mode
 */
function systemPrefersDark() {
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches;
}

/**
 * Get the current theme.
 *
 * @returns {'light' | 'dark'} Current theme
 */
export function getTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  if (saved === 'dark' || saved === 'light') {
    return saved;
  }
  return systemPrefersDark() ? 'dark' : 'light';
}

/**
 * Set the theme.
 *
 * @param {'light' | 'dark'} theme - Theme to set
 */
export function setTheme(theme) {
  if (theme === 'dark') {
    document.body.classList.add(DARK_CLASS);
  } else {
    document.body.classList.remove(DARK_CLASS);
  }
  localStorage.setItem(THEME_KEY, theme);
  updateThemeButton(theme);
}

/**
 * Toggle between light and dark themes.
 *
 * @returns {'light' | 'dark'} New theme
 */
export function toggleTheme() {
  const current = getTheme();
  const newTheme = current === 'dark' ? 'light' : 'dark';
  setTheme(newTheme);
  return newTheme;
}

/**
 * Update the theme toggle button icon.
 *
 * @param {'light' | 'dark'} theme - Current theme
 */
function updateThemeButton(theme) {
  const btn = document.getElementById('theme-toggle');
  if (btn) {
    btn.textContent = theme === 'dark' ? '☀️' : '🌙';
    btn.title = theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
  }
}

/**
 * Initialize theme from saved preference or system setting.
 */
export function initTheme() {
  const theme = getTheme();
  setTheme(theme);

  // Listen for system theme changes
  window.matchMedia?.('(prefers-color-scheme: dark)').addEventListener('change', e => {
    // Only auto-switch if user hasn't explicitly set a preference
    if (!localStorage.getItem(THEME_KEY)) {
      setTheme(e.matches ? 'dark' : 'light');
    }
  });
}
