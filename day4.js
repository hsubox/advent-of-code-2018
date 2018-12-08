/*
--- Day 4: Repose Record ---
You've sneaked into another supply closet - this time, it's across from the prototype suit manufacturing lab. You need to sneak inside and fix the issues with the suit, but there's a guard stationed outside the lab, so this is as close as you can safely get.

As you search the closet for anything that might help, you discover that you're not the first person to want to sneak in. Covering the walls, someone has spent an hour starting every midnight for the past few months secretly observing this guard post! They've been writing down the ID of the one guard on duty that night - the Elves seem to have decided that one guard was enough for the overnight shift - as well as when they fall asleep or wake up while at their post (your puzzle input).

For example, consider the following records, which have already been organized into chronological order:

[1518-11-01 00:00] Guard #10 begins shift
[1518-11-01 00:05] falls asleep
[1518-11-01 00:25] wakes up
[1518-11-01 00:30] falls asleep
[1518-11-01 00:55] wakes up
[1518-11-01 23:58] Guard #99 begins shift
[1518-11-02 00:40] falls asleep
[1518-11-02 00:50] wakes up
[1518-11-03 00:05] Guard #10 begins shift
[1518-11-03 00:24] falls asleep
[1518-11-03 00:29] wakes up
[1518-11-04 00:02] Guard #99 begins shift
[1518-11-04 00:36] falls asleep
[1518-11-04 00:46] wakes up
[1518-11-05 00:03] Guard #99 begins shift
[1518-11-05 00:45] falls asleep
[1518-11-05 00:55] wakes up
Timestamps are written using year-month-day hour:minute format. The guard falling asleep or waking up is always the one whose shift most recently started. Because all asleep/awake times are during the midnight hour (00:00 - 00:59), only the minute portion (00 - 59) is relevant for those events.

Visually, these records show that the guards are asleep at these times:

Date   ID   Minute
            000000000011111111112222222222333333333344444444445555555555
            012345678901234567890123456789012345678901234567890123456789
11-01  #10  .....####################.....#########################.....
11-02  #99  ........................................##########..........
11-03  #10  ........................#####...............................
11-04  #99  ....................................##########..............
11-05  #99  .............................................##########.....
The columns are Date, which shows the month-day portion of the relevant day; ID, which shows the guard on duty that day; and Minute, which shows the minutes during which the guard was asleep within the midnight hour. (The Minute column's header shows the minute's ten's digit in the first row and the one's digit in the second row.) Awake is shown as ., and asleep is shown as #.

Note that guards count as asleep on the minute they fall asleep, and they count as awake on the minute they wake up. For example, because Guard #10 wakes up at 00:25 on 1518-11-01, minute 25 is marked as awake.

If you can figure out the guard most likely to be asleep at a specific time, you might be able to trick that guard into working tonight so you can have the best chance of sneaking in. You have two strategies for choosing the best guard/minute combination.

Strategy 1: Find the guard that has the most minutes asleep. What minute does that guard spend asleep the most?

In the example above, Guard #10 spent the most minutes asleep, a total of 50 minutes (20+25+5), while Guard #99 only slept for a total of 30 minutes (10+10+10). Guard #10 was asleep most during minute 24 (on two days, whereas any other minute the guard was asleep was only seen on one day).

While this example listed the entries in chronological order, your entries are in the order you found them. You'll need to organize them before they can be analyzed.

What is the ID of the guard you chose multiplied by the minute you chose? (In the above example, the answer would be 10 * 24 = 240.)

Your puzzle answer was 102688.

--- Part Two ---
Strategy 2: Of all guards, which guard is most frequently asleep on the same minute?

In the example above, Guard #99 spent minute 45 asleep more than any other guard or minute - three times in total. (In all other cases, any guard spent any minute asleep at most twice.)

What is the ID of the guard you chose multiplied by the minute you chose? (In the above example, the answer would be 99 * 45 = 4455.)

Your puzzle answer was 56901.
*/

const assert = require('assert');

const sampleInput = `[1518-11-01 00:00] Guard #10 begins shift
[1518-11-01 00:05] falls asleep
[1518-11-01 00:25] wakes up
[1518-11-01 00:30] falls asleep
[1518-11-01 00:55] wakes up
[1518-11-01 23:58] Guard #99 begins shift
[1518-11-02 00:40] falls asleep
[1518-11-02 00:50] wakes up
[1518-11-03 00:05] Guard #10 begins shift
[1518-11-03 00:24] falls asleep
[1518-11-03 00:29] wakes up
[1518-11-04 00:02] Guard #99 begins shift
[1518-11-04 00:36] falls asleep
[1518-11-04 00:46] wakes up
[1518-11-05 00:03] Guard #99 begins shift
[1518-11-05 00:45] falls asleep
[1518-11-05 00:55] wakes up`;

const input = `[1518-09-17 23:48] Guard #1307 begins shift
[1518-06-03 00:00] Guard #3217 begins shift
[1518-07-28 00:49] falls asleep
[1518-03-30 00:57] falls asleep
[1518-07-01 23:58] Guard #409 begins shift
[1518-04-13 00:25] wakes up
[1518-04-09 00:22] wakes up
[1518-11-02 00:41] falls asleep
[1518-11-21 00:23] falls asleep
[1518-05-03 00:59] wakes up
[1518-11-21 00:02] Guard #1459 begins shift
[1518-08-18 00:27] wakes up
[1518-08-09 00:48] falls asleep
[1518-09-23 00:23] falls asleep
[1518-03-29 23:57] Guard #113 begins shift
[1518-04-16 00:43] wakes up
[1518-05-13 00:33] falls asleep
[1518-05-19 00:58] wakes up
[1518-07-09 00:44] wakes up
[1518-04-26 00:03] falls asleep
[1518-08-24 00:55] falls asleep
[1518-06-30 00:51] falls asleep
[1518-10-14 00:06] falls asleep
[1518-04-28 00:23] falls asleep
[1518-10-05 00:57] wakes up
[1518-09-02 00:56] wakes up
[1518-03-11 00:38] falls asleep
[1518-07-30 00:54] wakes up
[1518-09-15 23:58] Guard #1811 begins shift
[1518-08-08 23:58] Guard #1033 begins shift
[1518-08-07 00:08] falls asleep
[1518-06-13 00:46] wakes up
[1518-10-08 00:54] falls asleep
[1518-06-08 23:46] Guard #557 begins shift
[1518-06-01 00:22] wakes up
[1518-08-05 00:59] wakes up
[1518-03-08 00:03] Guard #3271 begins shift
[1518-07-18 23:59] Guard #449 begins shift
[1518-09-24 00:00] Guard #389 begins shift
[1518-04-22 00:45] wakes up
[1518-07-31 00:41] falls asleep
[1518-03-24 00:02] falls asleep
[1518-05-21 00:29] falls asleep
[1518-05-27 23:59] Guard #449 begins shift
[1518-10-30 00:52] wakes up
[1518-08-09 00:51] wakes up
[1518-03-16 00:54] wakes up
[1518-04-11 00:28] falls asleep
[1518-04-25 00:58] wakes up
[1518-10-06 00:07] falls asleep
[1518-08-15 23:49] Guard #557 begins shift
[1518-10-17 23:51] Guard #739 begins shift
[1518-06-27 00:00] Guard #3217 begins shift
[1518-06-30 00:01] Guard #1237 begins shift
[1518-04-29 00:01] Guard #3271 begins shift
[1518-11-12 00:19] falls asleep
[1518-07-27 00:50] wakes up
[1518-03-06 00:42] falls asleep
[1518-11-17 00:57] wakes up
[1518-07-21 00:48] wakes up
[1518-03-04 00:28] falls asleep
[1518-08-24 00:37] falls asleep
[1518-09-19 00:21] wakes up
[1518-11-05 00:24] wakes up
[1518-06-24 00:02] falls asleep
[1518-10-24 00:55] falls asleep
[1518-06-14 00:56] wakes up
[1518-06-29 00:47] wakes up
[1518-04-15 00:14] wakes up
[1518-08-21 00:08] falls asleep
[1518-09-16 00:48] falls asleep
[1518-10-11 00:42] wakes up
[1518-03-04 00:09] wakes up
[1518-03-13 00:18] falls asleep
[1518-10-28 00:56] wakes up
[1518-03-27 00:20] wakes up
[1518-05-24 00:03] Guard #739 begins shift
[1518-08-31 00:54] wakes up
[1518-06-22 00:50] falls asleep
[1518-06-15 00:45] wakes up
[1518-07-22 23:47] Guard #2647 begins shift
[1518-09-02 00:00] falls asleep
[1518-05-04 00:14] falls asleep
[1518-03-06 00:51] wakes up
[1518-10-02 00:35] wakes up
[1518-10-05 00:20] falls asleep
[1518-05-06 00:53] falls asleep
[1518-10-12 00:47] wakes up
[1518-04-08 00:30] wakes up
[1518-11-19 00:40] falls asleep
[1518-11-13 00:32] falls asleep
[1518-08-21 23:46] Guard #3271 begins shift
[1518-05-31 00:56] falls asleep
[1518-05-18 00:57] wakes up
[1518-05-17 00:56] wakes up
[1518-05-24 23:51] Guard #601 begins shift
[1518-10-30 00:32] wakes up
[1518-10-05 00:13] wakes up
[1518-11-02 00:03] Guard #2647 begins shift
[1518-05-02 00:36] wakes up
[1518-07-29 00:40] wakes up
[1518-07-16 00:53] wakes up
[1518-09-04 00:18] wakes up
[1518-05-11 00:33] falls asleep
[1518-03-09 00:00] Guard #1811 begins shift
[1518-10-24 23:57] Guard #827 begins shift
[1518-11-18 00:46] wakes up
[1518-08-14 00:27] falls asleep
[1518-05-25 00:17] wakes up
[1518-03-03 00:02] Guard #947 begins shift
[1518-05-29 00:00] falls asleep
[1518-06-05 00:04] wakes up
[1518-07-26 00:42] wakes up
[1518-10-01 00:39] falls asleep
[1518-06-22 00:54] wakes up
[1518-09-06 00:24] wakes up
[1518-08-04 00:24] falls asleep
[1518-04-25 00:35] wakes up
[1518-11-11 00:11] falls asleep
[1518-09-27 00:58] wakes up
[1518-09-16 00:15] falls asleep
[1518-07-25 00:55] wakes up
[1518-08-28 00:27] falls asleep
[1518-08-12 00:39] falls asleep
[1518-11-05 00:32] falls asleep
[1518-05-29 23:52] Guard #3209 begins shift
[1518-04-27 00:35] wakes up
[1518-04-20 00:06] falls asleep
[1518-03-21 00:47] falls asleep
[1518-10-18 00:55] wakes up
[1518-09-29 00:31] falls asleep
[1518-09-17 00:40] wakes up
[1518-04-22 00:19] falls asleep
[1518-06-14 00:32] falls asleep
[1518-10-07 23:59] Guard #1307 begins shift
[1518-04-25 00:55] falls asleep
[1518-08-27 00:24] falls asleep
[1518-08-01 23:56] Guard #389 begins shift
[1518-09-04 23:56] Guard #409 begins shift
[1518-09-29 23:56] Guard #449 begins shift
[1518-10-05 00:23] wakes up
[1518-04-04 00:58] wakes up
[1518-08-05 00:54] falls asleep
[1518-07-20 00:46] wakes up
[1518-04-08 00:46] wakes up
[1518-06-18 00:52] wakes up
[1518-05-03 23:59] Guard #1033 begins shift
[1518-11-01 00:37] wakes up
[1518-03-11 00:30] wakes up
[1518-06-06 00:42] wakes up
[1518-06-20 00:06] falls asleep
[1518-04-05 00:55] wakes up
[1518-09-13 23:57] Guard #3217 begins shift
[1518-04-21 00:00] Guard #1459 begins shift
[1518-03-18 00:00] Guard #1307 begins shift
[1518-09-13 00:03] Guard #557 begins shift
[1518-05-28 23:51] Guard #3217 begins shift
[1518-10-23 23:49] Guard #113 begins shift
[1518-03-11 23:59] Guard #113 begins shift
[1518-09-06 00:07] falls asleep
[1518-03-03 00:42] falls asleep
[1518-07-21 00:57] falls asleep
[1518-06-12 00:08] falls asleep
[1518-10-04 23:59] Guard #1237 begins shift
[1518-08-19 00:36] falls asleep
[1518-10-13 00:09] falls asleep
[1518-08-18 00:57] wakes up
[1518-08-28 23:52] Guard #1307 begins shift
[1518-09-09 00:58] wakes up
[1518-10-11 00:14] falls asleep
[1518-07-25 23:50] Guard #1559 begins shift
[1518-07-14 23:59] Guard #1237 begins shift
[1518-09-26 00:58] wakes up
[1518-05-22 23:59] Guard #3067 begins shift
[1518-05-22 00:57] falls asleep
[1518-05-02 00:58] wakes up
[1518-05-14 00:52] wakes up
[1518-04-18 00:51] wakes up
[1518-06-17 00:35] wakes up
[1518-05-18 23:59] Guard #389 begins shift
[1518-08-16 00:12] wakes up
[1518-11-08 00:49] wakes up
[1518-08-18 00:04] Guard #1307 begins shift
[1518-07-13 00:48] wakes up
[1518-08-18 23:58] Guard #1459 begins shift
[1518-03-09 00:52] wakes up
[1518-03-16 00:00] Guard #1237 begins shift
[1518-06-13 00:24] falls asleep
[1518-08-16 00:04] falls asleep
[1518-09-19 00:55] wakes up
[1518-10-04 00:47] wakes up
[1518-05-04 23:50] Guard #389 begins shift
[1518-07-03 00:57] wakes up
[1518-04-24 00:14] falls asleep
[1518-09-03 00:22] wakes up
[1518-11-09 00:54] falls asleep
[1518-09-02 00:36] wakes up
[1518-06-30 00:56] wakes up
[1518-08-26 00:51] wakes up
[1518-04-27 23:56] Guard #1307 begins shift
[1518-11-02 00:10] falls asleep
[1518-09-20 23:57] Guard #1811 begins shift
[1518-03-14 00:48] wakes up
[1518-05-31 00:30] wakes up
[1518-08-07 00:03] Guard #3209 begins shift
[1518-08-07 00:50] falls asleep
[1518-09-25 00:57] wakes up
[1518-10-18 00:08] wakes up
[1518-10-03 00:56] wakes up
[1518-05-27 00:46] wakes up
[1518-06-07 00:18] falls asleep
[1518-06-06 00:55] wakes up
[1518-03-18 00:56] wakes up
[1518-04-04 23:59] Guard #449 begins shift
[1518-09-28 00:59] wakes up
[1518-08-10 00:12] wakes up
[1518-05-30 00:21] wakes up
[1518-11-09 00:57] wakes up
[1518-11-15 00:13] falls asleep
[1518-06-10 23:57] Guard #1811 begins shift
[1518-11-04 00:01] falls asleep
[1518-05-21 00:47] falls asleep
[1518-10-07 00:05] falls asleep
[1518-03-12 00:36] wakes up
[1518-08-09 00:37] wakes up
[1518-09-23 00:58] wakes up
[1518-04-14 00:22] falls asleep
[1518-07-07 00:35] falls asleep
[1518-03-15 00:59] wakes up
[1518-03-14 00:44] falls asleep
[1518-11-06 00:04] Guard #3067 begins shift
[1518-07-14 00:01] Guard #3217 begins shift
[1518-10-23 00:09] falls asleep
[1518-07-01 00:38] wakes up
[1518-11-05 00:51] wakes up
[1518-04-08 00:52] falls asleep
[1518-09-22 00:40] falls asleep
[1518-09-08 00:20] falls asleep
[1518-05-09 00:49] falls asleep
[1518-10-17 00:02] Guard #3067 begins shift
[1518-10-01 23:56] Guard #3217 begins shift
[1518-05-10 00:58] wakes up
[1518-11-11 23:57] Guard #3271 begins shift
[1518-09-27 00:49] falls asleep
[1518-09-30 00:48] wakes up
[1518-06-06 00:01] Guard #601 begins shift
[1518-03-18 23:59] Guard #3217 begins shift
[1518-03-20 23:57] Guard #2647 begins shift
[1518-07-29 00:52] falls asleep
[1518-04-01 23:51] Guard #1459 begins shift
[1518-03-23 00:14] falls asleep
[1518-07-28 00:38] wakes up
[1518-09-04 00:49] wakes up
[1518-06-10 00:57] wakes up
[1518-10-26 00:57] wakes up
[1518-04-01 00:52] wakes up
[1518-07-10 00:47] wakes up
[1518-03-24 23:56] Guard #3217 begins shift
[1518-07-07 00:58] wakes up
[1518-08-10 00:11] falls asleep
[1518-08-22 00:56] falls asleep
[1518-11-03 00:21] wakes up
[1518-03-28 23:59] Guard #947 begins shift
[1518-07-29 00:35] falls asleep
[1518-09-09 00:05] falls asleep
[1518-04-11 00:58] wakes up
[1518-10-12 00:55] wakes up
[1518-11-14 00:44] wakes up
[1518-03-17 00:47] wakes up
[1518-03-29 00:13] falls asleep
[1518-06-04 00:40] falls asleep
[1518-11-16 00:14] falls asleep
[1518-05-11 00:04] Guard #1459 begins shift
[1518-06-03 00:11] falls asleep
[1518-10-22 00:58] wakes up
[1518-04-15 00:57] falls asleep
[1518-07-12 00:59] wakes up
[1518-05-21 00:31] wakes up
[1518-06-27 00:09] falls asleep
[1518-08-07 00:41] wakes up
[1518-10-22 00:11] falls asleep
[1518-09-02 00:43] falls asleep
[1518-05-31 00:28] falls asleep
[1518-05-25 00:07] falls asleep
[1518-07-25 00:13] wakes up
[1518-06-13 00:35] wakes up
[1518-08-17 00:40] falls asleep
[1518-08-02 00:58] wakes up
[1518-03-26 00:23] falls asleep
[1518-11-04 00:59] wakes up
[1518-03-28 00:38] falls asleep
[1518-10-29 23:57] Guard #113 begins shift
[1518-09-11 23:59] Guard #2647 begins shift
[1518-03-09 00:48] falls asleep
[1518-08-18 00:53] wakes up
[1518-09-02 00:46] wakes up
[1518-06-18 00:02] Guard #739 begins shift
[1518-10-22 00:00] Guard #1811 begins shift
[1518-09-23 00:27] wakes up
[1518-08-31 00:38] falls asleep
[1518-09-25 00:39] falls asleep
[1518-08-08 00:03] Guard #2647 begins shift
[1518-09-14 00:23] falls asleep
[1518-08-21 00:04] Guard #877 begins shift
[1518-10-09 00:31] wakes up
[1518-06-20 00:51] wakes up
[1518-06-06 00:17] falls asleep
[1518-08-10 00:17] falls asleep
[1518-05-08 00:57] wakes up
[1518-11-10 00:06] falls asleep
[1518-05-30 23:58] Guard #1559 begins shift
[1518-10-12 00:44] falls asleep
[1518-09-08 00:53] wakes up
[1518-04-08 00:28] falls asleep
[1518-08-17 00:52] wakes up
[1518-05-02 00:57] falls asleep
[1518-05-06 00:56] wakes up
[1518-03-23 00:00] Guard #1811 begins shift
[1518-04-27 00:10] falls asleep
[1518-06-09 00:04] falls asleep
[1518-08-18 00:10] falls asleep
[1518-07-25 00:46] falls asleep
[1518-10-10 00:43] wakes up
[1518-04-19 00:48] wakes up
[1518-10-20 00:49] wakes up
[1518-04-17 00:01] Guard #1237 begins shift
[1518-05-21 00:06] falls asleep
[1518-11-15 00:37] wakes up
[1518-05-04 00:24] wakes up
[1518-10-04 00:01] Guard #2647 begins shift
[1518-03-26 00:00] Guard #389 begins shift
[1518-08-29 00:23] wakes up
[1518-04-02 00:03] falls asleep
[1518-05-14 00:12] falls asleep
[1518-04-14 00:57] wakes up
[1518-06-01 23:56] Guard #449 begins shift
[1518-08-11 23:56] Guard #1811 begins shift
[1518-07-04 00:01] Guard #3271 begins shift
[1518-07-22 00:38] falls asleep
[1518-11-13 23:58] Guard #2647 begins shift
[1518-05-07 00:59] wakes up
[1518-06-22 00:26] falls asleep
[1518-08-28 00:01] Guard #3067 begins shift
[1518-10-31 00:03] Guard #113 begins shift
[1518-06-24 00:48] wakes up
[1518-03-18 00:28] falls asleep
[1518-03-16 00:13] falls asleep
[1518-04-27 00:57] falls asleep
[1518-07-14 00:24] wakes up
[1518-11-18 00:59] wakes up
[1518-05-01 00:00] Guard #739 begins shift
[1518-11-08 23:56] Guard #3209 begins shift
[1518-06-20 00:36] falls asleep
[1518-09-21 00:20] falls asleep
[1518-05-28 00:21] wakes up
[1518-03-05 00:23] falls asleep
[1518-03-30 00:38] wakes up
[1518-07-12 00:56] falls asleep
[1518-04-03 00:25] wakes up
[1518-03-21 00:58] wakes up
[1518-08-11 00:17] falls asleep
[1518-08-12 23:59] Guard #947 begins shift
[1518-04-29 23:53] Guard #947 begins shift
[1518-05-10 00:03] Guard #3209 begins shift
[1518-03-04 00:38] wakes up
[1518-05-14 00:03] Guard #947 begins shift
[1518-03-22 00:57] wakes up
[1518-07-15 00:37] falls asleep
[1518-06-11 00:48] wakes up
[1518-04-14 00:01] Guard #557 begins shift
[1518-07-24 00:49] wakes up
[1518-09-01 00:56] wakes up
[1518-08-26 00:59] wakes up
[1518-08-25 00:15] falls asleep
[1518-07-06 00:04] falls asleep
[1518-07-03 00:03] Guard #557 begins shift
[1518-10-20 00:45] falls asleep
[1518-10-18 00:53] falls asleep
[1518-06-19 00:53] wakes up
[1518-03-27 00:51] falls asleep
[1518-07-11 00:43] falls asleep
[1518-05-03 00:55] falls asleep
[1518-09-21 00:49] falls asleep
[1518-09-20 00:54] wakes up
[1518-06-01 00:04] falls asleep
[1518-05-13 00:37] wakes up
[1518-06-27 00:46] wakes up
[1518-04-03 00:01] Guard #601 begins shift
[1518-03-13 00:55] falls asleep
[1518-10-10 00:13] falls asleep
[1518-10-31 00:21] falls asleep
[1518-03-14 00:54] falls asleep
[1518-04-06 00:02] Guard #1237 begins shift
[1518-10-15 00:48] wakes up
[1518-03-27 00:02] Guard #1559 begins shift
[1518-10-12 00:14] falls asleep
[1518-07-11 00:25] falls asleep
[1518-03-04 00:43] falls asleep
[1518-04-16 00:53] falls asleep
[1518-06-11 00:54] falls asleep
[1518-06-16 00:15] falls asleep
[1518-10-18 00:46] falls asleep
[1518-07-24 00:02] Guard #389 begins shift
[1518-04-04 00:26] wakes up
[1518-04-07 00:21] falls asleep
[1518-04-12 23:56] Guard #2647 begins shift
[1518-07-18 00:49] wakes up
[1518-05-07 00:04] falls asleep
[1518-10-06 00:04] Guard #947 begins shift
[1518-09-18 00:43] wakes up
[1518-04-29 00:33] wakes up
[1518-07-29 00:57] falls asleep
[1518-08-27 00:42] wakes up
[1518-03-16 23:46] Guard #739 begins shift
[1518-05-20 00:23] falls asleep
[1518-07-27 00:09] falls asleep
[1518-08-18 00:37] falls asleep
[1518-06-26 00:01] Guard #1307 begins shift
[1518-09-30 00:20] falls asleep
[1518-04-11 00:44] falls asleep
[1518-04-09 00:12] falls asleep
[1518-03-31 00:03] Guard #1559 begins shift
[1518-06-08 00:00] Guard #449 begins shift
[1518-11-07 00:46] wakes up
[1518-04-11 00:04] Guard #409 begins shift
[1518-03-04 00:56] wakes up
[1518-07-24 00:47] falls asleep
[1518-08-25 00:21] wakes up
[1518-05-24 00:06] falls asleep
[1518-05-08 00:52] falls asleep
[1518-08-29 23:57] Guard #3067 begins shift
[1518-05-18 00:00] falls asleep
[1518-08-19 23:59] Guard #1459 begins shift
[1518-05-31 00:58] wakes up
[1518-06-13 00:00] Guard #947 begins shift
[1518-10-28 00:48] falls asleep
[1518-05-20 23:58] Guard #877 begins shift
[1518-08-20 00:28] falls asleep
[1518-06-17 00:12] falls asleep
[1518-08-19 00:51] falls asleep
[1518-03-03 23:48] Guard #557 begins shift
[1518-10-28 00:30] falls asleep
[1518-03-30 00:11] falls asleep
[1518-06-07 00:53] wakes up
[1518-07-22 00:01] Guard #557 begins shift
[1518-11-11 00:58] wakes up
[1518-08-27 00:00] Guard #3067 begins shift
[1518-06-06 00:19] wakes up
[1518-10-24 00:59] wakes up
[1518-11-03 00:26] falls asleep
[1518-08-19 00:41] wakes up
[1518-03-19 00:33] falls asleep
[1518-10-02 00:53] wakes up
[1518-07-31 23:58] Guard #1723 begins shift
[1518-08-23 00:53] wakes up
[1518-03-13 00:59] wakes up
[1518-10-20 23:59] Guard #449 begins shift
[1518-05-12 00:09] falls asleep
[1518-05-17 23:54] Guard #1811 begins shift
[1518-06-25 00:53] wakes up
[1518-06-17 00:55] wakes up
[1518-05-09 00:24] falls asleep
[1518-08-14 00:01] Guard #739 begins shift
[1518-03-20 00:06] falls asleep
[1518-11-20 00:28] falls asleep
[1518-04-15 00:58] wakes up
[1518-05-22 00:36] wakes up
[1518-04-12 00:04] Guard #877 begins shift
[1518-06-04 23:52] Guard #877 begins shift
[1518-10-09 00:07] falls asleep
[1518-06-05 00:15] falls asleep
[1518-06-28 00:34] wakes up
[1518-11-13 00:37] wakes up
[1518-09-24 00:48] wakes up
[1518-05-15 00:02] Guard #557 begins shift
[1518-05-27 00:21] falls asleep
[1518-11-12 00:34] wakes up
[1518-06-06 00:51] falls asleep
[1518-11-21 00:43] wakes up
[1518-09-01 00:28] falls asleep
[1518-10-13 00:00] Guard #947 begins shift
[1518-11-20 00:46] wakes up
[1518-05-22 00:01] Guard #1559 begins shift
[1518-04-05 00:07] falls asleep
[1518-06-11 23:56] Guard #3209 begins shift
[1518-07-11 00:51] wakes up
[1518-08-30 00:17] falls asleep
[1518-05-12 23:57] Guard #3271 begins shift
[1518-03-15 00:24] falls asleep
[1518-04-26 23:59] Guard #3067 begins shift
[1518-03-09 00:06] falls asleep
[1518-03-09 00:57] wakes up
[1518-03-08 00:58] wakes up
[1518-04-13 00:22] falls asleep
[1518-04-14 23:46] Guard #1033 begins shift
[1518-07-28 00:54] falls asleep
[1518-09-20 00:00] Guard #3067 begins shift
[1518-05-09 00:43] wakes up
[1518-11-01 00:03] Guard #3067 begins shift
[1518-05-12 00:55] wakes up
[1518-03-08 00:09] falls asleep
[1518-03-10 00:40] wakes up
[1518-03-28 00:00] Guard #1459 begins shift
[1518-10-14 00:34] falls asleep
[1518-09-22 00:26] falls asleep
[1518-10-30 00:26] falls asleep
[1518-09-12 00:07] falls asleep
[1518-03-26 00:58] wakes up
[1518-07-20 00:20] falls asleep
[1518-06-28 00:25] falls asleep
[1518-09-12 00:24] wakes up
[1518-05-22 00:13] falls asleep
[1518-08-13 00:42] wakes up
[1518-08-22 00:04] falls asleep
[1518-07-28 23:59] Guard #1559 begins shift
[1518-08-24 23:59] Guard #2647 begins shift
[1518-10-24 00:05] falls asleep
[1518-06-22 00:47] wakes up
[1518-10-26 00:35] falls asleep
[1518-08-10 00:58] wakes up
[1518-03-14 00:57] wakes up
[1518-07-09 00:32] falls asleep
[1518-04-28 00:55] falls asleep
[1518-10-13 00:41] wakes up
[1518-07-02 00:17] falls asleep
[1518-04-17 00:58] wakes up
[1518-05-22 00:58] wakes up
[1518-09-01 00:48] wakes up
[1518-04-01 00:48] falls asleep
[1518-07-01 00:00] Guard #557 begins shift
[1518-04-18 00:40] falls asleep
[1518-03-13 23:57] Guard #449 begins shift
[1518-04-08 00:00] Guard #877 begins shift
[1518-09-16 23:57] Guard #1459 begins shift
[1518-11-06 00:57] wakes up
[1518-07-19 23:56] Guard #1459 begins shift
[1518-03-07 00:42] falls asleep
[1518-06-10 00:02] Guard #1559 begins shift
[1518-06-20 00:25] wakes up
[1518-04-08 00:44] falls asleep
[1518-06-22 00:01] Guard #113 begins shift
[1518-07-08 23:46] Guard #1811 begins shift
[1518-07-23 00:03] falls asleep
[1518-04-23 00:31] falls asleep
[1518-08-20 00:58] wakes up
[1518-09-30 23:57] Guard #3217 begins shift
[1518-10-28 00:00] Guard #449 begins shift
[1518-06-02 00:30] falls asleep
[1518-09-04 00:36] falls asleep
[1518-07-24 00:56] falls asleep
[1518-04-16 00:04] Guard #601 begins shift
[1518-05-20 00:38] wakes up
[1518-10-29 00:33] falls asleep
[1518-07-17 00:42] wakes up
[1518-04-07 00:01] Guard #449 begins shift
[1518-08-29 00:54] wakes up
[1518-04-08 00:54] wakes up
[1518-03-12 00:32] falls asleep
[1518-05-06 00:43] wakes up
[1518-03-05 00:00] Guard #3271 begins shift
[1518-07-30 00:04] Guard #389 begins shift
[1518-07-26 00:00] falls asleep
[1518-10-17 00:23] falls asleep
[1518-09-06 23:53] Guard #389 begins shift
[1518-03-08 00:56] falls asleep
[1518-09-13 00:55] wakes up
[1518-07-20 00:31] wakes up
[1518-10-14 00:02] Guard #557 begins shift
[1518-05-26 00:01] Guard #1811 begins shift
[1518-05-29 00:29] wakes up
[1518-07-08 00:57] falls asleep
[1518-07-10 00:21] falls asleep
[1518-08-24 00:50] wakes up
[1518-03-09 00:09] wakes up
[1518-08-16 00:22] falls asleep
[1518-05-01 00:52] wakes up
[1518-06-01 00:25] falls asleep
[1518-07-01 00:26] wakes up
[1518-09-08 23:52] Guard #389 begins shift
[1518-09-17 00:35] falls asleep
[1518-05-30 00:58] wakes up
[1518-11-11 00:54] wakes up
[1518-04-30 00:37] wakes up
[1518-05-06 23:54] Guard #1033 begins shift
[1518-11-08 00:25] falls asleep
[1518-11-15 23:58] Guard #3217 begins shift
[1518-11-01 00:14] falls asleep
[1518-10-08 00:57] wakes up
[1518-08-18 00:56] falls asleep
[1518-11-10 23:57] Guard #2647 begins shift
[1518-03-21 23:57] Guard #389 begins shift
[1518-09-22 23:59] Guard #3209 begins shift
[1518-08-24 00:58] wakes up
[1518-10-19 23:57] Guard #389 begins shift
[1518-09-07 23:48] Guard #3209 begins shift
[1518-08-10 23:57] Guard #1033 begins shift
[1518-03-13 00:03] Guard #3271 begins shift
[1518-03-19 00:37] wakes up
[1518-06-18 23:59] Guard #877 begins shift
[1518-10-04 00:51] falls asleep
[1518-09-28 00:42] falls asleep
[1518-05-06 00:00] Guard #1459 begins shift
[1518-05-03 00:26] wakes up
[1518-06-26 00:55] wakes up
[1518-09-15 00:59] wakes up
[1518-07-22 00:35] wakes up
[1518-09-03 00:51] wakes up
[1518-07-22 00:58] wakes up
[1518-04-29 00:15] falls asleep
[1518-10-29 00:58] wakes up
[1518-07-27 00:46] falls asleep
[1518-07-29 00:54] wakes up
[1518-11-23 00:54] wakes up
[1518-04-25 23:48] Guard #877 begins shift
[1518-08-16 23:57] Guard #1559 begins shift
[1518-09-25 00:47] falls asleep
[1518-03-06 00:18] wakes up
[1518-10-18 00:00] falls asleep
[1518-10-01 00:48] wakes up
[1518-04-12 00:59] wakes up
[1518-11-13 00:50] falls asleep
[1518-09-10 23:58] Guard #3209 begins shift
[1518-09-27 00:00] Guard #409 begins shift
[1518-09-21 23:51] Guard #3209 begins shift
[1518-11-03 00:11] falls asleep
[1518-11-18 00:06] falls asleep
[1518-03-06 00:56] falls asleep
[1518-07-14 00:17] falls asleep
[1518-08-05 00:40] falls asleep
[1518-04-23 00:43] falls asleep
[1518-09-18 00:00] falls asleep
[1518-08-02 23:56] Guard #2647 begins shift
[1518-09-22 00:34] wakes up
[1518-06-19 00:08] falls asleep
[1518-06-01 00:41] wakes up
[1518-09-08 00:11] wakes up
[1518-04-17 00:54] falls asleep
[1518-05-27 00:02] Guard #3271 begins shift
[1518-08-07 00:53] wakes up
[1518-07-20 00:39] falls asleep
[1518-11-07 23:58] Guard #449 begins shift
[1518-09-24 23:57] Guard #1459 begins shift
[1518-04-28 00:57] wakes up
[1518-08-28 00:53] wakes up
[1518-04-16 00:29] falls asleep
[1518-07-12 00:42] wakes up
[1518-06-22 23:56] Guard #3067 begins shift
[1518-03-20 00:46] wakes up
[1518-05-07 23:50] Guard #409 begins shift
[1518-08-25 00:48] wakes up
[1518-04-06 00:56] falls asleep
[1518-09-03 00:06] falls asleep
[1518-09-10 00:01] falls asleep
[1518-07-17 00:11] falls asleep
[1518-10-23 00:49] wakes up
[1518-05-30 00:03] falls asleep
[1518-10-12 00:51] falls asleep
[1518-11-17 00:00] Guard #1307 begins shift
[1518-03-23 00:28] wakes up
[1518-08-02 00:54] falls asleep
[1518-08-16 00:53] wakes up
[1518-06-09 00:43] wakes up
[1518-04-23 00:50] wakes up
[1518-11-02 00:51] wakes up
[1518-08-25 00:46] falls asleep
[1518-06-27 00:36] wakes up
[1518-04-08 23:57] Guard #1559 begins shift
[1518-07-09 00:58] wakes up
[1518-10-28 23:56] Guard #449 begins shift
[1518-04-02 00:53] wakes up
[1518-05-17 00:45] falls asleep
[1518-03-15 00:04] Guard #601 begins shift
[1518-03-17 00:15] wakes up
[1518-05-05 00:59] wakes up
[1518-05-25 00:03] wakes up
[1518-10-18 23:57] Guard #1559 begins shift
[1518-10-21 00:27] falls asleep
[1518-05-12 00:40] wakes up
[1518-04-06 00:58] wakes up
[1518-05-23 00:20] falls asleep
[1518-07-16 23:56] Guard #1459 begins shift
[1518-06-12 00:51] wakes up
[1518-04-19 00:34] falls asleep
[1518-06-14 00:09] falls asleep
[1518-08-08 00:19] falls asleep
[1518-09-04 00:02] falls asleep
[1518-05-23 00:57] wakes up
[1518-03-27 00:17] falls asleep
[1518-04-15 00:28] falls asleep
[1518-09-23 00:30] falls asleep
[1518-10-08 00:44] wakes up
[1518-08-29 00:29] falls asleep
[1518-08-03 00:52] falls asleep
[1518-10-24 00:45] wakes up
[1518-05-12 00:45] falls asleep
[1518-09-12 00:29] falls asleep
[1518-04-16 00:59] wakes up
[1518-07-11 00:31] wakes up
[1518-07-04 00:39] wakes up
[1518-05-16 00:44] wakes up
[1518-06-21 00:45] wakes up
[1518-07-26 23:58] Guard #3209 begins shift
[1518-05-08 23:58] Guard #877 begins shift
[1518-11-07 00:20] falls asleep
[1518-08-26 00:04] Guard #389 begins shift
[1518-03-11 00:16] falls asleep
[1518-11-17 00:20] falls asleep
[1518-09-10 00:49] wakes up
[1518-05-10 00:36] falls asleep
[1518-05-16 00:55] wakes up
[1518-08-04 00:01] Guard #409 begins shift
[1518-04-26 00:45] wakes up
[1518-09-07 00:46] wakes up
[1518-10-21 00:47] wakes up
[1518-05-15 00:46] wakes up
[1518-08-21 00:50] wakes up
[1518-08-08 00:58] wakes up
[1518-08-26 00:57] falls asleep
[1518-07-02 00:51] wakes up
[1518-03-25 00:16] falls asleep
[1518-08-11 00:59] wakes up
[1518-04-19 00:58] wakes up
[1518-10-15 00:56] falls asleep
[1518-06-15 00:14] falls asleep
[1518-04-03 00:42] wakes up
[1518-11-14 00:18] falls asleep
[1518-05-12 00:02] Guard #947 begins shift
[1518-04-15 00:05] falls asleep
[1518-04-23 00:39] wakes up
[1518-07-22 00:19] falls asleep
[1518-07-31 00:44] wakes up
[1518-10-27 00:43] wakes up
[1518-09-22 00:03] falls asleep
[1518-03-07 00:02] Guard #3067 begins shift
[1518-03-03 00:55] wakes up
[1518-06-02 00:56] wakes up
[1518-03-04 00:23] wakes up
[1518-08-06 00:37] falls asleep
[1518-06-23 23:50] Guard #1559 begins shift
[1518-09-27 00:50] wakes up
[1518-07-08 00:19] falls asleep
[1518-05-09 00:52] wakes up
[1518-03-06 00:02] falls asleep
[1518-06-05 00:01] falls asleep
[1518-05-03 00:47] wakes up
[1518-05-29 00:41] falls asleep
[1518-10-25 23:58] Guard #947 begins shift
[1518-10-14 23:59] Guard #3209 begins shift
[1518-03-04 00:02] falls asleep
[1518-07-28 00:03] Guard #3217 begins shift
[1518-09-12 00:09] wakes up
[1518-03-09 00:35] wakes up
[1518-10-27 00:00] Guard #739 begins shift
[1518-07-29 00:59] wakes up
[1518-11-10 00:34] wakes up
[1518-05-25 00:02] falls asleep
[1518-03-10 00:30] falls asleep
[1518-07-08 00:48] wakes up
[1518-05-19 23:57] Guard #3217 begins shift
[1518-03-31 00:40] wakes up
[1518-08-02 00:28] falls asleep
[1518-11-11 00:57] falls asleep
[1518-06-27 00:45] falls asleep
[1518-07-05 23:53] Guard #1559 begins shift
[1518-10-02 00:17] falls asleep
[1518-06-13 00:45] falls asleep
[1518-10-04 00:18] falls asleep
[1518-06-03 00:59] wakes up
[1518-06-11 00:57] wakes up
[1518-04-04 00:02] Guard #947 begins shift
[1518-04-24 00:45] falls asleep
[1518-03-20 00:00] Guard #1307 begins shift
[1518-11-16 00:58] wakes up
[1518-05-01 23:58] Guard #389 begins shift
[1518-08-06 00:00] Guard #1559 begins shift
[1518-03-05 23:49] Guard #113 begins shift
[1518-06-23 00:56] wakes up
[1518-09-28 00:48] wakes up
[1518-07-19 00:49] wakes up
[1518-07-08 00:58] wakes up
[1518-04-03 00:41] falls asleep
[1518-09-14 00:57] wakes up
[1518-07-25 00:05] falls asleep
[1518-11-12 23:57] Guard #1811 begins shift
[1518-06-10 00:29] falls asleep
[1518-08-21 00:58] wakes up
[1518-03-17 00:43] falls asleep
[1518-03-06 00:59] wakes up
[1518-08-06 00:44] wakes up
[1518-07-04 23:56] Guard #2389 begins shift
[1518-06-21 00:03] falls asleep
[1518-04-10 00:27] falls asleep
[1518-03-30 00:59] wakes up
[1518-03-31 23:57] Guard #449 begins shift
[1518-09-08 00:01] falls asleep
[1518-04-10 00:58] wakes up
[1518-05-30 00:45] falls asleep
[1518-09-26 00:51] falls asleep
[1518-09-20 00:16] falls asleep
[1518-05-08 00:05] falls asleep
[1518-09-13 00:23] falls asleep
[1518-09-12 00:23] falls asleep
[1518-03-31 00:39] falls asleep
[1518-06-08 00:40] falls asleep
[1518-08-23 23:59] Guard #409 begins shift
[1518-09-03 00:35] falls asleep
[1518-06-04 00:00] Guard #1237 begins shift
[1518-11-05 00:01] Guard #3209 begins shift
[1518-07-21 00:36] falls asleep
[1518-10-11 23:59] Guard #601 begins shift
[1518-11-19 00:59] wakes up
[1518-11-17 23:57] Guard #1559 begins shift
[1518-06-07 00:04] Guard #3209 begins shift
[1518-10-15 00:21] falls asleep
[1518-04-07 00:58] wakes up
[1518-07-09 00:19] wakes up
[1518-08-05 00:51] wakes up
[1518-05-01 00:22] wakes up
[1518-03-07 00:59] wakes up
[1518-08-12 00:33] wakes up
[1518-05-03 00:18] falls asleep
[1518-03-10 00:04] Guard #3271 begins shift
[1518-10-31 00:55] wakes up
[1518-07-03 00:48] falls asleep
[1518-05-31 23:52] Guard #3271 begins shift
[1518-05-23 00:37] wakes up
[1518-06-13 00:59] wakes up
[1518-11-06 00:29] falls asleep
[1518-10-27 00:09] falls asleep
[1518-05-07 00:50] falls asleep
[1518-06-28 23:53] Guard #1459 begins shift
[1518-04-04 00:37] falls asleep
[1518-10-09 23:56] Guard #3209 begins shift
[1518-06-29 00:02] falls asleep
[1518-09-16 00:56] wakes up
[1518-05-08 00:31] wakes up
[1518-10-08 00:20] falls asleep
[1518-04-21 00:58] wakes up
[1518-03-09 00:56] falls asleep
[1518-06-13 23:58] Guard #1033 begins shift
[1518-07-22 00:42] wakes up
[1518-05-28 00:11] falls asleep
[1518-06-17 00:00] Guard #3271 begins shift
[1518-09-27 00:56] falls asleep
[1518-04-18 00:00] Guard #947 begins shift
[1518-09-19 00:04] Guard #3209 begins shift
[1518-11-18 00:49] falls asleep
[1518-08-25 00:42] wakes up
[1518-04-20 00:56] wakes up
[1518-08-22 00:47] wakes up
[1518-10-07 00:59] wakes up
[1518-04-18 23:59] Guard #389 begins shift
[1518-07-16 00:23] falls asleep
[1518-07-30 00:17] falls asleep
[1518-04-24 00:03] Guard #877 begins shift
[1518-05-06 00:38] falls asleep
[1518-05-28 00:44] falls asleep
[1518-05-02 23:56] Guard #557 begins shift
[1518-11-17 00:47] falls asleep
[1518-06-18 00:44] falls asleep
[1518-11-04 00:14] wakes up
[1518-06-16 00:30] wakes up
[1518-11-02 00:22] wakes up
[1518-04-22 23:57] Guard #601 begins shift
[1518-06-20 23:50] Guard #3067 begins shift
[1518-07-28 00:06] falls asleep
[1518-08-25 00:28] falls asleep
[1518-11-06 00:47] falls asleep
[1518-05-16 00:49] falls asleep
[1518-09-15 00:40] falls asleep
[1518-09-25 00:44] wakes up
[1518-06-04 00:58] wakes up
[1518-03-08 00:50] wakes up
[1518-10-30 00:58] wakes up
[1518-05-01 00:25] falls asleep
[1518-11-13 00:51] wakes up
[1518-10-06 00:54] wakes up
[1518-04-28 00:51] wakes up
[1518-04-24 00:33] wakes up
[1518-03-25 00:51] wakes up
[1518-11-02 23:58] Guard #877 begins shift
[1518-07-12 00:00] Guard #1459 begins shift
[1518-09-12 00:45] wakes up
[1518-11-11 00:47] falls asleep
[1518-10-08 23:57] Guard #947 begins shift
[1518-06-08 00:59] wakes up
[1518-07-10 00:04] Guard #3217 begins shift
[1518-09-03 23:50] Guard #1459 begins shift
[1518-09-01 23:50] Guard #3271 begins shift
[1518-11-19 23:56] Guard #113 begins shift
[1518-04-22 00:00] Guard #3217 begins shift
[1518-07-20 23:58] Guard #877 begins shift
[1518-09-28 00:03] Guard #3217 begins shift
[1518-03-04 00:18] falls asleep
[1518-09-03 00:03] Guard #1307 begins shift
[1518-09-14 00:48] falls asleep
[1518-09-02 00:49] falls asleep
[1518-03-24 00:46] wakes up
[1518-07-24 00:59] wakes up
[1518-09-01 00:02] Guard #449 begins shift
[1518-04-25 00:24] falls asleep
[1518-06-11 00:28] falls asleep
[1518-07-09 00:49] falls asleep
[1518-08-31 00:02] Guard #409 begins shift
[1518-08-05 00:02] Guard #389 begins shift
[1518-08-22 00:58] wakes up
[1518-09-29 00:52] wakes up
[1518-09-07 00:01] falls asleep
[1518-10-19 00:15] falls asleep
[1518-07-18 00:39] falls asleep
[1518-07-06 23:58] Guard #113 begins shift
[1518-11-10 00:04] Guard #1033 begins shift
[1518-08-15 00:01] Guard #1559 begins shift
[1518-04-12 00:13] falls asleep
[1518-06-05 00:56] wakes up
[1518-10-17 00:54] falls asleep
[1518-10-10 23:58] Guard #1459 begins shift
[1518-08-13 00:14] falls asleep
[1518-10-16 00:02] Guard #2389 begins shift
[1518-07-11 00:01] Guard #557 begins shift
[1518-10-02 00:42] falls asleep
[1518-07-15 23:57] Guard #449 begins shift
[1518-03-07 00:45] wakes up
[1518-11-19 00:02] Guard #389 begins shift
[1518-11-03 00:51] wakes up
[1518-10-22 23:59] Guard #1459 begins shift
[1518-07-08 00:02] Guard #3271 begins shift
[1518-09-16 00:18] wakes up
[1518-05-05 00:00] falls asleep
[1518-09-15 00:01] Guard #2647 begins shift
[1518-05-19 00:46] falls asleep
[1518-10-17 00:48] wakes up
[1518-03-07 00:57] falls asleep
[1518-09-11 00:52] wakes up
[1518-10-13 00:53] falls asleep
[1518-07-13 00:43] falls asleep
[1518-06-26 00:30] falls asleep
[1518-07-28 00:59] wakes up
[1518-08-12 00:15] falls asleep
[1518-06-25 00:21] falls asleep
[1518-05-26 00:38] falls asleep
[1518-07-12 23:59] Guard #1811 begins shift
[1518-05-28 00:47] wakes up
[1518-10-02 23:56] Guard #1307 begins shift
[1518-09-22 00:47] wakes up
[1518-05-07 00:35] wakes up
[1518-08-09 00:17] falls asleep
[1518-10-30 00:42] falls asleep
[1518-04-04 00:18] falls asleep
[1518-03-22 00:44] falls asleep
[1518-06-13 00:57] falls asleep
[1518-05-02 00:29] falls asleep
[1518-08-15 00:55] wakes up
[1518-04-19 00:57] falls asleep
[1518-04-19 23:59] Guard #947 begins shift
[1518-05-02 00:46] falls asleep
[1518-11-15 00:00] Guard #3209 begins shift
[1518-10-13 00:57] wakes up
[1518-04-03 00:07] falls asleep
[1518-08-15 00:20] falls asleep
[1518-03-13 00:47] wakes up
[1518-09-19 00:09] falls asleep
[1518-11-17 00:21] wakes up
[1518-10-19 00:35] wakes up
[1518-05-15 00:40] falls asleep
[1518-11-03 23:48] Guard #1307 begins shift
[1518-04-10 00:04] Guard #1307 begins shift
[1518-06-20 00:04] Guard #3217 begins shift
[1518-05-16 00:04] falls asleep
[1518-07-19 00:12] falls asleep
[1518-10-12 00:23] wakes up
[1518-03-11 00:56] wakes up
[1518-05-23 00:56] falls asleep
[1518-06-28 00:32] falls asleep
[1518-05-11 00:45] wakes up
[1518-04-09 00:33] falls asleep
[1518-10-05 00:10] falls asleep
[1518-06-30 00:37] wakes up
[1518-07-04 00:06] falls asleep
[1518-05-02 00:53] wakes up
[1518-10-06 23:54] Guard #557 begins shift
[1518-08-23 00:17] falls asleep
[1518-09-11 00:19] falls asleep
[1518-03-27 00:58] wakes up
[1518-09-06 00:01] Guard #1237 begins shift
[1518-07-06 00:45] wakes up
[1518-08-04 00:48] wakes up
[1518-09-19 00:25] falls asleep
[1518-04-11 00:31] wakes up
[1518-04-21 00:20] falls asleep
[1518-10-30 00:57] falls asleep
[1518-08-03 00:58] wakes up
[1518-04-27 00:58] wakes up
[1518-10-15 00:58] wakes up
[1518-11-23 00:42] falls asleep
[1518-06-15 00:01] Guard #1559 begins shift
[1518-04-24 00:49] wakes up
[1518-09-21 00:31] wakes up
[1518-05-26 00:41] wakes up
[1518-07-28 00:51] wakes up
[1518-11-22 23:58] Guard #2647 begins shift
[1518-10-28 00:39] wakes up
[1518-09-14 00:37] wakes up
[1518-05-15 23:51] Guard #3217 begins shift
[1518-07-01 00:33] falls asleep
[1518-03-29 00:44] wakes up
[1518-05-22 00:51] wakes up
[1518-10-14 00:54] wakes up
[1518-07-15 00:45] wakes up
[1518-06-14 00:27] wakes up
[1518-07-13 00:55] wakes up
[1518-09-28 00:54] falls asleep
[1518-10-18 00:50] wakes up
[1518-08-26 00:27] falls asleep
[1518-11-04 00:53] falls asleep
[1518-05-01 00:10] falls asleep
[1518-08-02 00:47] wakes up
[1518-04-30 00:05] falls asleep
[1518-09-05 00:56] wakes up
[1518-09-01 00:55] falls asleep
[1518-06-15 23:56] Guard #1559 begins shift
[1518-09-09 23:46] Guard #947 begins shift
[1518-06-06 00:36] falls asleep
[1518-07-24 23:48] Guard #1237 begins shift
[1518-07-01 00:08] falls asleep
[1518-07-12 00:37] falls asleep
[1518-03-30 00:54] wakes up
[1518-06-17 00:48] falls asleep
[1518-11-07 00:03] Guard #1459 begins shift
[1518-03-28 00:58] wakes up
[1518-08-03 00:48] wakes up
[1518-06-09 00:32] falls asleep
[1518-11-05 00:11] falls asleep
[1518-11-21 23:52] Guard #409 begins shift
[1518-11-22 00:04] falls asleep
[1518-08-22 23:59] Guard #113 begins shift
[1518-11-06 00:41] wakes up
[1518-10-03 00:40] falls asleep
[1518-06-25 00:00] Guard #877 begins shift
[1518-05-17 00:00] Guard #449 begins shift
[1518-06-28 00:03] Guard #3271 begins shift
[1518-09-29 00:03] Guard #2647 begins shift
[1518-05-21 00:19] wakes up
[1518-03-30 00:53] falls asleep
[1518-08-14 00:49] wakes up
[1518-06-23 00:37] falls asleep
[1518-07-31 00:00] Guard #3217 begins shift
[1518-06-09 00:29] wakes up
[1518-03-11 00:00] Guard #389 begins shift
[1518-11-11 00:27] wakes up
[1518-08-21 00:57] falls asleep
[1518-08-09 23:56] Guard #1811 begins shift
[1518-04-25 00:04] Guard #2647 begins shift
[1518-07-09 00:03] falls asleep
[1518-09-25 23:58] Guard #1033 begins shift
[1518-07-17 23:58] Guard #409 begins shift
[1518-05-22 00:47] falls asleep
[1518-08-30 00:32] wakes up
[1518-10-14 00:23] wakes up
[1518-10-17 00:56] wakes up
[1518-08-12 00:59] wakes up
[1518-09-21 00:58] wakes up
[1518-09-22 00:22] wakes up
[1518-05-29 00:52] wakes up
[1518-09-05 00:51] falls asleep
[1518-10-05 00:52] falls asleep
[1518-03-09 00:29] falls asleep
[1518-04-09 00:50] wakes up
[1518-10-04 00:59] wakes up
[1518-07-27 00:33] wakes up
[1518-07-13 00:51] falls asleep
[1518-06-28 00:29] wakes up
[1518-07-23 00:44] wakes up
[1518-05-24 00:58] wakes up
[1518-09-24 00:07] falls asleep
[1518-08-19 00:55] wakes up
[1518-04-15 00:53] wakes up
[1518-08-29 00:04] falls asleep
[1518-07-21 00:59] wakes up
[1518-05-03 00:45] falls asleep
[1518-03-17 00:01] falls asleep
[1518-03-05 00:51] wakes up
[1518-07-22 00:46] falls asleep
[1518-06-30 00:14] falls asleep
[1518-08-03 00:32] falls asleep
[1518-11-22 00:08] wakes up
[1518-05-21 00:58] wakes up
[1518-03-23 23:46] Guard #3209 begins shift`;

function guardSleepHistory(input) {
    let guardMinutes = {};
    let currentGuard = 0;
    let startTime = 0;

    input.split('\n').sort().forEach(s => {
        const time = new Date(s.slice(1, 17)).valueOf();
        if (s.indexOf('falls asleep') !== -1) {
            startTime = time;
        } else if (s.indexOf('wakes up') !== -1) {
            if (!guardMinutes.hasOwnProperty(currentGuard)) {
                guardMinutes[currentGuard] = (new Array(60)).fill(0);
            }
            for (let i = startTime; i < time; i += 1000 * 60) {
                const m = (new Date(i)).getMinutes();
                guardMinutes[currentGuard][m] += 1;
            }
        } else {
            currentGuard = parseInt(/Guard #(\d*) begins shift/.exec(s)[1], 10);
        }
    });

    return guardMinutes;
}

function day4_part1(input) {
    const guardMinutes = guardSleepHistory(input);
    const mostAsleepGuard = Object.keys(guardMinutes).map(g => {
        return [parseInt(g, 10), guardMinutes[g].reduce((a, b) => a + b, 0)];
    }).reduce((max, i) => {
        return i[1] > max[1] ? i : max;
    })[0];
    const mostAsleepMinute = guardMinutes[mostAsleepGuard].map((m, idx) => {
            return [idx, m]
        }).reduce((max, i) => {
            return i[1] > max[1] ? i : max;
        })[0];
    return mostAsleepGuard * mostAsleepMinute;
}
  
assert.equal(day4_part1(sampleInput), 10*24);
console.log(day4_part1(input));

function day4_part2(input) {
    const guardMinutes = guardSleepHistory(input);
    const ans = Object.keys(guardMinutes).map(g => {
        const minutes = guardMinutes[g];
        const max = Math.max(...minutes);
        return [parseInt(g, 10), minutes.indexOf(max), max];
    }).reduce((max, i) => {
        return i[2] > max[2] ? i : max;
    });
    return ans[0] * ans[1];
}
  
assert.equal(day4_part2(sampleInput), 99*45);
console.log(day4_part2(input));
