// Used to configure the general configuration of some components without modifying the components

import type { SorterResult } from '../components/Table';

export default {
  // basic-table setting
  // 基础表格设置
  table: {
    // Form interface request general configuration
    // support xxx.xxx.xxx
    // 通用接口字段设置
    fetchSetting: {
      // The field name of the current page passed to the background
      // 传递到后台的当前页的字段名
      pageField: 'page',
      // The number field name of each page displayed in the background
      // 显示在后台的每页的数字字段名称
      sizeField: 'pageSize',
      // Field name of the form data returned by the interface
      // 接口返回的表单数据的字段名
      listField: 'items',
      // Total number of tables returned by the interface field name
      // 接口字段名返回的表总数
      totalField: 'total',
    },
    // Number of pages that can be selected
    // 可选的每页显示条数;
    pageSizeOptions: ['10', '50', '80', '100'],
    // Default display quantity on one page
    // 默认的每页显示条数
    defaultPageSize: 10,
    // Default Size
    defaultSize: 'middle',
    // Custom general sort function
    // 默认的排序方法
    // ↓这里先注释掉
    defaultSortFn: (sortInfo: SorterResult) => {
      const { field, order } = sortInfo;
      if (field && order) {
        return {
          // The sort field passed to the backend you
          field,
          // Sorting method passed to the background asc/desc
          order,
        };
      } else {
        return {};
      }
    },
    // Custom general filter function
    // 默认的过滤方法
    // Partial(ts自带的语法)将所有的属性限制全部变成可选,
    defaultFilterFn: (data: Partial<Recordable<string[]>>) => {
      return data;
    },
  },
  // scrollbar setting
  // 滚动条设置
  scrollbar: {
    // Whether to use native scroll bar
    // 是否使用本机滚动条
    // After opening, the menu, modal, drawer will change the pop-up scroll bar to native
    // 打开后，菜单、模式、抽屉将弹出滚动条更改为本机
    // src\components\Scrollbar\src\index.vue中使用了
    // 一个控制样式的
    native: false,
  },
};
