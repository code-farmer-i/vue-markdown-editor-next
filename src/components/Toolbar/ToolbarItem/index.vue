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
    v-clickoutside="hideMenu"
    @mousedown.prevent
    @mouseleave="handleHideTooltip"
    @mousemove="showTooltip"
    @click.stop="handleClick"
  >
    {{ text }}
    <v-md-tooltip
      :ref="el => tooltipRef = el"
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
      :ref="el => menuCtrlEl = el"
    />
  </li>
</template>

<script lang="ts">
import Tooltip from './Tooltip/index.vue';
import Menu from './Menu/index.vue';
import { defineComponent, ref, computed } from 'vue';
import useMenu from './use-menu';
import useTooltip from './use-tooltip';

// utils
import Clickoutside from '@/utils/clickoutside';

// types
import { Ref, SetupContext } from 'vue';
import { Props } from './types';

export default defineComponent({
  name: 'toolbar-item',
  components: {
    [Tooltip.name]: Tooltip,
    [Menu.name]: Menu,
  },
  setup(props: Props, ctx: SetupContext) {
    const rootEl: Ref = ref(null);

    const { menuActive, menuCtrlEl, menuItems, hasMenu, menuMode } = useMenu(props);
    const { tooltipRef, showTooltip, hideTooltip } = useTooltip({
      rootEl,
      menuActive,
      menuCtrlEl,
    });

    return {
      menuActive,
      menuItems,
      hasMenu,
      menuMode,
      menuCtrlEl,
      tooltipRef,
      showTooltip,
      hideTooltip,
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

