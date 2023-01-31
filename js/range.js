class Range {
  // end exclude
  constructor(start, end) {
    this.start = start;
    this.end = end;
  }

  toList() {
    const isReduce = this.start > this.end;
    const min = isReduce ? this.end : this.start;
    const max = isReduce ? this.start : this.end;
    const step = isReduce ? -1 : 1;
    // eslint-disable-next-line no-mixed-operators
    return new Array(max - min).fill(0).map((_, index) => this.start + step * index);
  }
}

// eslint-disable-next-line import/prefer-default-export
export { Range };
