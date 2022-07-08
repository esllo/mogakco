import { throttle } from '@/utils/limit';

let observer: ResizeObserver | null = null;
const listeners = new Map<
  HTMLElement,
  ((entiry?: ResizeObserverEntry) => any) | undefined
>();

const resizeListener = throttle(function (entries: ResizeObserverEntry[]) {
  for (const entry of entries) {
    if (entry.contentBoxSize) {
      const ref = entry.target as HTMLElement;
      if (listeners.has(ref)) {
        const fn = listeners.get(ref);
        if (fn) {
          fn(entry);
        }
      }
    }
  }
}, 30);

function observe(ref: HTMLElement, fn?: (entiry?: ResizeObserverEntry) => any) {
  if (!observer) {
    observer = new ResizeObserver(resizeListener);
  }
  listeners.set(ref, fn);
  observer.observe(ref);
}

function unobserve(ref: HTMLElement) {
  if (observer) {
    if (listeners.has(ref)) {
      listeners.delete(ref);
    }
    observer.unobserve(ref);
  }
}

export default function useResizeObserver() {
  return {
    observe,
    unobserve,
  };
}
