/*
 * @Author: hlgf 944263044@qq.com
 * @Date: 2022-09-13 08:09:58
 * @LastEditors: hlgf 944263044@qq.com
 * @LastEditTime: 2022-09-15 16:54:00
 * @FilePath: \vue-vben-admin\build\vite\plugin\theme.ts
 * @Description: 基本逻辑: 控制根元素的html的自定义属性和类名,
 *  其中侧边栏和头部需要单独设置,因为可以受另一个设置进行颜色的设置,
 *    侧边栏和头部的样式控制是通过css的原生变量 --搭配var来进行设置和控制,参考src\components\Application\src\AppDarkModeToggle.vue
 */
/**
 * https://github.com/anncwb/vite-plugin-theme
 */

// 用于动态更改界面主题色的 vite 插件
import type { PluginOption } from 'vite';
import path from 'path';
import {
  viteThemePlugin,
  antdDarkThemePlugin,
  mixLighten,
  mixDarken,
  tinycolor,
} from 'vite-plugin-theme';
import { getThemeColors, generateColors } from '../../config/themeConfig';
import { generateModifyVars } from '../../generate/generateModifyVars';

export function configThemePlugin(isBuild: boolean): PluginOption[] {
  const colors = generateColors({
    mixDarken,
    mixLighten,
    tinycolor,
  });
  const plugin = [
    viteThemePlugin({
      // 自定义选择器转换
      resolveSelector: (s) => {
        s = s.trim();
        switch (s) {
          case '.ant-steps-item-process .ant-steps-item-icon > .ant-steps-icon':
            return '.ant-steps-item-icon > .ant-steps-icon';
          case '.ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled)':
          case '.ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled):hover':
          case '.ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled):active':
            return s;
          case '.ant-steps-item-icon > .ant-steps-icon':
            return s;
          case '.ant-select-item-option-selected:not(.ant-select-item-option-disabled)':
            return s;
          default:
            if (s.indexOf('.ant-btn') >= -1) {
              // 按钮被重新定制过，需要过滤掉class防止覆盖
              return s;
            }
        }
        return s.startsWith('[data-theme') ? s : `[data-theme] ${s}`;
      },
      colorVariables: [...getThemeColors(), ...colors],
    }),
    antdDarkThemePlugin({
      preloadFiles: [
        path.resolve(process.cwd(), 'node_modules/ant-design-vue/dist/antd.less'),
        //path.resolve(process.cwd(), 'node_modules/ant-design-vue/dist/antd.dark.less'),
        path.resolve(process.cwd(), 'src/design/index.less'),
      ],
      filter: (id) => (isBuild ? !id.endsWith('antd.less') : true),
      // extractCss: false,
      // 注入全局变量
      darkModifyVars: {
        ...generateModifyVars(true),
        'text-color': '#c9d1d9',
        'primary-1': 'rgb(255 255 255 / 8%)',
        'text-color-base': '#c9d1d9',
        'component-background': '#151515',
        'heading-color': 'rgb(255 255 255 / 65%)',
        // black: '#0e1117',
        // #8b949e
        'text-color-secondary': '#8b949e',
        'border-color-base': '#303030',
        // 'border-color-split': '#30363d',
        'item-active-bg': '#111b26',
        'app-content-background': '#1e1e1e',
        'tree-node-selected-bg': '#11263c',

        'alert-success-border-color': '#274916',
        'alert-success-bg-color': '#162312',
        'alert-success-icon-color': '#49aa19',
        'alert-info-border-color': '#153450',
        'alert-info-bg-color': '#111b26',
        'alert-info-icon-color': '#177ddc',
        'alert-warning-border-color': '#594214',
        'alert-warning-bg-color': '#2b2111',
        'alert-warning-icon-color': '#d89614',
        'alert-error-border-color': '#58181c',
        'alert-error-bg-color': '#2a1215',
        'alert-error-icon-color': '#a61d24',
      },
    }),
  ];

  return plugin as unknown as PluginOption[];
}
