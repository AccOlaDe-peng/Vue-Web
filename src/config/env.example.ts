/**
 * 环境配置示例文件
 *
 * 实际使用时，请在项目根目录创建以下环境文件：
 * - .env                  # 所有环境都会加载
 * - .env.local            # 所有环境都会加载，但会被git忽略
 * - .env.development      # 开发环境加载
 * - .env.production       # 生产环境加载
 * - .env.test             # 测试环境加载
 *
 * 环境变量必须以 VITE_APP_ 开头才会被暴露给客户端代码
 */

/**
 * .env 文件示例：
 *
 * # 应用信息
 * VITE_APP_TITLE=优购商城
 *
 * # API配置
 * VITE_APP_API_BASE_URL=/api
 */

/**
 * .env.development 文件示例：
 *
 * # 开发环境配置
 * NODE_ENV=development
 * VITE_APP_TITLE=优购商城-开发环境
 * VITE_APP_API_BASE_URL=http://localhost:3000/api
 * VITE_APP_MOCK=true
 * VITE_APP_ENV=development
 */

/**
 * .env.production 文件示例：
 *
 * # 生产环境配置
 * NODE_ENV=production
 * VITE_APP_TITLE=优购商城
 * VITE_APP_API_BASE_URL=https://api.example.com/api
 * VITE_APP_MOCK=false
 * VITE_APP_ENV=production
 */

/**
 * .env.test 文件示例：
 *
 * # 测试环境配置
 * NODE_ENV=test
 * VITE_APP_TITLE=优购商城-测试环境
 * VITE_APP_API_BASE_URL=https://test-api.example.com/api
 * VITE_APP_MOCK=false
 * VITE_APP_ENV=test
 */
