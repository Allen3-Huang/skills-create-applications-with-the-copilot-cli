#!/usr/bin/env node

/**
 * calculator.js
 *
 * 一個簡單的 Node.js CLI 計算機應用程式。
 * 支援以下數學運算：
 *   - 加法（addition）
 *   - 減法（subtraction）
 *   - 乘法（multiplication）
 *   - 除法（division）
 *   - 取餘數（modulo）
 *   - 次方運算（power）
 *   - 平方根（square root）
 *
 * 使用方式：
 *   node calculator.js <operation> <num1> [num2]
 *
 * 範例：
 *   node calculator.js add 3 5
 *   node calculator.js subtract 10 4
 *   node calculator.js multiply 6 7
 *   node calculator.js divide 20 4
 *   node calculator.js modulo 10 3
 *   node calculator.js power 2 8
 *   node calculator.js sqrt 16
 */

/**
 * 加法：回傳兩數之和。
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
function add(a, b) {
  return a + b;
}

/**
 * 減法：回傳兩數之差。
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
function subtract(a, b) {
  return a - b;
}

/**
 * 乘法：回傳兩數之積。
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
function multiply(a, b) {
  return a * b;
}

/**
 * 除法：回傳兩數之商。
 * 若除數為 0，則拋出錯誤，避免產生 Infinity 或 NaN。
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
function divide(a, b) {
  if (b === 0) {
    throw new Error('除數不可為 0（Division by zero is not allowed）');
  }
  return a / b;
}

/**
 * 取餘數：回傳 a 除以 b 的餘數。
 * 若除數為 0，則拋出錯誤，避免產生 NaN。
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
function modulo(a, b) {
  if (b === 0) {
    throw new Error('除數不可為 0（Modulo by zero is not allowed）');
  }
  return a % b;
}

/**
 * 次方運算：回傳 base 的 exponent 次方。
 * @param {number} base
 * @param {number} exponent
 * @returns {number}
 */
function power(base, exponent) {
  return Math.pow(base, exponent);
}

/**
 * 平方根：回傳 n 的平方根。
 * 若 n 為負數，則拋出錯誤，因為負數沒有實數平方根。
 * @param {number} n
 * @returns {number}
 */
function squareRoot(n) {
  if (n < 0) {
    throw new Error('無法計算負數的平方根（Cannot compute square root of a negative number）');
  }
  return Math.sqrt(n);
}

// 支援的運算對應表，將 CLI 指令名稱與運算函式對應起來
// unary: 只需要一個運算元；binary: 需要兩個運算元
const operations = {
  add: { fn: add, arity: 2 },
  subtract: { fn: subtract, arity: 2 },
  multiply: { fn: multiply, arity: 2 },
  divide: { fn: divide, arity: 2 },
  modulo: { fn: modulo, arity: 2 },
  power: { fn: power, arity: 2 },
  sqrt: { fn: squareRoot, arity: 1 },
};

/**
 * 解析並執行 CLI 指令。
 * 二元運算（add、subtract、multiply、divide、modulo、power）：
 *   node calculator.js <operation> <num1> <num2>
 * 一元運算（sqrt）：
 *   node calculator.js sqrt <num>
 */
function main() {
  const [, , operation, num1Str, num2Str] = process.argv;

  if (!operation || !Object.prototype.hasOwnProperty.call(operations, operation)) {
    console.error('使用方式: node calculator.js <add|subtract|multiply|divide|modulo|power|sqrt> <num1> [num2]');
    process.exit(1);
  }

  const { fn, arity } = operations[operation];

  if (num1Str === undefined || (arity === 2 && num2Str === undefined)) {
    console.error(`運算 "${operation}" 需要 ${arity} 個數字參數。`);
    process.exit(1);
  }

  const num1 = Number(num1Str);
  const num2 = arity === 2 ? Number(num2Str) : undefined;

  if (Number.isNaN(num1) || (arity === 2 && Number.isNaN(num2))) {
    console.error('請輸入有效的數字作為運算元。');
    process.exit(1);
  }

  try {
    const result = arity === 2 ? fn(num1, num2) : fn(num1);
    console.log(result);
  } catch (error) {
    console.error(`錯誤: ${error.message}`);
    process.exit(1);
  }
}

// 僅在直接執行此檔案時才啟動 CLI（讓此模組也可被其他程式 require 使用）
if (require.main === module) {
  main();
}

module.exports = { add, subtract, multiply, divide, modulo, power, squareRoot };
