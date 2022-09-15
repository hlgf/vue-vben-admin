/*
 * @Author: hlgf 944263044@qq.com
 * @Date: 2022-09-13 08:09:58
 * @LastEditors: hlgf 944263044@qq.com
 * @LastEditTime: 2022-09-15 17:30:00
 * @FilePath: \vue-vben-admin\src\logics\theme\dark.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { darkCssIsReady, loadDarkThemeCss } from 'vite-plugin-theme/es/client';
import { addClass, hasClass, removeClass } from '/@/utils/domUtils';

export async function updateDarkTheme(mode: string | null = 'light') {
  const htmlRoot = document.getElementById('htmlRoot');
  console.log('触发了');
  if (!htmlRoot) {
    return;
  }
  const hasDarkClass = hasClass(htmlRoot, 'dark');
  if (mode === 'dark') {
    if (import.meta.env.PROD && !darkCssIsReady) {
      await loadDarkThemeCss();
    }
    // 只需要定义data-theme就可以切换的原因是维护了两套css
    // light的可参考
    htmlRoot.setAttribute('data-theme', 'dark');
    if (!hasDarkClass) {
      addClass(htmlRoot, 'dark');
    }
  } else {
    htmlRoot.setAttribute('data-theme', 'light');
    if (hasDarkClass) {
      removeClass(htmlRoot, 'dark');
    }
  }
}
