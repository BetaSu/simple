# 介绍
该仓库为《计算的本质》一书的学习笔记，并用JS（书中为Ruby）实现了书中的代码部分。
## 学习笔记
- 小步语义：设计一台抽象机器维护一些执行状态，然后定义一些规约规则，这些规则详细说明了如何才能对每种程序结构循序渐进地求值。特别地、小步语义大部分都带有迭代地味道，他要求抽象机器反复执行规约步骤，这些步骤以及与他们同样类型的信息可以作为自身的输入和输出，这让他们适合这种反复进行的应用程序。
语句：语句会最终规约成do-nothing与一个环境（可能是个新环境）。
表达式：表达式最终会被规约成其他不能再被规约的表达式。
- 大步语义：定义如何从一个表达式或者语句直接得到他的结果。
- DFA(Deterministic Finite Automaton) 确定性有限状态机
- NFA(Non-deterministic Finite Automaton) 确定性有限状态机
### 下推自动机（PushDown Automaton）
自带栈的有限状态机叫下推自动机PDA。如果这台机器的规则是确定性的，就叫确定性下推自动机DPDA（Deterministic PushDown Automaton）。
## PDA规则
组成一个PDA的规则氛围5部分：
- 机器当前状态
- 必须从输入读取的字符（可选）
- 机器的下一个状态
- 必须从栈中弹出的字符
- 栈顶字符弹出后需要推入栈中的字符序列


## 参考资料
计算的本质
