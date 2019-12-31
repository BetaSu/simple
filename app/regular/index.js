/**
 * @description 正则表达式，实现如下语法：
 * 连接2个模式 ab
 * 在2个模式间选择 a|b
 * 重复一个模式零到多次 a*
 */

const { Literal, Concatenate, Choose, Repeat, Empty } = require("./token");

const pattern = new Repeat(
  new Choose(
    new Concatenate(new Literal("a"), new Literal("b")),
    new Literal("a")
  )
);

// console.log('pattern: ' +  pattern)

// console.log(new Empty().toNFADesign().accepts(''));
// console.log(new Empty().toNFADesign().accepts('a'));
// console.log(new Literal('a').toNFADesign().accepts(''));
// console.log(new Concatenate(new Literal("a"), new Concatenate(new Literal("b"), new Literal('c'))).matches("abc"));
console.log(new Choose(new Literal("a"), new Concatenate(new Literal("b"), new Literal('c'))).matches("a"));
