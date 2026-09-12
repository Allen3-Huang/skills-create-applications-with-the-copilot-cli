#!/usr/bin/env node

/**
 * calculator.js
 *
 * 一個簡單的 Node.js CLI 計算機應用程式。
 * 支援以下四種基本數學運算：
 *   - 加法（addition）
 *   - 減法（subtraction）
 *   - 乘法（multiplication）
 *   - 除法（division）
 *
 * 使用方式：
 *   node calculator.js <operation> <num1> <num2>
 *
 * 範例：
 *   node calculator.js add 3 5
 *   node calculator.js subtract 10 4
 *   node calculator.js multiply 6 7
 *   node calculator.js divide 20 4
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

// 支援的運算對應表，將 CLI 指令名稱與運算函式對應起來
const operations = {
  add,
  subtract,
  multiply,
  divide,
};

/**
 * 解析並執行 CLI 指令。
 * 預期輸入格式：node calculator.js <operation> <num1> <num2>
 */
function main() {
  const [, , operation, num1Str, num2Str] = process.argv;

  if (!operation || num1Str === undefined || num2Str === undefined) {
    console.error('使用方式: node calculator.js <add|subtract|multiply|divide> <num1> <num2>');
    process.exit(1);
  }

  if (!Object.prototype.hasOwnProperty.call(operations, operation)) {
    console.error(`不支援的運算: "${operation}"。請使用 add、subtract、multiply 或 divide。`);
    process.exit(1);
  }

  const num1 = Number(num1Str);
  const num2 = Number(num2Str);

  if (Number.isNaN(num1) || Number.isNaN(num2)) {
    console.error('請輸入有效的數字作為運算元。');
    process.exit(1);
  }

  try {
    const result = operations[operation](num1, num2);
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

module.exports = { add, subtract, multiply, divide };
