import { ref, computed, unref } from 'vue';
// utils
import { isPlainObject } from 'lodash-es';
// types
import { ToolbarConfig } from './types';
import { Ref } from 'vue';
import { MenuConfig, MenuItem } from './menu/types';
import { MenuMode } from './Menu/types';

export default function useMenu(props: {
  menus: ToolbarConfig['menus'];
  name: string;
  disabledMenus: string[];
}) {
  // state
  const menuActive: Ref<boolean> = ref(false);

  // computed
  const menuItems = computed(() => {
    const menus = isPlainObject(props.menus) ? (props.menus as MenuConfig).items : props.menus;

    return (menus as MenuItem[])?.filter(
      ({ name: menuName }: { name: string }) =>
        !props.disabledMenus?.includes(`${name}/${menuName}`)
    );
  });
  const hasMenu = computed(() => {
    return !!unref(menuItems)?.length;
  });
  const menuMode = computed(() => {
    return isPlainObject(props.menus) ? (props.menus as MenuConfig).mode : MenuMode.list;
  });

  function hideMenu() {
    if (unref(hasMenu)) {
      menuActive.value = false;
    }
  }

  function showMenu() {
    if (unref(hasMenu)) {
      menuActive.value = true;
    }
  }

  return {
    menuActive,
    menuItems,
    hasMenu,
    menuMode,
    hideMenu,
    showMenu,
  };
}
