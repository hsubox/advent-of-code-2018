/*
--- Day 16: Chronal Classification ---
As you see the Elves defend their hot chocolate successfully, you go back to falling through time. This is going to become a problem.

If you're ever going to return to your own time, you need to understand how this device on your wrist works. You have a little while before you reach your next destination, and with a bit of trial and error, you manage to pull up a programming manual on the device's tiny screen.

According to the manual, the device has four registers (numbered 0 through 3) that can be manipulated by instructions containing one of 16 opcodes. The registers start with the value 0.

Every instruction consists of four values: an opcode, two inputs (named A and B), and an output (named C), in that order. The opcode specifies the behavior of the instruction and how the inputs are interpreted. The output, C, is always treated as a register.

In the opcode descriptions below, if something says "value A", it means to take the number given as A literally. (This is also called an "immediate" value.) If something says "register A", it means to use the number given as A to read from (or write to) the register with that number. So, if the opcode addi adds register A and value B, storing the result in register C, and the instruction addi 0 7 3 is encountered, it would add 7 to the value contained by register 0 and store the sum in register 3, never modifying registers 0, 1, or 2 in the process.

Many opcodes are similar except for how they interpret their arguments. The opcodes fall into seven general categories:

Addition:

addr (add register) stores into register C the result of adding register A and register B.
addi (add immediate) stores into register C the result of adding register A and value B.
Multiplication:

mulr (multiply register) stores into register C the result of multiplying register A and register B.
muli (multiply immediate) stores into register C the result of multiplying register A and value B.
Bitwise AND:

banr (bitwise AND register) stores into register C the result of the bitwise AND of register A and register B.
bani (bitwise AND immediate) stores into register C the result of the bitwise AND of register A and value B.
Bitwise OR:

borr (bitwise OR register) stores into register C the result of the bitwise OR of register A and register B.
bori (bitwise OR immediate) stores into register C the result of the bitwise OR of register A and value B.
Assignment:

setr (set register) copies the contents of register A into register C. (Input B is ignored.)
seti (set immediate) stores value A into register C. (Input B is ignored.)
Greater-than testing:

gtir (greater-than immediate/register) sets register C to 1 if value A is greater than register B. Otherwise, register C is set to 0.
gtri (greater-than register/immediate) sets register C to 1 if register A is greater than value B. Otherwise, register C is set to 0.
gtrr (greater-than register/register) sets register C to 1 if register A is greater than register B. Otherwise, register C is set to 0.
Equality testing:

eqir (equal immediate/register) sets register C to 1 if value A is equal to register B. Otherwise, register C is set to 0.
eqri (equal register/immediate) sets register C to 1 if register A is equal to value B. Otherwise, register C is set to 0.
eqrr (equal register/register) sets register C to 1 if register A is equal to register B. Otherwise, register C is set to 0.
Unfortunately, while the manual gives the name of each opcode, it doesn't seem to indicate the number. However, you can monitor the CPU to see the contents of the registers before and after instructions are executed to try to work them out. Each opcode has a number from 0 through 15, but the manual doesn't say which is which. For example, suppose you capture the following sample:

Before: [3, 2, 1, 1]
9 2 1 2
After:  [3, 2, 2, 1]
This sample shows the effect of the instruction 9 2 1 2 on the registers. Before the instruction is executed, register 0 has value 3, register 1 has value 2, and registers 2 and 3 have value 1. After the instruction is executed, register 2's value becomes 2.

The instruction itself, 9 2 1 2, means that opcode 9 was executed with A=2, B=1, and C=2. Opcode 9 could be any of the 16 opcodes listed above, but only three of them behave in a way that would cause the result shown in the sample:

Opcode 9 could be mulr: register 2 (which has a value of 1) times register 1 (which has a value of 2) produces 2, which matches the value stored in the output register, register 2.
Opcode 9 could be addi: register 2 (which has a value of 1) plus value 1 produces 2, which matches the value stored in the output register, register 2.
Opcode 9 could be seti: value 2 matches the value stored in the output register, register 2; the number given for B is irrelevant.
None of the other opcodes produce the result captured in the sample. Because of this, the sample above behaves like three opcodes.

You collect many of these samples (the first section of your puzzle input). The manual also includes a small test program (the second section of your puzzle input) - you can ignore it for now.

Ignoring the opcode numbers, how many samples in your puzzle input behave like three or more opcodes?

Your puzzle answer was 500.

--- Part Two ---
Using the samples you collected, work out the number of each opcode and execute the test program (the second section of your puzzle input).

What value is contained in register 0 after executing the test program?

Your puzzle answer was 533.
*/

const input = `Before: [0, 3, 3, 0]
5 0 2 1
After:  [0, 0, 3, 0]

Before: [0, 2, 3, 2]
3 3 2 3
After:  [0, 2, 3, 4]

Before: [2, 1, 0, 0]
10 1 2 3
After:  [2, 1, 0, 2]

Before: [0, 2, 3, 3]
14 2 2 3
After:  [0, 2, 3, 2]

Before: [3, 2, 2, 2]
10 0 3 1
After:  [3, 9, 2, 2]

Before: [2, 2, 1, 0]
10 0 3 2
After:  [2, 2, 6, 0]

Before: [1, 1, 2, 0]
7 0 2 2
After:  [1, 1, 2, 0]

Before: [2, 1, 0, 1]
9 2 1 3
After:  [2, 1, 0, 1]

Before: [1, 2, 0, 0]
0 0 1 1
After:  [1, 3, 0, 0]

Before: [2, 2, 1, 0]
3 0 2 3
After:  [2, 2, 1, 4]

Before: [2, 0, 0, 1]
3 0 2 3
After:  [2, 0, 0, 4]

Before: [1, 1, 0, 2]
9 2 1 1
After:  [1, 1, 0, 2]

Before: [2, 1, 3, 3]
15 1 3 0
After:  [3, 1, 3, 3]

Before: [1, 3, 2, 1]
4 0 1 1
After:  [1, 1, 2, 1]

Before: [0, 1, 3, 0]
14 2 2 0
After:  [2, 1, 3, 0]

Before: [1, 2, 3, 2]
3 3 2 0
After:  [4, 2, 3, 2]

Before: [0, 1, 3, 2]
5 0 2 3
After:  [0, 1, 3, 0]

Before: [0, 1, 3, 0]
15 0 1 0
After:  [1, 1, 3, 0]

Before: [0, 0, 2, 1]
12 3 2 2
After:  [0, 0, 3, 1]

Before: [1, 1, 1, 2]
2 2 1 2
After:  [1, 1, 1, 2]

Before: [0, 3, 1, 2]
3 3 2 0
After:  [4, 3, 1, 2]

Before: [0, 3, 1, 3]
4 2 1 3
After:  [0, 3, 1, 1]

Before: [2, 2, 1, 2]
10 3 3 1
After:  [2, 6, 1, 2]

Before: [1, 1, 3, 1]
12 3 2 2
After:  [1, 1, 3, 1]

Before: [3, 3, 2, 1]
12 3 2 1
After:  [3, 3, 2, 1]

Before: [0, 2, 2, 0]
5 0 1 1
After:  [0, 0, 2, 0]

Before: [0, 1, 3, 2]
7 2 3 0
After:  [6, 1, 3, 2]

Before: [1, 0, 3, 2]
10 2 3 1
After:  [1, 9, 3, 2]

Before: [3, 0, 1, 0]
0 2 0 2
After:  [3, 0, 3, 0]

Before: [0, 1, 3, 2]
12 3 1 0
After:  [3, 1, 3, 2]

Before: [0, 3, 3, 1]
0 0 1 1
After:  [0, 3, 3, 1]

Before: [3, 0, 1, 2]
0 1 3 0
After:  [2, 0, 1, 2]

Before: [1, 0, 3, 2]
11 2 3 3
After:  [1, 0, 3, 2]

Before: [2, 0, 2, 3]
1 0 2 2
After:  [2, 0, 4, 3]

Before: [1, 2, 1, 0]
7 0 1 1
After:  [1, 2, 1, 0]

Before: [1, 2, 3, 1]
7 3 1 0
After:  [2, 2, 3, 1]

Before: [1, 2, 3, 1]
14 2 2 1
After:  [1, 2, 3, 1]

Before: [0, 1, 0, 2]
9 2 1 2
After:  [0, 1, 1, 2]

Before: [2, 0, 2, 0]
1 0 2 1
After:  [2, 4, 2, 0]

Before: [1, 2, 1, 1]
0 1 2 2
After:  [1, 2, 3, 1]

Before: [1, 2, 2, 3]
7 2 3 0
After:  [6, 2, 2, 3]

Before: [2, 0, 3, 3]
7 2 3 0
After:  [9, 0, 3, 3]

Before: [2, 3, 3, 1]
14 2 2 3
After:  [2, 3, 3, 2]

Before: [0, 2, 2, 2]
1 3 2 1
After:  [0, 4, 2, 2]

Before: [2, 3, 2, 1]
8 2 2 3
After:  [2, 3, 2, 2]

Before: [0, 2, 0, 0]
13 0 0 0
After:  [0, 2, 0, 0]

Before: [1, 1, 2, 1]
6 3 0 3
After:  [1, 1, 2, 1]

Before: [2, 1, 3, 3]
14 2 2 2
After:  [2, 1, 2, 3]

Before: [3, 2, 2, 0]
15 3 2 1
After:  [3, 2, 2, 0]

Before: [2, 3, 1, 0]
4 2 1 3
After:  [2, 3, 1, 1]

Before: [3, 1, 1, 0]
2 2 1 1
After:  [3, 1, 1, 0]

Before: [0, 3, 3, 3]
8 3 1 0
After:  [3, 3, 3, 3]

Before: [0, 1, 0, 2]
9 2 1 1
After:  [0, 1, 0, 2]

Before: [1, 1, 0, 0]
9 2 1 2
After:  [1, 1, 1, 0]

Before: [0, 0, 1, 1]
13 0 0 0
After:  [0, 0, 1, 1]

Before: [0, 2, 1, 1]
13 0 0 0
After:  [0, 2, 1, 1]

Before: [3, 1, 2, 1]
12 3 2 2
After:  [3, 1, 3, 1]

Before: [2, 2, 1, 2]
3 1 2 2
After:  [2, 2, 4, 2]

Before: [2, 2, 3, 1]
11 2 0 3
After:  [2, 2, 3, 2]

Before: [1, 0, 3, 2]
7 2 3 3
After:  [1, 0, 3, 6]

Before: [2, 2, 3, 2]
11 2 0 2
After:  [2, 2, 2, 2]

Before: [2, 1, 0, 1]
2 3 1 2
After:  [2, 1, 1, 1]

Before: [1, 1, 2, 2]
15 0 3 2
After:  [1, 1, 3, 2]

Before: [2, 2, 0, 3]
3 0 2 1
After:  [2, 4, 0, 3]

Before: [3, 3, 1, 2]
10 0 3 3
After:  [3, 3, 1, 9]

Before: [2, 1, 1, 1]
2 2 1 1
After:  [2, 1, 1, 1]

Before: [0, 3, 1, 0]
13 0 0 3
After:  [0, 3, 1, 0]

Before: [3, 3, 3, 0]
10 2 3 1
After:  [3, 9, 3, 0]

Before: [0, 1, 2, 0]
5 0 2 2
After:  [0, 1, 0, 0]

Before: [2, 1, 0, 2]
12 3 1 1
After:  [2, 3, 0, 2]

Before: [3, 2, 2, 2]
1 2 2 0
After:  [4, 2, 2, 2]

Before: [1, 1, 1, 0]
9 3 1 1
After:  [1, 1, 1, 0]

Before: [0, 1, 3, 2]
12 3 1 2
After:  [0, 1, 3, 2]

Before: [1, 3, 1, 1]
6 2 0 2
After:  [1, 3, 1, 1]

Before: [0, 0, 3, 3]
8 3 0 2
After:  [0, 0, 3, 3]

Before: [2, 1, 2, 3]
1 0 2 1
After:  [2, 4, 2, 3]

Before: [1, 3, 1, 1]
4 2 1 3
After:  [1, 3, 1, 1]

Before: [1, 1, 3, 1]
12 3 2 0
After:  [3, 1, 3, 1]

Before: [0, 2, 2, 3]
14 3 2 0
After:  [2, 2, 2, 3]

Before: [1, 3, 2, 1]
10 1 3 0
After:  [9, 3, 2, 1]

Before: [3, 2, 2, 3]
14 3 2 2
After:  [3, 2, 2, 3]

Before: [0, 0, 3, 3]
8 3 1 2
After:  [0, 0, 3, 3]

Before: [1, 2, 3, 3]
14 2 2 1
After:  [1, 2, 3, 3]

Before: [2, 0, 1, 2]
3 0 2 2
After:  [2, 0, 4, 2]

Before: [1, 3, 2, 2]
1 3 2 1
After:  [1, 4, 2, 2]

Before: [1, 2, 3, 1]
12 3 2 1
After:  [1, 3, 3, 1]

Before: [1, 3, 1, 3]
6 2 0 3
After:  [1, 3, 1, 1]

Before: [0, 2, 1, 2]
0 0 1 2
After:  [0, 2, 2, 2]

Before: [0, 0, 3, 1]
12 3 2 2
After:  [0, 0, 3, 1]

Before: [3, 3, 0, 0]
10 0 3 2
After:  [3, 3, 9, 0]

Before: [2, 2, 2, 2]
1 3 2 3
After:  [2, 2, 2, 4]

Before: [3, 0, 2, 3]
7 0 2 3
After:  [3, 0, 2, 6]

Before: [0, 2, 1, 0]
13 0 0 2
After:  [0, 2, 0, 0]

Before: [1, 3, 1, 3]
15 0 3 2
After:  [1, 3, 3, 3]

Before: [3, 0, 2, 1]
1 2 2 1
After:  [3, 4, 2, 1]

Before: [2, 1, 0, 1]
9 2 1 2
After:  [2, 1, 1, 1]

Before: [1, 0, 0, 1]
6 3 0 0
After:  [1, 0, 0, 1]

Before: [0, 3, 1, 1]
10 1 3 2
After:  [0, 3, 9, 1]

Before: [3, 2, 2, 0]
0 3 1 0
After:  [2, 2, 2, 0]

Before: [3, 1, 0, 0]
9 2 1 1
After:  [3, 1, 0, 0]

Before: [0, 3, 0, 3]
13 0 0 3
After:  [0, 3, 0, 0]

Before: [1, 1, 0, 0]
9 2 1 3
After:  [1, 1, 0, 1]

Before: [0, 0, 1, 3]
15 0 3 2
After:  [0, 0, 3, 3]

Before: [0, 3, 2, 2]
14 1 2 0
After:  [2, 3, 2, 2]

Before: [0, 3, 3, 0]
10 2 3 0
After:  [9, 3, 3, 0]

Before: [0, 3, 3, 3]
0 0 1 1
After:  [0, 3, 3, 3]

Before: [0, 2, 3, 0]
11 2 1 1
After:  [0, 2, 3, 0]

Before: [0, 1, 3, 2]
7 2 3 2
After:  [0, 1, 6, 2]

Before: [1, 3, 1, 2]
4 2 1 1
After:  [1, 1, 1, 2]

Before: [1, 3, 1, 1]
6 3 0 2
After:  [1, 3, 1, 1]

Before: [0, 1, 1, 3]
2 2 1 0
After:  [1, 1, 1, 3]

Before: [2, 1, 1, 1]
2 3 1 1
After:  [2, 1, 1, 1]

Before: [2, 3, 2, 1]
14 1 2 1
After:  [2, 2, 2, 1]

Before: [1, 1, 1, 1]
2 2 1 1
After:  [1, 1, 1, 1]

Before: [1, 1, 0, 1]
9 2 1 3
After:  [1, 1, 0, 1]

Before: [1, 2, 3, 3]
7 0 1 0
After:  [2, 2, 3, 3]

Before: [3, 1, 1, 2]
15 1 3 2
After:  [3, 1, 3, 2]

Before: [0, 3, 1, 1]
0 0 2 0
After:  [1, 3, 1, 1]

Before: [3, 2, 0, 0]
5 2 0 1
After:  [3, 0, 0, 0]

Before: [1, 0, 1, 1]
6 2 0 1
After:  [1, 1, 1, 1]

Before: [3, 1, 0, 3]
9 2 1 0
After:  [1, 1, 0, 3]

Before: [2, 0, 2, 2]
1 3 2 0
After:  [4, 0, 2, 2]

Before: [3, 0, 2, 2]
1 3 2 3
After:  [3, 0, 2, 4]

Before: [3, 3, 1, 2]
4 2 1 2
After:  [3, 3, 1, 2]

Before: [2, 3, 3, 1]
14 2 2 2
After:  [2, 3, 2, 1]

Before: [0, 3, 1, 0]
13 0 0 2
After:  [0, 3, 0, 0]

Before: [0, 3, 3, 2]
10 2 3 3
After:  [0, 3, 3, 9]

Before: [0, 3, 3, 2]
10 3 3 2
After:  [0, 3, 6, 2]

Before: [0, 0, 1, 0]
5 1 0 0
After:  [0, 0, 1, 0]

Before: [2, 3, 1, 2]
3 0 2 3
After:  [2, 3, 1, 4]

Before: [2, 1, 2, 0]
1 0 2 0
After:  [4, 1, 2, 0]

Before: [1, 2, 0, 3]
3 1 2 2
After:  [1, 2, 4, 3]

Before: [1, 1, 2, 1]
2 3 1 3
After:  [1, 1, 2, 1]

Before: [2, 1, 0, 1]
9 2 1 0
After:  [1, 1, 0, 1]

Before: [1, 2, 3, 1]
4 3 1 1
After:  [1, 1, 3, 1]

Before: [0, 0, 2, 3]
15 1 2 3
After:  [0, 0, 2, 2]

Before: [3, 3, 1, 1]
10 1 3 1
After:  [3, 9, 1, 1]

Before: [3, 1, 0, 2]
9 2 1 2
After:  [3, 1, 1, 2]

Before: [0, 1, 2, 1]
15 2 1 1
After:  [0, 3, 2, 1]

Before: [1, 0, 3, 0]
10 0 2 2
After:  [1, 0, 2, 0]

Before: [1, 2, 3, 1]
12 3 2 3
After:  [1, 2, 3, 3]

Before: [0, 1, 3, 0]
13 0 0 2
After:  [0, 1, 0, 0]

Before: [1, 2, 1, 3]
6 2 0 3
After:  [1, 2, 1, 1]

Before: [0, 0, 2, 1]
5 0 3 2
After:  [0, 0, 0, 1]

Before: [3, 1, 3, 1]
2 3 1 1
After:  [3, 1, 3, 1]

Before: [2, 0, 2, 2]
1 3 2 1
After:  [2, 4, 2, 2]

Before: [1, 1, 0, 2]
9 2 1 0
After:  [1, 1, 0, 2]

Before: [1, 3, 3, 2]
4 0 1 1
After:  [1, 1, 3, 2]

Before: [1, 1, 3, 0]
9 3 1 2
After:  [1, 1, 1, 0]

Before: [0, 1, 1, 2]
12 3 1 1
After:  [0, 3, 1, 2]

Before: [3, 1, 2, 3]
14 3 2 2
After:  [3, 1, 2, 3]

Before: [1, 2, 3, 3]
7 3 3 0
After:  [9, 2, 3, 3]

Before: [0, 0, 2, 1]
8 2 2 2
After:  [0, 0, 2, 1]

Before: [1, 3, 0, 1]
4 0 1 3
After:  [1, 3, 0, 1]

Before: [1, 1, 2, 1]
6 3 0 1
After:  [1, 1, 2, 1]

Before: [2, 2, 3, 2]
14 2 2 0
After:  [2, 2, 3, 2]

Before: [2, 3, 0, 3]
3 0 2 0
After:  [4, 3, 0, 3]

Before: [2, 0, 3, 2]
5 1 0 2
After:  [2, 0, 0, 2]

Before: [3, 2, 2, 3]
7 0 3 1
After:  [3, 9, 2, 3]

Before: [0, 0, 1, 0]
0 0 2 2
After:  [0, 0, 1, 0]

Before: [2, 3, 1, 3]
7 1 3 1
After:  [2, 9, 1, 3]

Before: [2, 1, 1, 0]
9 3 1 0
After:  [1, 1, 1, 0]

Before: [2, 0, 3, 1]
11 2 0 1
After:  [2, 2, 3, 1]

Before: [0, 2, 1, 1]
5 0 1 0
After:  [0, 2, 1, 1]

Before: [3, 1, 1, 2]
12 3 1 0
After:  [3, 1, 1, 2]

Before: [1, 3, 3, 2]
7 2 3 0
After:  [6, 3, 3, 2]

Before: [2, 1, 0, 2]
3 0 2 3
After:  [2, 1, 0, 4]

Before: [2, 3, 2, 2]
8 2 2 2
After:  [2, 3, 2, 2]

Before: [0, 3, 1, 3]
7 3 3 3
After:  [0, 3, 1, 9]

Before: [2, 2, 3, 1]
11 2 0 2
After:  [2, 2, 2, 1]

Before: [0, 2, 1, 0]
5 0 1 2
After:  [0, 2, 0, 0]

Before: [2, 0, 2, 1]
10 0 3 1
After:  [2, 6, 2, 1]

Before: [1, 3, 2, 0]
14 1 2 0
After:  [2, 3, 2, 0]

Before: [1, 3, 3, 0]
4 0 1 0
After:  [1, 3, 3, 0]

Before: [1, 3, 2, 2]
10 3 3 3
After:  [1, 3, 2, 6]

Before: [1, 1, 2, 0]
7 1 2 0
After:  [2, 1, 2, 0]

Before: [1, 2, 0, 1]
6 3 0 1
After:  [1, 1, 0, 1]

Before: [0, 2, 3, 1]
11 2 1 0
After:  [2, 2, 3, 1]

Before: [0, 3, 1, 2]
3 3 2 1
After:  [0, 4, 1, 2]

Before: [2, 3, 1, 1]
10 1 3 2
After:  [2, 3, 9, 1]

Before: [1, 2, 1, 3]
15 2 3 1
After:  [1, 3, 1, 3]

Before: [1, 1, 3, 2]
14 2 2 3
After:  [1, 1, 3, 2]

Before: [2, 1, 0, 0]
9 3 1 0
After:  [1, 1, 0, 0]

Before: [1, 3, 1, 0]
4 0 1 1
After:  [1, 1, 1, 0]

Before: [3, 1, 1, 1]
10 0 3 2
After:  [3, 1, 9, 1]

Before: [1, 2, 3, 0]
10 1 3 1
After:  [1, 6, 3, 0]

Before: [3, 2, 3, 0]
0 3 1 2
After:  [3, 2, 2, 0]

Before: [0, 2, 2, 2]
8 2 0 3
After:  [0, 2, 2, 2]

Before: [2, 1, 2, 2]
15 1 3 1
After:  [2, 3, 2, 2]

Before: [0, 1, 2, 1]
2 3 1 0
After:  [1, 1, 2, 1]

Before: [3, 2, 1, 2]
10 0 3 0
After:  [9, 2, 1, 2]

Before: [2, 0, 0, 0]
3 0 2 0
After:  [4, 0, 0, 0]

Before: [1, 1, 0, 2]
12 3 1 0
After:  [3, 1, 0, 2]

Before: [3, 1, 3, 3]
7 3 3 1
After:  [3, 9, 3, 3]

Before: [2, 2, 2, 3]
8 2 0 1
After:  [2, 2, 2, 3]

Before: [0, 1, 2, 3]
14 3 2 2
After:  [0, 1, 2, 3]

Before: [1, 3, 1, 3]
4 2 1 0
After:  [1, 3, 1, 3]

Before: [2, 3, 1, 3]
3 0 2 3
After:  [2, 3, 1, 4]

Before: [2, 1, 2, 2]
1 0 2 0
After:  [4, 1, 2, 2]

Before: [1, 1, 1, 3]
2 2 1 1
After:  [1, 1, 1, 3]

Before: [1, 3, 2, 1]
4 0 1 2
After:  [1, 3, 1, 1]

Before: [0, 2, 1, 0]
5 0 2 2
After:  [0, 2, 0, 0]

Before: [3, 0, 3, 3]
8 3 0 0
After:  [3, 0, 3, 3]

Before: [1, 2, 2, 2]
7 0 2 1
After:  [1, 2, 2, 2]

Before: [0, 3, 2, 0]
5 0 1 1
After:  [0, 0, 2, 0]

Before: [3, 2, 3, 1]
12 3 2 3
After:  [3, 2, 3, 3]

Before: [1, 2, 3, 2]
3 3 2 1
After:  [1, 4, 3, 2]

Before: [1, 3, 2, 2]
7 0 2 0
After:  [2, 3, 2, 2]

Before: [3, 0, 2, 3]
15 1 3 1
After:  [3, 3, 2, 3]

Before: [2, 2, 3, 1]
4 3 1 2
After:  [2, 2, 1, 1]

Before: [2, 2, 0, 1]
3 1 2 1
After:  [2, 4, 0, 1]

Before: [0, 0, 2, 3]
14 3 2 1
After:  [0, 2, 2, 3]

Before: [1, 0, 2, 1]
6 3 0 2
After:  [1, 0, 1, 1]

Before: [1, 3, 2, 3]
4 0 1 2
After:  [1, 3, 1, 3]

Before: [0, 3, 1, 2]
5 0 3 1
After:  [0, 0, 1, 2]

Before: [0, 2, 3, 2]
0 0 2 0
After:  [3, 2, 3, 2]

Before: [0, 1, 0, 0]
9 3 1 0
After:  [1, 1, 0, 0]

Before: [3, 2, 3, 2]
14 2 2 1
After:  [3, 2, 3, 2]

Before: [0, 3, 2, 0]
5 0 1 3
After:  [0, 3, 2, 0]

Before: [3, 2, 3, 1]
14 2 2 0
After:  [2, 2, 3, 1]

Before: [3, 1, 1, 3]
8 3 1 0
After:  [3, 1, 1, 3]

Before: [0, 3, 0, 1]
13 0 0 1
After:  [0, 0, 0, 1]

Before: [2, 2, 0, 0]
3 1 2 3
After:  [2, 2, 0, 4]

Before: [1, 0, 2, 1]
6 3 0 0
After:  [1, 0, 2, 1]

Before: [1, 3, 0, 2]
4 0 1 3
After:  [1, 3, 0, 1]

Before: [1, 3, 2, 2]
0 0 1 3
After:  [1, 3, 2, 3]

Before: [0, 2, 2, 0]
1 2 2 2
After:  [0, 2, 4, 0]

Before: [0, 3, 1, 2]
0 2 1 2
After:  [0, 3, 3, 2]

Before: [0, 2, 0, 2]
0 0 1 0
After:  [2, 2, 0, 2]

Before: [0, 1, 1, 1]
13 0 0 3
After:  [0, 1, 1, 0]

Before: [2, 1, 3, 0]
9 3 1 2
After:  [2, 1, 1, 0]

Before: [1, 2, 0, 3]
7 1 3 2
After:  [1, 2, 6, 3]

Before: [0, 0, 3, 3]
0 1 2 2
After:  [0, 0, 3, 3]

Before: [1, 2, 3, 2]
3 1 2 1
After:  [1, 4, 3, 2]

Before: [0, 2, 0, 0]
3 1 2 0
After:  [4, 2, 0, 0]

Before: [2, 2, 1, 3]
7 3 3 3
After:  [2, 2, 1, 9]

Before: [3, 0, 0, 3]
10 3 2 2
After:  [3, 0, 6, 3]

Before: [1, 1, 0, 0]
9 3 1 2
After:  [1, 1, 1, 0]

Before: [2, 2, 0, 3]
3 0 2 3
After:  [2, 2, 0, 4]

Before: [0, 1, 2, 3]
1 2 2 1
After:  [0, 4, 2, 3]

Before: [1, 0, 1, 0]
6 2 0 3
After:  [1, 0, 1, 1]

Before: [1, 2, 0, 3]
0 1 0 0
After:  [3, 2, 0, 3]

Before: [0, 1, 3, 0]
9 3 1 3
After:  [0, 1, 3, 1]

Before: [0, 1, 0, 3]
9 2 1 1
After:  [0, 1, 0, 3]

Before: [1, 3, 2, 0]
4 0 1 3
After:  [1, 3, 2, 1]

Before: [2, 0, 3, 3]
3 0 2 1
After:  [2, 4, 3, 3]

Before: [2, 2, 3, 1]
11 2 1 3
After:  [2, 2, 3, 2]

Before: [3, 2, 0, 2]
3 1 2 1
After:  [3, 4, 0, 2]

Before: [0, 1, 0, 1]
13 0 0 3
After:  [0, 1, 0, 0]

Before: [1, 3, 2, 3]
7 3 3 0
After:  [9, 3, 2, 3]

Before: [0, 2, 2, 1]
4 3 1 2
After:  [0, 2, 1, 1]

Before: [0, 3, 1, 3]
13 0 0 2
After:  [0, 3, 0, 3]

Before: [0, 2, 1, 1]
0 2 1 3
After:  [0, 2, 1, 3]

Before: [3, 1, 0, 3]
10 3 2 3
After:  [3, 1, 0, 6]

Before: [2, 2, 1, 1]
7 3 1 2
After:  [2, 2, 2, 1]

Before: [0, 1, 0, 2]
15 1 3 1
After:  [0, 3, 0, 2]

Before: [2, 3, 3, 2]
7 2 3 0
After:  [6, 3, 3, 2]

Before: [2, 1, 3, 1]
2 3 1 1
After:  [2, 1, 3, 1]

Before: [1, 1, 2, 3]
15 1 2 0
After:  [3, 1, 2, 3]

Before: [3, 2, 3, 0]
14 2 2 2
After:  [3, 2, 2, 0]

Before: [0, 3, 0, 2]
0 0 1 1
After:  [0, 3, 0, 2]

Before: [0, 3, 3, 1]
13 0 0 1
After:  [0, 0, 3, 1]

Before: [1, 1, 0, 1]
9 2 1 2
After:  [1, 1, 1, 1]

Before: [1, 3, 2, 1]
10 2 3 2
After:  [1, 3, 6, 1]

Before: [2, 1, 1, 1]
2 3 1 2
After:  [2, 1, 1, 1]

Before: [0, 0, 0, 1]
5 2 0 0
After:  [0, 0, 0, 1]

Before: [0, 1, 2, 3]
5 0 2 2
After:  [0, 1, 0, 3]

Before: [2, 3, 3, 0]
11 2 0 3
After:  [2, 3, 3, 2]

Before: [2, 1, 3, 3]
7 0 3 0
After:  [6, 1, 3, 3]

Before: [3, 2, 1, 0]
0 2 0 1
After:  [3, 3, 1, 0]

Before: [3, 1, 1, 2]
2 2 1 2
After:  [3, 1, 1, 2]

Before: [1, 1, 2, 0]
1 2 2 2
After:  [1, 1, 4, 0]

Before: [2, 2, 0, 3]
7 1 3 0
After:  [6, 2, 0, 3]

Before: [3, 1, 0, 0]
9 3 1 3
After:  [3, 1, 0, 1]

Before: [3, 0, 0, 3]
0 1 0 2
After:  [3, 0, 3, 3]

Before: [3, 1, 3, 0]
9 3 1 2
After:  [3, 1, 1, 0]

Before: [0, 1, 3, 0]
5 0 1 1
After:  [0, 0, 3, 0]

Before: [2, 2, 0, 1]
4 3 1 0
After:  [1, 2, 0, 1]

Before: [0, 0, 2, 2]
1 2 2 1
After:  [0, 4, 2, 2]

Before: [0, 1, 3, 2]
14 2 2 3
After:  [0, 1, 3, 2]

Before: [1, 3, 1, 0]
4 2 1 1
After:  [1, 1, 1, 0]

Before: [2, 3, 1, 2]
15 2 3 0
After:  [3, 3, 1, 2]

Before: [1, 1, 0, 2]
12 3 1 2
After:  [1, 1, 3, 2]

Before: [1, 1, 3, 1]
10 0 2 2
After:  [1, 1, 2, 1]

Before: [2, 0, 1, 0]
0 0 2 1
After:  [2, 3, 1, 0]

Before: [0, 1, 1, 2]
12 3 1 3
After:  [0, 1, 1, 3]

Before: [3, 1, 0, 0]
9 3 1 2
After:  [3, 1, 1, 0]

Before: [3, 3, 0, 3]
7 0 3 0
After:  [9, 3, 0, 3]

Before: [3, 0, 2, 2]
5 1 0 2
After:  [3, 0, 0, 2]

Before: [0, 3, 0, 3]
0 2 1 2
After:  [0, 3, 3, 3]

Before: [2, 1, 1, 0]
0 2 0 0
After:  [3, 1, 1, 0]

Before: [0, 0, 2, 1]
13 0 0 1
After:  [0, 0, 2, 1]

Before: [1, 3, 2, 1]
6 3 0 3
After:  [1, 3, 2, 1]

Before: [0, 3, 0, 2]
3 3 2 3
After:  [0, 3, 0, 4]

Before: [0, 3, 3, 3]
13 0 0 0
After:  [0, 3, 3, 3]

Before: [2, 0, 2, 2]
1 3 2 3
After:  [2, 0, 2, 4]

Before: [1, 3, 0, 1]
6 3 0 3
After:  [1, 3, 0, 1]

Before: [0, 2, 3, 1]
13 0 0 3
After:  [0, 2, 3, 0]

Before: [1, 0, 0, 3]
8 3 3 1
After:  [1, 3, 0, 3]

Before: [1, 1, 3, 1]
6 3 0 0
After:  [1, 1, 3, 1]

Before: [1, 0, 2, 1]
6 3 0 1
After:  [1, 1, 2, 1]

Before: [0, 1, 2, 3]
13 0 0 1
After:  [0, 0, 2, 3]

Before: [2, 2, 3, 1]
11 2 1 0
After:  [2, 2, 3, 1]

Before: [2, 0, 2, 1]
12 3 2 0
After:  [3, 0, 2, 1]

Before: [0, 3, 3, 3]
14 2 2 3
After:  [0, 3, 3, 2]

Before: [3, 2, 2, 1]
12 3 2 1
After:  [3, 3, 2, 1]

Before: [3, 1, 0, 3]
15 2 3 2
After:  [3, 1, 3, 3]

Before: [0, 3, 2, 2]
8 2 0 1
After:  [0, 2, 2, 2]

Before: [2, 1, 0, 3]
0 1 0 0
After:  [3, 1, 0, 3]

Before: [3, 1, 1, 3]
2 2 1 0
After:  [1, 1, 1, 3]

Before: [1, 0, 2, 2]
1 2 2 0
After:  [4, 0, 2, 2]

Before: [2, 3, 2, 3]
1 2 2 2
After:  [2, 3, 4, 3]

Before: [1, 3, 2, 0]
14 1 2 1
After:  [1, 2, 2, 0]

Before: [3, 1, 1, 1]
0 2 0 2
After:  [3, 1, 3, 1]

Before: [1, 2, 3, 2]
11 2 3 3
After:  [1, 2, 3, 2]

Before: [1, 3, 3, 3]
8 3 3 2
After:  [1, 3, 3, 3]

Before: [0, 3, 3, 2]
13 0 0 0
After:  [0, 3, 3, 2]

Before: [0, 3, 2, 0]
1 2 2 3
After:  [0, 3, 2, 4]

Before: [3, 1, 2, 0]
10 2 3 3
After:  [3, 1, 2, 6]

Before: [3, 1, 2, 0]
9 3 1 0
After:  [1, 1, 2, 0]

Before: [3, 0, 2, 0]
5 1 0 2
After:  [3, 0, 0, 0]

Before: [0, 2, 3, 3]
13 0 0 2
After:  [0, 2, 0, 3]

Before: [2, 3, 1, 1]
0 0 2 3
After:  [2, 3, 1, 3]

Before: [1, 2, 2, 1]
0 1 0 3
After:  [1, 2, 2, 3]

Before: [1, 2, 2, 1]
4 3 1 1
After:  [1, 1, 2, 1]

Before: [1, 1, 1, 0]
2 2 1 2
After:  [1, 1, 1, 0]

Before: [1, 0, 1, 1]
6 2 0 0
After:  [1, 0, 1, 1]

Before: [0, 0, 1, 1]
13 0 0 1
After:  [0, 0, 1, 1]

Before: [3, 1, 2, 0]
9 3 1 3
After:  [3, 1, 2, 1]

Before: [3, 3, 0, 3]
8 3 3 0
After:  [3, 3, 0, 3]

Before: [3, 1, 0, 2]
5 2 0 1
After:  [3, 0, 0, 2]

Before: [2, 1, 3, 2]
11 2 3 3
After:  [2, 1, 3, 2]

Before: [1, 1, 1, 1]
6 3 0 2
After:  [1, 1, 1, 1]

Before: [3, 1, 0, 0]
9 2 1 3
After:  [3, 1, 0, 1]

Before: [0, 2, 0, 3]
8 3 0 1
After:  [0, 3, 0, 3]

Before: [1, 2, 2, 3]
0 1 0 0
After:  [3, 2, 2, 3]

Before: [1, 1, 3, 3]
15 1 2 1
After:  [1, 3, 3, 3]

Before: [1, 2, 2, 3]
7 0 1 3
After:  [1, 2, 2, 2]

Before: [3, 3, 3, 3]
14 2 2 1
After:  [3, 2, 3, 3]

Before: [0, 1, 3, 3]
8 3 1 3
After:  [0, 1, 3, 3]

Before: [2, 2, 3, 3]
11 2 1 3
After:  [2, 2, 3, 2]

Before: [0, 0, 2, 1]
8 2 2 0
After:  [2, 0, 2, 1]

Before: [1, 3, 3, 1]
12 3 2 1
After:  [1, 3, 3, 1]

Before: [0, 3, 0, 2]
0 0 3 0
After:  [2, 3, 0, 2]

Before: [1, 1, 3, 2]
3 3 2 2
After:  [1, 1, 4, 2]

Before: [1, 2, 0, 0]
3 1 2 3
After:  [1, 2, 0, 4]

Before: [2, 0, 2, 1]
0 1 0 0
After:  [2, 0, 2, 1]

Before: [0, 3, 2, 3]
1 2 2 2
After:  [0, 3, 4, 3]

Before: [2, 1, 2, 0]
7 1 2 2
After:  [2, 1, 2, 0]

Before: [3, 2, 3, 1]
4 3 1 0
After:  [1, 2, 3, 1]

Before: [2, 1, 3, 1]
12 3 2 0
After:  [3, 1, 3, 1]

Before: [0, 1, 0, 2]
13 0 0 2
After:  [0, 1, 0, 2]

Before: [2, 2, 0, 1]
3 1 2 2
After:  [2, 2, 4, 1]

Before: [1, 2, 1, 3]
6 2 0 1
After:  [1, 1, 1, 3]

Before: [3, 3, 1, 0]
10 1 3 2
After:  [3, 3, 9, 0]

Before: [3, 1, 0, 1]
10 1 2 0
After:  [2, 1, 0, 1]

Before: [1, 1, 0, 2]
9 2 1 3
After:  [1, 1, 0, 1]

Before: [2, 3, 1, 1]
4 2 1 2
After:  [2, 3, 1, 1]

Before: [0, 2, 2, 0]
1 1 2 2
After:  [0, 2, 4, 0]

Before: [0, 1, 1, 1]
2 3 1 0
After:  [1, 1, 1, 1]

Before: [1, 3, 2, 1]
14 1 2 1
After:  [1, 2, 2, 1]

Before: [1, 2, 2, 1]
7 3 1 1
After:  [1, 2, 2, 1]

Before: [2, 2, 3, 0]
3 1 2 1
After:  [2, 4, 3, 0]

Before: [2, 2, 3, 3]
3 0 2 3
After:  [2, 2, 3, 4]

Before: [3, 2, 0, 1]
4 3 1 3
After:  [3, 2, 0, 1]

Before: [1, 2, 0, 2]
10 0 2 0
After:  [2, 2, 0, 2]

Before: [1, 1, 2, 1]
6 3 0 2
After:  [1, 1, 1, 1]

Before: [0, 3, 2, 3]
13 0 0 1
After:  [0, 0, 2, 3]

Before: [3, 1, 2, 2]
14 0 2 3
After:  [3, 1, 2, 2]

Before: [1, 2, 1, 0]
6 2 0 0
After:  [1, 2, 1, 0]

Before: [3, 3, 3, 0]
14 2 2 1
After:  [3, 2, 3, 0]

Before: [0, 1, 0, 3]
8 3 0 1
After:  [0, 3, 0, 3]

Before: [1, 3, 2, 1]
14 1 2 0
After:  [2, 3, 2, 1]

Before: [0, 1, 2, 1]
5 0 3 1
After:  [0, 0, 2, 1]

Before: [3, 3, 3, 2]
10 0 3 2
After:  [3, 3, 9, 2]

Before: [0, 3, 1, 1]
4 2 1 2
After:  [0, 3, 1, 1]

Before: [3, 0, 0, 0]
5 1 0 0
After:  [0, 0, 0, 0]

Before: [2, 0, 0, 3]
5 1 0 1
After:  [2, 0, 0, 3]

Before: [1, 3, 2, 1]
1 2 2 0
After:  [4, 3, 2, 1]

Before: [2, 3, 2, 3]
8 2 0 0
After:  [2, 3, 2, 3]

Before: [1, 2, 1, 1]
6 2 0 2
After:  [1, 2, 1, 1]

Before: [3, 1, 1, 1]
2 2 1 3
After:  [3, 1, 1, 1]

Before: [3, 2, 2, 0]
1 1 2 2
After:  [3, 2, 4, 0]

Before: [2, 0, 3, 3]
8 3 3 1
After:  [2, 3, 3, 3]

Before: [1, 1, 3, 1]
6 3 0 1
After:  [1, 1, 3, 1]

Before: [0, 0, 2, 3]
14 3 2 3
After:  [0, 0, 2, 2]

Before: [1, 2, 1, 0]
6 2 0 2
After:  [1, 2, 1, 0]

Before: [3, 0, 2, 1]
7 0 2 0
After:  [6, 0, 2, 1]

Before: [0, 2, 3, 1]
11 2 1 2
After:  [0, 2, 2, 1]

Before: [2, 0, 3, 3]
3 0 2 2
After:  [2, 0, 4, 3]

Before: [0, 3, 3, 2]
14 2 2 3
After:  [0, 3, 3, 2]

Before: [1, 3, 1, 3]
6 2 0 1
After:  [1, 1, 1, 3]

Before: [1, 2, 3, 2]
11 2 3 0
After:  [2, 2, 3, 2]

Before: [1, 1, 2, 2]
12 3 1 1
After:  [1, 3, 2, 2]

Before: [3, 1, 3, 3]
14 2 2 0
After:  [2, 1, 3, 3]

Before: [3, 2, 3, 1]
4 3 1 2
After:  [3, 2, 1, 1]

Before: [0, 3, 2, 0]
8 2 0 2
After:  [0, 3, 2, 0]

Before: [3, 0, 2, 0]
10 2 3 3
After:  [3, 0, 2, 6]

Before: [1, 0, 3, 2]
14 2 2 0
After:  [2, 0, 3, 2]

Before: [1, 1, 2, 2]
12 3 1 2
After:  [1, 1, 3, 2]

Before: [0, 3, 2, 0]
5 0 1 2
After:  [0, 3, 0, 0]

Before: [1, 1, 1, 2]
2 2 1 1
After:  [1, 1, 1, 2]

Before: [0, 1, 0, 1]
9 2 1 2
After:  [0, 1, 1, 1]

Before: [2, 3, 3, 3]
11 2 0 3
After:  [2, 3, 3, 2]

Before: [0, 0, 1, 3]
15 2 3 1
After:  [0, 3, 1, 3]

Before: [1, 2, 1, 1]
3 1 2 2
After:  [1, 2, 4, 1]

Before: [2, 3, 0, 2]
3 3 2 0
After:  [4, 3, 0, 2]

Before: [3, 1, 3, 2]
12 3 1 3
After:  [3, 1, 3, 3]

Before: [3, 0, 1, 3]
15 2 3 3
After:  [3, 0, 1, 3]

Before: [1, 1, 1, 0]
9 3 1 0
After:  [1, 1, 1, 0]

Before: [2, 2, 3, 1]
10 2 3 2
After:  [2, 2, 9, 1]

Before: [0, 1, 1, 2]
12 3 1 0
After:  [3, 1, 1, 2]

Before: [0, 0, 0, 3]
15 0 3 1
After:  [0, 3, 0, 3]

Before: [3, 1, 1, 2]
2 2 1 1
After:  [3, 1, 1, 2]

Before: [1, 0, 0, 1]
6 3 0 2
After:  [1, 0, 1, 1]

Before: [1, 0, 1, 2]
6 2 0 2
After:  [1, 0, 1, 2]

Before: [1, 1, 1, 2]
2 2 1 3
After:  [1, 1, 1, 1]

Before: [1, 1, 1, 1]
6 2 0 1
After:  [1, 1, 1, 1]

Before: [2, 1, 2, 3]
8 3 1 3
After:  [2, 1, 2, 3]

Before: [3, 1, 1, 3]
7 3 3 2
After:  [3, 1, 9, 3]

Before: [2, 2, 3, 1]
11 2 1 1
After:  [2, 2, 3, 1]

Before: [1, 3, 0, 2]
4 0 1 0
After:  [1, 3, 0, 2]

Before: [0, 0, 3, 3]
0 0 2 1
After:  [0, 3, 3, 3]

Before: [0, 1, 3, 1]
2 3 1 0
After:  [1, 1, 3, 1]

Before: [3, 1, 1, 3]
8 3 0 2
After:  [3, 1, 3, 3]

Before: [1, 2, 1, 0]
6 2 0 1
After:  [1, 1, 1, 0]

Before: [1, 1, 0, 0]
9 3 1 0
After:  [1, 1, 0, 0]

Before: [3, 1, 0, 1]
9 2 1 1
After:  [3, 1, 0, 1]

Before: [0, 0, 2, 3]
8 2 0 3
After:  [0, 0, 2, 2]

Before: [0, 2, 3, 3]
14 2 2 0
After:  [2, 2, 3, 3]

Before: [2, 1, 1, 1]
15 0 1 3
After:  [2, 1, 1, 3]

Before: [3, 1, 1, 2]
3 3 2 0
After:  [4, 1, 1, 2]

Before: [0, 3, 1, 1]
5 0 3 3
After:  [0, 3, 1, 0]

Before: [0, 0, 2, 0]
15 3 2 1
After:  [0, 2, 2, 0]

Before: [1, 2, 0, 3]
8 3 3 0
After:  [3, 2, 0, 3]

Before: [1, 0, 1, 1]
6 3 0 0
After:  [1, 0, 1, 1]

Before: [0, 1, 1, 2]
0 0 2 3
After:  [0, 1, 1, 1]

Before: [1, 1, 3, 1]
6 3 0 3
After:  [1, 1, 3, 1]

Before: [1, 1, 2, 3]
8 2 2 2
After:  [1, 1, 2, 3]

Before: [0, 1, 2, 0]
9 3 1 2
After:  [0, 1, 1, 0]

Before: [1, 2, 1, 1]
6 3 0 0
After:  [1, 2, 1, 1]

Before: [2, 1, 1, 0]
9 3 1 1
After:  [2, 1, 1, 0]

Before: [1, 2, 3, 3]
0 0 1 2
After:  [1, 2, 3, 3]

Before: [0, 1, 0, 0]
13 0 0 1
After:  [0, 0, 0, 0]

Before: [2, 1, 3, 2]
12 3 1 1
After:  [2, 3, 3, 2]

Before: [3, 1, 2, 1]
2 3 1 2
After:  [3, 1, 1, 1]

Before: [0, 2, 2, 0]
5 0 2 3
After:  [0, 2, 2, 0]

Before: [1, 3, 0, 3]
4 0 1 0
After:  [1, 3, 0, 3]

Before: [2, 1, 2, 2]
12 3 1 3
After:  [2, 1, 2, 3]

Before: [2, 2, 0, 3]
3 0 2 2
After:  [2, 2, 4, 3]

Before: [2, 1, 2, 2]
8 2 0 3
After:  [2, 1, 2, 2]

Before: [1, 3, 1, 2]
6 2 0 3
After:  [1, 3, 1, 1]

Before: [0, 1, 2, 0]
15 0 1 3
After:  [0, 1, 2, 1]

Before: [2, 2, 1, 2]
3 3 2 0
After:  [4, 2, 1, 2]

Before: [3, 1, 2, 0]
1 2 2 1
After:  [3, 4, 2, 0]

Before: [1, 2, 2, 3]
7 1 3 3
After:  [1, 2, 2, 6]

Before: [2, 1, 1, 2]
0 1 0 2
After:  [2, 1, 3, 2]

Before: [0, 3, 3, 2]
11 2 3 1
After:  [0, 2, 3, 2]

Before: [0, 1, 0, 0]
9 3 1 1
After:  [0, 1, 0, 0]

Before: [1, 3, 3, 2]
11 2 3 2
After:  [1, 3, 2, 2]

Before: [1, 2, 1, 3]
6 2 0 0
After:  [1, 2, 1, 3]

Before: [1, 0, 1, 3]
6 2 0 3
After:  [1, 0, 1, 1]

Before: [0, 2, 2, 2]
15 0 2 1
After:  [0, 2, 2, 2]

Before: [3, 3, 0, 3]
5 2 0 2
After:  [3, 3, 0, 3]

Before: [3, 3, 3, 3]
14 2 2 0
After:  [2, 3, 3, 3]

Before: [3, 0, 0, 3]
8 3 3 3
After:  [3, 0, 0, 3]

Before: [0, 3, 2, 0]
13 0 0 1
After:  [0, 0, 2, 0]

Before: [3, 1, 3, 0]
9 3 1 3
After:  [3, 1, 3, 1]

Before: [0, 1, 0, 3]
9 2 1 2
After:  [0, 1, 1, 3]

Before: [3, 3, 1, 1]
4 2 1 1
After:  [3, 1, 1, 1]

Before: [0, 1, 3, 1]
12 3 2 1
After:  [0, 3, 3, 1]

Before: [1, 3, 2, 0]
8 2 2 3
After:  [1, 3, 2, 2]

Before: [0, 0, 3, 1]
13 0 0 2
After:  [0, 0, 0, 1]

Before: [0, 2, 3, 2]
13 0 0 3
After:  [0, 2, 3, 0]

Before: [0, 0, 3, 1]
13 0 0 0
After:  [0, 0, 3, 1]

Before: [1, 3, 2, 0]
7 1 2 1
After:  [1, 6, 2, 0]

Before: [3, 3, 0, 2]
0 2 0 1
After:  [3, 3, 0, 2]

Before: [3, 2, 0, 0]
10 1 3 1
After:  [3, 6, 0, 0]

Before: [3, 2, 1, 0]
10 0 3 0
After:  [9, 2, 1, 0]

Before: [1, 1, 1, 1]
2 2 1 2
After:  [1, 1, 1, 1]

Before: [2, 1, 3, 3]
11 2 0 1
After:  [2, 2, 3, 3]

Before: [2, 3, 3, 3]
14 2 2 0
After:  [2, 3, 3, 3]

Before: [0, 1, 1, 0]
9 3 1 0
After:  [1, 1, 1, 0]

Before: [1, 1, 2, 0]
9 3 1 3
After:  [1, 1, 2, 1]

Before: [2, 3, 2, 0]
1 2 2 0
After:  [4, 3, 2, 0]

Before: [3, 2, 1, 0]
3 1 2 1
After:  [3, 4, 1, 0]

Before: [1, 3, 2, 3]
15 0 2 1
After:  [1, 3, 2, 3]

Before: [2, 0, 1, 3]
8 3 3 3
After:  [2, 0, 1, 3]

Before: [3, 1, 0, 1]
2 3 1 3
After:  [3, 1, 0, 1]

Before: [0, 1, 1, 0]
13 0 0 3
After:  [0, 1, 1, 0]

Before: [1, 3, 1, 3]
0 0 1 1
After:  [1, 3, 1, 3]

Before: [1, 0, 2, 2]
15 0 2 1
After:  [1, 3, 2, 2]

Before: [1, 2, 2, 1]
12 3 2 2
After:  [1, 2, 3, 1]

Before: [1, 3, 3, 1]
10 0 2 0
After:  [2, 3, 3, 1]

Before: [2, 1, 0, 1]
2 3 1 0
After:  [1, 1, 0, 1]

Before: [1, 0, 1, 1]
6 3 0 1
After:  [1, 1, 1, 1]

Before: [3, 3, 1, 1]
4 2 1 0
After:  [1, 3, 1, 1]

Before: [0, 3, 0, 3]
13 0 0 0
After:  [0, 3, 0, 3]

Before: [0, 1, 0, 3]
13 0 0 0
After:  [0, 1, 0, 3]

Before: [2, 2, 3, 2]
11 2 0 3
After:  [2, 2, 3, 2]

Before: [2, 3, 1, 1]
4 2 1 1
After:  [2, 1, 1, 1]

Before: [1, 3, 3, 2]
11 2 3 3
After:  [1, 3, 3, 2]

Before: [1, 3, 0, 0]
4 0 1 0
After:  [1, 3, 0, 0]

Before: [0, 1, 1, 2]
2 2 1 2
After:  [0, 1, 1, 2]

Before: [1, 2, 2, 1]
0 2 0 3
After:  [1, 2, 2, 3]

Before: [2, 0, 3, 1]
12 3 2 0
After:  [3, 0, 3, 1]

Before: [0, 1, 1, 2]
2 2 1 3
After:  [0, 1, 1, 1]

Before: [1, 1, 0, 3]
7 3 3 3
After:  [1, 1, 0, 9]

Before: [1, 3, 1, 1]
6 2 0 0
After:  [1, 3, 1, 1]

Before: [3, 1, 3, 3]
8 3 3 0
After:  [3, 1, 3, 3]

Before: [3, 3, 2, 2]
14 0 2 0
After:  [2, 3, 2, 2]

Before: [0, 2, 0, 2]
3 1 2 2
After:  [0, 2, 4, 2]

Before: [0, 1, 1, 1]
2 2 1 2
After:  [0, 1, 1, 1]

Before: [1, 3, 0, 3]
4 0 1 1
After:  [1, 1, 0, 3]

Before: [0, 3, 2, 1]
0 0 1 2
After:  [0, 3, 3, 1]

Before: [3, 2, 2, 2]
1 3 2 1
After:  [3, 4, 2, 2]

Before: [0, 3, 2, 3]
8 2 2 3
After:  [0, 3, 2, 2]

Before: [2, 0, 3, 2]
3 0 2 3
After:  [2, 0, 3, 4]

Before: [1, 2, 3, 1]
11 2 1 1
After:  [1, 2, 3, 1]

Before: [0, 2, 3, 0]
11 2 1 3
After:  [0, 2, 3, 2]

Before: [1, 0, 1, 2]
6 2 0 0
After:  [1, 0, 1, 2]

Before: [0, 0, 2, 3]
13 0 0 0
After:  [0, 0, 2, 3]

Before: [0, 0, 3, 2]
11 2 3 0
After:  [2, 0, 3, 2]

Before: [0, 3, 1, 2]
4 2 1 1
After:  [0, 1, 1, 2]

Before: [0, 1, 1, 2]
15 2 3 0
After:  [3, 1, 1, 2]

Before: [0, 1, 2, 2]
13 0 0 0
After:  [0, 1, 2, 2]

Before: [2, 1, 0, 1]
2 3 1 1
After:  [2, 1, 0, 1]

Before: [2, 1, 1, 1]
2 3 1 3
After:  [2, 1, 1, 1]

Before: [0, 0, 0, 0]
5 3 0 0
After:  [0, 0, 0, 0]

Before: [1, 2, 2, 1]
10 1 3 3
After:  [1, 2, 2, 6]

Before: [3, 3, 2, 3]
14 1 2 1
After:  [3, 2, 2, 3]

Before: [1, 1, 1, 1]
6 3 0 3
After:  [1, 1, 1, 1]

Before: [2, 3, 3, 0]
11 2 0 1
After:  [2, 2, 3, 0]

Before: [1, 0, 3, 3]
8 3 3 2
After:  [1, 0, 3, 3]

Before: [1, 3, 1, 1]
10 1 2 2
After:  [1, 3, 6, 1]

Before: [3, 0, 0, 2]
5 2 0 2
After:  [3, 0, 0, 2]

Before: [3, 1, 3, 0]
14 2 2 0
After:  [2, 1, 3, 0]

Before: [3, 3, 3, 2]
11 2 3 3
After:  [3, 3, 3, 2]

Before: [3, 3, 3, 3]
8 3 1 3
After:  [3, 3, 3, 3]

Before: [0, 0, 2, 0]
8 2 0 0
After:  [2, 0, 2, 0]

Before: [2, 2, 2, 1]
1 2 2 0
After:  [4, 2, 2, 1]

Before: [2, 2, 3, 0]
11 2 1 1
After:  [2, 2, 3, 0]

Before: [3, 2, 2, 3]
14 0 2 3
After:  [3, 2, 2, 2]

Before: [2, 1, 2, 3]
1 0 2 0
After:  [4, 1, 2, 3]

Before: [3, 1, 1, 0]
9 3 1 0
After:  [1, 1, 1, 0]

Before: [1, 3, 1, 3]
4 2 1 1
After:  [1, 1, 1, 3]

Before: [2, 0, 0, 1]
3 0 2 2
After:  [2, 0, 4, 1]

Before: [2, 0, 3, 2]
14 2 2 2
After:  [2, 0, 2, 2]

Before: [0, 1, 3, 1]
5 0 1 0
After:  [0, 1, 3, 1]

Before: [0, 3, 1, 3]
8 3 0 0
After:  [3, 3, 1, 3]

Before: [1, 2, 3, 1]
15 0 2 2
After:  [1, 2, 3, 1]

Before: [2, 2, 3, 2]
11 2 3 2
After:  [2, 2, 2, 2]

Before: [0, 3, 3, 3]
14 2 2 1
After:  [0, 2, 3, 3]

Before: [1, 0, 3, 0]
14 2 2 0
After:  [2, 0, 3, 0]

Before: [1, 2, 1, 0]
6 2 0 3
After:  [1, 2, 1, 1]

Before: [2, 0, 2, 2]
0 1 3 0
After:  [2, 0, 2, 2]

Before: [0, 1, 2, 1]
8 2 2 0
After:  [2, 1, 2, 1]

Before: [0, 2, 2, 1]
12 3 2 3
After:  [0, 2, 2, 3]

Before: [1, 3, 2, 3]
7 2 3 3
After:  [1, 3, 2, 6]

Before: [3, 1, 0, 0]
0 2 0 3
After:  [3, 1, 0, 3]

Before: [1, 3, 2, 3]
4 0 1 1
After:  [1, 1, 2, 3]

Before: [0, 2, 2, 1]
13 0 0 0
After:  [0, 2, 2, 1]

Before: [3, 1, 2, 3]
8 3 3 2
After:  [3, 1, 3, 3]

Before: [0, 1, 1, 3]
2 2 1 1
After:  [0, 1, 1, 3]

Before: [2, 2, 1, 1]
4 3 1 2
After:  [2, 2, 1, 1]

Before: [2, 1, 0, 0]
9 3 1 1
After:  [2, 1, 0, 0]

Before: [3, 1, 2, 2]
12 3 1 0
After:  [3, 1, 2, 2]

Before: [0, 1, 1, 2]
3 3 2 2
After:  [0, 1, 4, 2]

Before: [0, 2, 3, 0]
11 2 1 0
After:  [2, 2, 3, 0]

Before: [2, 0, 1, 3]
3 0 2 2
After:  [2, 0, 4, 3]

Before: [3, 2, 3, 2]
11 2 1 3
After:  [3, 2, 3, 2]

Before: [1, 1, 1, 0]
6 2 0 0
After:  [1, 1, 1, 0]

Before: [1, 1, 1, 3]
2 2 1 0
After:  [1, 1, 1, 3]

Before: [1, 2, 2, 1]
7 0 2 3
After:  [1, 2, 2, 2]

Before: [3, 2, 0, 2]
3 3 2 2
After:  [3, 2, 4, 2]

Before: [1, 2, 0, 3]
3 1 2 0
After:  [4, 2, 0, 3]

Before: [1, 2, 3, 1]
4 3 1 2
After:  [1, 2, 1, 1]

Before: [3, 2, 2, 1]
14 0 2 2
After:  [3, 2, 2, 1]

Before: [2, 1, 3, 2]
11 2 3 2
After:  [2, 1, 2, 2]

Before: [0, 3, 1, 3]
5 0 3 3
After:  [0, 3, 1, 0]

Before: [3, 3, 2, 0]
1 2 2 1
After:  [3, 4, 2, 0]

Before: [1, 1, 0, 2]
9 2 1 2
After:  [1, 1, 1, 2]

Before: [3, 0, 2, 1]
12 3 2 3
After:  [3, 0, 2, 3]

Before: [3, 3, 0, 1]
10 0 3 1
After:  [3, 9, 0, 1]

Before: [0, 2, 3, 1]
10 1 3 2
After:  [0, 2, 6, 1]

Before: [2, 0, 2, 0]
10 2 3 3
After:  [2, 0, 2, 6]

Before: [0, 3, 2, 1]
5 0 2 0
After:  [0, 3, 2, 1]

Before: [3, 1, 3, 0]
9 3 1 1
After:  [3, 1, 3, 0]

Before: [0, 2, 2, 3]
8 3 0 3
After:  [0, 2, 2, 3]

Before: [0, 3, 0, 1]
13 0 0 2
After:  [0, 3, 0, 1]

Before: [0, 0, 0, 1]
13 0 0 0
After:  [0, 0, 0, 1]

Before: [1, 2, 0, 1]
6 3 0 2
After:  [1, 2, 1, 1]

Before: [2, 3, 2, 0]
15 3 2 1
After:  [2, 2, 2, 0]

Before: [1, 0, 2, 2]
0 2 0 1
After:  [1, 3, 2, 2]

Before: [2, 2, 0, 2]
10 0 3 3
After:  [2, 2, 0, 6]

Before: [2, 2, 3, 3]
8 3 3 1
After:  [2, 3, 3, 3]

Before: [0, 2, 3, 3]
5 0 3 2
After:  [0, 2, 0, 3]

Before: [0, 1, 2, 2]
8 2 2 0
After:  [2, 1, 2, 2]

Before: [2, 2, 2, 2]
8 2 2 3
After:  [2, 2, 2, 2]

Before: [1, 3, 1, 2]
4 0 1 0
After:  [1, 3, 1, 2]

Before: [2, 2, 3, 1]
14 2 2 0
After:  [2, 2, 3, 1]

Before: [3, 1, 1, 0]
9 3 1 1
After:  [3, 1, 1, 0]

Before: [1, 3, 3, 1]
6 3 0 2
After:  [1, 3, 1, 1]

Before: [3, 1, 0, 2]
9 2 1 1
After:  [3, 1, 0, 2]

Before: [2, 0, 3, 0]
11 2 0 3
After:  [2, 0, 3, 2]

Before: [0, 0, 3, 3]
8 3 3 2
After:  [0, 0, 3, 3]

Before: [3, 1, 3, 1]
15 1 2 0
After:  [3, 1, 3, 1]

Before: [3, 3, 2, 1]
12 3 2 3
After:  [3, 3, 2, 3]

Before: [1, 0, 1, 2]
6 2 0 1
After:  [1, 1, 1, 2]

Before: [2, 3, 1, 0]
4 2 1 2
After:  [2, 3, 1, 0]

Before: [2, 1, 2, 0]
9 3 1 1
After:  [2, 1, 2, 0]

Before: [2, 3, 2, 3]
8 3 1 0
After:  [3, 3, 2, 3]

Before: [0, 2, 1, 1]
4 3 1 2
After:  [0, 2, 1, 1]

Before: [0, 0, 0, 1]
13 0 0 3
After:  [0, 0, 0, 0]

Before: [0, 1, 2, 1]
8 2 2 3
After:  [0, 1, 2, 2]

Before: [1, 1, 0, 1]
10 3 2 1
After:  [1, 2, 0, 1]

Before: [1, 1, 1, 3]
6 2 0 0
After:  [1, 1, 1, 3]

Before: [1, 3, 1, 3]
6 2 0 2
After:  [1, 3, 1, 3]

Before: [2, 3, 3, 2]
11 2 3 0
After:  [2, 3, 3, 2]

Before: [1, 2, 0, 3]
8 3 3 2
After:  [1, 2, 3, 3]

Before: [2, 1, 1, 3]
10 3 2 0
After:  [6, 1, 1, 3]

Before: [2, 1, 1, 3]
2 2 1 1
After:  [2, 1, 1, 3]

Before: [1, 0, 2, 3]
1 2 2 2
After:  [1, 0, 4, 3]

Before: [3, 2, 2, 1]
8 2 2 3
After:  [3, 2, 2, 2]

Before: [1, 1, 0, 2]
12 3 1 3
After:  [1, 1, 0, 3]

Before: [0, 2, 3, 3]
5 0 2 1
After:  [0, 0, 3, 3]

Before: [0, 1, 3, 2]
3 3 2 1
After:  [0, 4, 3, 2]

Before: [0, 2, 3, 1]
14 2 2 3
After:  [0, 2, 3, 2]

Before: [3, 3, 3, 2]
7 2 3 3
After:  [3, 3, 3, 6]

Before: [1, 3, 2, 3]
14 3 2 1
After:  [1, 2, 2, 3]

Before: [0, 2, 3, 0]
13 0 0 2
After:  [0, 2, 0, 0]

Before: [0, 1, 0, 3]
13 0 0 2
After:  [0, 1, 0, 3]

Before: [1, 1, 1, 1]
6 2 0 3
After:  [1, 1, 1, 1]

Before: [1, 2, 3, 0]
3 1 2 1
After:  [1, 4, 3, 0]

Before: [0, 0, 3, 3]
15 0 3 1
After:  [0, 3, 3, 3]

Before: [0, 2, 3, 1]
11 2 1 3
After:  [0, 2, 3, 2]

Before: [1, 3, 2, 3]
14 1 2 0
After:  [2, 3, 2, 3]

Before: [0, 1, 0, 1]
2 3 1 0
After:  [1, 1, 0, 1]

Before: [0, 3, 1, 1]
13 0 0 3
After:  [0, 3, 1, 0]

Before: [0, 1, 3, 2]
11 2 3 1
After:  [0, 2, 3, 2]

Before: [3, 1, 1, 2]
12 3 1 2
After:  [3, 1, 3, 2]

Before: [3, 2, 3, 2]
3 1 2 0
After:  [4, 2, 3, 2]

Before: [0, 2, 3, 3]
5 0 3 0
After:  [0, 2, 3, 3]

Before: [3, 3, 0, 1]
5 2 0 1
After:  [3, 0, 0, 1]

Before: [1, 1, 1, 0]
6 2 0 2
After:  [1, 1, 1, 0]

Before: [1, 3, 1, 0]
6 2 0 1
After:  [1, 1, 1, 0]

Before: [0, 3, 1, 2]
0 0 3 1
After:  [0, 2, 1, 2]

Before: [0, 3, 1, 3]
0 2 1 0
After:  [3, 3, 1, 3]

Before: [1, 2, 3, 1]
6 3 0 1
After:  [1, 1, 3, 1]

Before: [0, 3, 1, 1]
4 2 1 3
After:  [0, 3, 1, 1]

Before: [1, 1, 1, 2]
12 3 1 3
After:  [1, 1, 1, 3]

Before: [3, 1, 3, 2]
10 0 3 3
After:  [3, 1, 3, 9]

Before: [0, 3, 0, 0]
5 2 0 2
After:  [0, 3, 0, 0]

Before: [2, 1, 1, 2]
12 3 1 0
After:  [3, 1, 1, 2]

Before: [2, 2, 3, 3]
7 1 3 1
After:  [2, 6, 3, 3]

Before: [1, 2, 2, 3]
7 0 1 0
After:  [2, 2, 2, 3]

Before: [2, 2, 0, 1]
3 0 2 2
After:  [2, 2, 4, 1]

Before: [1, 2, 0, 1]
3 1 2 3
After:  [1, 2, 0, 4]

Before: [0, 2, 0, 1]
4 3 1 1
After:  [0, 1, 0, 1]

Before: [3, 2, 2, 2]
1 1 2 1
After:  [3, 4, 2, 2]

Before: [2, 2, 1, 1]
0 1 2 0
After:  [3, 2, 1, 1]

Before: [1, 3, 3, 3]
4 0 1 3
After:  [1, 3, 3, 1]

Before: [1, 3, 1, 3]
8 3 3 0
After:  [3, 3, 1, 3]

Before: [3, 1, 1, 1]
10 0 3 3
After:  [3, 1, 1, 9]

Before: [2, 2, 0, 3]
3 1 2 3
After:  [2, 2, 0, 4]

Before: [1, 1, 3, 1]
15 0 2 3
After:  [1, 1, 3, 3]

Before: [1, 3, 2, 2]
1 3 2 3
After:  [1, 3, 2, 4]

Before: [3, 0, 2, 1]
8 2 2 0
After:  [2, 0, 2, 1]

Before: [3, 3, 2, 1]
7 0 2 2
After:  [3, 3, 6, 1]

Before: [3, 3, 2, 3]
14 1 2 2
After:  [3, 3, 2, 3]

Before: [3, 2, 0, 2]
3 3 2 0
After:  [4, 2, 0, 2]

Before: [2, 1, 1, 0]
2 2 1 2
After:  [2, 1, 1, 0]

Before: [1, 0, 3, 3]
14 2 2 1
After:  [1, 2, 3, 3]

Before: [1, 3, 2, 2]
14 1 2 2
After:  [1, 3, 2, 2]

Before: [1, 0, 3, 1]
12 3 2 0
After:  [3, 0, 3, 1]

Before: [3, 1, 3, 2]
11 2 3 1
After:  [3, 2, 3, 2]

Before: [2, 2, 2, 1]
1 2 2 1
After:  [2, 4, 2, 1]

Before: [3, 1, 3, 0]
9 3 1 0
After:  [1, 1, 3, 0]

Before: [3, 2, 2, 2]
1 1 2 3
After:  [3, 2, 2, 4]

Before: [1, 3, 2, 1]
6 3 0 1
After:  [1, 1, 2, 1]

Before: [0, 2, 2, 0]
0 0 1 2
After:  [0, 2, 2, 0]

Before: [0, 0, 0, 0]
5 1 0 1
After:  [0, 0, 0, 0]

Before: [0, 1, 2, 0]
1 2 2 0
After:  [4, 1, 2, 0]

Before: [2, 0, 3, 3]
11 2 0 2
After:  [2, 0, 2, 3]

Before: [3, 3, 2, 2]
14 1 2 1
After:  [3, 2, 2, 2]

Before: [1, 1, 0, 1]
9 2 1 0
After:  [1, 1, 0, 1]

Before: [2, 3, 0, 3]
7 0 3 2
After:  [2, 3, 6, 3]

Before: [2, 3, 3, 1]
12 3 2 2
After:  [2, 3, 3, 1]

Before: [0, 2, 3, 3]
11 2 1 3
After:  [0, 2, 3, 2]

Before: [3, 3, 0, 2]
5 2 0 1
After:  [3, 0, 0, 2]

Before: [1, 1, 1, 1]
6 3 0 1
After:  [1, 1, 1, 1]

Before: [2, 3, 0, 3]
10 3 2 1
After:  [2, 6, 0, 3]

Before: [2, 1, 2, 2]
7 1 2 0
After:  [2, 1, 2, 2]

Before: [0, 2, 2, 2]
1 1 2 0
After:  [4, 2, 2, 2]

Before: [0, 3, 1, 2]
10 3 3 2
After:  [0, 3, 6, 2]

Before: [3, 2, 3, 3]
3 1 2 3
After:  [3, 2, 3, 4]

Before: [1, 1, 2, 3]
7 3 3 1
After:  [1, 9, 2, 3]

Before: [2, 3, 3, 3]
3 0 2 2
After:  [2, 3, 4, 3]

Before: [1, 3, 1, 1]
6 2 0 1
After:  [1, 1, 1, 1]

Before: [3, 1, 1, 3]
15 2 3 3
After:  [3, 1, 1, 3]

Before: [1, 0, 2, 3]
8 3 0 3
After:  [1, 0, 2, 3]

Before: [0, 3, 2, 2]
14 1 2 3
After:  [0, 3, 2, 2]

Before: [1, 1, 0, 0]
9 3 1 1
After:  [1, 1, 0, 0]

Before: [2, 2, 3, 3]
3 1 2 2
After:  [2, 2, 4, 3]

Before: [2, 2, 3, 3]
11 2 0 1
After:  [2, 2, 3, 3]

Before: [0, 2, 0, 2]
3 3 2 3
After:  [0, 2, 0, 4]

Before: [2, 3, 2, 0]
10 2 3 1
After:  [2, 6, 2, 0]

Before: [3, 2, 3, 0]
11 2 1 3
After:  [3, 2, 3, 2]

Before: [1, 2, 3, 0]
15 0 2 2
After:  [1, 2, 3, 0]

Before: [0, 3, 1, 1]
4 2 1 0
After:  [1, 3, 1, 1]

Before: [1, 0, 3, 3]
7 2 3 1
After:  [1, 9, 3, 3]

Before: [2, 1, 3, 1]
11 2 0 0
After:  [2, 1, 3, 1]

Before: [0, 1, 2, 0]
15 0 1 0
After:  [1, 1, 2, 0]

Before: [1, 2, 1, 2]
6 2 0 0
After:  [1, 2, 1, 2]

Before: [3, 0, 2, 1]
12 3 2 1
After:  [3, 3, 2, 1]

Before: [0, 3, 2, 1]
12 3 2 3
After:  [0, 3, 2, 3]

Before: [0, 1, 0, 0]
9 2 1 3
After:  [0, 1, 0, 1]

Before: [1, 1, 1, 1]
2 2 1 3
After:  [1, 1, 1, 1]

Before: [3, 2, 3, 2]
11 2 3 1
After:  [3, 2, 3, 2]

Before: [3, 2, 3, 1]
10 2 3 3
After:  [3, 2, 3, 9]

Before: [1, 1, 3, 2]
11 2 3 3
After:  [1, 1, 3, 2]

Before: [0, 2, 1, 0]
3 1 2 2
After:  [0, 2, 4, 0]

Before: [0, 0, 1, 1]
5 0 3 3
After:  [0, 0, 1, 0]

Before: [1, 1, 1, 2]
6 2 0 3
After:  [1, 1, 1, 1]

Before: [0, 3, 1, 3]
4 2 1 2
After:  [0, 3, 1, 3]

Before: [2, 0, 1, 0]
5 1 0 3
After:  [2, 0, 1, 0]

Before: [2, 3, 2, 1]
14 1 2 2
After:  [2, 3, 2, 1]

Before: [0, 0, 1, 3]
15 1 3 3
After:  [0, 0, 1, 3]

Before: [2, 3, 0, 2]
7 1 3 0
After:  [6, 3, 0, 2]

Before: [1, 3, 0, 1]
6 3 0 2
After:  [1, 3, 1, 1]

Before: [3, 1, 3, 1]
12 3 2 2
After:  [3, 1, 3, 1]

Before: [2, 1, 3, 1]
10 3 2 3
After:  [2, 1, 3, 2]

Before: [0, 1, 0, 0]
9 2 1 1
After:  [0, 1, 0, 0]

Before: [2, 1, 2, 1]
8 2 0 0
After:  [2, 1, 2, 1]

Before: [3, 2, 2, 2]
10 0 3 3
After:  [3, 2, 2, 9]

Before: [0, 1, 3, 1]
2 3 1 2
After:  [0, 1, 1, 1]

Before: [1, 3, 3, 3]
15 0 2 0
After:  [3, 3, 3, 3]

Before: [3, 2, 2, 1]
12 3 2 0
After:  [3, 2, 2, 1]

Before: [0, 3, 2, 1]
12 3 2 1
After:  [0, 3, 2, 1]

Before: [0, 0, 2, 0]
8 2 2 1
After:  [0, 2, 2, 0]

Before: [0, 3, 0, 3]
7 3 3 2
After:  [0, 3, 9, 3]

Before: [1, 2, 2, 2]
7 0 1 0
After:  [2, 2, 2, 2]

Before: [0, 1, 1, 3]
5 0 3 0
After:  [0, 1, 1, 3]

Before: [2, 0, 3, 3]
0 1 2 2
After:  [2, 0, 3, 3]

Before: [3, 1, 0, 0]
9 2 1 2
After:  [3, 1, 1, 0]

Before: [0, 0, 0, 3]
8 3 0 1
After:  [0, 3, 0, 3]

Before: [3, 1, 2, 1]
12 3 2 3
After:  [3, 1, 2, 3]

Before: [3, 2, 0, 2]
5 2 0 0
After:  [0, 2, 0, 2]

Before: [0, 2, 1, 3]
7 3 3 3
After:  [0, 2, 1, 9]

Before: [2, 3, 2, 2]
1 2 2 0
After:  [4, 3, 2, 2]

Before: [1, 3, 2, 0]
7 0 2 1
After:  [1, 2, 2, 0]

Before: [0, 3, 3, 1]
12 3 2 2
After:  [0, 3, 3, 1]

Before: [3, 3, 1, 2]
4 2 1 1
After:  [3, 1, 1, 2]

Before: [0, 1, 3, 3]
15 1 2 0
After:  [3, 1, 3, 3]

Before: [0, 3, 1, 3]
8 3 0 2
After:  [0, 3, 3, 3]

Before: [3, 1, 2, 2]
15 1 3 3
After:  [3, 1, 2, 3]

Before: [0, 1, 2, 0]
13 0 0 1
After:  [0, 0, 2, 0]

Before: [1, 0, 1, 3]
7 3 3 2
After:  [1, 0, 9, 3]

Before: [2, 0, 1, 3]
7 0 3 3
After:  [2, 0, 1, 6]

Before: [0, 3, 1, 0]
4 2 1 0
After:  [1, 3, 1, 0]

Before: [0, 0, 0, 3]
13 0 0 3
After:  [0, 0, 0, 0]

Before: [2, 1, 0, 2]
9 2 1 0
After:  [1, 1, 0, 2]

Before: [1, 0, 0, 2]
3 3 2 3
After:  [1, 0, 0, 4]

Before: [0, 1, 0, 0]
9 2 1 2
After:  [0, 1, 1, 0]

Before: [3, 3, 0, 0]
10 1 3 2
After:  [3, 3, 9, 0]

Before: [0, 0, 2, 2]
15 1 2 3
After:  [0, 0, 2, 2]

Before: [1, 3, 1, 0]
4 2 1 2
After:  [1, 3, 1, 0]

Before: [0, 3, 0, 3]
13 0 0 1
After:  [0, 0, 0, 3]

Before: [0, 0, 3, 0]
5 1 0 0
After:  [0, 0, 3, 0]

Before: [0, 1, 1, 3]
2 2 1 3
After:  [0, 1, 1, 1]

Before: [0, 0, 2, 1]
12 3 2 0
After:  [3, 0, 2, 1]

Before: [0, 2, 2, 2]
5 0 1 0
After:  [0, 2, 2, 2]

Before: [0, 3, 1, 2]
13 0 0 1
After:  [0, 0, 1, 2]

Before: [0, 1, 2, 2]
7 1 2 2
After:  [0, 1, 2, 2]

Before: [1, 3, 1, 1]
4 0 1 1
After:  [1, 1, 1, 1]

Before: [0, 1, 0, 1]
9 2 1 0
After:  [1, 1, 0, 1]

Before: [0, 2, 3, 3]
7 3 3 3
After:  [0, 2, 3, 9]

Before: [0, 0, 2, 1]
10 2 3 1
After:  [0, 6, 2, 1]

Before: [3, 2, 3, 2]
11 2 3 3
After:  [3, 2, 3, 2]

Before: [2, 1, 1, 2]
12 3 1 3
After:  [2, 1, 1, 3]

Before: [0, 3, 3, 3]
13 0 0 1
After:  [0, 0, 3, 3]

Before: [0, 0, 2, 0]
13 0 0 3
After:  [0, 0, 2, 0]

Before: [2, 2, 3, 3]
3 1 2 0
After:  [4, 2, 3, 3]

Before: [1, 3, 3, 2]
10 1 3 1
After:  [1, 9, 3, 2]

Before: [0, 1, 2, 1]
2 3 1 3
After:  [0, 1, 2, 1]

Before: [2, 3, 1, 1]
0 2 1 1
After:  [2, 3, 1, 1]

Before: [1, 1, 0, 1]
9 2 1 1
After:  [1, 1, 0, 1]

Before: [3, 2, 1, 2]
10 3 3 1
After:  [3, 6, 1, 2]

Before: [1, 0, 2, 2]
0 1 3 3
After:  [1, 0, 2, 2]

Before: [3, 3, 2, 2]
14 0 2 3
After:  [3, 3, 2, 2]

Before: [2, 3, 0, 2]
10 1 2 2
After:  [2, 3, 6, 2]

Before: [1, 3, 2, 0]
4 0 1 0
After:  [1, 3, 2, 0]

Before: [1, 1, 1, 0]
2 2 1 1
After:  [1, 1, 1, 0]

Before: [1, 1, 2, 1]
2 3 1 0
After:  [1, 1, 2, 1]

Before: [0, 3, 0, 3]
15 0 3 0
After:  [3, 3, 0, 3]

Before: [0, 2, 2, 3]
8 2 0 2
After:  [0, 2, 2, 3]

Before: [0, 3, 3, 0]
13 0 0 3
After:  [0, 3, 3, 0]

Before: [3, 2, 2, 1]
4 3 1 1
After:  [3, 1, 2, 1]

Before: [3, 2, 2, 0]
14 0 2 0
After:  [2, 2, 2, 0]

Before: [0, 0, 1, 3]
7 3 3 3
After:  [0, 0, 1, 9]

Before: [2, 3, 3, 2]
11 2 3 2
After:  [2, 3, 2, 2]

Before: [1, 2, 3, 2]
11 2 1 0
After:  [2, 2, 3, 2]

Before: [1, 1, 3, 1]
12 3 2 3
After:  [1, 1, 3, 3]

Before: [2, 3, 1, 2]
3 0 2 1
After:  [2, 4, 1, 2]

Before: [1, 2, 1, 1]
6 3 0 2
After:  [1, 2, 1, 1]

Before: [0, 1, 2, 0]
9 3 1 3
After:  [0, 1, 2, 1]

Before: [1, 0, 2, 1]
15 0 2 1
After:  [1, 3, 2, 1]

Before: [1, 0, 2, 1]
12 3 2 0
After:  [3, 0, 2, 1]

Before: [3, 1, 2, 3]
8 3 3 0
After:  [3, 1, 2, 3]

Before: [1, 0, 2, 2]
15 1 2 2
After:  [1, 0, 2, 2]

Before: [2, 0, 1, 2]
0 2 0 1
After:  [2, 3, 1, 2]

Before: [1, 3, 1, 2]
4 2 1 3
After:  [1, 3, 1, 1]

Before: [0, 0, 0, 3]
5 2 0 2
After:  [0, 0, 0, 3]

Before: [2, 1, 2, 3]
1 2 2 0
After:  [4, 1, 2, 3]

Before: [0, 1, 1, 0]
2 2 1 1
After:  [0, 1, 1, 0]

Before: [1, 1, 1, 0]
6 2 0 1
After:  [1, 1, 1, 0]

Before: [2, 2, 1, 1]
3 0 2 3
After:  [2, 2, 1, 4]

Before: [0, 2, 3, 1]
4 3 1 2
After:  [0, 2, 1, 1]

Before: [2, 0, 2, 2]
8 2 2 3
After:  [2, 0, 2, 2]

Before: [1, 3, 1, 0]
0 0 1 2
After:  [1, 3, 3, 0]

Before: [1, 2, 1, 1]
6 3 0 1
After:  [1, 1, 1, 1]

Before: [1, 2, 0, 0]
7 0 1 0
After:  [2, 2, 0, 0]

Before: [1, 2, 2, 1]
12 3 2 1
After:  [1, 3, 2, 1]

Before: [0, 1, 1, 0]
2 2 1 2
After:  [0, 1, 1, 0]`;

const inputPart2 = `12 3 3 2
12 3 2 0
12 2 1 1
0 1 2 1
10 1 1 1
1 1 3 3
8 3 1 1
10 2 0 2
3 2 2 2
12 0 2 3
12 2 2 0
9 3 2 3
10 3 2 3
1 1 3 1
8 1 3 3
10 0 0 1
3 1 1 1
10 2 0 0
3 0 3 0
0 2 0 1
10 1 1 1
1 3 1 3
12 2 0 0
10 1 0 1
3 1 1 1
12 3 1 2
7 1 0 2
10 2 1 2
1 3 2 3
8 3 2 2
10 2 0 1
3 1 2 1
12 0 0 3
12 3 0 0
11 0 1 1
10 1 2 1
10 1 1 1
1 1 2 2
12 0 0 1
12 1 3 3
12 2 1 0
12 3 1 0
10 0 2 0
1 2 0 2
8 2 2 3
10 1 0 1
3 1 1 1
10 3 0 0
3 0 3 0
12 0 2 2
4 2 0 2
10 2 3 2
10 2 1 2
1 3 2 3
12 2 1 2
10 0 0 1
3 1 2 1
6 2 0 0
10 0 3 0
1 3 0 3
8 3 1 1
12 0 1 2
12 2 2 3
12 2 3 0
2 0 3 2
10 2 1 2
1 2 1 1
12 1 1 3
12 0 1 2
13 0 3 0
10 0 2 0
1 0 1 1
8 1 2 2
12 2 0 1
12 2 2 3
12 2 0 0
2 0 3 1
10 1 3 1
1 1 2 2
8 2 0 1
12 1 0 3
10 3 0 0
3 0 1 0
12 2 0 2
8 0 2 0
10 0 2 0
1 0 1 1
8 1 3 0
12 3 2 2
12 3 1 1
12 3 3 3
12 2 3 1
10 1 3 1
1 0 1 0
12 0 2 2
12 0 3 3
12 2 2 1
15 1 3 3
10 3 1 3
1 0 3 0
8 0 0 3
12 2 3 0
12 3 2 2
12 3 0 1
6 0 1 0
10 0 3 0
1 0 3 3
8 3 3 1
12 1 3 2
12 2 1 0
12 2 2 3
2 0 3 0
10 0 3 0
1 1 0 1
12 2 0 0
10 3 0 2
3 2 3 2
15 0 3 2
10 2 1 2
10 2 3 2
1 1 2 1
10 2 0 0
3 0 3 0
12 0 1 2
5 2 3 2
10 2 1 2
1 1 2 1
8 1 2 0
12 3 3 3
12 1 3 2
12 3 1 1
14 1 2 3
10 3 3 3
10 3 1 3
1 0 3 0
8 0 2 2
10 2 0 0
3 0 3 0
12 1 0 1
12 2 1 3
7 1 3 1
10 1 3 1
1 2 1 2
8 2 1 1
12 1 1 0
12 2 0 2
12 3 2 3
8 0 2 0
10 0 2 0
1 1 0 1
8 1 2 3
12 0 1 2
12 0 1 0
10 1 0 1
3 1 1 1
12 2 1 1
10 1 3 1
1 1 3 3
8 3 3 1
12 0 1 3
12 2 0 2
12 1 2 0
8 0 2 3
10 3 1 3
1 3 1 1
8 1 0 2
12 3 3 1
12 3 0 3
12 2 1 0
11 1 0 0
10 0 2 0
10 0 3 0
1 2 0 2
8 2 1 0
12 0 0 3
12 3 2 2
12 1 3 1
5 3 2 1
10 1 3 1
1 1 0 0
8 0 0 3
12 0 1 1
12 1 2 0
10 0 2 2
10 2 1 2
1 2 3 3
10 3 0 0
3 0 2 0
12 3 1 2
10 0 0 1
3 1 2 1
0 1 2 2
10 2 1 2
1 3 2 3
8 3 0 1
12 3 3 2
12 2 0 3
0 0 2 3
10 3 3 3
1 1 3 1
8 1 2 2
12 1 2 0
12 0 3 3
12 3 0 1
3 0 1 3
10 3 3 3
1 3 2 2
8 2 2 1
12 2 1 3
12 0 2 2
12 2 3 0
2 0 3 0
10 0 1 0
1 0 1 1
8 1 0 2
12 0 0 1
12 2 0 0
15 0 3 1
10 1 2 1
1 1 2 2
8 2 3 1
12 3 1 2
2 0 3 2
10 2 2 2
1 2 1 1
12 3 3 0
12 2 0 2
6 2 0 3
10 3 2 3
1 1 3 1
8 1 0 0
12 2 3 3
12 1 1 1
12 1 2 2
7 1 3 3
10 3 2 3
1 0 3 0
8 0 0 3
10 1 0 2
3 2 0 2
12 1 0 0
10 1 2 1
10 1 3 1
10 1 1 1
1 3 1 3
8 3 0 2
12 2 1 3
12 2 2 0
12 1 0 1
2 0 3 0
10 0 2 0
1 0 2 2
12 2 3 0
10 3 0 3
3 3 1 3
12 0 0 1
13 0 3 3
10 3 1 3
10 3 2 3
1 2 3 2
12 1 1 3
10 1 0 1
3 1 1 1
7 1 0 1
10 1 3 1
1 2 1 2
8 2 2 0
12 0 3 3
10 0 0 2
3 2 3 2
12 0 2 1
5 3 2 3
10 3 1 3
1 0 3 0
8 0 2 1
12 1 1 0
12 2 0 3
1 0 0 0
10 0 1 0
1 1 0 1
8 1 1 0
12 0 3 2
12 1 2 1
12 0 3 3
12 3 1 3
10 3 3 3
1 3 0 0
8 0 1 3
12 1 1 0
10 0 2 1
10 1 3 1
1 3 1 3
8 3 1 1
12 3 2 0
10 2 0 2
3 2 3 2
12 0 2 3
5 3 2 2
10 2 2 2
1 2 1 1
8 1 2 3
12 2 0 0
12 3 3 2
12 3 0 1
11 1 0 1
10 1 3 1
10 1 2 1
1 1 3 3
8 3 3 1
12 1 1 0
10 2 0 2
3 2 2 2
12 1 0 3
8 0 2 2
10 2 2 2
1 2 1 1
12 1 3 2
1 3 3 0
10 0 2 0
10 0 1 0
1 0 1 1
12 3 3 2
12 0 1 3
12 1 2 0
10 0 2 2
10 2 1 2
1 1 2 1
8 1 3 3
12 3 3 0
10 0 0 2
3 2 0 2
12 1 3 1
4 2 0 0
10 0 1 0
1 0 3 3
8 3 3 1
12 1 1 3
12 2 2 2
12 3 1 0
1 3 3 2
10 2 2 2
1 2 1 1
10 1 0 3
3 3 0 3
10 2 0 0
3 0 1 0
12 2 3 2
9 3 2 0
10 0 1 0
1 0 1 1
12 2 1 3
12 1 3 2
12 2 1 0
2 0 3 2
10 2 1 2
1 1 2 1
10 0 0 0
3 0 3 0
12 3 2 2
10 0 0 3
3 3 0 3
5 3 2 3
10 3 3 3
1 3 1 1
8 1 0 3
12 0 1 2
12 3 2 1
4 2 0 0
10 0 1 0
1 0 3 3
12 2 3 2
12 1 3 0
12 0 0 1
3 0 1 0
10 0 2 0
10 0 3 0
1 0 3 3
8 3 1 1
10 3 0 3
3 3 2 3
12 1 3 0
12 0 1 2
5 2 3 3
10 3 1 3
10 3 1 3
1 3 1 1
8 1 1 3
12 2 3 1
10 3 0 0
3 0 2 0
10 0 0 2
3 2 3 2
0 0 2 1
10 1 3 1
10 1 2 1
1 3 1 3
12 3 0 0
12 2 2 2
12 2 1 1
0 2 0 0
10 0 2 0
1 3 0 3
8 3 3 0
12 0 2 3
12 3 1 3
10 3 3 3
1 3 0 0
12 3 1 1
10 2 0 3
3 3 0 3
10 2 0 2
3 2 1 2
14 1 2 2
10 2 2 2
10 2 1 2
1 2 0 0
10 2 0 3
3 3 3 3
12 1 3 2
14 1 2 1
10 1 2 1
1 0 1 0
12 3 3 1
12 2 1 2
12 0 2 3
6 2 1 2
10 2 3 2
10 2 1 2
1 0 2 0
8 0 1 3
12 1 3 0
12 3 0 2
12 0 0 1
3 0 1 1
10 1 1 1
1 3 1 3
8 3 3 1
10 2 0 2
3 2 2 2
10 2 0 3
3 3 1 3
12 2 1 0
13 0 3 3
10 3 1 3
1 1 3 1
12 2 1 3
2 0 3 2
10 2 3 2
1 2 1 1
8 1 0 2
12 3 1 1
10 1 0 3
3 3 1 3
3 3 1 1
10 1 2 1
1 2 1 2
8 2 1 0
12 0 2 3
12 0 2 1
12 3 1 2
12 2 3 2
10 2 1 2
1 0 2 0
8 0 1 2
12 3 2 3
12 0 2 0
10 3 0 1
3 1 2 1
11 3 1 1
10 1 2 1
10 1 3 1
1 2 1 2
8 2 0 3
12 0 1 2
10 2 0 0
3 0 1 0
10 1 0 1
3 1 2 1
1 0 0 2
10 2 2 2
1 2 3 3
12 0 2 2
1 0 0 1
10 1 2 1
1 1 3 3
12 3 1 0
10 3 0 2
3 2 2 2
12 1 1 1
6 2 0 1
10 1 1 1
1 1 3 3
8 3 2 1
12 0 1 2
12 1 3 3
12 2 2 0
10 3 2 2
10 2 3 2
1 2 1 1
8 1 0 0
12 2 1 3
12 0 3 1
12 2 3 2
15 2 3 2
10 2 3 2
1 0 2 0
8 0 3 2
10 0 0 0
3 0 1 0
12 1 3 3
3 0 1 1
10 1 1 1
1 2 1 2
8 2 1 1
12 2 0 2
12 2 1 0
13 0 3 0
10 0 2 0
1 1 0 1
8 1 0 0
12 2 0 3
12 3 1 2
12 3 3 1
14 1 2 3
10 3 3 3
10 3 3 3
1 0 3 0
8 0 3 2
12 1 1 0
12 2 3 3
12 1 0 1
7 1 3 1
10 1 3 1
1 2 1 2
8 2 2 3
10 0 0 0
3 0 2 0
12 2 1 2
12 3 0 1
6 2 1 0
10 0 3 0
1 0 3 3
8 3 0 1
10 1 0 3
3 3 2 3
10 3 0 0
3 0 2 0
2 0 3 3
10 3 2 3
1 1 3 1
8 1 2 0
12 1 3 1
12 1 1 3
10 0 0 2
3 2 3 2
10 1 2 3
10 3 1 3
1 0 3 0
8 0 0 1
12 0 0 3
10 0 0 2
3 2 2 2
12 0 1 0
9 3 2 0
10 0 1 0
1 1 0 1
8 1 0 2
12 2 1 0
12 1 0 1
12 1 2 3
13 0 3 3
10 3 3 3
1 2 3 2
8 2 1 0
12 0 0 1
12 0 2 2
12 1 3 3
3 3 1 1
10 1 3 1
1 0 1 0
12 3 1 1
12 2 3 3
5 2 3 3
10 3 2 3
1 0 3 0
8 0 1 2
12 2 0 1
12 2 2 0
10 3 0 3
3 3 2 3
2 0 3 0
10 0 1 0
10 0 3 0
1 2 0 2
8 2 2 0
12 2 2 2
12 3 0 1
6 2 1 1
10 1 2 1
1 0 1 0
8 0 1 3
12 2 1 1
10 3 0 0
3 0 1 0
8 0 2 1
10 1 2 1
1 3 1 3
12 3 0 1
12 0 1 0
6 2 1 1
10 1 1 1
1 1 3 3
12 0 2 1
12 3 3 0
12 3 0 2
12 1 2 1
10 1 1 1
10 1 1 1
1 3 1 3
12 1 0 0
12 3 1 1
12 0 2 2
3 0 1 2
10 2 1 2
1 3 2 3
12 3 3 2
12 2 0 0
12 1 0 1
10 1 2 2
10 2 3 2
1 3 2 3
8 3 0 2
10 0 0 3
3 3 1 3
1 3 3 1
10 1 2 1
1 2 1 2
8 2 1 3
12 0 2 2
12 3 0 0
12 0 1 1
4 2 0 2
10 2 2 2
1 2 3 3
8 3 0 0
10 2 0 1
3 1 2 1
12 0 0 3
12 0 1 2
15 1 3 2
10 2 3 2
10 2 1 2
1 2 0 0
8 0 0 2
12 3 0 1
12 3 3 3
12 1 3 0
3 0 1 1
10 1 1 1
1 1 2 2
8 2 2 0
10 1 0 3
3 3 2 3
12 0 2 2
12 0 1 1
5 2 3 2
10 2 3 2
1 0 2 0
12 0 1 2
5 2 3 1
10 1 2 1
1 1 0 0
8 0 3 1
12 1 3 0
7 0 3 2
10 2 1 2
1 1 2 1
8 1 3 2
10 2 0 1
3 1 0 1
12 1 0 3
3 3 1 0
10 0 1 0
10 0 2 0
1 0 2 2
8 2 2 0
10 1 0 3
3 3 3 3
10 3 0 1
3 1 1 1
12 1 2 2
14 3 2 2
10 2 3 2
1 0 2 0
8 0 1 1
12 2 0 3
12 0 1 2
12 2 1 0
5 2 3 0
10 0 2 0
1 0 1 1
12 3 2 0
12 2 0 2
10 1 0 3
3 3 0 3
6 2 0 2
10 2 2 2
10 2 3 2
1 1 2 1
12 2 2 3
12 2 0 0
12 3 3 2
4 0 2 3
10 3 1 3
1 3 1 1
8 1 3 3
12 3 2 1
0 0 2 0
10 0 2 0
1 0 3 3
8 3 1 0
12 1 3 3
10 3 0 1
3 1 1 1
12 0 2 2
10 1 2 1
10 1 3 1
1 1 0 0
8 0 1 1
12 2 2 3
12 1 0 0
12 3 1 2
7 0 3 0
10 0 3 0
1 1 0 1
8 1 2 2
12 1 0 1
10 2 0 0
3 0 2 0
12 1 0 3
7 3 0 0
10 0 2 0
1 2 0 2
12 2 3 3
12 2 2 0
2 0 3 1
10 1 2 1
1 2 1 2
8 2 3 1
12 0 1 0
12 3 1 2
12 1 0 3
10 3 2 0
10 0 2 0
1 0 1 1
8 1 1 2
12 2 3 0
12 0 3 1
13 0 3 0
10 0 3 0
10 0 2 0
1 2 0 2
12 2 2 0
12 3 3 1
7 3 0 1
10 1 3 1
1 1 2 2
8 2 2 0
12 3 1 2
10 3 0 1
3 1 2 1
0 1 2 3
10 3 2 3
10 3 3 3
1 0 3 0
12 3 2 1
12 0 3 3
5 3 2 1
10 1 3 1
10 1 1 1
1 1 0 0
8 0 0 3
12 0 3 2
12 2 2 0
12 3 0 1
11 1 0 0
10 0 2 0
1 3 0 3
8 3 0 1
12 0 3 3
10 0 0 0
3 0 3 0
10 2 0 2
3 2 2 2
9 3 2 2
10 2 3 2
1 1 2 1
12 2 1 2
15 2 3 2
10 2 2 2
10 2 1 2
1 2 1 1
12 2 0 3
12 0 3 2
4 2 0 2
10 2 3 2
1 2 1 1
8 1 3 3
10 1 0 2
3 2 3 2
12 2 1 1
12 0 2 0
0 1 2 1
10 1 3 1
1 1 3 3
8 3 1 1
10 0 0 2
3 2 0 2
12 3 2 3
10 3 0 0
3 0 1 0
10 0 2 0
10 0 3 0
10 0 2 0
1 0 1 1
8 1 2 2
10 1 0 1
3 1 2 1
10 1 0 0
3 0 2 0
12 1 3 1
10 1 2 1
1 2 1 2
12 1 3 3
10 3 0 1
3 1 3 1
6 0 1 3
10 3 3 3
10 3 2 3
1 3 2 2
12 2 2 3
12 1 3 0
7 0 3 1
10 1 3 1
1 2 1 2
10 1 0 0
3 0 0 0
10 3 0 3
3 3 1 3
12 1 0 1
1 3 3 0
10 0 1 0
1 2 0 2
8 2 3 1
12 2 3 3
12 1 3 0
12 1 1 2
7 0 3 3
10 3 2 3
1 3 1 1
8 1 3 2
12 2 0 0
12 2 3 3
12 3 2 1
2 0 3 1
10 1 3 1
1 2 1 2
8 2 3 1
12 3 3 3
12 3 2 0
12 2 3 2
0 2 0 2
10 2 1 2
10 2 1 2
1 2 1 1
8 1 1 0`;

const re = /Before: \[(\d), (\d), (\d), (\d)\]\n(\d+) (\d) (\d) (\d)\nAfter:  \[(\d), (\d), (\d), (\d)\]/g;

function day16_part1(input) {
    let results = [];
    let match;
    while ((match = re.exec(input)) !== null) {
        const opcodes = {
            'addr': (a, b) => register(a) + register(b),
            'addi': (a, b) => register(a) + b,
            'mulr': (a, b) => register(a) * register(b),
            'muli': (a, b) => register(a) * b,
            'banr': (a, b) => register(a) & register(b),
            'bani': (a, b) => register(a) & b,
            'borr': (a, b) => register(a) | register(b),
            'bori': (a, b) => register(a) | b,
            'setr': (a, b) => register(a),
            'seti': (a, b) => a,
            'gtir': (a, b) => a > register(b) ? 1 : 0,
            'gtri': (a, b) => register(a) > b ? 1 : 0,
            'gtrr': (a, b) => register(a) > register(b) ? 1 : 0,
            'eqir': (a, b) => a === register(b) ? 1 : 0,
            'eqri': (a, b) => register(a) === b ? 1 : 0,
            'eqrr': (a, b) => register(a) === register(b) ? 1 : 0,
        };
        
        function register(a) {
            if (a > 3) throw Error('unknown register');
            return before[a];
        };

        const [
            before0,
            before1,
            before2,
            before3,
            opcode,
            inputA,
            inputB,
            outputC,
            after0,
            after1,
            after2,
            after3,
        ] = match.slice(1, 13).map(n => parseInt(n, 10));
        const before = [before0, before1, before2, before3];
        const after = [after0, after1, after2, after3];
        const validOpcodes = Object.keys(opcodes).filter(o => {
            let possibleOutput = before.slice(0);
            possibleOutput[outputC] = opcodes[o](inputA, inputB);
            return possibleOutput.every((x, i) => x === after[i]);
        });
        results.push(validOpcodes.length >= 3);
    }
    return results.filter(x => x === true).length;
}

console.log(day16_part1(input));

const intToOpcode = ['borr',
'addr',
'eqrr',
'addi',
'eqri',
'eqir',
'gtri',
'mulr',
'setr',
'gtir',
'muli',
'banr',
'seti',
'gtrr',
'bani',
'bori',]

function day16_part2(input) {
    let registers = [0, 0, 0, 0];

    const opcodes = {
        'addr': (a, b) => registers[a] + registers[b],
        'addi': (a, b) => registers[a] + b,
        'mulr': (a, b) => registers[a] * registers[b],
        'muli': (a, b) => registers[a] * b,
        'banr': (a, b) => registers[a] & registers[b],
        'bani': (a, b) => registers[a] & b,
        'borr': (a, b) => registers[a] | registers[b],
        'bori': (a, b) => registers[a] | b,
        'setr': (a, b) => registers[a],
        'seti': (a, b) => a,
        'gtir': (a, b) => a > registers[b] ? 1 : 0,
        'gtri': (a, b) => registers[a] > b ? 1 : 0,
        'gtrr': (a, b) => registers[a] > registers[b] ? 1 : 0,
        'eqir': (a, b) => a === registers[b] ? 1 : 0,
        'eqri': (a, b) => registers[a] === b ? 1 : 0,
        'eqrr': (a, b) => registers[a] === registers[b] ? 1 : 0,
    };

    input.split('\n').map(instr => {
        const [opcode, inputA, inputB, outputC] = instr.split(' ').map(n => parseInt(n, 10));
        registers[outputC] = opcodes[intToOpcode[opcode]](inputA, inputB);
    });

    return registers[0];
}

console.log(day16_part2(inputPart2));