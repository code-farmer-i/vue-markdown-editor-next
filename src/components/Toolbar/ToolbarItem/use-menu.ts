import { ref, computed } from 'vue';
// utils
import { isObject } from 'lodash-es';
// types
import { Ref } from 'vue';
import { Props } from './types';
import { MenuConfig } from './menu/types';
import { MenuItem, MenuMode } from './Menu/types';

export default function useMenu(props: Props) {
  const menuCtrlEl: Ref = ref(null);
  // state
  const menuActive: Ref<boolean> = ref(false);
  const a = window?.scrollTo;

  // computed
  const menuItems = computed(() => {
    const menus: MenuItem[] = isObject(props.menus)
      ? (props.menus as MenuConfig).items
      : props.menus;

    return menus?.filter(
      ({ name: menuName }: { name: string }) =>
        !props.disabledMenus?.includes(`${props.name}/${menuName}`)
    );
  });
  const hasMenu = computed(() => {
    return !!menuItems.value?.length;
  });
  const menuMode = computed(() => {
    return isObject(props.menus) ? (props.menus as MenuConfig).mode : MenuMode.list;
  });

  return {
    menuCtrlEl,
    menuActive,
    menuItems,
    hasMenu,
    menuMode,
  };
}
