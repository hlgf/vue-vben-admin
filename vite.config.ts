import type { UserConfig, ConfigEnv } from 'vite';
import pkg from './package.json';
import dayjs from 'dayjs';
import { loadEnv } from 'vite';
import { resolve } from 'path';
import { generateModifyVars } from './build/generate/generateModifyVars';
import { createProxy } from './build/vite/proxy';
import { wrapperEnv } from './build/utils';
import { createVitePlugins } from './build/vite/plugin';
// 存放全局变量
import { OUTPUT_DIR } from './build/constant';

function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir);
}

const { dependencies, devDependencies, name, version } = pkg;
const __APP_INFO__ = {
  pkg: { dependencies, devDependencies, name, version },
  lastBuildTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
};

export default ({ command, mode }: ConfigEnv): UserConfig => {
  /* 返回 Node.js 进程的当前工作目录。 */
  const root = process.cwd();
  /* 检查process.cwd()路径下.env.development.local、.env.development、.env.local、.env这四个环境文件。
输出NODE_ENV和VITE_开头的键值对。
VITE_开头的键值对后面的不会覆盖前面的。
NODE_ENV的值后面的会覆盖前面的。 */
  const env = loadEnv(mode, root);

  // The boolean type read by loadEnv is a string. This function can be converted to boolean type
  const viteEnv = wrapperEnv(env);

  const { VITE_PORT, VITE_PUBLIC_PATH, VITE_PROXY, VITE_DROP_CONSOLE } = viteEnv;

  const isBuild = command === 'build';

  return {
    // 项目的BaseURL,比如这里我配置一个yiu。那么项目访问：http://localhost:3000/yiu/
    base: VITE_PUBLIC_PATH,
    // index.html 文件所在的位置,默认为process.cwd()
    root,
    resolve: {
      // 路径别名
      alias: [
        {
          find: 'vue-i18n',
          replacement: 'vue-i18n/dist/vue-i18n.cjs.js',
        },
        // /@/xxxx => src/xxxx
        {
          find: /\/@\//,
          replacement: pathResolve('src') + '/',
        },
        // /#/xxxx => types/xxxx
        {
          find: /\/#\//,
          replacement: pathResolve('types') + '/',
        },
      ],
    },
    server: {
      https: true,
      // 自动打开浏览器
      open: true,
      // Listening on all local IPs
      host: true,
      port: VITE_PORT,
      // 从.env加载代理配置
      proxy: createProxy(VITE_PROXY),
    },
    esbuild: {
      pure: VITE_DROP_CONSOLE ? ['console.log', 'debugger'] : [],
    },
    build: {
      target: 'es2015',
      cssTarget: 'chrome80',
      // 指定输出路径（相对于 项目根目录).
      outDir: OUTPUT_DIR,
      // minify: 'terser',
      /**
       * 当 minify=“minify:'terser'” 解开注释
       * Uncomment when minify="minify:'terser'"
       */
      /*   terserOptions: {
        compress: {
          keep_infinity: true,
         // 用于删除生产环境中的console
          drop_console: VITE_DROP_CONSOLE,
        },
      }, */
      // 启用/禁用 brotli 压缩大小报告。压缩大型输出文件可能会很慢，因此禁用该功能可能会提高大型项目的构建性能。
      brotliSize: false,
      //分包chunk 大小警告的限制
      chunkSizeWarningLimit: 2000,
    },
    // 定义全局变量替换方式
    define: {
      /* __VUE_I18N_FULL_INSTALL__：启用/禁用，除了vue-i18n APIs，组件和指令都完全支持安装：true
__VUE_I18N_LEGACY_API__：启用/禁用vue-i18n传统风格的API支持，默认为true
__INTLIFY_PROD_DEVTOOLS__：在生产中启用/禁用intlify-devtools和vue-devtools支持，默认为false */
      __INTLIFY_PROD_DEVTOOLS__: false,
      __APP_INFO__: JSON.stringify(__APP_INFO__),
    },
    // 指定传递给 CSS 预处理器的选项
    css: {
      preprocessorOptions: {
        less: {
          // 在全局less文件后面添加变量的配置
          modifyVars: generateModifyVars(),
          //支持js
          javascriptEnabled: true,
        },
      },
    },

    // 项目使用的vite插件。数量大，单独提取管理
    plugins: createVitePlugins(viteEnv, isBuild),
    // 默认情况下，不在 node_modules 中的，链接的包不会被预构建。使用此选项可强制预构建链接的包。
    optimizeDeps: {
      // 在预构建中强制排除的依赖项
      exclude: [],
      // @iconify/iconify: The dependency is dynamically and virtually loaded by @purge-icons/generated, so it needs to be specified explicitly
      include: [
        '@vue/runtime-core',
        '@vue/shared',
        '@iconify/iconify',
        'ant-design-vue/es/locale/zh_CN',
        'ant-design-vue/es/locale/en_US',
      ],
    },
  };
};
