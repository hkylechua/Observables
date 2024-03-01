import { Observable } from "../include/observable.js";

// Extra Credit Functions

export function classifyObservables(obsArr: (Observable<string> | Observable<number> | Observable<boolean>)[]): {
  string: Observable<string>;
  number: Observable<number>;
  boolean: Observable<boolean>;
} {
  const result = {
    string: new Observable<string>(),
    number: new Observable<number>(),
    boolean: new Observable<boolean>(),
  };
  // TODO: Implement this function
  obsArr.forEach(obs => {
    if (obs instanceof Observable) {
      if (obs instanceof Observable && typeof obs.update === "function") {
        obs.subscribe(x => {
          if (typeof x === "string") {
            result.string.update(x);
          } else if (typeof x === "number") {
            result.number.update(x);
          } else if (typeof x === "boolean") {
            result.boolean.update(x);
          }
        });
      }
    }
  });
  return result;
  //return { string: new Observable(), number: new Observable(), boolean: new Observable() };
}

export function obsStrCond(
  funcArr: ((arg1: string) => string)[],
  f: (arg1: string) => boolean,
  o: Observable<string>
): Observable<string> {
  const result = new Observable<string>();
  const composedFunc = funcArr.reduce(
    (acc, curr) => x => curr(acc(x)),
    x => x
  );
  o.subscribe(x => {
    const transformed = f(x) ? composedFunc(x) : x;
    result.update(transformed);
  });

  console.log(funcArr.length);
  return result;
}

export function statefulObserver(o: Observable<number>): Observable<number> {
  const result = new Observable<number>();
  let prevValue: number | undefined;

  o.subscribe(x => {
    if (prevValue !== undefined && x % prevValue === 0) {
      result.update(x);
    }
    prevValue = x;
  });

  return result;
}

// Optional Additional Practice

// export function mergeMax(o1: Observable<number>, o2: Observable<number>): Observable<{ obs: number; v: number }> {
//   // TODO: Implement this function
//   return new Observable();
// }

// export function merge(o1: Observable<string>, o2: Observable<string>): Observable<string> {
//   // TODO: Implement this function
//   return new Observable();
// }

// export class GreaterAvgObservable extends Observable<number> {
//   constructor() {
//     super();
//   }

//   greaterAvg(): Observable<number> {
//     // TODO: Implement this method
//     return new Observable();
//   }
// }

// export class SignChangeObservable extends Observable<number> {
//   constructor() {
//     super();
//   }

//   signChange(): Observable<number> {
//     // TODO: Implement this method
//     return new Observable();
//   }
// }

// /**
//  * This function shows how the class you created above could be used.
//  * @param numArr Array of numbers
//  * @param f Observer function
//  */
// export function usingSignChange(numArr: number[], f: Observer<number>) {
//   // TODO: Implement this function
// }
