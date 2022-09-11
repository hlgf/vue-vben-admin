import { openWindow } from '..';
import { dataURLtoBlob, urlToBase64 } from './base64Conver';

/**
 * 下载在线资源
 * Download online pictures
 * @param url 资源URL
 * @param filename 文件名
 * @param mime Blob的mime类型
 * @param bom blob的前部数据
 */
export function downloadByOnlineUrl(url: string, filename: string, mime?: string, bom?: BlobPart) {
  urlToBase64(url).then((base64) => {
    downloadByBase64(base64, filename, mime, bom);
  });
}

/**
 * 下载base64位字符串表示的资源
 * Download pictures based on base64
 * @param buf 待转换为blob的base64字符串
 * @param filename 文件名
 * @param mime Blob的mime类型
 * @param bom blob的前部数据
 */
export function downloadByBase64(buf: string, filename: string, mime?: string, bom?: BlobPart) {
  const base64Buf = dataURLtoBlob(buf);
  downloadByData(base64Buf, filename, mime, bom);
}

/**
 * Download according to the background interface file stream
 * 根据后端接口文件流下载
 * @param {*} data 下载的数据
 * @param {*} filename 下载后的文件名
 * @param {*} mime Blob的mime类型
 * @param {*} bom blob的前部数据
 */
export function downloadByData(data: BlobPart, filename: string, mime?: string, bom?: BlobPart) {
  const blobData = typeof bom !== 'undefined' ? [bom, data] : [data];
  const blob = new Blob(blobData, { type: mime || 'application/octet-stream' });

  const blobURL = window.URL.createObjectURL(blob);
  const tempLink = document.createElement('a');
  tempLink.style.display = 'none';
  tempLink.href = blobURL;
  tempLink.setAttribute('download', filename);
  if (typeof tempLink.download === 'undefined') {
    tempLink.setAttribute('target', '_blank');
  }
  document.body.appendChild(tempLink);
  tempLink.click();
  document.body.removeChild(tempLink);
  window.URL.revokeObjectURL(blobURL);
}

/**
 * Download file according to file address
 * @param {*} sUrl
 */
export function downloadByUrl({
  url,
  target = '_blank',
  fileName,
}: {
  url: string;
  target?: TargetContext;
  fileName?: string;
}): boolean {
  // 是否是chrome浏览器
  const isChrome = window.navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
  // 是否是safari浏览器
  const isSafari = window.navigator.userAgent.toLowerCase().indexOf('safari') > -1;

  // 判断浏览器是否可以下载资源
  if (/(iP)/g.test(window.navigator.userAgent)) {
    console.error('Your browser does not support download!');
    return false;
  }
  // 如果是以下浏览器
  if (isChrome || isSafari) {
    // 创建一个a链接,然后手动触发点击事件,然后在新窗口打开链接,下载资源
    const link = document.createElement('a');
    link.href = url;
    link.target = target;

    if (link.download !== undefined) {
      link.download = fileName || url.substring(url.lastIndexOf('/') + 1, url.length);
    }

    if (document.createEvent) {
      const e = document.createEvent('MouseEvents');
      e.initEvent('click', true, true);
      link.dispatchEvent(e);
      return true;
    }
  }
  // 其他浏览器下载方式
  if (url.indexOf('?') === -1) {
    url += '?download';
  }

  // 打开URL
  openWindow(url, { target });
  return true;
}
