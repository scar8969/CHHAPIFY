import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { resolve } from 'node:path';

const CLI_PATH = resolve(import.meta.dirname, '..', 'bin', 'design-extract.js');

describe('CLI', () => {
  it('shows help with --help', () => {
    const output = execFileSync('node', [CLI_PATH, '--help'], { encoding: 'utf-8' });
    assert.ok(output.includes('designlang'));
    assert.ok(output.includes('Extract'));
  });

  it('shows version with --version', () => {
    const output = execFileSync('node', [CLI_PATH, '--version'], { encoding: 'utf-8' });
    assert.ok(output.trim().match(/^\d+\.\d+\.\d+$/));
  });

  it('shows version number 6.0.0', () => {
    const output = execFileSync('node', [CLI_PATH, '--version'], { encoding: 'utf-8' });
    assert.equal(output.trim(), '6.0.0');
  });

  it('exits with error when no arguments provided', () => {
    try {
      execFileSync('node', [CLI_PATH], { encoding: 'utf-8', stdio: 'pipe' });
      assert.fail('Should have thrown');
    } catch (err) {
      // Commander exits with code 1 when required argument is missing
      assert.ok(err.status !== 0);
    }
  });
});
