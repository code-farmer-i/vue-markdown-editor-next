<template>
  <li
    class="v-md-editor__toolbar-item"
    :class="[
      icon,
      `v-md-editor__toolbar-item-${name}`,
      {
        'v-md-editor__toolbar-item--active': active || menuActive
      },
      {
        'v-md-editor__toolbar-item--menu': hasMenu
      }
    ]"
    @mousedown.prevent
    @mouseleave="hideTooltip"
    @mousemove="showTooltip"
    @click.stop="handleClick"
    ref="rootEl"
  >
    {{ text }}
    <v-md-tooltip
      ref="tooltipRef"
      :text="title"
    />
    <v-md-menu
      v-if="hasMenu"
      ref="menu"
      :mode="menuMode"
      :menus="menuItems"
      :item-width="menus.itemWidth"
      :row-num="menus.rowNum"
      :visible.sync="menuActive"
      @item-click="$emit('menu-click', arguments[0])"
    />
    <i
      v-if="hasMenu"
      class="v-md-icon-arrow-down v-md-editor__menu-ctrl"
      ref="menuCtrlEl"
    />
  </li>
</template>

<script lang="ts">
import Tooltip from './Tooltip/index.vue';
import Menu from './Menu/index.vue';
import { defineComponent, ref, computed, unref } from 'vue';
import useMenu from './use-menu';
import useTooltip from './use-tooltip';

// utils
// import Clickoutside from '@/utils/clickoutside';

// types
import { Ref, SetupContext, PropType, getCurrentInstance } from 'vue';
import { ToolbarConfig } from './types';

interface Props {
  name: string;
  title?: string;
  active?: boolean;
  text?: string;
  icon?: string;
  menus: ToolbarConfig['menus'];
  disabledMenus: string[];
}

export default defineComponent({
  name: 'toolbar-item',
  components: {
    [Tooltip.name]: Tooltip,
    [Menu.name]: Menu,
  },
  props: {
    name: {
      type: String,
      required: true,
    },
    title: String,
    active: Boolean,
    text: String,
    icon: String,
    menus: {
      type: [Array, Object],
      default: () => [],
    },
    disabledMenus: {
      type: Array,
      default: () => [],
    },
  } as any,
  setup(props: Props, ctx: SetupContext) {
    const rootEl: Ref = ref(null);
    const menuCtrlEl: Ref = ref(null);

    const { menuActive, menuItems, hasMenu, menuMode, showMenu, hideMenu } = useMenu(props);
    const { tooltipRef, showTooltip, hideTooltip } = useTooltip({
      rootEl,
      menuActive,
      menuCtrlEl,
    });

    return {
      // refs
      rootEl,
      menuCtrlEl,
      tooltipRef,
      // states
      menuActive,
      menuItems,
      hasMenu,
      menuMode,
      // methods
      showTooltip,
      hideTooltip,
      handleClick(e: MouseEvent) {
        ctx.emit('click');
        unref(menuActive) ? hideMenu() : showMenu();

        if (hasMenu) {
          hideTooltip();
        } else {
          showTooltip(e);
        }
      },
    };
  },
});
</script>

<style lang="scss">
@import '@/styles/var';

$item-height: 28px;

.v-md-editor {
  &__menu-ctrl {
    position: absolute;
    top: 0;
    right: 0;
    display: none;
  }

  &__toolbar-item {
    position: relative;
    height: $item-height;
    padding: 0 6px;
    color: $toolbar-text-color;
    font-size: $toolbar-font-size;
    line-height: $item-height;
    text-align: center;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s linear 0s;

    &:not(:first-child) {
      margin-left: 4px;
    }

    &:hover {
      background: $toolbar-hover-background;
    }

    &--menu {
      padding-right: 16px;

      .v-md-editor__menu-ctrl {
        display: inline-block;
      }
    }

    &--active {
      background: $toolbar-active-background;

      &:hover {
        background: $toolbar-active-background;
      }
    }
  }
}
</style>

