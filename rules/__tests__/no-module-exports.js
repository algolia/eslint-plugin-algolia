import rule from '../no-module-exports.js';
import {RuleTester} from 'eslint';

RuleTester.setDefaultConfig({
  parser: 'babel-eslint'
});

function testInvalid(code) {
  return {
    code,
    errors: [{message: 'Use export over module.exports'}]
  };
}

// Tests
let ruleTester = new RuleTester();
ruleTester.run('no-module-exports', rule, {
  valid: [
    'const constant = \'CONSTANT\'; export default constant;',
    'export default function () {};',
    'export default function namedFunction () {};',
    'export default () => {};',
    'export default { object: \'value\' };',
    'export default \'CONSTANT\';',
    'export const constant = \'CONSTANT\';',
    'export function namedFunction () {};'
  ],
  invalid: [
    testInvalid('module.exports = \'CONSTANT\';'),
    testInvalid('module.exports = { a: \'CONSTANT\' }'),
    testInvalid('module.exports = { a: () => {} }'),
    testInvalid('module.exports = () => {}'),
    testInvalid('module.exports = function () {}'),
    testInvalid('module.exports = function namedFunction () {}'),
    testInvalid('module.exports.test = function namedFunction () {}')
  ]
});
