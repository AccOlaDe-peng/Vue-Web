# 优购商城 - Vue 电商网站

基于 Vue 3 开发的电商网站前端项目，根据原型图实现了完整的电商功能。

## 功能特点

- 首页展示：轮播图、分类导航、促销区域、热门商品、新品上市
- 商品分类：分类筛选、排序功能、商品列表展示
- 商品详情：商品图片展示、规格选择、数量选择、加入购物车、立即购买
- 购物车：商品管理、数量修改、结算功能
- 订单管理：订单列表、订单详情、订单状态跟踪
- 用户中心：个人信息、账户安全、收货地址、我的收藏、消息中心
- 登录注册：账号登录、手机验证码登录、注册功能
- 支付流程：支付方式选择、支付状态展示
- 搜索功能：商品搜索、搜索结果筛选

## 技术栈

- Vue 3：使用最新的 Vue 3 框架开发
- Vue Router：实现前端路由管理
- CSS：使用原生 CSS 实现样式，可扩展为 SCSS
- FontAwesome：使用图标库

## 项目结构

```
src/
├── assets/         # 静态资源
│   └── css/        # CSS样式文件
├── components/     # 通用组件
│   ├── Header.vue  # 页面头部组件
│   └── Footer.vue  # 页面底部组件
├── views/          # 页面视图
│   ├── Home.vue    # 首页
│   ├── Category.vue # 分类页
│   ├── Product.vue # 商品详情页
│   ├── Cart.vue    # 购物车页面
│   ├── Order.vue   # 订单列表页面
│   ├── OrderDetail.vue # 订单详情页面
│   ├── User.vue    # 用户中心页面
│   ├── Login.vue   # 登录页面
│   ├── Register.vue # 注册页面
│   ├── Payment.vue # 支付页面
│   └── Search.vue  # 搜索结果页面
├── router/         # 路由配置
│   └── index.js    # 路由定义
├── App.vue         # 根组件
└── main.js         # 入口文件
```

## 安装和运行

### 前提条件

- Node.js 14.0+
- npm 或 yarn

### 安装依赖

```bash
npm install
# 或
yarn install
```

### 开发模式运行

```bash
npm run dev
# 或
yarn dev
```

### 构建生产版本

```bash
npm run build
# 或
yarn build
```

## 项目预览

访问开发服务器地址（通常是 http://localhost:5173/）查看项目运行效果。

## 后续开发计划

- [ ] 集成 Vuex 或 Pinia 进行状态管理
- [ ] 对接真实后端 API
- [ ] 添加用户认证和授权功能
- [ ] 优化移动端适配
- [ ] 添加单元测试

## 许可证

MIT
