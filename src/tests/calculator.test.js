/**
 * calculator.test.js
 *
 * 針對 `src/calculator.js` 各項運算功能的單元測試。
 * 使用 Node.js 內建的測試框架（node:test）與斷言模組（node:assert）。
 *
 * 執行方式：
 *   node --test src/tests/calculator.test.js
 */

const test = require('node:test');
const assert = require('node:assert/strict');
const { add, subtract, multiply, divide, modulo, power, squareRoot } = require('../calculator');

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

test('取餘數（modulo）', async (t) => {
  await t.test('10 % 3 應等於 1', () => {
    assert.equal(modulo(10, 3), 1);
  });

  await t.test('整除時餘數應為 0', () => {
    assert.equal(modulo(20, 4), 0);
  });

  await t.test('負數取餘數', () => {
    assert.equal(modulo(-10, 3), -1);
  });

  await t.test('小數取餘數', () => {
    assert.equal(modulo(5.5, 2), 1.5);
  });

  // 邊界情況：除數為 0 應拋出錯誤，而不是回傳 NaN
  await t.test('除數為 0 應拋出錯誤（modulo by zero）', () => {
    assert.throws(() => modulo(5, 0), /除數不可為 0/);
  });
});

test('次方運算（power）', async (t) => {
  await t.test('2 的 8 次方應等於 256', () => {
    assert.equal(power(2, 8), 256);
  });

  await t.test('任意數的 0 次方應為 1', () => {
    assert.equal(power(5, 0), 1);
  });

  await t.test('負指數應回傳正確的小數結果', () => {
    assert.equal(power(2, -1), 0.5);
  });

  await t.test('底數為負數，指數為偶數時應為正數', () => {
    assert.equal(power(-2, 2), 4);
  });

  await t.test('底數為負數，指數為奇數時應為負數', () => {
    assert.equal(power(-2, 3), -8);
  });

  await t.test('小數次方', () => {
    assert.equal(power(9, 0.5), 3);
  });
});

test('平方根（square root）', async (t) => {
  await t.test('16 的平方根應等於 4', () => {
    assert.equal(squareRoot(16), 4);
  });

  await t.test('0 的平方根應為 0', () => {
    assert.equal(squareRoot(0), 0);
  });

  await t.test('非完全平方數應回傳正確的小數結果', () => {
    assert.equal(squareRoot(2), Math.SQRT2);
  });

  // 邊界情況：負數沒有實數平方根，應拋出錯誤
  await t.test('負數應拋出錯誤（cannot compute square root of a negative number）', () => {
    assert.throws(() => squareRoot(-4), /無法計算負數的平方根/);
  });
});
