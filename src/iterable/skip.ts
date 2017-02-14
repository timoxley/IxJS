'use strict';

import { Iterable, IIterable } from '../iterable';
import { Iterator, IIterator } from '../iterator';

export class SkipIterator extends Iterator {
  private _it: IIterator;
  private _count: number;
  private _skipped: boolean;

  constructor(it: IIterator, count: number) {
    super();
    this._it = it;
    this._count = count;
    this._skipped = false;
  }

  next() {
    let next;
    if (!this._skipped) {
      for (var i = 0; i < this._count; i++) {
        next = this._it.next();
        if (next.done) { return next; }
      }
      this._skipped = true;
    }
    next = this._it.next();
    if (next.done) { return next; }
    return { done: false, value: next.value };  
  }
}

export class SkipIterable extends Iterable {
  private _source: IIterable;
  private _count: number;

  constructor(source: IIterable, count: number) {
    super();

    +count || (count = 0);
    Math.abs(count) === Infinity && (count = 0);
    if (count < 0) { throw new RangeError(); }

    this._source = source;
    this._count = count;
  }

  [Symbol.iterator]() {
    return new SkipIterator(this._source[Symbol.iterator](), this._count);
  }
}

export function skip(source: IIterable, count: number): Iterable {
  return new SkipIterable(source, count);
}