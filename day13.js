/*
*/

const assert = require('assert');

// NOTE: \'s need to be escaped and spaces were not being captured correctly (text editor?) so replaced temporarily with x's
const sampleInput1 = `/->-\\xxxxxxxx
|xxx|xx/----\\
|x/-+--+-\\xx|
|x|x|xx|xvxx|
\\-+-/xx\\-+--/
xx\\------/xxx`;

const sampleInput2 = `/>-<\\xx
|xxx|xx
|x/<+-\\
|x|x|xv
\\>+</x|
xx|xxx^
xx\\<->/
`;

const inputInput = `xxxxxxxxxxxxxxxxxxxxxxxxxxxx/-----------------\\xxxxxxxxxxxxxxxxxxx/--------------------------------------------------------------------------------\\xx
xxxxxxxxxxxxxxxxxxxxxxx/----+----------\\xxxxxx|xx/----------------+-------------------------------------------------------------------\\xxxxxxxxxxxx|xx
xxxxxxxxxxxxxxxxxxxxxxx|xxxx|xxxx/-----+---\\xx|xx|x/--------------+->-----------------------------------------------------------\\xxxxx|xxxxxxxxxxxx|xx
xxxxxxxxxxxxxxxxxxxxxx/+----+----+-----+---+--+--+-+--------------+-----------------------\\xxxxxxx/----<-------------------\\xxxx|xxxxx|xxxxxxxxxxxx|xx
xxx/------------------++----+----+-----+---+--+--+-+------------\\x|xxxxxx/----------------+-------+------------------------+----+-----+--\\xxxxxxxxx|xx
xxx|xxxxxxxxxxxxxxxxxx||xxxx|xxxx|xxxxx|xxx|xx|xx|x|xxxxxxxxxxxx|x|/-----+----------------+-------+--------------\\xxxxxxxxx|xxxx|xxxxx|xx|xxxxxxxxx|xx
xxx|xxxxxxxxxxxxxxxxxx||xxxx|xxxx|xxxxx|xxx|xx|xx|x|xxxxxxxxxxxx|x||xxxxxvxxxxxx/---------+-------+--------------+---------+----+-----+--+--\\xxxxxx|xx
xxx|xxxxxxxxxxxxxxxxxx||xxxx|xxxx|xxxxx|xx/+--+--+-+--------\\xxx|x||xxxxx|xxxxxx|xxxxxxxxx|x/-----+-------\\xx/---+---------+----+-----+-\\|xx|xxxxxx|xx
xxx|xxxxxxxxxxxxxxx/--++----+----+-----+--++--+--+-+--------+---+-++-----+------+---------+-+---\\x|xxxxxxx|xx|xxx|xxxxxxxxx|xxxx|xxxxx|x||xx|xxxxxx|xx
xxx|xxxxxx/--------+--++----+----+-----+--++--+--+-+--------+---+-++-----+-----\\|xxxxxxxx/+-+---+-+-------+--+---+---------+----+-----+-++--+------+\\x
xxx|xxxxxx|x/------+--++----+----+-----+--++--+--+-+--------+---+-++----<+-----++--------++-+---+-+-\\xxxxx|xx|xxx|xxxxxxxxx|xxxx|xxxxx|x||xx|xxxxxx||x
xxx|xxxxxx|x|xxxxxx|xx||xxxx|xxxx|xxxxx|xx||xx|x/+-+--------+---+-++-----+-----++--------++-+---+-+-+-----+--+---+---------+----+-----+-++--+----\\x||x
xxx|xxx/--+-+------+--++----+----+-----+--++-\\|x||x|xxxxxxxx|xxx|x||xxxxx|xxxxx||xxxxxxxx||x|xxx|x|x|xxxxx|xx|xxx|xxxxxxxxx|xxxx|xxxxx|x||xx|xxxx|x||x
xxx|xxx|xx|x|xxxxxx|xx||xxxx|xxxx|xxxxx|xx||x||x||x|xxxxxxxx|xxx|x||xxxxx|xxx/-++--------++-+---+-+-+-----+--+---+-\\xxxxxxx|/---+-----+\\||xx|xxxx|x||x
xxx|xxx|xx|x|xxxxx/+--++----+----+-----+--++-++-++-+-------\\|xxx|x||/----+---+-++--------++-+---+-+-+-----+--+---+-+-------++---+-----++++--+\\xxx|x||x
xxx|/--+--+-+-----++--++----+----+-----+--++-++-++-+-------++---+-+++----+---+\\||xxxxxxxx||x|xxx|x|x|xxxxx|xx|xxx|x|xxxxxxx||xxx|xxxxx||||xx||xxx|x||x
xxx||xx|xx|x|xxxxx||xx||xxxx|xxxx\\-----+--+/x||x||x|xxxxxxx||xxx|x|||xxxx|xxx||||xxxxxxxx||x|xxx|x|x|xxxxx|xx|xxx|x|xxxxxxx||xxx|xxxxx||||xx||xxx|x||x
xxx||xx|xx|x|/----++--++----+----------+--+--++-++-+-------++---+-+++----+---++++--------++-+->-+-+-+-----+--+---+-+-----\\x||xxx|xxxxx||||xx||xxx|x||x
xxx||xx|xx|x||xxxx||xx||xxxx|xxxxxxxxxx|xx|xx||x|\\-+-------++---+-+++----+---++++--------++-+---+-+-+-----+--+---+-+-----+-++---+-----/|||xx||xxx|x||x
xx/++--+--+-++--\\x||xx||xxxx|xxxxxxxxxx|xx|xx||x|xx|xxxxxxx||xxx|x|||xxxx|xxx||||xxxxxxxx||x|xxx|x|x|xxxxx|xx|xxx|x|xxxxx|x||xxx|xxxxxx|||xx||xxx|x||x
xx|||xx|xx|x||xx|x||xx||xxxx|xxxxxxxxxx|xx\\--++-+--+-------+/xxx|x|||xxxx|xxx||||xxxxxxxx||x|xxx|x|x|xxxxx|xx|xxx|x|xxxxx|x||xxx|xxxxxx|||xx||xxx|x||x
xx|||xx|xx|x||xx|x||xx||xxxx|xxxxxxxxxx|xxxxx||x|xx|xxxxxxx|xxxx|x|||xxxx|xxx||||x/------++-+---+-+-+-----+--+---+-+-----+-++---+-----\\|||xx||xxx|x||x
xx|||xx|xx|x||xx|x||xx||xxxx|xxxxxxxxxx|xxxxx||x|xx|xxxxxxx|xxxx|x|||xxxx|xxx||||x|/-----++-+---+-+-+-----+--+---+-+-----+-++---+-\\xxx||||xx||xxx|x||x
xx|||xx|xx|x||xx|x||xx||x/--+----------+-----++-+--+-------+----+-+++----+---++++\\||xxxxx||x|xxx|x|x|xxxxx|xx|xxx|x|xxxxx|x||xxx|x|xxx||||xx||xxx|x||x
xx|||xx|xx|x||xx|x||xx||x|xx|xxxxxxxxxx|xxxxx||x|xx|xxxxxxx|xxxx|x|||xxxx|xxx|||\\+++-----++-+---+-+-+-----+--+---+-+-----+-++---+-+---++++--/|xxx|x||x
xx|||xx|xx|x||xx|x||xx||x|xx|xxxxxxxxxx|xxxxx||x|x/+---->--+---\\|x|||xxxx|xxx|||x|||xxxx/++-+---+-+-+-----+--+---+-+-----+-++---+-+\\xx||||xxx|xxx|x||x
xx|||xx|xx|/++--+-++--++-+--+----------+-----++-+-++-------+---++-+++----+---+++-+++----+++-+---+-+-+-----+--+---+-+---\\x|x||xxx|x||xx||||xxx|xxx|x||x
xx|||xx|xx||||xx|x||xx||x|xx|xxxx/-----+-----++-+-++-------+---++-+++----+---+++-+++----+++-+---+-+-+-----+--+-\\x|x|xxx|x|x||xxx|x||xx||||xxx|xxx|x||x
xx|||xx|xx||||xx|x||xx||x|xx|xxxx|xxxxx|xxxxx||x|x||xxxxxxx|xxx||x|\\+----+---+++-+++----+++-+---+-+-+-----+--+-+-/x|xxx|/+-++---+-++--++++---+---+-++\\
xx|||xx|xx||\\+--+-++--++-+--+----+-----+-----++-+-++-------+---++-+-+----+---+++-+++----+++-+---+-+-/xxxxx|xx|x|xxx|xxx|||x||xxx|x||xx||||xxx|xxx|x|||
x/+++--+--++-+--+-++--++-+--+----+-----+-----++-+-++-------+---++-+-+----+---+++-+++----+++-+--\\|x|xxxxxxx|xx|x|xxx|xxx|||x||xxx|x||xx||||xxx|xxx|x|||
x||||xx|xx||x|xx|x||xx||x|xx|xxxx|xxxxx|xxxxx||x|x||xxxxxxx|xxx||x|x|xxxx|xxx|||x|||xxxx|||x\\--++-+-------/xx|x|xxx|xxx|||x||xxx|x||xx||||xxx|xxx|x|||
x||||xx|x/++-+--+-++--++-+--+----+-----+-\\xxx||x|x||xxx/---+---++-+-+----+---+++-+++----+++----++-+----------+-+---+---+++-++---+\\||xx||||xxx|xxx|x|||
x||||x/+-+++-+--+-++--++-+--+----+-----+-+---++-+-++---+---+---++-+-+----+---+++-+++----+++----++-+---\\xxxxxx|x|xxx|xxx|||x||xxx||||xx||||xxx|xxx|x|||
x||||x||x|||x|xx|x||xx||x|xx|xx/-+-----+-+---++-+-++---+---+---++-+-+--\\x|xxx|||x|||xxxx|\\+----++-+---+------+-+---+---+++-++---++++--++++---+---+-+/|
x||||x||x|||x|xxvx||xx|\\-+--+--+-+-----/x|xxx||x|x||xxx|x/-+---++-+-+--+-+---+++-+++-\\xx|x|xxxx||x|xxx|xxxxxx|x|xxx|xxx|||x||xxx||||xx||||xxx|xxx|x|x|
x||||x||x|||x|xx|/++--+--+--+--+-+-------+---++-+-++---+-+-+---++-+-+--+-+---+++-+++-+--+-+----++-+---+------+-+-\\x|xxx|||x||xxx||||xx||||xxx|xxx|x|x|
x||||x||x|||x|xx||||xx|xx|xx|xx|x|xxxxxxx|xxx||x|x||xxx|x|x|xxx||x|x|xx|x|xxx|||x|\\+-+--+-+----++-+---+------+-+-+-+---+++-++---++++--/|||xxx|xxx|x|x|
x||||x||x|||/+--++++--+--+--+--+-+-------+---++-+-++---+-+-+---++-+-+--+-+---+++-+-+-+--+-+----++-+---+------+-+-+-+-\\x|||x||xxx||||xxx|||xxx|xxx|x|x|
x||||x||x|||||xx||||xx|x/+--+--+-+-----\\x|xxx||x|x||xxx|x|x|xxx||x|x|xx|x|xxx|||x|x|x|xx\\-+----++-+---+------+-+-+-+-+-+++-++---+++/xxx|||xxx|xxx|x|x|
x||||x||x|||||xx||||xx|x||xx|xx|x|xxxxx|/+---++-+-++---+-+-+---++-+-+--+-+---+++-+-+-+----+----++-+---+------+\\|x|x|x|x|||x||xxx|||xxxx|||xxx|xxx|x|x|
x||||x||x|||||xx||||xx|/++--+--+-+-----+++---++-+-++---+-+-+---++-+-+--+-+---+++-+-+-+---\\|xxxx||x|xxx|xxxxxx|||x|x|x|x|||x||xxx|||xxxx|||xxx|xxx|x|x|
x||||x||x|||||xx||||xx||||xx|xx|x|xxxxx|||xxx||x|x||/--+-+-+---++-+-+--+-+---+++-+-+-+---++----++-+---+------+++-+-+-+-+++-++---+++----+++---+--\\|x|x|
x||||/++-+++++--++++--++++--+--+-+-----+++---++-+-+++--+-+-+---++-+-+--+-+---+++-+-+-+---++\\xxx||x|xxx|xxxxxx|||x|x|x|x|||x||xxx|||xxxx|||xxx|xx||x|x|
x|||||||x|||||xx|||\\--++++--+--+-+-----+++---++-+-+++--+-+-+---++-+-+--+-+---+++-+-+-+---+++---+/x|xxx|xxxxxx|||x|x|x|x|||x||xxx|||xxxx|||xxx|xx||x|x|
x|||||||x|||||xx|||x/-++++--+--+-+-----+++---++-+-+++-\\|x|x|xxx||x|x|xx|x|xxx|||/+-+-+---+++---+--+---+------+++-+-+-+-+++-++---+++----+++-\\x|xx||x|x|
x|||||||x|||||xx|||x|x||||/-+--+-+-----+++---++-+-+++-++-+-+---++-+-+--+-+---+++++-+-+---+++---+--+---+------+++-+-+-+-+++-++-\\x|||xxxx|||x|x|xx||x|x|
x\\++++++-+++++--+++-+-+++++-+--+-+-----+++---++-+-+++-++-+-+---++-+-+--+-+---+++++-+-+---+++---/xx|xxx|xxxxxx|||x|x|x|x|||x||x|x|||xxxx|||x|x|xx||x^x|
xx||||||x|||||xx|||x|x|||||x|xx|x|xxxxx|||xxx||x|x|||x||x|x|xxx||x|x|/-+-+---+++++-+-+---+++------+---+------+++-+-+-+-+++-++-+-+++----+++-+-+--++\\|x|
xx||||||x|||||xx|||x|x|||||x|xx|x|xxxxx|||xxx||x|x|||x||x|x|/--++-+-++-+-+---+++++-+-+---+++------+-\\x|xxxxxx\\++-+-+-+-+++-++-+-+++----+/|x|x|xx||||x|
xx||||||x|||||xx|||x|x|||||x|xx|x|xxxxx|||xxx||x|x|||x||x|x||xx||x|x||x|x|xxx|||||x|x|/--+++------+-+-+-------++-+-+-+-+++-++-+-+++-\\xx|x|x|x|xx||||x|
xx||\\+++-+++++--+++-+-+++++-+--+-+-----+++---++-+-+++-++-+-++--++-+-++-+-+---+/|||x|x||xx|||xxxxxx|x|x|xxxxxxx||x|x|x|x|||x||/+-+++-+--+-+-+-+--++++\\|
xx||x|||x|||||xx|||x|x|||||x|xx|x|xxxxx|||xxx||x|x|||x||x|x||/-++-+-++-+-+\\xx|x|||x|x^|xx|||xxxxxx|x|x|x/-----++-+-+-+-+++-++++-+++-+--+-+-+-+-\\||||||
xx||x|||/+++++--+++-+-+++++-+--+-+-----+++---++-+-+++-++-+-+++-++-+-++-+-++--+-+++-+-++--+++------+-+-+\\|xxxxx||x|x|x|x|||x||||x|||x|xx|x|x|x|x|||||||
xx||x|||||||||xx|||x|x|||||x|xx|x|xxxxx|||xxx||x|x|||x||x|x|||x||x\\-++-+-++--+-+++-+-++--+++------+-+-+++-----++-+-+-+-+++-++++-+++-+--+-+-+-+-++++/||
/-++-+++++++++--+++-+-+++++-+--+-+-----+++---++-+-+++-++-+-+++-++---++-+-++--+-+++-+-++--+++------+\\|x|||xx/--++-+-+-+-+++\\||||x|||x|xx|x|x|x|x||||x||
|x||x|||||||||xx|||x|x|||||x|xx|x|xxxxx|||xxx||x|x|||/++-+-+++-++---++-+-++--+-+++-+-++--+++------+++-+++--+-\\||x|x|x|x||||||||x|||x|xx|x|x|x|x||||x||
|x||x|||||||||xx|||x|x|||||x|xx|x|xxxxx|||xxx||/+-++++++-+-+++-++---++-+-++--+-+++\\|x||xx|||xxxxxx|||x|||xx|x|||x|x|x|x||||||||x|||x|xx|x|x|x|x||||x||
|x||/+++++++++--+++-+\\|||||x\\--+-+-----+++---+/||x\\+++++-+-+++-/|xxx||x|x||xx|x|||||x||xx|||xxxxxx|||x|||xx|x|||x|x|x|x||||||||x|||x|xx|x|x|x|x||||x||
|x||||||||||||xx|||x|||||||x/--+-+-----+++---+-++--+++++-+\\|||xx|xxx|^x|x||xx|x|||||x||xx|||xxxxxx|||x|||xx|x|||x|x|x|x||||||||x|||x|xx|x|x|x|x||||x||
|x||||||||||||xx|||x|||||||x|xx|x|xxxxx|||xxx|x||xx|||||x|||||xx|/--++-+-++--+<+++++-++--+++------+++-+++--+-+++-+-+-+-++++++++-+++-+\\x|x|x|x|x||||x||
|x||||||||||||xx|||x|||||||x|xx|x|xxxxx|||xx/+-++--+++++-+++++--++--++-+-++--+-+++++-++--+++------+++-+++-\\|x|||x|x|x|x||||||||x|||x||x|x|x|x|x||||x||
|x||||||||||||xx|||x|||||||x|xx|x|xxxxx|||xx||x||/-+++++-+++++--++--++-+-++--+-+++++-++-\\|||xxxxxx|||x|||x||x|||x|x|x|x||||||||x|||x||x|x|x|x|x||||x||
|x||||||||||||xx|\\+-+++++++-+--+-+-----+++--++-+++-+++++-+++++--++--++-+-++--+-+++++-++-++++------+++-+++-++-+++-/x|x|x||||||||x|||x||x|x|x|x|x||||x||
|x|||||||||||\\--+-+-+++++++-+--+-+-----+++--++-+++-+++++-+++++--++--++-+-++--+-+++++-++-++++------+++-+++-++-+++---+-+-++/|||||x|||x||x|x|x|x|x||||x||
|x|||||||||||xxx|x|x||\\++++-+--+-+-----+++--++-+++-+++++-+++++--++--++-+-++--+-+++++-++-++/|xxxxxx|||x|||x||x|||xxx|x|x||x|||||x|||x||x|x|x|x|x||||x||
|x|||||||||||xxx|x|x||x||||x|xx|x|xxx/-+++--++-+++-+++++-+++++--++--++-+-++--+-+++++-++-++-+------+++-+++-++-+++---+-+-++-+++++-+++-++-+\\|x|x|x||||x||
|x|||||||||||xxx|x|x||x||||x|xx|x|xxx|x|||xx||x|||x|\\+++-+++++--++--++-+-++--+-+++++-++-++-+------+++-+++-++-+++---+-+-++-+++++-+++-++-+++-+-+-+/||x||
|x|||||||||||xx/+-+-++-++++-+--+-+---+-+++--++-+++-+-+++-+++++--++--++-+-++--+-+++++-++-++-+--\\xxx|||x|||x||x|||xxx|/+-++-+++++-+++-++-+++-+-+-+\\||x||
|x|||||||||||xx||x|x||x||||x|xx|x|xxx|x|||xx||x|||x|x|||x|||||xx||xx||x|x||xx|x|||||x||x||x|xx|xxx|||x|||x||x|||xxx|||x||x|||||x|||x||x|||x|x|x||||x||
|x|||||||||||xx||x|x||x||||x|xx|x|xxx|x|||xx||x|||x|x|||x|||||xx||xx||x|x||xx|x|\\+++-++-++-+--+---+++-+++-++-+++---+++-++-+++++-+++-++-+++-/x|x||||x||
|x|||||||||||xx||x|/++-++++-+--+-+---+-+++--++-+++-+-+++-+++++--++-\\||x|x||xx|x|x|||x||x||x|xx|xxx\\++-+++-++-+++---+++-++-+/|||x|||x||x|||xxx|x||||x||
|x|||||||||||xx||x||||x||||x|xx\\-+---+-+++--++-+++-+-+++-+++++--++-+++-/x||xx|x|x|||x||x||/+--+----++-+++-++-+++---+++-++-+-+++-+++-++-+++--\\|x||||x||
|x|||||||||||xx||x||||x||||x|xxxx|xxx|x|||x/++-+++-+-+++-+++++--++-+++---++--+-+-+++-++-++++--+----++-+++-++-+++---+++-++-+-+++-+++-++-+++--++\\||||x||
|x|||||||||||xx||x||||x||||/+----+---+-+++-+++-+++-+-+++-+++++--++-+++---++--+-+-+++-++-++++--+----++-+++\\||x|||xxx|||x||x|x|||x|||x||x|||xx|||||||x||
|x|||||||||||xx||x||||x|\\++++----+---+-/||x|||x|||x|x|||x|||||xx||x|||xxx||xx|x|x|||x||x||||xx|xxxx||x||||||x|||xxx|||x||x|x|||x|||x||x|||xx|||||||x||
|x|||||||||||xx||x||||x|x||||xxxx|xxx|xx||x|||x|||x|x|||x|||||x/++-+++---++--+-+-+++-++\\||||xx|xxxx||x||||||x|||xxx|||x||x|x|||x|||x||x|||xx|||||||x||
|x|||||||||||xx||x||||x|x\\+++----+---+--++-+++-+++-+-+++-+++++-+++-+++---++--+-+-/||x|||||||xx|xxxx||/++++++-+++\\xx|||x||x|x|||x|||x||x|||xx|||||||x||
|x|||||||||||xx||x||||x|xx|||xxxx|xxx|xx||x|||x|||x|x|||x|||||x|||x|||xxx||xx|x|xx||x|||||||xx|xxxx|||||||||x||||xx|||x||x|x|||x|||x||x|||xx|||||||x||
|x|||||||||||xx||x||||x|xx|||xxxx|xxx|xx||x|||x|||x|x|||x|||||x|||x|||xxx||xx|x|xx||x|||||||/-+----+++++++++-++++--+++-++-+-+++\\|||x||x|||xx|||||||x||
|x|||||||||||xx||x||||x|xx|||xxxx|xxx|xx||x|||x|||x|x|||x|||||x|||x|||xxx||xx|x|xx||x||||||||x|xxxx|||||||||x||||xx|||x||x|x|||||||x||x|||xx|||||||x||
|x|||||||||||xx||x||||x|xx|||xxxx|xxx|xx||x|||x|||x\\-+++-+++++-+++-+++---++--+-+--++-++++++++-+----+++++++++-++++--+++-++-+-++++/||x||x|||xx|||||||x||
|x|||||||||||xx||x\\+++-+--+++----+---+--++-+++-+++---+++-++/||x|||x|||xxx||/-+-+--++\\||||||||x|xxxx|||||||||/++++--+++-++-+-++++-++-++-+++-\\|||||||x||
|x|||||||||||xx||xx|||/+--+++----+---+--++-+++-+++---+++-++-++-+++\\|||xxx|||x|x|xx|||||||||||x|xxxx||||||||||||||xx|||x||x|x||||x||x||x|||x||||||||x||
|x||||^||||||xx||xx|||||xx|||xxxx|xxx|xx||x|||x|||xxx|||x||x||x|||||||xxx|||x|x|xx|||||||||||x|xxxx||||||||||||||xx|\\+-++-+-++++-++-++-+++-+++++/||x||
|x|\\+++++++++--++--+++++--+++----+---+--++-+++-+++---+++-++-++-+/|||\\+---+++-+-+--+++++++++++-+----++++++++++++++--+-+-++-+-++++-++-++-+++-++/||x||x||
|x|x|||||||||xx||xx|||||xx|||xxxx|xxx|xx||x|||x|||xxx|||x||x||x|x|||x|xxx|||x|x|xx|||||||||||x|xx/-++++++++++++++-\\|x|x||x|x||||x||x||x|||x||x||x||x||
|x|x||||||\\++--++--+++++--+++----+---+--++-+++-+++---+++-++-++-+-+++-+---+++-+-/xx|||||||||||x|xx|x||||||||||||||x||x|x||x|x||||x||x||x|||x||x||x||x||
|/+-++++++-++-\\||xx|||||xx||\\----+---+--++-+++-+++---+++-+/x||x|x|||x|xxx|||x|xxxx|||||||||||x|xx|x||||||||||||||x||x|x||x|x||||x||x||x|||x||x||x||x||
|||x||||||x||x|||xx|||||xx||xxxxx|xxx|xx||x|||x|||xxx|||x|/-++-+-+++-+\\xx|||x|xxxx|||||||||||x|xx|x||||||||||||||x||x|x||x|x||||x||x||x|||x||x||x||x||
|||x||||||x||x|||xx|||||xx||xxxxx|xxx|xx||x|||x|||xxx|||x||x|\\-+-+++-++--+/|x|xxxx||||||||||\\-+--+-++++++++++++++-++-+-++-+-+++/x||x||x|||x||x||x||x||
|||x||||||x||x|||xx|||||xx||xxxxx|xxx|xx||x|||x|||xxx|||x||x|xx|x|||x||xx|x|x|xxxx||||||||||xx|xx|x||\\++++++++++/x||x|/++-+-+++--++-++\\|||x||x||x||x||
|||x||||||x||x|||xx|||||xx||xxxxx|xxx|xx||x|||x|||xxx|||x||x|xx|x|||x||xx|x|x|xxxx||||||||||xx|xx|x||x||||||||||xx||x||||x|x|||xx||x||||||x||x||x||x||
|||x||||||x||x|||x/+++++--++-----+---+--++-+++-+++---+++-++-+--+-+++-++--+-+-+----++++++++++--+--+-++\\||||||||||xx||x||||x|x|||xx||x||||||x||x||x||x||
|||x||||||x||x|||x||||||/-++-----+---+--++-+++-+++---+++-++-+--+-+++-++--+-+-+----++++++++++--+--+-+++++++++++++--++-++++-+-+++-\\||x||||||x||x||x||x||
|||x||||||x||x|||x|||||||x||xxxxx|xxx|xx||x|||x|||xxx|||x||x|xx|x|||x||xx|x|x|xxxx||||||||||xx|xx|x|||||||||||||xx||x||||x|x|||x|||x||||||x||x||x||x||
|||x||||||x||x|||x||||v||x||xxxxx|xxx|xx||x|||x|||xxx|||x||x|xx|x|||x||xx|x|x|xxxx||||||||||xx|xx|x|||||||||||||xx||x||||x|x|||x|||x||||||x||x||x||x||
|||x||||||x||x|||/+++++++-++----\\|xxx|xx||x|||x|||xxx|||x||x|xx\\-+++-++--+-+-+----+++++/||||xx|xx|x|||||||||||||xx||x||||x|x|||x|||x||||||x||x||x||x||
|||x||||||x||x|||||||||||x||xxxx||xxx|xx||x|||x|\\+---+++-++-+----+++-++--+-+-+----+++++-++++--+--+-+++++++++++++--++-++++-+-+++-+++-++++++-++-++-/|x||
|||x||||||x||x|||||||||||x||xxxx||xxx|xx||x|||x|x|xxx|||x|\\-+----+++-+/xx|x|x|xxxx|||||x||||xx|xx|x|||||||||||||x/++-++++-+-+++-+++-++++++-++-++--+\\||
|||x||||||x||x|||||||||||x||xxxx||xxx|xx||x|||x|x|xxx|||x|xx|xxx/+++-+---+-+-+--\\x|||||x||||xx|xx|x|||||||||||||x|||x||||x|x|||x|||x||||||x||x||xx||||
|||x||||||x||x|||||||||||x||xxxx||xxx|xx||x|||x|x|xxx||\\-+--+---++++-+---+-+-+--+-+++++-++++--+--+-+++++++++++++-+++-++++-+-+++-+/|x||||||x||x||xx||||
\\++-++++++-++-+++++++++++-++----++---+--++-+++-+-+---++--+--+---++++-+---+-+-+--+-+++++-++++--+--+-/||||||||||||x|||x||||x|x|||x|x|x||||||x||x||xx||||
x||x||||||x||x|||||||||||x||xxxx||xxx|xx||x|||x|x|xxx||xx|xx|xxx||||x|xxx|x|x\\--+-+++++-++++--+--+--++++++++++++-++/x||||x|x|||x|x|x||||||x||x||xx||||
x||x||||||x||x|||||||||\\+-++----++---+--++-+++-+-+---++--+--+---++++-+---+-+----+-+++++-+/||xx|xx|xx||||||||||||x||xx||||x|x|||x|x|x||||||x||x||xx||||
x||x||||||x||x|||||||||x|x||xxxx||xxx|xx||x|||x|x|xxx\\+--+--+---++++-+---+-+----+-+++++-+-++--+--+--+++++++++/||x||xx||||x|x|||x|x|x||||||x||x||xx||||
x||x||||||x||x|||||||||x|x||xx/-++---+--++-+++-+-+----+--+--+---++++-+---+-+----+-+++++-+-++--+--+--+++++++++-++-++-\\||||x|x|||x|x|x||||||x||x||xx||||
x||x||||||x\\+-+++++++++-+-++--+-++---+--++-+++-+-+----+--+--+---++++-+---+-+----+-+++++-+-++--+--+--+++++++++-++-++-+++/|x|x|||x|x|x||||||x||x||xx||||
x||x||||||xx|x||||\\++++-+-++--+-++---+--++-+++-+-+----+--+--+---++++-+---+-+----+-+++++-+-++--+--+--+/|||||||x||x||x|||x|x|x|||x|x|x||||||x||x||xx||||
x||x||||||xx|x||||x||||x|x||xx|x||xxx|xx||x|||x|x|xxxx|xx|xx|xxx||||x|xxx\\-+----+-+++++-+-++--+--+--+-+++++++-++-++-+++-+-+-+++-+-+-+++++/x||x||xx||||
x||x||||||xx|x||||x||||x|x||xx|x||xxx|xx\\+-+++-+-+----+--+--+---++++-+-----+----+-+++++-+-++--+--+--+-+++++++-/|x||x||\\-+-+-+++-+-+-++/||xx||x||xx||||
x||x||||||/-+-++++-++++-+-++--+-++---+---+-+++-+-+----+\\x|xx|xxx|||vx|xxxxx|xxxx|x|||||x|x||xx|xx|xx|x|||||||xx|x||x||xx|x|x|||x|x|x||x||xx||x||xx||||
x||x|||\\+++-+-++++-++++-+-++--+-++---+---+-++/x|x|xxxx||x|xx|xxx||||x|xxxxx|xx/-+-+++++-+-++--+--+--+-+++++++--+-++-++--+-+-+++-+-+-++-++--++-++\\x||||
x||x|||x|||x|x||||x||||x|x||xx|x||xxx|xxx|x||xx|x|xxxx||x|x/+---++++-+----\\|xx|x|x|\\+++-+-++--+--+--+-+++++++--+-++-++--+-+-+++-+-/x||x||xx||x|||x||||
x||x|||x|\\+-+-++++-++++-+-++--+-++---+---/x||xx|x|xxxx||x|x|\\---++++-+----++--+-+-+-+++-+-++--+--+--/x|||||||xx|x||x||xx|x|x|||x|xxx||x||xx||x|||x||||
x||x|||x|x|x|x||||x||||x|x||x/+-++---+-----++--+-+----++-+-+----++++-+----++--+-+-+-+++-+-++--+--+----+++++++--+-++-++-\\|x|x|||x|xxx||x||xx||x|||x||||
x||x|\\+-+-+-+-++++-++++-+-++-++-++---+-----++--+-+----++-+-+----++++-+----++--+-+-+-+++-+-+/xx|xx\\----+++++++--+-+/x||x||x|x|||x|xxx||x||xx||x|||x||||
x||x|x|x|x|x|x||||x||||x|x||x||x||xxx|xxxxx||xx|x|xxxx||x|x|xxxx||||x|xxxx||xx|x|x|x|||x|x|xxx|xxxxxxx||\\++++--+-+--++-++-+-+++-+---++-++--++-+/|x||||
x||x|x|x|x|x|x||||x||||x|x||x||x||/--+-----++--+\\|xxxx||x|x|xxxx||||x|xxxx||xx|x|x|x|||x|x|xxx|xxxxxx/++-++++--+-+-\\||x||x|x|||x|xxx||x||xx||x|x|x||||
x|\\-+-+-+-+-+-++/|x|||\\-+-++-++-+++--+-----++--+++----++-+-+----++/|x|xxxx||xx|x|x|x|||x|x|xxx|xxxxxx|||x||||xx|x|x|||x||x|x|||x|xxx||x||xx||x|x|x||||
x|xx|x\\-+-+-+-++-+-+++--+-++-++-+++--+-----++--+++----++-+-+----++-+-+----++--+-+-+-+++-+-+---+------+/|x||||xx|x|x|||x||x|x|\\+-+---++-++--++-+-+-++/|
x|xx|xxx|x|x|x||x|x|||/-+-++-++\\|||xx|xxxxx||xx\\++----++-+-+----++-+-+----++--+-+-/x|||x|x|xxx|xxxxxx|x|x||||xx|x|x|||x||x|x\\-+-+---++-/|xx||x|x|x||x|
x|xx|xxx|x|x|x||x|x||||x|x||x|\\++++--+-----++---++----++-+-+----++-+-+----++--+-+---+++-+-+---+------+-+-++++--+-+-+/|x||x|xxx|x|xxx||xx|xx||x|x|x||x|
x|xx|xxx|x|x|x||x|x||||x|x||x|x||||xx|xxxxx||xxx||xxxx||x|x|xxxx|\\-+-+----++--+-+---+++-+-+---+------+-+-++++--+-+-+-+-++-+---+-+---+/xx|xx||x|x|x||x|
x|xx|xxx|x\\-+-++-+-++++-+-++-+-++++--+-----++---++----+/x|x|xxxx|xx|x|xxxx||xx|x|xxx|||x|x|xxx|xxxxxx|x|x||\\+--+-+-+-+-++-/xxx|x|xxx|xxx|xx||x|x|x||x|
x|xx|xxx|xxx|x||x|x||||x|x||x|x||||xx|xxxxx||xxx||xxxx|xx|x\\----+--+-+----/|xx|x|xxx|||x|x|xx/+------+-+-++-+--+-+-+-+-++-----+\\|xxx|xxx|xx||x|x|x||x|
x|xx|/--+---+-++-+-++++-+-++-+-++++--+-\\xxx||xxx||xxxx|xx|xxxxxx|xx|x|xxxxx|xx\\-+---+++-+-+--++------+-+-++-+--+-+-+-+-++-----+++---+---+--++-+-/x||x|
x|xx||xx|xxx|x||x|x||||x|x||x|x||||xx|x|xxx\\+---++----+--+------+--+-+-----+----+---+++-+-+--++------+-+-++-+--+-+-+-+-++-----+++---+---+--++-/xxx||x|
x|xx||xx|xxx|x||x\\-++++-+-++-+-+/\\+--+-+----+---++----+--+------+--+-+-----+----+---+++-+-+--++------+-+-++-+--/x|x|x|x||xxxxx|||xxx|xxx|xx||xxxxx||x|
x|xx||xx|xxx|x||xxx||||x|x||x|x|xx\\--+-+----+---/|xxxx|xx|xxxxxx|xx|x|xxxxx\\----+---/||x|x|xx||xxxxxx|x|x||x|xxxx|x|x|x||xxxxx|||xxx|xxx|xx||xxxxx||x|
x|xx||xx|xxx|x||xxx||||x\\-++-+-+-----+-+----+----+----+--+------+--+-+----------+----++-+-+--++------+-+-++-+----+-+-+-++-----++/xxx|xxx|xx||xxxxx||x|
x|xx||xx|xxx|x||xxx||||xxx||x|x|xxxxx|x|xxxx|xxxx|xxxx|xx|xxxxxx|xx|x|xxxxxxxxxx|xxxx||x|x|xx||xxxxxx|x|x||x|xxxx|x|x|x|\\-----++----+---+--++-----++-/
x\\--++--+---+-/|xxx|||\\---++-+-/xxxxx|x|xxxx|xxxx|xxxx|xx|xxxxxx|xx|x|xxxxxxxxxx|xxxx||x|x|xx||x/----+-+-++-+----+-+-+-+------++----+---+--++-\\xxx||xx
xxxx||xx|xxx|xx|xxx|||xxxx||x|xxxxxxx|xvxxxx|xxxx|xxxx|xx|xxxxxx|xx|x|xxxxxxxxxx|xxxx||x|x|xx||x|xxxx|x|x||x|xxxx\\-+-+-+------++----+---+--++-+---+/xx
xxxx||xx|xxx|xx|xxx|||xxxx||x|xxxxxxx|x|xxxx|xxxx|xxxx|xx|xxxxxx|xx|x|xxxxxxxxxx|xxxx||x|x|xx\\+-+----+-+-++-+------+-+-+-->---+/xxxx|xxx|xx||x|xxx|xxx
xxxx||xx|xxx|xx|xxx|||xxxx\\+-+-------+-+----+----+----+--+------+--+-+----------+----++-+-+---+-+----+-+-++-+------+-+-+------/xxxxx|xxx|xx||x|xxx|xxx
xxxx||xx|xxx|xx|xxx|||xxxxx|x|xxxxxxx\\-+----+----+----+--+------+--+-+----------+----++-+-+---+-+----+-+-++-+------+-+-+------------+---/xx||x|xxx|xxx
xxxx||xx|xxx|xx|xxx|||xxxxx|x|xxxxxxxxx|xxxx\\----+----+--+------+--+-+----------+----++-+-+---+-+----+-+-+/x|xxxxxx|x|x|xxxxxxxxxxxx|xxxxxx||x|xxx|xxx
xxxx||xx|xxx\\--+---+++-----+-+---------+---------+----+--+------+--+-+----------+----++-+-+---+-+----+-+-+--+------+-/x|xxxxxxxxxxxx|xxxxxx||x|xxx|xxx
xxxx\\+--+------+---++/xxxxx|x|xxxxxxxxx|xxxxxxxxx|xxxx|xx|xxxxxx\\--+-+----------/xxxx||x|x|xxx|x|xxxx|x|x|xx|xxxxxx|xxx|xxxxxxxxxxxx|xxxxxx||x|xxx|xxx
xxxxx|xx|xxxxxx\\---++------+-+---------+---------+----+--+---------+-+---------------++-+-+---/x|xxxx|x|x|xx\\------+---+------------+------/|x|xxx|xxx
xxxxx|xx|xxxxxxxxxx||xxxxxx|x\\---------+---------+----+--+---------+-+---------------++-+-+-----+----+-+-+---------+---/xxxxxxxxxxxx|xxxxxxx|x|xxx|xxx
xxxxx|xx|xxxxxxxxxx||xxxxxx|xxxxxxxxxxx|xxxxxxxxx|xxxx|xx\\---------+-+---------------/|x|x|xxxxx|xxxx|x|x|xxxxxxxxx|xxxxxxxxxxxxxxxx|xxxxxxx|x|xxx|xxx
xxxxx|xx|xxxxxxxxxx|\\------+-----------+---------+----/xxxxxxxxxxxx|x|xxxxxxxxxxxxxxxx\\-+-+-----+----+-+-+---------+----------------/xxxxxxx|x|xxx|xxx
xxxxx|xx|xxxxxxxxxx|xxxxxxx\\-----------+---------+-----------------+-+------------------+-+-----+----+-+-/xxxxxxxxx|xxxxxxxxxxxxxxxxxxxxxxxx|x|xxx|xxx
xxxxx\\--+----------+-------------------/xxxxxxxxx|xxxxxxxxxxxxxxxxx|x|xxxxxxxxxxxxxxxxxx|x\\-----+----+-+-----------+------------------------/x|xxx|xxx
xxxxxxxx|xxxxxxxxxx|xxxxxxxxxxxxxxxxxxxxxxxxxxxxx|xxxxxxxxxxxxxxxxx|x\\------------------+-------+----+-+-----------+--------------------------+---/xxx
xxxxxxxx|xxxxxxxxxx\\-----------------------------+-----------------/xxxxxxxxxxxxxxxxxxxx|xxxxxxx|xxxx\\-+-----------/xxxxxxxxxxxxxxxxxxxxxxxxxx|xxxxxxx
xxxxxxxx\\----------------------------------------+--------------------------------------+-------+------/xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx|xxxxxxx
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx\\------------------------------------->/xxxxxxx\\---------------------------------------------/xxxxxxx`;

class Tracks {
    constructor(input) {
        const rows = input.split('\n');
        this.tracksHeight = rows.length;
        this.tracksWidth = rows.reduce((width, r) => width > r.length ? width : r.length);
        this.tracks = rows.map(r => new Array(this.tracksWidth));
        this.carts = [];
        for (let i = 0; i < this.tracksHeight; i++) {
            for (let j = 0; j < this.tracksWidth; j++) {
                switch(rows[i][j]) {
                    case '^':
                        this.carts.push(new Cart(i, j, -1, 0, this.tracks));
                        this.tracks[i][j] = '|';
                        break;
                    case 'v':
                        this.carts.push(new Cart(i, j, 1, 0, this.tracks));
                        this.tracks[i][j] = '|';
                        break;
                    case '<':
                        this.carts.push(new Cart(i, j, 0, -1, this.tracks));
                        this.tracks[i][j] = '-';
                        break;
                    case '>':
                        this.carts.push(new Cart(i, j, 0, 1, this.tracks));
                        this.tracks[i][j] = '-';
                        break;
                    case 'x':
                        this.tracks[i][j] = ' ';
                        break;
                    default:
                        this.tracks[i][j] = rows[i][j];
                        break;
                }
            }
        }
    }

    tick1() {
        this.carts.sort((c1, c2) => {
            if (c1.x === c2.x) {
                return c1.y - c2.y;
            }
            return c1.x - c2.x;
        });
        for (let i = 0; i < this.carts.length; i++) {
            const c = this.carts[i];
            c.advance();
            const crash = this.carts.some((cart) => {
                if (cart === c) return false;
                return cart.x === c.x && cart.y === c.y;
            });
            if (crash) return `${c.y},${c.x}`;
        }
    }

    tick2() {
        let occupied = {};
        let collidedCarts = new Set();
        for (let i = 0; i < this.carts.length; i++) {
            const c = this.carts[i];
            let s = `${c.y},${c.x}`;
            occupied[s] = i;
            c.advance();
            s = `${c.y},${c.x}`;
            if (occupied.hasOwnProperty(s)) {
                collidedCarts.add(occupied[s]);
                collidedCarts.add(i);
            } else {
                occupied[s] = i;
            }
        }
        this.carts = this.carts.filter((_, i) => {
            return !collidedCarts.has(i);
        });
        if (this.carts.length === 1) {
            const c = this.carts[0];
            return `${c.y},${c.x}`;
        }
    }

    draw() {
        const tracksCopy = this.tracks.slice().map((r) => r.slice());
        this.carts.forEach(c => {
            tracksCopy[c.x][c.y] = c.getSprite();
        });
        console.log(tracksCopy.map(n => n.join('')).join('\n'));
    }
}

class Cart {
    constructor(x, y, dx, dy, tracks) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.tracks = tracks;
        this.intersections = 0;
    }

    advance() {
        this.x += this.dx;
        this.y += this.dy;
        if (this.tracks[this.x][this.y] === '/') {
            if (this.dx === 0) {
                this.turnLeft();
            } else {
                this.turnRight();
            }
        } else if (this.tracks[this.x][this.y] === '\\') {
            if (this.dx === 0) {
                this.turnRight();
            } else {
                this.turnLeft();
            }
        } else if (this.tracks[this.x][this.y] === '+') {
            if (this.intersections % 3 === 0) {
                this.turnLeft();
            } else if (this.intersections % 3 === 2) {
                this.turnRight();
            }
            this.intersections += 1;
        }
    }

    turnRight() {
        [this.dx, this.dy] = [this.dy, -1 * this.dx];
    }

    turnLeft() {
        [this.dx, this.dy] = [-1 * this.dy, this.dx];
    }

    getSprite() {
        if (this.dx === 0) {
            if (this.dy === -1) {
                return '<';
            } else {
                return '>';
            }
        } else {
            if (this.dx === -1) {
                return '^';
            } else {
                return 'v';
            }
        }
    }
}


function day12_part1(input) {
    const tracks = new Tracks(input);
    let s;
    while (!s) {
        s = tracks.tick1();
    }
    return s;
}

assert.equal(day12_part1(sampleInput1), '7,3');
console.log(day12_part1(inputInput));

function day12_part2(input) {
    const tracks = new Tracks(input);
    let s;
    while (!s) {
        s = tracks.tick2();
    }
    return s;
}

assert.equal(day12_part2(sampleInput2), '6,4');
console.log(day12_part2(inputInput));
