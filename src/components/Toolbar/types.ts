import { ToolbarConfig } from './ToolbarItem/types';

export interface Props {
  groups: string[];
  toolbars: {
    [key: string]: ToolbarConfig;
  };
  disabledMenus: string[];
}
