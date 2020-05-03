import { watch } from 'vue';

// types
import { SetupContext } from 'vue';
import { Props } from './types';

type Hook = (visible: boolean) => void;

export default function (props: Props, ctx: SetupContext) {
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
