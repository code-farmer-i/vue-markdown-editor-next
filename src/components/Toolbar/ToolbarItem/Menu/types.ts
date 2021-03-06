import { RenderFunction } from 'vue';

export enum MenuMode {
  panel = 'panel',
  list = 'list',
}

export interface MenuConfig {
  mode: MenuMode;
  itemWidth?: string;
  rowNum?: number;
  items: MenuItem[];
}

export interface MenuItem {
  name: string;
  text?: string;
  render?: RenderFunction;
}

export interface Props {
  mode?: MenuMode;
  menus?: MenuItem[];
  itemWidth?: string;
  rowNum?: number;
  visible?: boolean;
}
