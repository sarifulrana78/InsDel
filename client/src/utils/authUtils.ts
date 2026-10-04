/**
 * Ushol Mama Authentication & Validation Utilities
 */

/**
 * Validates a Bangladeshi mobile phone number.
 * Accepts formats: 017XXXXXXXX, 01712-345678, +88017XXXXXXXX
 */
export function isValidBangladeshiPhone(phone: string): boolean {
  const cleaned = phone.replace(/[\s\-+]/g, '');
  // Bangladesh numbers have 11 digits starting with 01[3-9] or 13 digits starting with 8801[3-9]
  const bdRegex = /^(?:8801|01)[3-9]\d{8}$/;
  return bdRegex.test(cleaned);
}

/**
 * Validates an email address format.
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim().toLowerCase());
}

/**
 * Evaluates password strength and returns a descriptive score and label.
 */
export function checkPasswordStrength(password: string): {
  score: number; // 0 to 4
  label: 'Weak' | 'Fair' | 'Good' | 'Strong';
  color: string;
} {
  let score = 0;
  if (!password) return { score: 0, label: 'Weak', color: 'text-rose-500' };

  if (password.length >= 6) score++;
  if (password.length >= 8) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[A-Z]/.test(password) || /[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 1) return { score: 1, label: 'Weak', color: 'text-rose-500' };
  if (score === 2) return { score: 2, label: 'Fair', color: 'text-amber-500' };
  if (score === 3) return { score: 3, label: 'Good', color: 'text-teal-500' };
  return { score: 4, label: 'Strong', color: 'text-emerald-600' };
}

/**
 * Formats a raw phone string into standard display format (e.g. 01712-345678).
 */
export function formatBDPhoneDisplay(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 11 && cleaned.startsWith('01')) {
    return `${cleaned.slice(0, 5)}-${cleaned.slice(5)}`;
  }
  return phone;
}

/**
 * Derives a clean, capitalized human-readable display name from an email address.
 * Example: 'sakib.al.hasan@gmail.com' -> 'Sakib Al Hasan'
 */
export function deriveDisplayNameFromEmail(email: string): string {
  if (!email || !email.includes('@')) return 'User';
  const prefix = email.split('@')[0].trim();
  if (!prefix) return 'User';
  return prefix
    .replace(/[._\-+]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, char => char.toUpperCase());
}

/**
 * Sanitizes and normalizes an email address by trimming whitespace and converting to lowercase.
 */
export function sanitizeEmail(email: string): string {
  if (!email) return '';
  return email.trim().toLowerCase();
}

/**
 * Normalizes a Google email or username input.
 * If user inputs a handle without domain (e.g. 'sariful'), auto-appends '@gmail.com'.
 */
export function normalizeGoogleEmail(input: string): string {
  if (!input) return '';
  const trimmed = input.trim().toLowerCase();
  if (!trimmed.includes('@')) {
    return `${trimmed}@gmail.com`;
  }
  return trimmed;
}



