<template>
  <transition name="v-md-zoom-in-top">
    <ul
      class="v-md-editor__menu"
      :class="[`v-md-editor__menu--${mode}`]"
      :style="style"
      v-show="visible"
      @mousemove.stop
      @click.stop
      ref="root"
    >
      <template v-if="mode === 'list'">
        <li
          v-for="item in menus"
          :key="item.name"
          class="v-md-editor__menu-item"
          :class="[`v-md-editor__menu-item-${item.name}`]"
          @click.stop="handleClick(item)"
        >
          <v-md-render
            :render="item.render"
            v-if="item.render"
          />
          <template v-else>{{ item.text }}</template>
        </li>
      </template>
      <template v-else>
        <li>
          <div
            v-for="rowIndex in rowCount"
            class="v-md-editor__menu-row"
          >
            <span
              v-for="item in methods.getRowMenus(menus, rowIndex, rowNum)"
              :key="item.name"
              :style="{
                width: itemWidth
              }"
              class="v-md-editor__menu-item"
              :class="[`v-md-editor__menu-item-${item.name}`]"
              @click.stop="handleClick(item)"
            >{{ item.text }}</span>
          </div>
        </li>
      </template>
    </ul>
  </transition>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, ref, watch, SetupContext, nextTick } from 'vue';
import * as methods from './methods';
import useVisible from './use-visible';

// types
import { Ref } from 'vue';
import { Props, MenuItem } from './types';

export default defineComponent({
  name: 'v-md-menu',
  setup(props: Props, ctx: SetupContext) {
    const rootEl: Ref = ref(null);
    const states = reactive({
      style: {},
    });
    const { onVisibleChange, toggleVisible } = useVisible(props, ctx);

    onVisibleChange((visible) => {
      if (visible) {
        nextTick(() => (states.style = methods.calculateLayout(rootEl)));
      }
    });

    const handlerClick = function (item: MenuItem) {
      ctx.emit('item-click', item);

      toggleVisible(false);
    };

    return {
      ...props,
      ...methods,
      handlerClick,
    };
  },
});
</script>

<style lang="scss">
@import '@/styles/var';
@import '@/styles/mixins';

.v-md-editor {
  &__menu {
    position: absolute;
    top: 38px;
    z-index: 99;
    list-style: none;
    background-color: #fff;
    border-radius: 3px;
    box-shadow: $box-shadow-light;
    transform-origin: center top;

    @include scrollbar-style;

    &-item {
      color: $toolbar-text-color;
      font-weight: normal;
      font-size: $menu-font-size;
      white-space: nowrap;
      list-style: none;

      &:hover {
        background-color: $toolbar-hover-background;
      }
    }

    &--list {
      padding: 5px 0;

      .v-md-editor__menu-item {
        padding: 0 24px;
        line-height: 34px;
        text-align: left;
      }
    }

    &--panel {
      max-height: 200px;
      padding: 12px 10px;
      overflow-y: auto;

      .v-md-editor__menu-row {
        display: flex;
        flex-wrap: nowrap;

        &:not(:last-child) {
          margin-bottom: 6px;
        }
      }

      .v-md-editor__menu-item {
        display: inline-block;
        padding: 8px 0;
        line-height: 1;
        text-align: center;
        border-radius: 2px;

        &:not(:last-child) {
          margin-right: 4px;
        }
      }
    }
  }
}
</style>
