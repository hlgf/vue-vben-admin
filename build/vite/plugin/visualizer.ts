/**
 * Package file volume analysis
 */

// 依赖分析插件
import visualizer from 'rollup-plugin-visualizer';
import { isReportMode } from '../../utils';

export function configVisualizerConfig() {
  if (isReportMode()) {
    return visualizer({
      filename: './node_modules/.cache/visualizer/stats.html',
      open: true,
      gzipSize: true,
      brotliSize: true,
    }) as Plugin;
  }
  return [];
}
