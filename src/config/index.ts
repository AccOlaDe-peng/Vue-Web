/**
 * 配置模块索引文件
 *
 * 导出所有配置和工具函数
 */

// 导出环境配置
export * from "./env";
import env from "./env";

// 导出常量
export * from "./constants";
import constants from "./constants";

// 导出工具函数
export * from "./utils";
import utils from "./utils";

// 默认导出
export default {
  env,
  constants,
  utils,
};
