# 预测市场仪表盘

一个聚合多个预测市场平台数据的实时仪表盘，支持搜索和跳转功能。

## 功能特性

- ✅ 实时调取多个预测市场平台数据（Polymarket、Kalshi、Opinion Labs、42 Space、Probable、Predict）
- ✅ 支持事件/关键词搜索，展示各平台相关下注情况
- ✅ 点击平台看板直接跳转到对应平台主页
- ✅ 自动刷新数据（每30秒）
- ✅ 现代化响应式UI设计

## 技术栈

### 前端
- React 18
- Vite
- Tailwind CSS
- Axios

### 后端
- Node.js
- Express
- Axios

## 安装和运行

### 1. 安装所有依赖

```bash
npm run install:all
```

### 2. 启动开发服务器

```bash
npm run dev
```

这将同时启动：
- 前端开发服务器：http://localhost:3000
- 后端API服务器：http://localhost:3001

### 3. 单独运行

**仅启动后端：**
```bash
npm run dev:server
```

**仅启动前端：**
```bash
npm run dev:client
```

## 项目结构

```
预测市场仪表盘/
├── client/                 # 前端React应用
│   ├── src/
│   │   ├── components/     # React组件
│   │   ├── App.jsx         # 主应用组件
│   │   └── main.jsx        # 入口文件
│   └── package.json
├── server/                 # 后端Node.js服务
│   ├── services/           # API服务模块
│   │   └── marketServices.js
│   ├── index.js            # Express服务器
│   └── package.json
└── package.json            # 根package.json
```

## API集成说明

目前项目使用模拟数据。要集成真实的API，需要：

1. 在 `server/services/marketServices.js` 中实现各平台的真实API调用
2. 根据各平台的API文档配置认证信息（如需要）
3. 处理各平台不同的数据格式，统一转换为标准格式

### 平台主页URL

- Polymarket: https://polymarket.com
- Kalshi: https://kalshi.com
- Opinion Labs: https://opinionlabs.com
- 42 Space: https://42space.com
- Probable: https://probable.com
- Predict: https://predict.org

## 使用说明

1. 打开浏览器访问 http://localhost:3000
2. 在搜索框输入事件或关键词（如"选举"、"比特币"等）
3. 查看各平台的相关预测市场数据
4. 点击任意平台卡片跳转到该平台主页

## 开发计划

- [ ] 集成真实的API接口
- [ ] 添加数据缓存机制
- [ ] 实现更详细的数据可视化
- [ ] 添加用户偏好设置
- [ ] 支持更多预测平台

## 许可证

MIT


