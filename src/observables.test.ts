//import assert from "assert";
import { Observable } from "../include/observable.js";
import {
  classifyObservables,
  obsStrCond,
  statefulObserver,
  // mergeMax,
  // merge,
  // GreaterAvgObservable,
  // SignChangeObservable,
  // usingSignChange,
} from "./observables.js";

describe("classifyObservables", () => {
  it("classifies a number observable", () => {
    const o = new Observable<number>();

    const { number } = classifyObservables([o]);
    const spy = jest.fn();
    number.subscribe(spy);

    o.update(1);

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("classifies a string observable", () => {
    const o = new Observable<string>();

    const { string } = classifyObservables([o]);
    const spy = jest.fn();
    string.subscribe(spy);

    o.update("hello");

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("classifies a boolean observable", () => {
    const o = new Observable<boolean>();

    const { boolean } = classifyObservables([o]);
    const spy = jest.fn();
    boolean.subscribe(spy);

    o.update(true);

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("classifies mixed observables", () => {
    const o1 = new Observable<number>();
    const o2 = new Observable<string>();
    const o3 = new Observable<boolean>();

    const { number, string, boolean } = classifyObservables([o1, o2, o3]);
    const spyNumber = jest.fn();
    const spyString = jest.fn();
    const spyBoolean = jest.fn();

    number.subscribe(spyNumber);
    string.subscribe(spyString);
    boolean.subscribe(spyBoolean);

    o1.update(1);
    o2.update("hello");
    o3.update(true);

    expect(spyNumber).toHaveBeenCalledTimes(1);
    expect(spyString).toHaveBeenCalledTimes(1);
    expect(spyBoolean).toHaveBeenCalledTimes(1);
  });
});

describe("obsStrCond", () => {
  it("updates result with transformed string when f is true", () => {
    const o = new Observable<string>();
    const result = obsStrCond([x => x.toUpperCase()], x => x.length > 5, o);
    const spy = jest.fn();
    result.subscribe(spy);

    o.update("hello world");

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith("HELLO WORLD");
  });

  it("updates result with original string when f is false", () => {
    const o = new Observable<string>();
    const result = obsStrCond([x => x.toUpperCase()], x => x.length > 15, o);
    const spy = jest.fn();
    result.subscribe(spy);

    o.update("hello world");

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith("hello world");
  });

  it("updates result with original string when funcArr is empty", () => {
    const o = new Observable<string>();
    const result = obsStrCond([], x => x.length > 5, o);
    const spy = jest.fn();
    result.subscribe(spy);

    o.update("hello world");

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith("hello world");
  });

  it("updates result with transformed string when f is true and multiple functions in funcArr", () => {
    const o = new Observable<string>();
    const result = obsStrCond([x => x.toUpperCase(), x => x.slice(0, 5)], x => x.length > 5, o);
    const spy = jest.fn();
    result.subscribe(spy);

    o.update("hello world");

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith("HELLO");
  });

  it("applies a single function to input when funcArr has length 1 and f is true", () => {
    const o = new Observable<string>();
    const result = obsStrCond([x => x.toUpperCase()], x => x.length === 1, o);
    const spy = jest.fn();
    result.subscribe(spy);

    o.update("h");

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith("H");
  });

  it("does not apply the single function when funcArr has length 1 and f is false", () => {
    const o = new Observable<string>();
    const result = obsStrCond([x => x.toUpperCase()], x => x.length > 5, o);
    const spy = jest.fn();
    result.subscribe(spy);

    o.update("h");

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith("h");
  });
});

describe("statefulObserver", () => {
  it("updates result when current value is divisible by previous value", () => {
    const o = new Observable<number>();
    const result = statefulObserver(o);
    const spy = jest.fn();
    result.subscribe(spy);

    o.update(2);
    o.update(4);
    o.update(8);

    expect(spy).toHaveBeenCalledTimes(2);
    expect(spy).toHaveBeenCalledWith(4);
    expect(spy).toHaveBeenCalledWith(8);
  });

  it("does not update result when current value is not divisible by previous value", () => {
    const o = new Observable<number>();
    const result = statefulObserver(o);
    const spy = jest.fn();
    result.subscribe(spy);

    o.update(2);
    o.update(3);
    o.update(5);

    expect(spy).toHaveBeenCalledTimes(0);
  });

  it("ignores first update value", () => {
    const o = new Observable<number>();
    const result = statefulObserver(o);
    const spy = jest.fn();
    result.subscribe(spy);

    o.update(2);
    expect(spy).toHaveBeenCalledTimes(0);

    o.update(4);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(4);
  });
});

describe("mergeMax", () => {
  // More tests go here.
});

describe("merge", () => {
  // More tests go here.
});

describe("GreaterAvgObservable", () => {
  // More tests go here.
});

describe("SignChangeObservable", () => {
  // More tests go here.
});

describe("usingSignChange", () => {
  // More tests go here.
});
