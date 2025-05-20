type MatrixResult =
  | { success: true; matrix: Matrix }
  | { success: false; error: string };

export class Matrix {
  private matrix: number[][];

  private constructor(matrix: number[][]) {
    this.matrix = matrix;
  }

  static create(matrix: any[][]): MatrixResult {
    if (!Matrix.isValidMatrix(matrix)) {
      return {
        success: false,
        error:
          "Invalid matrix: Must be a non-empty 2D array of numbers with equal row lengths.",
      };
    }
    return {
      success: true,
      matrix: new Matrix(matrix as number[][]),
    };
  }

  static isValidMatrix(matrix: any[][]): boolean {
    if (!Array.isArray(matrix) || matrix.length === 0) return false;

    const rowLength = matrix[0].length;
    return matrix.every(
      (row) =>
        Array.isArray(row) &&
        row.length === rowLength &&
        row.every((value) => typeof value === "number" && !isNaN(value))
    );
  }

  // Flatten matrix and return all values
  private flatten(): number[] {
    return this.matrix.flat();
  }

  // Get max value
  getMax(): number {
    return Math.max(...this.flatten());
  }

  // Get min value
  getMin(): number {
    return Math.min(...this.flatten());
  }

  // Get sum of all elements
  getSum(): number {
    return this.flatten().reduce((acc, num) => acc + num, 0);
  }

  // Get average of all elements
  getAverage(): number {
    const totalElements = this.flatten().length;
    return this.getSum() / totalElements;
  }

  // Check if it's a diagonal matrix
  isDiagonal(): boolean {
    return this.matrix.every((row, i) =>
      row.every((value, j) => (i !== j ? value === 0 : true))
    );
  }
}
