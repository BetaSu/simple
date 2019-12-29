const {
  Machine,
  dataStructure: {
    Num, Bool
  },
  statement: {
    If, DoNothing, Sequence, Assign
  },
  expression: {
    Add, Multiply, LessThan, Variable
  }
} = require('./');;


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

// new Machine(
//   new If(
//     new Variable('x'),
//     new Assign('y', new Num(1)),
//     new Assign('y', new Num(2))
//   ),
//   {x: new Bool(true)}
// )

new Machine(
  new Sequence(
    new Assign('y', new Add(new Num(1), new Variable('x'))),
    new Assign('z', new Multiply(new Variable('y'), new Num(7)))
  ),
  {x: new Num(3)}
)