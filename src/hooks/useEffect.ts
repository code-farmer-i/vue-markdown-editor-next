import { onMounted, onBeforeUnmount, onActivated, onDeactivated } from 'vue';

export default function useEffect(bind: () => void, unbind: () => void): void {
  onMounted(bind);
  onActivated(bind);
  onDeactivated(unbind);
  onBeforeUnmount(unbind);
}
