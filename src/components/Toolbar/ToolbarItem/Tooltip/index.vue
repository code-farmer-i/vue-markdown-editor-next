<template>
  <transition name="v-md-fade-in">
    <div
      v-show="visible"
      :style="{
        left: `${position.x}px`,
        top: `${position.y}px`
      }"
      class="v-md-editor__tooltip"
      ref="rootEl"
    >{{ text }}</div>
  </transition>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, unref, toRefs, nextTick } from 'vue';

// types
import { Position } from './types';
import { Ref } from 'vue';

export default defineComponent({
  name: 'v-md-tooltip',
  props: {
    text: String,
  },
  setup(props) {
    const rootEl: Ref = ref(null);
    const states = reactive({
      position: {
        x: 0,
        y: 0,
      },
      visible: false,
    });

    const show = function (position: Position): void {
      states.position = {
        x: position.x,
        y: position.y,
      };

      states.visible = true;

      nextTick(calculateLayout);
    };

    const hide = function (): void {
      states.visible = false;
    };

    const calculateLayout = function (): void {
      // 容器右边框距离可视区域左侧的距离
      const { right } = unref(rootEl).getBoundingClientRect();
      const windowWidth = document.documentElement.clientWidth;

      if (windowWidth - right < 0) {
        states.position.x -= right - windowWidth;
      }
    };

    return {
      // refs
      rootEl,
      // states
      ...toRefs(states),
      // methods
      show,
      hide,
    };
  },
});
</script>

<style lang="scss">
@import '@/styles/var';

.v-md-editor {
  &__tooltip {
    position: absolute;
    z-index: $tooltip-z-index;
    padding: $tooltip-padding;
    color: $tooltip-color;
    font-size: $tooltip-font-size;
    line-height: 1;
    white-space: nowrap;
    background-color: $tooltip-background;
    border-radius: $tooltip-border-radius;
    box-shadow: $box-shadow-light;
  }
}
</style>
