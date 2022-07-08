/* eslint-disable @typescript-eslint/no-explicit-any */
export function throttle(
  fn: (...args: any) => any,
  delay: number,
): (...args: any) => any {
  let timer = 0;
  let latestTimer = 0;
  return function _(this: any, ...args: any[]) {
    if (!timer) {
      fn.apply(this, args);
      timer = <any>setTimeout(() => (timer = 0), delay);
    } else {
      if (latestTimer) clearTimeout(latestTimer);
      latestTimer = <any>setTimeout(() => fn.apply(this, args), delay);
    }
  };
}

export function debounce(
  fn: (...args: any) => any,
  delay: number,
): (...args: any) => any {
  let timer = 0;
  return function _(this: any, ...args: any[]) {
    clearTimeout(timer);
    timer = <any>setTimeout(() => fn.apply(this, args), delay);
  };
}
