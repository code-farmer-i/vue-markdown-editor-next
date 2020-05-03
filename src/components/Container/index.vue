<template>
  <div
    class="v-md-editor"
    :class="[
      `v-md-editor--${mode}`,
      { 'v-md-editor--fullscreen': fullscreen }
    ]"
    :style="{ height: containerHeight }"
  >
    <div
      v-if="mode === 'editable'"
      class="v-md-editor__left-area"
      :style="{
        width: leftAreaVisible ? leftAreaWidth : 0,
        borderWidth: leftAreaVisible? '1px' : 0
      }"
    >
      <div
        class="v-md-editor__left-area-title"
        :style="{
          height: `${toolbarHeight}px`,
          lineHeight: `${toolbarHeight}px`,
        }"
      >{{ leftAreaTitle }}</div>
      <div class="v-md-editor__left-area-body">
        <slot name="left-area" />
      </div>
    </div>
    <div class="v-md-editor__right-area">
      <div
        class="v-md-editor__toolbar"
        v-if="mode === 'editable'"
        ref="toolbarWrapperEl"
      >
        <editor-toolbar
          class="v-md-editor__toolbar-left"
          :groups="leftToolbarGroup"
          :toolbars="toolbars"
          :disabled-menus="disabledMenus"
          @item-click="handleToolbarItemClick"
          @toolbar-menu-click="handleToolbarMenuClick"
        />
        <editor-toolbar
          class="v-md-editor__toolbar-right"
          :groups="rightToolbarGroup"
          :toolbars="toolbars"
          :disabled-mens="disabledMenus"
          @item-click="handleToolbarItemClick"
          @toolbar-menu-click="handleToolbarMenuClick"
        />
      </div>
      <div class="v-md-editor__main">
        <div
          ref="editorWrapperEl"
          class="v-md-editor__editor-wrapper"
          v-if="mode === 'editable'"
          @click="handleEditorWrapperClick"
        >
          <slot name="editor" />
        </div>
        <div
          class="v-md-editor__preview-wrapper"
          ref="previewWrapperEl"
        >
          <slot name="preview" />
        </div>
        <slot />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, computed, defineComponent } from 'vue';
import useToolbar from './use-toolbar';
// components
import Toolbar from '../Toolbar/index.vue';
//utils
import useEffect from '@/hooks/useEffect';
import { addResizeListener, removeResizeListener } from '@/utils/resize-event';
// types
import { Toolbars } from '../Toolbar/types';
import { Mode } from './types';
import { Ref, SetupContext, PropType } from 'vue';
import { ToolbarConfig } from '../Toolbar/ToolbarItem/types';
import { MenuItem } from '../Toolbar/ToolbarItem/menu/types';

export default defineComponent({
  name: 'v-md-container',
  components: {
    [Toolbar.name]: Toolbar,
  },
  props: {
    leftToolbar: {
      type: String,
      default: '',
    },
    rightToolbar: {
      type: String,
      default: '',
    },
    toolbars: {
      type: Object as PropType<Toolbars>,
      default: () => ({}),
    },
    fullscreen: Boolean,
    height: String,
    noresize: Boolean,
    disabledMenus: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
    leftAreaVisible: Boolean,
    leftAreaTitle: String,
    leftAreaWidth: {
      type: String,
      default: '200px',
    },
    mode: {
      type: String as PropType<Mode>,
      default: Mode.editable,
    },
  },
  setup(props, ctx: SetupContext) {
    const editorWrapperEl: Ref = ref(null);
    const toolbarWrapperEl: Ref = ref(null);
    const previewWrapperEl: Ref = ref(null);

    const { toolbarHeight, leftToolbarGroup, rightToolbarGroup } = useToolbar({
      toolbars: props.toolbars,
      leftToolbar: props.leftToolbar,
      rightToolbar: props.rightToolbar,
    });

    // computed
    const containerHeight = computed(() => {
      return props.fullscreen ? 'auto' : props.height;
    });

    const handleResize = function () {
      ctx.emit('resize');
    };

    const handleToolbarWrapperResize = function () {
      toolbarHeight.value = toolbarWrapperEl.value.offsetHeight;
    };

    useEffect(
      () => {
        if (!props.noresize && props.mode === Mode.editable) {
          addResizeListener(editorWrapperEl.value, handleResize);
          addResizeListener(toolbarWrapperEl.value, handleToolbarWrapperResize);
        }
      },
      () => {
        if (!props.noresize && props.mode === Mode.editable) {
          removeResizeListener(editorWrapperEl.value, handleResize);
          removeResizeListener(toolbarWrapperEl.value, handleToolbarWrapperResize);
        }
      }
    );

    return {
      toolbarHeight,
      leftToolbarGroup,
      rightToolbarGroup,
      containerHeight,
      editorWrapperEl,
      toolbarWrapperEl,
      previewWrapperEl,
      handleEditorWrapperClick(e: Event) {
        ctx.emit('editor-wrapper-click', e);
      },
      handleToolbarItemClick(toolbar: ToolbarConfig) {
        ctx.emit('toolbar-item-click', toolbar);
      },
      handleToolbarMenuClick(menu: MenuItem) {
        ctx.emit('toolbar-menu-click', menu);
      },
    };
  },
});
</script>

<style lang="scss">
@import '@/styles/var';

.v-md-editor {
  display: flex;
  width: 100%;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: $box-shadow-light;

  &__left-area,
  &__right-area {
    display: flex;
    flex-direction: column;
    width: 200px;
  }

  &__left-area {
    height: 100%;
    overflow: hidden;
    border-right: 1px solid $border-color;
    transition: 0.3s;

    &-title {
      position: relative;
      height: 41px;
      padding: 0 14px;
      color: $text-color;
      font-weight: 600;
      font-size: 16px;
      line-height: 41px;
      white-space: nowrap;

      &::after {
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        border-bottom: 1px solid $border-color;
        content: '';
      }
    }

    &-body {
      flex: 1;
      padding: 8px 14px;
      overflow: hidden;
    }
  }

  &__right-area {
    flex: 1;
  }

  &--preview {
    box-shadow: none;
  }

  &--fullscreen {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1001;
  }

  &__main {
    display: flex;
    flex: 1;
    width: 100%;
    overflow: hidden;
  }

  &__editor-wrapper,
  &__preview-wrapper {
    position: relative;
    flex: 1;
    height: 100%;
    overflow: hidden;
  }

  &__editor-wrapper {
    border-right: 1px solid $border-color;
    cursor: text;
    user-select: none;
  }
}
</style>
