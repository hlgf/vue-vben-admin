/**
 * @description: menu type
 */
// 菜单的四种类型
export enum MenuTypeEnum {
  // left menu
  // 左侧菜单模式
  SIDEBAR = 'sidebar',

  // 左侧菜单混合模式
  MIX_SIDEBAR = 'mix-sidebar',
  // mixin menu
  // 顶部菜单混合模式
  MIX = 'mix',
  // top menu
  // 顶部菜单
  TOP_MENU = 'top-menu',
}

// 折叠触发器位置
export enum TriggerEnum {
  // 不显示
  NONE = 'NONE',
  // 菜单底部
  FOOTER = 'FOOTER',
  // 头部
  HEADER = 'HEADER',
}

// 这个没地方用
export type Mode = 'vertical' | 'vertical-right' | 'horizontal' | 'inline';

// menu mode
// 菜单的显示方式，参考type配置中的mode
export enum MenuModeEnum {
  VERTICAL = 'vertical',
  HORIZONTAL = 'horizontal',
  VERTICAL_RIGHT = 'vertical-right',
  INLINE = 'inline',
}

// 字面意思是菜单分割类型，但是意思不是很清晰，后面再说
export enum MenuSplitTyeEnum {
  NONE,
  TOP,
  LEFT,
}

// 菜单在底部的对齐方式
export enum TopMenuAlignEnum {
  CENTER = 'center',
  START = 'start',
  END = 'end',
}

// 混合菜单触发方式类型
export enum MixSidebarTriggerEnum {
  HOVER = 'hover',
  CLICK = 'click',
}
