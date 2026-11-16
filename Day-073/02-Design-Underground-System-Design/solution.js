/**
 * Problem: Design Underground System (LeetCode 1396)
 * Difficulty: Medium
 * Category: Hash Table / String / Design
 *
 * Description:
 * An underground railway system is keeping track of customer travel times between
 * different stations. They are using this data to calculate the average time it
 * takes to travel from one station to another.
 *
 * Implement the UndergroundSystem class:
 *   - void checkIn(int id, string stationName, int t)
 *     A customer with a card ID equal to id, checks in at the station stationName at time t.
 *     A customer can only be checked into one place at a time.
 *   - void checkOut(int id, string stationName, int t)
 *     A customer with a card ID equal to id, checks out from the station stationName at time t.
 *   - double getAverageTime(string startStation, string endStation)
 *     Returns the average time it takes to travel from startStation to endStation.
 *     The average time is computed from all the previous traveling times from
 *     startStation to endStation that happened directly.
 *
 * Constraints:
 *   - 1 <= id, t <= 10^6
 *   - 1 <= stationName.length, startStation.length, endStation.length <= 10
 *   - All strings consist of uppercase and lowercase English letters and digits.
 *   - At most 2 * 10^4 calls will be made in total to checkIn, checkOut, and getAverageTime.
 *   - Answers within 10^-5 of the actual value will be accepted.
 */

class UndergroundSystem {
  constructor() {
    // Maps customer id -> { stationName: string, t: number }
    this.checkIns = new Map();
    // Maps routeKey "startStation->endStation" -> { totalTime: number, tripCount: number }
    this.routeStats = new Map();
  }

  /**
   * Records passenger check-in.
   * Time Complexity: O(1)
   *
   * @param {number} id
   * @param {string} stationName
   * @param {number} t
   * @return {void}
   */
  checkIn(id, stationName, t) {
    this.checkIns.set(id, { stationName, t });
  }

  /**
   * Records passenger check-out and aggregates route statistics.
   * Time Complexity: O(1)
   *
   * @param {number} id
   * @param {string} stationName
   * @param {number} t
   * @return {void}
   */
  checkOut(id, stationName, t) {
    const checkInData = this.checkIns.get(id);
    if (!checkInData) return;

    this.checkIns.delete(id);

    const routeKey = `${checkInData.stationName}->${stationName}`;
    const duration = t - checkInData.t;

    const stats = this.routeStats.get(routeKey) || { totalTime: 0, tripCount: 0 };
    stats.totalTime += duration;
    stats.tripCount += 1;
    this.routeStats.set(routeKey, stats);
  }

  /**
   * Calculates the average transit time between two stations.
   * Time Complexity: O(1)
   *
   * @param {string} startStation
   * @param {string} endStation
   * @return {number}
   */
  getAverageTime(startStation, endStation) {
    const routeKey = `${startStation}->${endStation}`;
    const stats = this.routeStats.get(routeKey);
    if (!stats || stats.tripCount === 0) return 0;
    return stats.totalTime / stats.tripCount;
  }
}

// ----------------- Unit Tests -----------------
function runTests() {
  const assert = require('assert');

  // Test suite 1: Example 1
  const ug1 = new UndergroundSystem();
  ug1.checkIn(45, 'Leyton', 3);
  ug1.checkIn(32, 'Paradise', 8);
  ug1.checkIn(27, 'Leyton', 10);
  ug1.checkOut(45, 'Waterloo', 15); // Leyton -> Waterloo: 12
  ug1.checkOut(27, 'Waterloo', 20); // Leyton -> Waterloo: 10
  ug1.checkOut(32, 'Cambridge', 22); // Paradise -> Cambridge: 14

  assert.strictEqual(ug1.getAverageTime('Paradise', 'Cambridge'), 14.0, 'Test 1 Paradise->Cambridge Failed');
  assert.strictEqual(ug1.getAverageTime('Leyton', 'Waterloo'), 11.0, 'Test 1 Leyton->Waterloo Failed');

  ug1.checkIn(10, 'Leyton', 24);
  assert.strictEqual(ug1.getAverageTime('Leyton', 'Waterloo'), 11.0);
  ug1.checkOut(10, 'Waterloo', 38); // Leyton -> Waterloo: 14
  // Average = (12 + 10 + 14) / 3 = 12.0
  assert.strictEqual(ug1.getAverageTime('Leyton', 'Waterloo'), 12.0, 'Test 1 after 3rd trip Failed');

  // Test suite 2: Example 2
  const ug2 = new UndergroundSystem();
  ug2.checkIn(10, 'Leyton', 3);
  ug2.checkOut(10, 'Paradise', 8); // 5
  assert.strictEqual(ug2.getAverageTime('Leyton', 'Paradise'), 5.0, 'Test 2 Failed');

  ug2.checkIn(5, 'Leyton', 10);
  ug2.checkOut(5, 'Paradise', 16); // 6
  assert.strictEqual(ug2.getAverageTime('Leyton', 'Paradise'), 5.5, 'Test 2 second avg Failed');

  ug2.checkIn(2, 'Leyton', 21);
  ug2.checkOut(2, 'Paradise', 30); // 9
  // Average = (5 + 6 + 9) / 3 = 20 / 3 = 6.666666...
  assert(Math.abs(ug2.getAverageTime('Leyton', 'Paradise') - 20 / 3) < 1e-5, 'Test 2 third avg Failed');

  console.log('All tests passed for 02-Design-Underground-System-Design!');
}

if (require.main === module) {
  runTests();
}

module.exports = { UndergroundSystem };
