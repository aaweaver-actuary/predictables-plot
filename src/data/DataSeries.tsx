export const dtypeTypes = [
  'string',
  'float',
  'integer',
  'category',
  'date',
  'any',
  'array',
  'boolean',
  'object',
] as const;
type dtypeTypes = (typeof dtypeTypes)[number];

interface DataSeriesTypes {
  values: any[];
  name?: string;
  index?: any[];
  dtype?: dtypeTypes;
}

/**
 * @class DataSeries
 * @description A statically-typed, mutable, columnar data structure that stores values, a name, an index, and a dtype.
 * @property {any[]} values - The values of the DataSeries.
 * @property {string} name - The name of the DataSeries. Defaults to ''.
 * @property {any[]} index - The index of the DataSeries. Defaults to the default index (0, 1, 2, ...).
 * @property {dtypeTypes} dtype - The dtype of the DataSeries. Defaults to 'any'.
 * @property {[number, number]} shape - The shape of the DataSeries.
 *
 * @method {toString} - Returns a string representation of the DataSeries of the following form:
 * `DataSeries([1, 2, 3], name: 'col1', dtype: 'integer', index: [0, 1, 2])`
 * If any of the attributes are null, they will not be included in the string.
 * @method {length} - Returns the length of the DataSeries.
 * @method {nRows} - Returns the number of rows in the DataSeries.
 * @method {nCols} - Returns the number of columns in the DataSeries.
 * @method {columns} - Returns the columns of the DataSeries.
 * @method {dtypes} - Returns the dtypes of the DataSeries.
 * @method {toString} - Returns a string representation of the DataSeries of the following form:
 * `DataSeries([1, 2, 3], name: 'col1', dtype: 'integer', index: [0, 1, 2])`
 * If any of the attributes are null, they will not be included in the string.
 * @method {toLog} - Logs a string representation of the DataSeries to the console.
 * @method {data} - Returns the values of the DataSeries.
 * @method {map} - Returns a new DataSeries with the values mapped by the callback function.
 * @method {filter} - Returns a new DataSeries with the values filtered by the callback function.
 * @method {sort} - Returns a new DataSeries with the values sorted by the callback function.
 * @method {unique} - Returns a new DataSeries with the unique values of the DataSeries.
 * @method {slice} - Returns a new DataSeries with the values sliced by the start and end indices.
 * @method {forEach} - Applies a callback function to each value in the DataSeries.
 * @method {valueCounts} - Returns a new DataSeries with the unique values of the DataSeries as the index and the value counts of the DataSeries as the values.
 * @method {count} - Returns the number of values in the DataSeries.
 * @method {sum} - Returns the sum of the values in the DataSeries.
 * @method {mean} - Returns the mean of the values in the DataSeries.
 * @method {std} - Returns the standard deviation of the values in the DataSeries.
 * @method {min} - Returns the minimum value in the DataSeries.
 * @method {max} - Returns the maximum value in the DataSeries.
 * @method {quantile} - Returns the quantile value in the DataSeries.
 * @method {describe} - Returns a new DataSeries with the following statistics of the DataSeries:
 * @method {dot} - Returns the dot product of the DataSeries and another DataSeries.
 * @method {head} - Returns a new DataSeries with the first n values of the DataSeries.
 * @method {tail} - Returns a new DataSeries with the last n values of the DataSeries.
 * @method {shuffle} - Returns a new DataSeries with the values shuffled.
 * @method {dataRange} - Returns a 2-element array with the minimum and maximum values of the DataSeries.
 * @method {sample} - Returns a new DataSeries with n random values of the DataSeries.
 * @method {resetIndex} - Returns a new DataSeries with the index reset to the default index (0, 1, 2, ...).
 *
 * @static {fromObject} - Returns a new DataSeries from an object.
 * @static {fromJSON} - Returns a new DataSeries from a JSON string.
 * @static {placeholderDataSeries} - Returns a placeholder DataSeries with the given length, name, and dtype. The values will be an array of the given length filled with 0s. Used as a placeholder for DataSeries.
 *
 * @example
 * const ds = new DataSeries({ values: [1, 2, 3] }); // ds gets the default dtype and index
 * ds.toString(); // DataSeries([1, 2, 3], dtype: any, index: [0, 1, 2])
 * ds.shape; // [3, 1]
 *
 * @example
 * const ds = new DataSeries({ values: [1, 2, 3, 4, 5], name: 'col1', dtype: 'integer' }); // ds gets the default index
 * ds.toString(); // DataSeries([1, 2, 3, 4, 5], name: 'col1', dtype: 'integer', index: [0, 1, 2, 3, 4])
 * ds.shape; // [5, 1]
 
 */
class DataSeries {
  values: any[];
  name: string;
  index: any[];
  dtype: dtypeTypes;
  shape: [number, number];

  constructor({ values, name, index, dtype }: DataSeriesTypes) {
    this.values = values;
    this.name = name || '';
    this.index = index || [...Array(values.length).keys()];
    this.dtype = dtype || 'any';
    this.shape = [this.values.length, 1];
  }

  // getters
  get length() {
    return this.values.length;
  }
  get nRows() {
    return this.values.length;
  }
  get nCols() {
    return 1;
  }
  get columns() {
    return [this.name];
  }
  get dtypes() {
    return [this.dtype];
  }

  /**
   * @method toString
   * @description Returns a string representation of the DataSeries of the following form:
   * `DataSeries([1, 2, 3], name: 'col1', dtype: 'integer', index: [0, 1, 2])`
   * If any of the attributes are null, they will not be included in the string.
   * @returns {string} - A string representation of the DataSeries.
   * @example
   * const ds = new DataSeries({ values: [1, 2, 3] });
   * console.log(ds.toString()); // DataSeries([1, 2, 3])
   * @example
   * const ds = new DataSeries({ values: [1, 2, 3], name: 'col1', dtype: 'integer' });
   * console.log(ds.toString()); // DataSeries([1, 2, 3], name: 'col1', dtype: 'integer')
   * @example
   * const ds = new DataSeries({
   *    values: ['a', 'b', 'c'],
   *    name: 'newCol',
   *    dtype: 'string',
   *    index: [1, 2, 3]
   * });
   * console.log(ds.toString()); // DataSeries(['a', 'b', 'c'], name: 'newCol', dtype: 'string', index: [1, 2, 3])
   *
   */
  toString(): string {
    const { values, name, dtype, index } = this;
    const nameStr = name === '' ? '' : `, name: '${name}'`;
    const dtypeStr = dtype === 'any' ? '' : `, dtype: '${dtype}'`;
    let indexBool = true;
    index.forEach((i) => {
      if (i !== index[i]) {
        indexBool = false;
      }
    });
    const indexStr = indexBool ? '' : `, index: ${index}`;
    return `DataSeries([${values}]${nameStr}${dtypeStr}${indexStr})`;
  }

  /**
   * @method toLog
   * @description Logs a string representation of the DataSeries to the console.
   * @param {boolean} string - If true, the string representation of the DataSeries will be logged to the console. If false, the DataSeries itself will be logged to the console.
   * @returns {void}
   * @example
   * const ds = new DataSeries({ values: [1, 2, 3] });
   * ds.toLog(); // DataSeries([1, 2, 3])
   */
  toLog(string: boolean = true): void {
    if (string) {
      console.log(this.toString());
    } else {
      console.log(this);
    }
  }

  /**
   * @method data
   * @description Returns the values of the DataSeries.
   * @param {number} i - The index of the value to return. If no index is provided, returns all values.
   * @returns {any[] | any} - The values of the DataSeries.
   * @example
   * const ds = new DataSeries({ values: [1, 2, 3] });
   * ds.data(); // [1, 2, 3]
   * ds.data(1); // 2
   */
  data(i: number = -1): any[] | any {
    return i === -1 ? this.values : this.values[i];
  }

  /**
   * @method shift
   * @description Removes the first value of the DataSeries and returns it.
   * @param {return} boolean} [return] - If true, the first value of the DataSeries will be returned. If false, the first value of the DataSeries will be removed and returned.
   * @returns {any | void} - If return is true, the first value of the DataSeries will be returned. If return is false, the first value of the DataSeries will be removed and returned.
   * @example
   * const ds = new DataSeries({ values: [1, 2, 3] });
   * ds.shift(); // will shift off the first value of the DataSeries but will not return it
   * ds.toString(); // DataSeries([2, 3], name: '', dtype: 'any')
   * ds.shift(true); // 1
   * ds.toString(); // DataSeries([2, 3], name: '', dtype: 'any')
   *
   */

  /**
   * @method unshift
   * @description Adds a value to the beginning of the DataSeries.
   * @param {any} value - The value to add to the beginning of the DataSeries.
   * @returns {void} - Adds a value to the beginning of the DataSeries.
   * @example
   * const ds = new DataSeries({ values: [1, 2, 3] });
   * ds.unshift(0);
   * ds.toString(); // DataSeries([0, 1, 2, 3], name: '', dtype: 'any')
   *
   */

  /**
   * @method push
   * @description Adds a value to the end of the DataSeries.
   * @param {any} value - The value to add to the end of the DataSeries.
   * @returns {void} -
   *
   */

  /**
   * @method map
   * @description Returns a new DataSeries with the values mapped by the callback function.
   * @param {function} callback - The callback function to apply to the values.
   * @returns {DataSeries} - A new DataSeries with the values mapped by the callback function.
   * @example
   * const ds = new DataSeries({ values: [1, 2, 3] });
   * const ds2 = ds.map((value) => value * 2);
   * console.log(ds2.values); // [2, 4, 6]
   * @example
   * const ds = new DataSeries({ values: [1, 2, 3] });
   * const ds2 = ds.map((value, index) => value * index);
   * console.log(ds2.values); // [0, 2, 6]
   */
  map(callback: (value: any, index: number, array: any[]) => any): DataSeries {
    return this.data().map(callback);
  }

  /**
   * @method filter
   * @description Returns a new DataSeries with the values filtered by the callback function.
   * @param {function} callback - The callback function that maps each value in the DataSeries to
   * a boolean to determine whether to include the value in the new DataSeries.
   * @returns {DataSeries} - A new DataSeries with the values filtered by the callback function.
   * @example
   * const ds = new DataSeries({ values: [1, 2, 3] });
   * const ds2 = ds.filter((value) => value > 1);
   * console.log(ds2.values); // [2, 3]
   * @example
   * const ds = new DataSeries({ values: [1, 2, 3] });
   * const ds2 = ds.filter((value, index) => index > 1);
   * console.log(ds2.values); // [3]
   */
  filter(
    callback: (value: any, index: number, array: any[]) => boolean,
  ): DataSeries {
    return this.data().filter(callback);
  }

  /**
   * @method sort
   * @description Returns a new DataSeries with the values sorted by the callback function.
   * @param {function} callback - The callback function to apply to the values.
   * @returns {DataSeries} - A new DataSeries with the values sorted by the callback function.
   * @example
   * const ds = new DataSeries({ values: [3, 2, 1] });
   * const ds2 = ds.sort((a, b) => a - b);
   * ds2.toString(); // DataSeries([1, 2, 3], index: [2, 1, 0])
   */
  sort(callback: (a: any, b: any) => number): DataSeries {
    const newVals: any[] = this.data().sort(callback);
    return new DataSeries({
      values: newVals,
      name: this.name,
      index: this.index,
      dtype: this.dtype,
    });
  }

  /**
   * @method unique
   * @description Returns a new DataSeries with the unique values of the DataSeries.
   * @returns {DataSeries} - A new DataSeries with the unique values of the DataSeries.
   * @example
   * const ds = new DataSeries({ values: [1, 2, 3, 1, 2, 3] });
   * const ds2 = ds.unique();
   * ds2.toString(); // DataSeries([1, 2, 3], index: [0, 1, 2])
   * @example
   * const ds = new DataSeries({ values: ['a', 'b', 'c', 'a', 'b', 'c'] });
   * const ds2 = ds.unique();
   * ds2.toString(); // DataSeries(['a', 'b', 'c'], index: [0, 1, 2])
   */
  unique(): DataSeries {
    const unique = [...new Set(this.values)];
    return new DataSeries({
      values: unique,
      name: this.name,
      index: unique,
      dtype: this.dtype,
    });
  }

  /**
   * @method slice
   * @description Returns a new DataSeries with the values sliced by the start and end indices.
   * @param {number} start - The start index of the slice.
   * @param {number} end - The end index of the slice.
   * @returns {DataSeries} - A new DataSeries with the values sliced by the start and end indices.
   * @example
   * const ds = new DataSeries({ values: [1, 2, 3, 4, 5] });
   * const ds2 = ds.slice(2, 4);
   * ds.toString(); // DataSeries([1, 2, 3, 4, 5], index: [0, 1, 2, 3, 4])
   * ds2.toString(); // DataSeries([3, 4], index: [2, 3])
   */
  slice(start: number, end: number): DataSeries {
    return new DataSeries({
      values: this.values.slice(start, end),
      name: this.name,
      index: this.index.slice(start, end),
      dtype: this.dtype,
    });
  }

  /**
   * @method forEach
   * @description Applies a callback function to each value in the DataSeries.
   * @param {function} callback - The callback function to apply to the values.
   * @returns void - Applies a callback function to each value in the DataSeries.
   * @example
   * const ds = new DataSeries({ values: [1, 2, 3] });
   * ds.forEach((value) => console.log(value)); // 1 2 3
   */
  forEach(callback: (value: any, index: number, array: any[]) => void): void {
    return this.data().forEach(callback);
  }

  /**
   * @method shift
   * @description Removes the first value of the DataSeries and returns it.
   * @param {return} boolean} [return] - If true, the first value of the DataSeries will be returned. If false, the first value of the DataSeries will be removed and returned.
   * @returns {any | void} - If return is true, the first value of the DataSeries will be returned. If return is false, the first value of the DataSeries will be removed and returned.
   * @example
   * const 
    }
    return new DataSeries({
      values: newArr,
      name: this.name,
      index: this.index.slice(0, this.length - nItems),
      dtype: this.dtype,
    });
  }

  /**
   * @method shift
   * @description Removes the first value of the DataSeries and returns it.
   * @param {return} boolean} [return] - If true, the first value of the DataSeries will be returned. If false, the first value of the DataSeries will be removed and returned.
   * @returns {any | void} - If return is true, the first value of the DataSeries will be returned. If return is false, the first value of the DataSeries will be removed and returned.
   * @example
   * const ds = new DataSeries({ values: [1, 2, 3] });
   * ds.shift(); // will shift off the first value of the DataSeries but will not return it
   * ds.toString(); // DataSeries([2, 3], name: '', dtype: 'any')
   * ds.shift(true); // 1
   * ds.toString(); // DataSeries([2, 3], name: '', dtype: 'any')
   *
   */

  /**
   * @method unshift
   * @description Adds a value to the beginning of the DataSeries.
   * @param {any} value - The value to add to the beginning of the DataSeries.
   * @returns {void} - Adds a value to the beginning of the DataSeries.
   * @example
   * const ds = new DataSeries({ values: [1, 2, 3]
   */

  /**
   * @method valueCounts
   * @description Returns a new DataSeries with the unique values of the DataSeries as the index and the value counts of the DataSeries as the values.
   * @returns {DataSeries} - A new DataSeries with the unique values of the DataSeries as the index and the value counts of the DataSeries as the values.
   * @example
   * const ds = new DataSeries({ values: [1, 2, 3, 1, 2, 3] });
   * const ds2 = ds.valueCounts();
   * ds.toString(); // DataSeries([1, 2, 3, 1, 2, 3], index: [0, 1, 2, 3, 4, 5])
   * ds2.toString(); // DataSeries([2, 2, 2], index: [1, 2, 3])
   */
  // valueCounts(): DataSeries {
  //   const unique = this.unique();
  //   const counts = unique.map((value) => {
  //     return this.values.filter((v) => v === value).length;
  //   });

  //   const ds = new DataSeries({
  //     values: counts,
  //     name: 'valueCounts',
  //     index: unique,
  //     dtype: 'integer',
  //   });

  //   return new DataSeries({ values: ds.values, index: ds.index });
  // }

  /**
   * @method count
   * @description Returns the number of values in the DataSeries.
   * @returns {number} - The number of values in the DataSeries.
   * @example
   * const ds = new DataSeries({ values: [1, 2, 3] });
   * ds.count(); // 3
   */
  count(): number {
    return this.values.length;
  }

  /**
   * @method sum
   * @description Returns the sum of the values in the DataSeries.
   * @returns {number} - The sum of the values in the DataSeries.
   * @example
   * const ds = new DataSeries({ values: [1, 2, 3] });
   * ds.sum(); // 6
   */
  sum(): number {
    return this.values.reduce((a, b) => a + b, 0);
  }

  /**
   * @method mean
   * @description Returns the mean of the values in the DataSeries.
   * @returns {number} - The mean of the values in the DataSeries.
   * @example
   * const ds = new DataSeries({ values: [1, 2, 3] });
   * ds.mean(); // 2
   */
  mean(): number {
    return this.sum() / this.count();
  }

  /**
   * @method std
   * @description Returns the standard deviation of the values in the DataSeries.
   * @returns {number} - The standard deviation of the values in the DataSeries.
   * @example
   * const ds = new DataSeries({ values: [1, 2, 3] });
   * ds.std(); // 0.816496580927726
   */
  std(unbiased: boolean = true): number {
    const mean = this.mean();
    const variance = this.values
      .map((value) => (value - mean) ** 2)
      .reduce((a, b) => a + b, 0);
    if (unbiased) {
      return Math.sqrt(variance / (this.count() - 1));
    } else {
      return Math.sqrt(variance / this.count());
    }
  }

  /**
   * @method min
   * @description Returns the minimum value in the DataSeries.
   * @returns {number} - The minimum value in the DataSeries.
   * @example
   * const ds = new DataSeries({ values: [1, 2, 3] });
   * ds.min(); // 1
   */
  min(): number {
    return Math.min(...this.values);
  }

  /**
   * @method max
   * @description Returns the maximum value in the DataSeries.
   * @returns {number} - The maximum value in the DataSeries.
   * @example
   * const ds = new DataSeries({ values: [1, 2, 3] });
   * ds.max(); // 3
   */
  max(): number {
    return Math.max(...this.values);
  }

  /**
   * @method quantile
   * @description Returns the quantile value in the DataSeries.
   * @param {number} q - The quantile to return. Must be between 0 and 1.
   * @returns {number} - The quantile value in the DataSeries.
   * @example
   * const ds = new DataSeries({ values: [1, 2, 3] });
   * ds.quantile(0.5); // 2
   */
  quantile(q: number): number {
    if (q < 0 || q > 1) {
      throw new Error('Quantile must be between 0 and 1.');
    }
    const sorted = this.sort((a, b) => a - b);
    const idx = Math.round(q * (sorted.length - 1));
    return sorted[idx];
  }

  /**
   * @method describe
   * @description Returns a new DataSeries with the following statistics of the DataSeries:
   * - count
   * - mean
   * - std
   * - min
   * - 25%
   * - 50%
   * - 75%
   * - max
   * @returns {DataSeries} - A new DataSeries with the statistics of the DataSeries.
   * @example
   * const ds = new DataSeries({ values: [1, 2, 3, 4, 5] });
   * ds.describe().toString(); // DataSeries([5, 3, 1.5811388300841898, 1, 2, 3, 4, 5], index: ['count', 'mean', 'std', 'min', '25%', '50%', '75%', 'max'])
   */
  describe(): DataSeries {
    const count = this.count();
    const mean = this.mean();
    const std = this.std();
    const min = this.min();
    const q25 = this.quantile(0.25);
    const q50 = this.quantile(0.5);
    const q75 = this.quantile(0.75);
    const max = this.max();

    const ds = new DataSeries({
      values: [count, mean, std, min, q25, q50, q75, max],
      name: 'describe',
      index: ['count', 'mean', 'std', 'min', '25%', '50%', '75%', 'max'],
      dtype: 'float',
    });
    return ds;
  }

  /**
   * @method dot
   * @description Returns the dot product of the DataSeries and another DataSeries.
   * @param {DataSeries} ds - The DataSeries to take the dot product with.
   * @returns {number} - The dot product of the DataSeries and another DataSeries.
   * @example
   * const ds1 = new DataSeries({ values: [1, 2, 3] });
   * const ds2 = new DataSeries({ values: [4, 5, 6] });
   * ds1.dot(ds2); // 32
   */
  dot(ds: DataSeries): number {
    if (this.length !== ds.length) {
      throw new Error('DataSeries must be the same length.');
    }
    let dotProd = 0;
    for (let i = 0; i < this.length; i++) {
      dotProd += this.values[i] * ds.values[i];
    }
    return dotProd;
  }

  /**
   * @method head
   * @description Returns a new DataSeries with the first n values of the DataSeries.
   * @param {number} n - The number of values to return.
   * @returns {DataSeries} - A new DataSeries with the first n values of the DataSeries.
   * @example
   * const ds = new DataSeries({ values: [1, 2, 3, 4, 5] });
   * const ds2 = ds.head(3);
   * ds.toString(); // DataSeries([1, 2, 3, 4, 5], index: [0, 1, 2, 3, 4])
   * ds2.toString(); // DataSeries([1, 2, 3], index: [0, 1, 2])
   * ds.head(2).toString(); // DataSeries([1, 2], index: [0, 1])
   */
  head(n: number): DataSeries {
    return this.slice(0, n);
  }

  /**
   * @method tail
   * @description Returns a new DataSeries with the last n values of the DataSeries.
   * @param {number} n - The number of values to return.
   * @returns {DataSeries} - A new DataSeries with the last n values of the DataSeries.
   * @example
   * const ds = new DataSeries({ values: [1, 2, 3, 4, 5] });
   * const ds2 = ds.tail(3);
   * ds.toString(); // DataSeries([1, 2, 3, 4, 5], index: [0, 1, 2, 3, 4])
   * ds2.toString(); // DataSeries([3, 4, 5], index: [2, 3, 4])
   * ds.tail(2).toString(); // DataSeries([4, 5], index: [3, 4])
   */
  tail(n: number): DataSeries {
    return this.slice(this.length - n, this.length);
  }

  /**
   * @method shuffle
   * @description Returns a new DataSeries with the values shuffled.
   * @param {number[]} idx - The index to shuffle.
   * @returns {DataSeries} - A new DataSeries with the values shuffled.
   * @example
   * const ds = new DataSeries({ values: [1, 2, 3, 4, 5] });
   * const ds2 = ds.shuffle();
   * ds.toString(); // DataSeries([1, 2, 3, 4, 5], index: [0, 1, 2, 3, 4])
   * ds2.toString(); // DataSeries([3, 1, 5, 2, 4], index: [2, 0, 4, 1, 3])
   */
  shuffle(idx: number[]): DataSeries {
    let shuffledIdx = [...idx];
    for (let i = shuffledIdx.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledIdx[i], shuffledIdx[j]] = [shuffledIdx[j], shuffledIdx[i]];
    }

    const shuffledValues = shuffledIdx.map((i) => this.values[i]);
    return new DataSeries({
      values: shuffledValues,
      name: this.name,
      index: shuffledIdx,
      dtype: this.dtype,
    });
  }

  /**
   * @method dataRange
   * @description Returns a 2-element array with the minimum and maximum values of the DataSeries.
   * @returns {number[]} - A 2-element array with the minimum and maximum values of the DataSeries.
   * @example
   * const ds = new DataSeries({ values: [1, 2, 3, 4, 5] });
   * ds.dataRange(); // [1, 5]
   */
  dataRange(): number[] {
    return [this.min(), this.max()];
  }

  /**
   * @method sample
   * @description Returns a new DataSeries with n random values of the DataSeries.
   * @param {number} n - The number of values to return.
   * @param {boolean} replace - Whether or not to sample with replacement.
   * @returns {DataSeries} - A new DataSeries with n random values of the DataSeries.
   * @example
   * const ds = new DataSeries({ values: [1, 2, 3, 4, 5] });
   * const ds2 = ds.sample(3);
   * ds.toString(); // DataSeries([1, 2, 3, 4, 5], index: [0, 1, 2, 3, 4])
   * ds2.toString(); // DataSeries([1, 4, 5], index: [0, 3, 4])
   */
  sample(n: number, replace: boolean = false): DataSeries {
    const idx = [...Array(n).keys()];
    if (replace) {
      return new DataSeries({
        values: idx.map(
          () => this.values[Math.floor(Math.random() * this.length)],
        ),
        name: this.name,
        index: idx,
        dtype: this.dtype,
      });
    } else {
      return new DataSeries({
        values: idx.map(
          () =>
            this.values[Math.floor(Math.random() * (this.length - idx.length))],
        ),
        name: this.name,
        index: idx,
        dtype: this.dtype,
      });
    }
  }

  /**
   * @method resetIndex
   * @description Returns a new DataSeries with the index reset to the default index (0, 1, 2, ...). If no index is set, the index will be set to the default index.
   * @returns {DataSeries} - A new DataSeries with the index set to the default index.
   * @example
   * const ds = new DataSeries({ values: [1, 2, 3], index: [3, 4, 5] });
   * const ds2 = ds.resetIndex();
   * ds.toString(); // DataSeries([1, 2, 3], index: [3, 4, 5])
   * ds2.toString(); // DataSeries([1, 2, 3], index: [0, 1, 2])
   */
  resetIndex(): DataSeries {
    let nm: string = this.name;
    let dt: dtypeTypes = this.dtype;
    let idx: number[] = [...Array(this.values.length).keys()];
    return new DataSeries({
      values: this.values,
      name: nm,
      index: idx,
      dtype: dt,
    });
  }

  /**
   * @static fromObject
   * @description Returns a new DataSeries from an object. Must be able to destructure the object into the following form:
   * `{ values: any[] }`
   * Otherwise, an error will be thrown.
   * Optionally takes a name and dtype, both of which default to '' and 'any', respectively, as well as an index, which defaults to the default index (0, 1, 2, ...).
   * @param {object} obj - The object to create the DataSeries from. Must at least have a "values" attribute, but may also have "name", "index", and "dtype" attributes. If any of the attributes are not included, they will be added before destructuring.
   * @returns {DataSeries} - A new DataSeries created from the object.
   * @note This requires slightly complex type annotations to work properly.
   * @example
   * const ds = DataSeries.fromObject({ values: [1, 2, 3] });
   * ds.toString(); // DataSeries([1, 2, 3], dtype: any, index: [0, 1, 2])
   * @example
   * const ds = DataSeries.fromObject({ values: [1, 2, 3], name: 'col1', dtype: 'integer' });
   * ds.toString(); // DataSeries([1, 2, 3], name: 'col1', dtype: 'integer', index: [0, 1, 2])
   * @example
   * const ds = DataSeries.fromObject({
   *   values: ['a', 'b', 'c'],
   *   name: 'newCol',
   *   dtype: 'string',
   *   index: [1, 2, 3]
   * });
   * ds.toString(); // DataSeries(['a', 'b', 'c'], name: 'newCol', dtype: 'string', index: [1, 2, 3])
   */
  static fromObject(obj: {}): DataSeries {
    const { values, name, index, dtype } = obj as DataSeriesTypes;
    return new DataSeries({ values, name, index, dtype });
  }

  /**
   * @static fromArray
   * @description Returns a new DataSeries from an array. Must be able to destructure the array into the following form:
   * `[any[]]` Otherwise, an error will be thrown.
   * Optionally takes a name and dtype, both of which default to '' and 'any', respectively, as well as an index, which defaults to the default index (0, 1, 2, ...).
   * @param {any[]} arr - The array to create the DataSeries from. Must be an array of arrays of the following form: `[any[]]`. If the array is not of the correct form, an error will be thrown.
   * @param {string} name - The name of the DataSeries. Defaults to ''.
   * @param {dtypeTypes} dtype - The dtype of the DataSeries. Defaults to 'any'.
   * @returns {DataSeries} - A new DataSeries created from the array.
   */
  static fromArray(
    arr: any[],
    name: string = '',
    dtype: dtypeTypes = 'any',
  ): DataSeries {
    const values = arr;
    const index = [...Array(values.length).keys()];
    return new DataSeries({ values, name, index, dtype });
  }

  /**
   * @static fromJSON
   * @description Returns a new DataSeries from a JSON string. Must be able to parse the JSON string into an object of the following form:
   * `{ values: any[] }`
   * Otherwise, an error will be thrown.
   * Optionally takes a name and dtype, both of which default to '' and 'any', respectively, as well as an index, which defaults to the default index (0, 1, 2, ...).
   * @param {string} json - The JSON string to create the DataSeries from. Must at least have a "values" attribute, but may also have "name", "index", and "dtype" attributes. If any of the attributes are not included, they will be added before parsing.
   * @returns {DataSeries} - A new DataSeries created from the JSON string.
   */
  static fromJSON(json: string): DataSeries {
    const obj = JSON.parse(json);
    return DataSeries.fromObject(obj);
  }

  /**
   * @static placeholderDataSeries
   * @description Returns a placeholder DataSeries with the given length, name, and dtype. The values will be an array of the given length filled with 0s. Used as a placeholder for DataSeries.
   * @param {number} length - The length of the placeholder DataSeries.
   * @param {string} name - The name of the placeholder DataSeries.
   * @param {dtypeTypes} dtype - The dtype of the placeholder DataSeries.
   * @returns {DataSeries} - A placeholder DataSeries with the given length, name, and dtype.
   * @example
   * const ds = DataSeries.placeholderDataSeries(3, 'col1', 'integer');
   * ds.toString(); // DataSeries([0, 0, 0], name: 'col1', dtype: 'integer', index: [0, 1, 2])
   * @example
   * const ds = DataSeries.placeholderDataSeries(3, 'col1', 'string');
   * ds.toString(); // DataSeries(['0', '0', '0'], name: 'col1', dtype: 'string', index: [0, 1, 2])
   */
  static placeholderDataSeries(
    length: number = 10,
    name: string = 'column',
    dtype: dtypeTypes = 'integer',
  ): DataSeries {
    const values = [...Array(length)].map(() => {
      if (dtype === 'string') {
        return '0';
      } else {
        return 0;
      }
    });
    return new DataSeries({ values, name, dtype });
  }
}

export default DataSeries;
