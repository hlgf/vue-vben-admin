/**
 * @description: Exception related enumeration
 */
// 错误选项枚举类
export enum ExceptionEnum {
  // page not access
  // 页面无权限错误
  PAGE_NOT_ACCESS = 403,

  // page not found
  // 页面找不到
  PAGE_NOT_FOUND = 404,

  // error
  // 服务器错误
  ERROR = 500,

  // net work error
  // 前端Js错误
  NET_WORK_ERROR = 10000,

  // No data on the page. In fact, it is not an exception page
  // 无数据页面
  PAGE_NOT_DATA = 10100,
}

// 错误类型枚举
// 这些错误被存储在LocalStorage中
export enum ErrorTypeEnum {
  // vue错误
  VUE = 'vue',
  // js错误
  SCRIPT = 'script',
  // 资源请求错误
  RESOURCE = 'resource',
  // ajax错误
  AJAX = 'ajax',
  // promise的错误
  PROMISE = 'promise',
}
