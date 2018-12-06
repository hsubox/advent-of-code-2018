/*
--- Day 6: Chronal Coordinates ---
The device on your wrist beeps several times, and once again you feel like you're falling.

"Situation critical," the device announces. "Destination indeterminate. Chronal interference detected. Please specify new target coordinates."

The device then produces a list of coordinates (your puzzle input). Are they places it thinks are safe or dangerous? It recommends you check manual page 729. The Elves did not give you a manual.

If they're dangerous, maybe you can minimize the danger by finding the coordinate that gives the largest distance from the other points.

Using only the Manhattan distance, determine the area around each coordinate by counting the number of integer X,Y locations that are closest to that coordinate (and aren't tied in distance to any other coordinate).

Your goal is to find the size of the largest area that isn't infinite. For example, consider the following list of coordinates:

1, 1
1, 6
8, 3
3, 4
5, 5
8, 9
If we name these coordinates A through F, we can draw them on a grid, putting 0,0 at the top left:

..........
.A........
..........
........C.
...D......
.....E....
.B........
..........
..........
........F.
This view is partial - the actual grid extends infinitely in all directions. Using the Manhattan distance, each location's closest coordinate can be determined, shown here in lowercase:

aaaaa.cccc
aAaaa.cccc
aaaddecccc
aadddeccCc
..dDdeeccc
bb.deEeecc
bBb.eeee..
bbb.eeefff
bbb.eeffff
bbb.ffffFf
Locations shown as . are equally far from two or more coordinates, and so they don't count as being closest to any.

In this example, the areas of coordinates A, B, C, and F are infinite - while not shown here, their areas extend forever outside the visible grid. However, the areas of coordinates D and E are finite: D is closest to 9 locations, and E is closest to 17 (both including the coordinate's location itself). Therefore, in this example, the size of the largest area is 17.

What is the size of the largest area that isn't infinite?

Your puzzle answer was 2917.

--- Part Two ---
On the other hand, if the coordinates are safe, maybe the best you can do is try to find a region near as many coordinates as possible.

For example, suppose you want the sum of the Manhattan distance to all of the coordinates to be less than 32. For each location, add up the distances to all of the given coordinates; if the total of those distances is less than 32, that location is within the desired region. Using the same coordinates as above, the resulting region looks like this:

..........
.A........
..........
...###..C.
..#D###...
..###E#...
.B.###....
..........
..........
........F.
In particular, consider the highlighted location 4,3 located at the top middle of the region. Its calculation is as follows, where abs() is the absolute value function:

Distance to coordinate A: abs(4-1) + abs(3-1) =  5
Distance to coordinate B: abs(4-1) + abs(3-6) =  6
Distance to coordinate C: abs(4-8) + abs(3-3) =  4
Distance to coordinate D: abs(4-3) + abs(3-4) =  2
Distance to coordinate E: abs(4-5) + abs(3-5) =  3
Distance to coordinate F: abs(4-8) + abs(3-9) = 10
Total distance: 5 + 6 + 4 + 2 + 3 + 10 = 30
Because the total distance to all coordinates (30) is less than 32, the location is within the region.

This region, which also includes coordinates D and E, has a total size of 16.

Your actual region will need to be much larger than this example, though, instead including all locations with a total distance of less than 10000.

What is the size of the region containing all locations which have a total distance to all given coordinates of less than 10000?

Your puzzle answer was 44202.
*/

const assert = require('assert');

const sampleInput = `1, 1
1, 6
8, 3
3, 4
5, 5
8, 9`;

const input = `264, 340
308, 156
252, 127
65, 75
102, 291
47, 67
83, 44
313, 307
159, 48
84, 59
263, 248
188, 258
312, 240
59, 173
191, 130
155, 266
252, 119
108, 299
50, 84
172, 227
226, 159
262, 177
233, 137
140, 211
108, 175
278, 255
259, 209
233, 62
44, 341
58, 175
252, 74
232, 63
176, 119
209, 334
103, 112
155, 94
253, 255
169, 87
135, 342
55, 187
313, 338
210, 63
237, 321
171, 143
63, 238
79, 132
135, 113
310, 294
289, 184
56, 259`;

function day6_part1(input) {
    const coordinates = input.split('\n').map(r => {
        return r.split(', ').map(n => parseInt(n, 10));
    });
    const xs = coordinates.map(([x, y]) => x);
    const ys = coordinates.map(([x, y]) => y);
    const minX = Math.min(...xs);
    const minY = Math.min(...ys);
    const maxX = Math.max(...xs);
    const maxY = Math.max(...ys);
    let grid = (new Array(maxX - minX + 1)).fill(0).map((r) => {
        return new Array(maxY - minY + 1).fill(-1);
    });
    const createsInfiniteArea = coordinates.map(([x, y]) => {
        return x === minX || x === maxX || y === minY || y === maxY;
    });
    coordinates.forEach(([x, y], idx) => {
        if (!createsInfiniteArea[idx]) {
            grid[x - minX][y - minY] = idx;
        }
    });
    for (let x = minX; x <= maxX; x++) {
        for (let y = minY; y <= maxY; y++) {
            const distances = coordinates.map(([a, b]) => {
                return Math.abs(x - a) + Math.abs(y - b);
            });
            const nearestDistance = Math.min(...distances);
            if (nearestDistance !== 0) {
                const nearestIndex = distances.indexOf(nearestDistance);
                if (!createsInfiniteArea[nearestIndex]) {
                    if (distances.indexOf(nearestDistance, nearestIndex + 1) === -1) {
                        grid[x - minX][y - minY] = nearestIndex;
                    }
                }
            }
        }
    }
    let frequencies = new Array(coordinates.length).fill(0);
    for (let x = minX; x <= maxX; x++) {
        for (let y = minY; y <= maxY; y++) {
            let value = grid[x - minX][y - minY];
            if (value > -1) {
                frequencies[value] += 1;
            }
        }
    }
    return frequencies.sort((a, b) => b - a);
}

assert.equal(day6_part1(sampleInput)[0], 17);
console.log(day6_part1(input)[1]);

function day6_part2(input, maxDistance) {
    const coordinates = input.split('\n').map(r => {
        return r.split(', ').map(n => parseInt(n, 10));
    });
    const xs = coordinates.map(([x, y]) => x);
    const ys = coordinates.map(([x, y]) => y);
    const minX = Math.min(...xs);
    const minY = Math.min(...ys);
    const maxX = Math.max(...xs);
    const maxY = Math.max(...ys);
    let grid = (new Array(maxX - minX + 1)).fill(0).map((r) => {
        return new Array(maxY - minY + 1).fill(0);
    });
    for (let x = minX; x <= maxX; x++) {
        for (let y = minY; y <= maxY; y++) {
            const distances = coordinates.map(([a, b]) => {
                return Math.abs(x - a) + Math.abs(y - b);
            });
            if (distances.reduce((a, b) => a + b) <= maxDistance) {
                grid[x - minX][y - minY] = 1
            }
        }
    }
    return grid.reduce((a, b) => {
        return a + b.reduce((c, d) => c + d, 0);
    }, 0);
}

assert.equal(day6_part2(sampleInput, 30), 16);
console.log(day6_part2(input, 10000));
