import { ref, computed } from 'vue';
// types
import { Ref } from 'vue';
import { Toolbars } from '../Toolbar/types';

function getToolbarConfig(toolbars: Toolbars, toolbarStr: string) {
  return toolbarStr
    .split('|')
    .map((group: string) =>
      group.split(' ').filter((toolbarName: string) => toolbarName && toolbars[toolbarName])
    );
}

export default function useToolbar({
  toolbars,
  leftToolbar,
  rightToolbar,
}: {
  toolbars: Toolbars;
  leftToolbar: string;
  rightToolbar: string;
}) {
  // state
  const toolbarHeight: Ref<number> = ref(0);

  // computed
  const leftToolbarGroup = computed(() => {
    return getToolbarConfig(toolbars, leftToolbar);
  });
  const rightToolbarGroup = computed(() => {
    return getToolbarConfig(toolbars, rightToolbar);
  });

  return {
    toolbarHeight,
    leftToolbarGroup,
    rightToolbarGroup,
  };
}
