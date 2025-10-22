/**
 * Fenwick Tree (Binary Indexed Tree) for efficient prefix sum queries
 * Used for O(log n) rank calculations in the leaderboard
 */
export class FenwickTree {
  private size: number;
  private bit: number[];

  constructor(size: number) {
    this.size = size;
    this.bit = new Array(size + 1).fill(0);
  }

  /**
   * Update the tree at index with delta
   * Time Complexity: O(log n)
   */
  update(index: number, delta: number): void {
    while (index <= this.size) {
      this.bit[index] += delta;
      index += index & -index;
    }
  }

  /**
   * Query the prefix sum up to index
   * Time Complexity: O(log n)
   */
  query(index: number): number {
    let sum = 0;
    while (index > 0) {
      sum += this.bit[index];
      index -= index & -index;
    }
    return sum;
  }
}
