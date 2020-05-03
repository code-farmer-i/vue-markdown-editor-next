import { ref, unref } from 'vue';
// types
import { Ref } from 'vue';

export default function useTooltip({
  rootEl,
  menuActive,
  menuCtrlEl,
}: {
  rootEl: Ref<Element>;
  menuActive: Ref<boolean>;
  menuCtrlEl: Ref<Element>;
}) {
  let timmer: number | null = null;

  const tooltipRef: Ref = ref(null);

  function showTooltip(e: MouseEvent): void {
    const { target } = e;

    if ((target !== unref(rootEl) && target !== unref(menuCtrlEl)) || unref(menuActive)) {
      hideTooltip();

      return;
    }

    if (timmer) clearTimeout(timmer);

    const selfElRect = unref(rootEl).getBoundingClientRect();
    const x = e.clientX - selfElRect.left;
    const y = e.clientY - selfElRect.top;

    timmer = setTimeout(() => {
      unref(tooltipRef).show({
        x: x - 2,
        y: y + 20,
      });
    }, 100);
  }

  function hideTooltip(): void {
    if (timmer) clearTimeout(timmer);

    unref(tooltipRef).hide();
  }

  return {
    tooltipRef,
    showTooltip,
    hideTooltip,
  };
}
