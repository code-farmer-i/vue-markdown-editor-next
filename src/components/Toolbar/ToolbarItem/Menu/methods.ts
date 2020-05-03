// types
import { Ref } from 'vue';
import { MenuItem } from './types';

export function calculateLayout(rootEl: Ref): { left?: number; right?: number } {
  // 容器右边框距离可视区域左侧的距离
  const { right } = rootEl.value.getBoundingClientRect();
  const windowWidth = document.documentElement.clientWidth;

  if (windowWidth - right < 0) {
    return { right: 0 };
  } else {
    return { left: 0 };
  }
}

export function getRowMenus(menus: MenuItem[], rowIndex: number, rowNum: number): MenuItem[] {
  const end = rowIndex * rowNum;
  const start = end - rowNum;

  return menus.slice(start, end);
}
