const {
  Machine,
  dataStructure: {
    Num, Bool
  },
  statement: {
    If, DoNothing
  },
  expression: {
    Add, Multiply, LessThan, Assign, Variable
  }
} = require('./src');;


// new Machine(
//   new Add(
//     new Add(new Num(3), new Num(4)),
//     new Add(new Num(2), new Num(6))
//   )
// )
// new Machine(
//   new LessThan(
//     new Multiply(new Num(3), new Num(7)),
//     new Multiply(new Num(2), new Num(6))
//   )
// )
// new Machine(
//   new Assign(
//     'myAge',
//     new Add(
//       new Num(4), 
//       new Multiply(new Num(3), new Num(8))
//     )
//   )
// )

new Machine(
  new If(
    new Variable('x'),
    new Assign('y', new Num(1)),
    new Assign('y', new Num(2))
  ),
  {x: new Bool(true)}
)