const { Literal, Concatenate, Choose, Repeat, Empty } = require("./token");



test('pattern字符串', () => {
  const pattern = new Repeat(
    new Choose(
      new Concatenate(new Literal("a"), new Literal("b")),
      new Literal("a")
    )
  );
  expect(pattern.toString()).toBe('(ab|a)*')
})

test('Empty——匹配空字符串', () => {
  const result = new Empty().matches('');
  expect(result).toBe(true);
})
test('Empty——不匹配非空', () => {
  const result = new Empty().matches('a');
  expect(result).toBe(false);
})
test('Literal——不匹配空', () => {
  const result = new Literal('a').matches('');
  expect(result).toBe(false);
})
test('Literal——不匹配空', () => {
  const result = new Literal('a').matches('');
  expect(result).toBe(false);
})
test('Literal——匹配字符', () => {
  const result = new Literal('a').matches('a');
  expect(result).toBe(true);
})
test('Literal——不匹配其他字符', () => {
  const result = new Literal('a').matches('b');
  expect(result).toBe(false);
})
test('Concatenate——匹配字符连接', () => {
  const result = new Concatenate(new Literal("b"), new Literal('c')).matches('bc');
  expect(result).toBe(true);
})
test('Concatenate——不匹配错误字符连接', () => {
  const result = new Concatenate(new Literal("b"), new Literal('c')).matches('ac');
  expect(result).toBe(false);
})
test('Concatenate——不匹配空', () => {
  const result = new Concatenate(new Literal("b"), new Literal('c')).matches('');
  expect(result).toBe(false);
})
test('Concatenate——不匹配多余字符串连接', () => {
  const result = new Concatenate(new Literal("b"), new Literal('c')).matches('bca');
  expect(result).toBe(false);
})
test('Concatenate——多个连接组合', () => {
  const result = new Concatenate(new Literal("a"), new Concatenate(new Literal("b"), new Literal('c'))).matches("abc");
  expect(result).toBe(true);
})
test('Repeat——匹配空', () => {
  const result = new Repeat(new Literal("a")).matches("");
  expect(result).toBe(true);
})
test('Repeat——匹配单个字符', () => {
  const result = new Repeat(new Literal("a")).matches("a");
  expect(result).toBe(true);
})
test('Repeat——匹配多个字符', () => {
  const result = new Repeat(new Literal("a")).matches("aaaaaa");
  expect(result).toBe(true);
})
test('Repeat——嵌套Repeat', () => {
  const result = new Repeat(
		new Concatenate(
			new Repeat(new Literal('a')),
			new Literal('b')
		)
	).matches("abbb");
  expect(result).toBe(true);
});
test('Concatenate、Choose嵌套', () => {
  const regular = new Repeat(
		new Concatenate(
			new Literal('a'),
			new Choose(new Empty(), new Literal('b'))
		)
	);
  expect(regular.matches('')).toBe(true);
  expect(regular.matches('a')).toBe(true);
  expect(regular.matches('ab')).toBe(true);
  expect(regular.matches('aba')).toBe(true);
  expect(regular.matches('abab')).toBe(true);
  expect(regular.matches('abaab')).toBe(true);
  expect(regular.matches('abba')).toBe(false);
});