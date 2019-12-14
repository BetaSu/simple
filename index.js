const {
  Machine,
  dataStructure: {
    Num, Bool, DoNothing
  },
  statement: {
    If
  },
  expression: {
    Add, Multiply, LessThan, Assign
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
    new LessThan(new Num(32), new Num(7)),
    new Assign(
      'whentrueVar',
      new Add(
        new Num(4), 
        new Multiply(new Num(3), new Num(8))
      )
    ),
    new Assign(
      'whenFalseVar',
      new Multiply(
        new Num(4), 
        new Multiply(new Num(3), new Num(8))
      )
    )
  )
)

