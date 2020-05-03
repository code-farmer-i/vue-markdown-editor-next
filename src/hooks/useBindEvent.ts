import { onMounted, onBeforeUnmount, onActivated, onDeactivated } from 'vue';

type EventHandler = (e: Event) => void;
type BindFn = (el: Element, event: string, handler: EventHandler) => void;

function useBindEvents(callback: (bindOrUnbind: BindFn) => void): void {
  let binded = false;
  const bind: BindFn = (el, event, handler) => el.addEventListener(event, handler);
  const unbind: BindFn = (el, event, handler) => el.removeEventListener(event, handler);

  const bindFn = () => {
    if (!binded) {
      callback(bind);
      binded = true;
    }
  };

  const unbindFn = () => {
    if (binded) {
      callback(unbind);
      binded = false;
    }
  };

  onMounted(bindFn);
  onActivated(bindFn);
  onDeactivated(unbindFn);
  onBeforeUnmount(unbindFn);
}
