// Modified from https://github.com/ElemeFE/element/blob/dev/src/utils/resize-event.js

/* eslint-disable no-underscore-dangle */
import ResizeObserver from 'resize-observer-polyfill';

const isServer = typeof window === 'undefined';

declare global {
  interface Element {
    __resizeListeners__?: any[];
    __ro__: ResizeObserver;
  }
}

/* istanbul ignore next */
const resizeHandler = function (entries: ResizeObserverEntry[]) {
  entries.forEach((entry) => {
    const listeners = entry.target.__resizeListeners__ || [];
    if (listeners.length) {
      listeners.forEach((fn: () => void) => {
        fn();
      });
    }
  });
};

/* istanbul ignore next */
export const addResizeListener = function (element: Element, fn: () => void) {
  if (isServer) return;
  if (!element.__resizeListeners__) {
    element.__resizeListeners__ = [];
    element.__ro__ = new ResizeObserver(resizeHandler);
    element.__ro__.observe(element);
  }
  element.__resizeListeners__.push(fn);
};

/* istanbul ignore next */
export const removeResizeListener = function (element: Element, fn: () => void) {
  if (!element || !element.__resizeListeners__) return;
  element.__resizeListeners__.splice(element.__resizeListeners__.indexOf(fn), 1);
  if (!element.__resizeListeners__.length) {
    element.__ro__.disconnect();
  }
};
