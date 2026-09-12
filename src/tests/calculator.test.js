/**
 * calculator.test.js
 *
 * 針對 `src/calculator.js` 四則運算功能的單元測試。
 * 使用 Node.js 內建的測試框架（node:test）與斷言模組（node:assert）。
 *
 * 執行方式：
 *   node --test src/tests/calculator.test.js
 */

const test = require('node:test');
const assert = require('node:assert/strict');
const { add, subtract, multiply, divide } = require('../calculator');

test('加法（addition）', async (t) => {
  await t.test('2 + 3 應等於 5（範例來自 calc-basic-operations.png）', () => {
    assert.equal(add(2, 3), 5);
  });

  await t.test('正數相加', () => {
    assert.equal(add(1, 2), 3);
  });

  await t.test('負數相加', () => {
    assert.equal(add(-4, -6), -10);
  });

  await t.test('正負數相加', () => {
    assert.equal(add(-5, 5), 0);
  });

  await t.test('與 0 相加應維持原值', () => {
    assert.equal(add(7, 0), 7);
  });

  await t.test('小數相加', () => {
    assert.equal(add(1.5, 2.25), 3.75);
  });
});

test('減法（subtraction）', async (t) => {
  await t.test('10 - 4 應等於 6（範例來自 calc-basic-operations.png）', () => {
    assert.equal(subtract(10, 4), 6);
  });

  await t.test('結果為負數', () => {
    assert.equal(subtract(4, 10), -6);
  });

  await t.test('相同數字相減應為 0', () => {
    assert.equal(subtract(8, 8), 0);
  });

  await t.test('減去負數等同於加法', () => {
    assert.equal(subtract(5, -3), 8);
  });

  await t.test('小數相減', () => {
    assert.equal(subtract(5.5, 2.2), 3.3);
  });
});

test('乘法（multiplication）', async (t) => {
  await t.test('45 * 2 應等於 90（範例來自 calc-basic-operations.png）', () => {
    assert.equal(multiply(45, 2), 90);
  });

  await t.test('正數相乘', () => {
    assert.equal(multiply(6, 7), 42);
  });

  await t.test('與 0 相乘應為 0', () => {
    assert.equal(multiply(9, 0), 0);
  });

  await t.test('負數與正數相乘應為負數', () => {
    assert.equal(multiply(-3, 4), -12);
  });

  await t.test('兩個負數相乘應為正數', () => {
    assert.equal(multiply(-3, -4), 12);
  });

  await t.test('小數相乘', () => {
    assert.equal(multiply(1.5, 2), 3);
  });
});

test('除法（division）', async (t) => {
  await t.test('20 / 5 應等於 4（範例來自 calc-basic-operations.png）', () => {
    assert.equal(divide(20, 5), 4);
  });

  await t.test('整除的除法', () => {
    assert.equal(divide(20, 4), 5);
  });

  await t.test('不整除時應回傳正確的小數結果', () => {
    assert.equal(divide(7, 2), 3.5);
  });

  await t.test('0 除以任意非零數應為 0', () => {
    assert.equal(divide(0, 5), 0);
  });

  await t.test('負數相除', () => {
    assert.equal(divide(-10, 2), -5);
  });

  // 邊界情況：除以零應拋出錯誤，而不是回傳 Infinity 或 NaN
  await t.test('除以零應拋出錯誤（division by zero）', () => {
    assert.throws(() => divide(5, 0), /除數不可為 0/);
  });

  await t.test('0 除以 0 也應拋出錯誤', () => {
    assert.throws(() => divide(0, 0), /除數不可為 0/);
  });
});
