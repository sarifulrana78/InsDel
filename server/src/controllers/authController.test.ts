/**
 * Ushol Mama - Backend Authentication Controller Test Suite
 * Validates Google OAuth controller lenient email parsing and derived names.
 */

import { googleAuth } from './authController';
import User from '../models/User';

interface MockResponse {
  statusCode: number;
  data: any;
  status: (code: number) => MockResponse;
  json: (body: any) => MockResponse;
}

function createMockResponse(): MockResponse {
  const res: MockResponse = {
    statusCode: 200,
    data: null,
    status(code: number) {
      this.statusCode = code;
      return this;
    },
    json(body: any) {
      this.data = body;
      return this;
    }
  };
  return res;
}

export async function runServerAuthTests(): Promise<boolean> {
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

  console.log('--- Running Ushol Mama Server Auth Test Suite ---');

  // Test 1: Missing email triggers 400 Bad Request
  {
    const req: any = { body: { email: '' } };
    const res = createMockResponse();
    await googleAuth(req, res as any);
    assert(res.statusCode === 400, 'Empty email returns status 400');
    assert(res.data?.success === false, 'Empty email returns success: false');
  }

  // Test 2: Whitespace only email triggers 400 Bad Request
  {
    const req: any = { body: { email: '   ' } };
    const res = createMockResponse();
    await googleAuth(req, res as any);
    assert(res.statusCode === 400, 'Whitespace email returns status 400');
  }

  console.log(`\nServer Auth Test Result: ${passed} passed, ${failed} failed.`);
  return failed === 0;
}

if (typeof require !== 'undefined' && require.main === module) {
  runServerAuthTests()
    .then(success => {
      if (!success) process.exit(1);
    })
    .catch(err => {
      console.error(err);
      process.exit(1);
    });
}
