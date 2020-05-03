import { watch } from 'vue';

// types
import { SetupContext, PropType } from 'vue';

type Hook = (visible: boolean) => void;

export default function (props: { visible?: boolean }, ctx: SetupContext) {
  const hooks: Hook[] = [];

  watch(
    () => props.visible,
    () => {
      hooks.forEach((hook) => hook(!!props.visible));
    }
  );

  return {
    onVisibleChange(hook: Hook) {
      hooks.push(hook);
    },
    toggleVisible(visible: boolean): void {
      ctx.emit('update:visible', visible);
    },
  };
}
