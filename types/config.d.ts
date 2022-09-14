import { MenuTypeEnum, MenuModeEnum, TriggerEnum, MixSidebarTriggerEnum } from '/@/enums/menuEnum';
import {
  ContentEnum,
  PermissionModeEnum,
  ThemeEnum,
  RouterTransitionEnum,
  SettingButtonPositionEnum,
} from '/@/enums/appEnum';

import { CacheTypeEnum } from '/@/enums/cacheEnum';
import { ThemeMode } from '../build/config/themeConfig';

// type别名,可以充当一个对象的作用提供给ts的类型推断使用
export type LocaleType = 'zh_CN' | 'en' | 'ru' | 'ja' | 'ko';

export interface MenuSetting {
  siderHidden: boolean;
  // 菜单背景颜色
  bgColor: string;
  // 菜单是否跟随内容滚动
  fixed: boolean;
  // 是否折叠菜单
  collapsed: boolean;
  // 侧边菜单拖拽
  // (左侧菜单混合模式、固定展开菜单、菜单背景为白色的情况下，
  // 打开子菜单，有一个class="vben-layout-mix-sider-drag-bar"的元素，
  // 该元素就是一个背景色div)，该变量修改它的display
  canDrag: boolean;
  // 是否展示左侧菜单
  show: boolean;
  // 是否隐藏左侧菜单
  hidden: boolean;
  // 是否分割菜单（顶部菜单混合模式，开启分割菜单，父级菜单将在顶部，子菜单在侧边）
  split: boolean;
  // 菜单宽度
  menuWidth: number;
  // 手机情况下为INLINE、设置和使用的地方都很模糊、设置的时候菜单的4中模式，
  // 附带的设置了，使用的时候，很多时候要配合其他属性一起使用Layout/Menu中有一个属性接收它
  mode: MenuModeEnum;
  // 菜单的4种类型
  type: MenuTypeEnum;
  // 菜单的主题，由菜单的背景色决定
  theme: ThemeEnum;
  // 菜单在顶部的时候的对齐方式
  topMenuAlign: 'start' | 'center' | 'end';
  // 折叠菜单的按钮位置
  trigger: TriggerEnum;
  // 侧边菜单手风琴模式，即是否一次只展开一个
  accordion: boolean;
  // 切换页面关闭菜单，暂时不太清楚这是干什么的
  closeMixSidebarOnChange: boolean;
  // 折叠菜单显示名称
  collapsedShowTitle: boolean;
  // 混合菜单触发方式
  mixSideTrigger: MixSidebarTriggerEnum;
  // 固定展开菜单
  mixSideFixed: boolean;
}

export interface MultiTabsSetting {
  cache: boolean;
  // 是否展示标签页
  show: boolean;
  // 标签页快捷按钮
  showQuick: boolean;
  // 是否可拖拽
  canDrag: boolean;
  // 标签页刷新按钮
  showRedo: boolean;
  // 标签页折叠按钮，就是那个全窗口按钮
  showFold: boolean;
}

export interface HeaderSetting {
  // 头部背景颜色
  bgColor: string;
  // 是否头部固定不滚动
  fixed: boolean;
  // 是否展示头部
  show: boolean;
  // 头部主题，由头部背景颜色决定，是接近白色就是light，接近黑色就是dark
  theme: ThemeEnum;
  // Turn on full screen
  // 是否展示头部进入全屏按钮
  showFullScreen: boolean;
  // Whether to show the lock screen
  // 是否显示锁屏，没使用，应该是锁屏按钮的
  useLockPage: boolean;
  // Show document button
  // 是否展示文档按钮
  showDoc: boolean;
  // Show message center button
  // 是否展示消息中心按钮
  showNotice: boolean;
  // 是否展示搜索
  showSearch: boolean;
}

export interface LocaleSetting {
  // 是否展示语言切换
  showPicker: boolean;
  // Current language
  // 当前语言
  locale: LocaleType;
  // default language
  // 语言找不到时，默认的语言
  fallback: LocaleType;
  // available Locales
  // 可用的语言
  availableLocales: LocaleType[];
}

export interface TransitionSetting {
  //  Whether to open the page switching animation
  // 切换动画
  enable: boolean;
  // Route basic switching animation
  // 动画类型
  basicTransition: RouterTransitionEnum;
  // Whether to open page switching loading
  // 切换loading
  openPageLoading: boolean;
  // Whether to open the top progress bar
  // 顶部进度条
  openNProgress: boolean;
}

export interface ProjectConfig {
  sessionTimeoutProcessing: any;
  showDarkModeToggle: boolean;
  // Storage location of permission related information
  // 权限相关信息的存储位置
  permissionCacheType: CacheTypeEnum;
  // Whether to show the configuration button
  // 是否展示布局设置按钮
  showSettingButton: boolean;
  // Configure where the button is displayed
  // 布局设置按钮的位置
  settingButtonPosition: SettingButtonPositionEnum;
  // Permission mode
  // 权限模式
  permissionMode: PermissionModeEnum;
  // Website gray mode, open for possible mourning dates
  // 网站灰色模式，为可能的哀悼日期开放。
  grayMode: boolean;
  // Whether to turn on the color weak mode
  // 是否开启弱色模式
  colorWeak: boolean;
  // Theme color
  // 主题颜色
  themeColor: string;
  // 主题
  themeMode: ThemeMode;
  // The main interface is displayed in full screen, the menu is not displayed, and the top
  // 主界面全屏显示，不显示菜单，顶部的 "主题模式 "也不显示。
  fullContent: boolean;
  // content width
  // 内容宽度：流式（满屏），定宽（960px居中）
  contentMode: ContentEnum;
  // Whether to display the logo
  // 是否显示Logo
  showLogo: boolean;
  // Whether to show the global footer
  // 是否显示全局页脚
  showFooter: boolean;
  // menuType: MenuTypeEnum;
  // 头部设置
  headerSetting: HeaderSetting;
  // menuSetting
  // 菜单设置
  menuSetting: MenuSetting;
  // Multi-tab settings
  // 标签设置
  multiTabsSetting: MultiTabsSetting;
  // Animation configuration
  // 动画设置
  transitionSetting: TransitionSetting;
  // pageLayout whether to enable keep-alive
  // 当有标签时，是否缓存页面，默认缓存
  openKeepAlive: boolean;
  // Lock screen time
  // 锁屏时间
  lockTime: number;
  // Show breadcrumbs
  // 面包屑
  showBreadCrumb: boolean;
  // Show breadcrumb icon
  // 面包屑图标
  showBreadCrumbIcon: boolean;
  // Use error-handler-plugin
  // 是否展示头部的错误日志按钮
  useErrorHandle: boolean;
  // Whether to open back to top
  // 是否有返回顶部按钮
  useOpenBackTop: boolean;
  // Is it possible to embed iframe pages
  // 是否可以在站内展示外链接
  canEmbedIFramePage: boolean;
  // Whether to delete unclosed messages and notify when switching the interface
  // 当切换路由时，关闭所有Modal和通知
  closeMessageOnSwitch: boolean;
  // Whether to cancel the http request that has been sent but not responded when switching the interface.
  // 在切换接口时，是否取消已发送但未响应的http请求。
  removeAllHttpPending: boolean;
}

export interface GlobConfig {
  // Site title
  // 网站标题
  title: string;
  // Service interface url
  apiUrl: string;
  // Upload url
  uploadUrl?: string;
  //  Service interface url prefix
  urlPrefix?: string;
  // Project abbreviation
  shortName: string;
}
export interface GlobEnvConfig {
  // Site title
  VITE_GLOB_APP_TITLE: string;
  // Service interface url
  VITE_GLOB_API_URL: string;
  // Service interface url prefix
  VITE_GLOB_API_URL_PREFIX?: string;
  // Project abbreviation
  VITE_GLOB_APP_SHORT_NAME: string;
  // Upload url
  VITE_GLOB_UPLOAD_URL?: string;
}
