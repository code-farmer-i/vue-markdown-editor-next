import { MenuConfig, MenuItem } from './menu/types';
import { ComponentPublicInstance } from 'vue';

export type StringFn = (ctx: ComponentPublicInstance) => string;
export type BooleanFn = (ctx: ComponentPublicInstance) => boolean;
export interface ToolbarConfig {
  name: string | StringFn;
  title: string | StringFn;
  active: boolean | BooleanFn;
  text: string | StringFn;
  icon: string | StringFn;
  menus: MenuConfig | MenuItem[];
}

export interface Props extends ToolbarConfig {
  disabledMenus: string[];
}
