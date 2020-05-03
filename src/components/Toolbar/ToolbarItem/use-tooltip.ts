import { ref } from 'vue';
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

    if ((target !== rootEl.value && target !== menuCtrlEl.value) || menuActive.value) {
      hideTooltip();

      return;
    }

    if (timmer) clearTimeout(timmer);

    const selfElRect = rootEl.value.getBoundingClientRect();
    const x = e.clientX - selfElRect.left;
    const y = e.clientY - selfElRect.top;

    timmer = setTimeout(() => {
      tooltipRef.value.show({
        x: x - 2,
        y: y + 20,
      });
    }, 100);
  }

  function hideTooltip(): void {
    if (timmer) clearTimeout(timmer);

    tooltipRef.value.hide();
  }

  return {
    tooltipRef,
    showTooltip,
    hideTooltip,
  };
}
