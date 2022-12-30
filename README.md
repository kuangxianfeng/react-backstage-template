## 项目介绍

> 后台管理系统，自带*路由权限*+*侧边栏*权限控制

## 技术栈

> `React` `TypeScript` `Vite` `Recoil` `antd` `axios`

## 目录说明

### `api`

> 封装的 `axios` 请求

1. 集合了重复请求拦截，利用 `AbortController` ，`v0.22.0` 新特性
2. 当请求超时后，增加重复请求次数，利用 `_currentRequestMaxResendTimes` 来控制，默认值为 3
3. 全局 `loading` 控制

### `common`

> 存放公用资源，`recoil` 状态、`api` 请求、样式、`ts` 类型等等

### `config`

> 全局配置文件夹

### `hooks`

> 全局共用 React `hook`

### `layout`

> 登录之后的共用布局

### `pages`

> 页面

### `plugins`

> 全局插件引入

### `recoil-keys`

> `recoil` 的 `key` 值，以枚举形式来防止重复

### `routes`

路由渲染的组件，聚合权限菜单

### `test-json`

测试登录和获取菜单栏的假数据，利用 `json-server`，启动用`json-server -w -d 2000 db.json`

### `utils`

工具函数存放