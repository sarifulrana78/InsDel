/**
 * Ushol Mama - Authentication & Validation Utility Test Suite
 * Validates email-only signup mechanics, display name derivation, and security sanitization.
 */

import {
  isValidEmail,
  isValidBangladeshiPhone,
  checkPasswordStrength,
  formatBDPhoneDisplay,
  deriveDisplayNameFromEmail,
  sanitizeEmail
} from './authUtils';

function runAuthUtilsTests(): boolean {
  let passed = 0;
  let failed = 0;

  function assert(condition: boolean, testName: string) {
    if (condition) {
      passed++;
      console.log(`  ✓ PASS: ${testName}`);
    } else {
      failed++;
      console.error(`  ✗ FAIL: ${testName}`);
    }
  }

  console.log('--- Running Ushol Mama Auth Utils Test Suite ---');

  // 1. Email validation tests
  assert(isValidEmail('user@domain.com') === true, 'Valid simple email');
  assert(isValidEmail('sariful.rana78@gmail.com') === true, 'Valid email with dots and numbers');
  assert(isValidEmail('invalid-email') === false, 'Invalid email without @');
  assert(isValidEmail('user@domain') === false, 'Invalid email without TLD');
  assert(isValidEmail('  user@domain.com  ') === true, 'Email with whitespace is accepted');

  // 2. Display name derivation tests
  assert(deriveDisplayNameFromEmail('john.doe@gmail.com') === 'John Doe', 'Derive name from dot-separated email');
  assert(deriveDisplayNameFromEmail('sariful_rana@yahoo.com') === 'Sariful Rana', 'Derive name from underscore-separated email');
  assert(deriveDisplayNameFromEmail('commuter-rider@metro.bd') === 'Commuter Rider', 'Derive name from hyphen-separated email');
  assert(deriveDisplayNameFromEmail('tanvir@ushol.com') === 'Tanvir', 'Derive name from single word email');
  assert(deriveDisplayNameFromEmail('') === 'User', 'Fallback to User when email is empty');

  // 3. Email sanitization tests
  assert(sanitizeEmail('  USER@Domain.COM  ') === 'user@domain.com', 'Sanitize trims and lowercases email');
  assert(sanitizeEmail('') === '', 'Sanitize handles empty input');

  // 4. BD Phone validation tests
  assert(isValidBangladeshiPhone('01712345678') === true, 'Valid 11-digit BD phone');
  assert(isValidBangladeshiPhone('01712-345678') === true, 'Valid formatted BD phone');
  assert(isValidBangladeshiPhone('+8801812345678') === true, 'Valid international BD phone');
  assert(isValidBangladeshiPhone('01212345678') === false, 'Invalid operator code 012');
  assert(isValidBangladeshiPhone('12345') === false, 'Too short phone number');

  // 5. Password strength tests
  assert(checkPasswordStrength('').score === 0, 'Empty password returns score 0');
  assert(checkPasswordStrength('12345').score === 1, 'Short password returns score 1 Weak');
  assert(checkPasswordStrength('abcdef').score >= 1, '6-char simple password');
  assert(checkPasswordStrength('Pass1234!').score >= 3, 'Complex password returns high score');

  console.log(`\nTest Result: ${passed} passed, ${failed} failed.`);
  return failed === 0;
}

if (typeof require !== 'undefined' && require.main === module) {
  const success = runAuthUtilsTests();
  if (!success) process.exit(1);
}

export { runAuthUtilsTests };
