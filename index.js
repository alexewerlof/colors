class Board {

  constructor(nColor, width, height) {
    this.nColor = nColor;
    this.width = width;
    this.height = height;
    this.cells = [];
    var size = width * height;
    for (let i = 0; i < size; i++) {
      this.cells[i] = Math.ceil(Math.random() * this.nColor);
    }
  }

  isValidColor(color) {
    return color > 0 && color <= this.nColor;
  }

  getCellIndex(w, h) {
    /*
    00 01 02 03 04 05
    06 07 08 09 10 11
    12 13 14 15 16 17
    18 19 20 21 22 23
    24 25 26 27 28 29
    30 31 32 33 34 35
    36 37 38 39 40 41
    */
    return h * this.width + w;
  }

  getCell(w, h) {
    return this.cells[this.getCellIndex(w, h)];
  }

  setCell(w, h, value) {
    if (!this.isValidColor(value)) {
      throw `Invalid color value: ${value}`;
    }
    return this.cells[this.getCellIndex(w, h)] = value;
  }

  load(...cellValues) {
    var size = this.width * this.height;
    if (cellValues.length !== size) {
      throw `Load should have exactly ${size} elements`;
    }
    cellValues.forEach((value, index) => {
      if (this.isValidColor(value)) {
        this.cells[index] = value;
      } else{
        throw `Load should have exactly ${size} elements`;
      }
    });
  }

  print() {
    for (var h = 0; h < this.height; h++) {
      var line = [];
      for (var w = 0; w < this.width; w++) {
        line.push(this.getCell(w, h));
      }
      console.log(line.join(' '));
    }
  }

  paintCell(w, h, ifColor, thenColor) {
    if ( w < 0 || w >= this.width || h < 0 || h >= this.height) {
      return; //Invalid coordinates (may happen in the recursive algorithm)
    }
    if (this.getCell(w, h) === thenColor) {
      return; //nothing to do. It's already painted
    }
    if (this.getCell(w, h) === ifColor) {
      this.setCell(w, h, thenColor);
      this.paintCell(w - 1, h, ifColor, thenColor);
      this.paintCell(w + 1, h, ifColor, thenColor);
      this.paintCell(w, h - 1, ifColor, thenColor);
      this.paintCell(w, h + 1, ifColor, thenColor);
    }
  }

  click(color) {
    if (!this.isValidColor(color)) {
      throw `Invalid color for clicking ${color}`;
    }
    this.paintCell(0, 0, this.getCell(0,0), color);
  }
}

var b = new Board(3, 6, 6);
b.load(
  1, 3, 1 , 1, 1, 1,
  1, 2, 1 , 1, 1, 1,
  1, 3, 1 , 1, 1, 1,
  1, 2, 1 , 1, 1, 1,
  1, 3, 1 , 1, 1, 1,
  1, 2, 1 , 1, 1, 1
);
b.click(3);
b.print();
console.log('---')
b.click(1);
b.print();
