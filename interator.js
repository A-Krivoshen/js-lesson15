'use strict';
// 1

let prefixSymb = Symbol()

class BarcodeGenerator {
  constructor(size = 1) {
    this.size = size;
  }
  
  static get prefix() {
    return prefixSymb;
  }
  
  create() {
    let res = '';
    for (let i = 0; i < this.size; i++) {
      res += Math.floor(Math.random() * 10);
    }
    if (BarcodeGenerator.prefix in this) {
      res = this[BarcodeGenerator.prefix] + '-' + res;
    }
    return res;
  }
}

const generator = new BarcodeGenerator(4);

generator[BarcodeGenerator.prefix] = 'AA';
console.log(generator.create());

generator[BarcodeGenerator.prefix] = 'XX';
console.log(generator.create());
console.log(generator.create());
console.log(generator.create());

delete generator[BarcodeGenerator.prefix];
console.log(generator.create());

const generator1 = new BarcodeGenerator();

generator1[BarcodeGenerator.prefix] = 'ID';
console.log(generator1.create());

generator1[BarcodeGenerator.prefix] = 'AIDA';
console.log(generator1.create());
console.log(generator1.create());
console.log(generator1.create());

delete generator1[BarcodeGenerator.prefix];
console.log(generator1.create());

// 2
class HexRange {
  constructor(from, to) {
    this.from = from;
    this.to = to;
  }
  
  [Symbol.iterator]() {
    let from  = this.from;
    let to = this.to;
    return {
      current: from,
      next() {
        if (this.current > to) {
          return {
            done: true
          };
        } else {
          let res = this.current.toString(16);
          this.current++;
           return {
           value: res,
           done: false
         } 
        }
      }
    }  
  }
}

let queue = new HexRange(247, 253);
console.log(...queue);

let queue1 = new HexRange(1005, 1016);
console.log(...queue1);

