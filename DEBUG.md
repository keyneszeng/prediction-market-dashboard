# 调试指南

## 常见问题排查

### 1. 依赖安装问题

**问题：** `npm run install:all` 失败

**解决方案：**
```bash
# 清除npm缓存
npm cache clean --force

# 删除所有node_modules文件夹
# Windows PowerShell:
Remove-Item -Recurse -Force node_modules, server/node_modules, client/node_modules -ErrorAction SilentlyContinue

# 重新安装
npm run install:all
```

### 2. 端口占用问题

**问题：** 端口3000或3001已被占用

**解决方案：**
```bash
# Windows - 查找占用端口的进程
netstat -ano | findstr :3000
netstat -ano | findstr :3001

# 结束进程（替换PID为实际进程ID）
taskkill /PID <PID> /F

# 或者修改端口号
# 前端：编辑 client/vite.config.js，修改 server.port
# 后端：编辑 server/index.js，修改 PORT 环境变量或默认值
```

### 3. 后端无法启动

**问题：** `npm run dev:server` 失败

**检查清单：**
- [ ] 确认已安装Node.js（版本16+）
- [ ] 确认server目录下有package.json
- [ ] 确认已安装server依赖：`cd server && npm install`
- [ ] 检查server/index.js文件是否存在
- [ ] 查看错误信息，确认缺少的模块

**手动测试后端：**
```bash
cd server
node index.js
# 应该看到：服务器运行在 http://localhost:3001
```

**测试API端点：**
```bash
# 在浏览器访问或使用curl
curl http://localhost:3001/api/health
# 应该返回：{"status":"ok","timestamp":"..."}
```

### 4. 前端无法启动

**问题：** `npm run dev:client` 失败

**检查清单：**
- [ ] 确认已安装Node.js（版本16+）
- [ ] 确认client目录下有package.json
- [ ] 确认已安装client依赖：`cd client && npm install`
- [ ] 检查vite.config.js文件是否存在

**手动测试前端：**
```bash
cd client
npm run dev
# 应该看到Vite开发服务器启动信息
```

### 5. 前端无法连接后端

**问题：** 前端显示"获取数据失败"

**检查清单：**
- [ ] 确认后端服务器正在运行（http://localhost:3001）
- [ ] 在浏览器访问 http://localhost:3001/api/health 检查后端是否正常
- [ ] 检查浏览器控制台的错误信息（F12）
- [ ] 确认CORS配置正确（server/index.js中已配置）

**测试连接：**
```bash
# 测试后端API
curl http://localhost:3001/api/markets?query=

# 应该返回JSON格式的市场数据
```

### 6. 数据不显示

**问题：** 页面加载但看不到数据

**检查清单：**
- [ ] 打开浏览器开发者工具（F12）
- [ ] 查看Console标签页的错误信息
- [ ] 查看Network标签页，确认API请求是否成功
- [ ] 检查API响应数据格式是否正确

### 7. Windows PowerShell脚本问题

**问题：** `cd server && npm run dev` 在PowerShell中失败

**解决方案：**
- 使用Git Bash或CMD代替PowerShell
- 或者分别在不同终端运行：
  ```bash
  # 终端1
  cd server
  npm run dev
  
  # 终端2
  cd client
  npm run dev
  ```

### 8. 模块未找到错误

**问题：** `Cannot find module 'xxx'`

**解决方案：**
```bash
# 重新安装依赖
cd server
npm install

cd ../client
npm install
```

### 9. Tailwind CSS样式不生效

**问题：** 页面样式显示异常

**检查清单：**
- [ ] 确认tailwind.config.js存在
- [ ] 确认postcss.config.js存在
- [ ] 确认index.css中导入了Tailwind指令
- [ ] 重启开发服务器

### 10. 搜索功能不工作

**问题：** 输入关键词后没有结果

**检查清单：**
- [ ] 打开浏览器控制台查看错误
- [ ] 确认后端API正常响应
- [ ] 测试搜索API：`curl "http://localhost:3001/api/markets?query=选举"`
- [ ] 检查marketServices.js中的搜索逻辑

## 调试命令

### 检查Node.js版本
```bash
node --version
npm --version
```

### 检查已安装的包
```bash
# 根目录
npm list --depth=0

# 服务器
cd server && npm list --depth=0

# 客户端
cd client && npm list --depth=0
```

### 查看运行中的进程
```bash
# Windows
tasklist | findstr node

# 结束所有Node进程（谨慎使用）
taskkill /F /IM node.exe
```

## 日志调试

### 后端日志
后端服务器会在控制台输出：
- 服务器启动信息
- API请求错误
- 各平台API调用错误

### 前端日志
打开浏览器开发者工具（F12）查看：
- Console：JavaScript错误和日志
- Network：API请求和响应
- React DevTools：组件状态（如果安装了扩展）

## 重置项目

如果所有方法都失败，尝试完全重置：

```bash
# 1. 停止所有运行中的进程

# 2. 删除node_modules和锁文件
Remove-Item -Recurse -Force node_modules, server/node_modules, client/node_modules -ErrorAction SilentlyContinue
Remove-Item package-lock.json, server/package-lock.json, client/package-lock.json -ErrorAction SilentlyContinue

# 3. 清除npm缓存
npm cache clean --force

# 4. 重新安装
npm run install:all

# 5. 重新启动
npm run dev
```

## 获取帮助

如果问题仍然存在，请提供以下信息：
1. Node.js版本：`node --version`
2. npm版本：`npm --version`
3. 操作系统版本
4. 完整的错误信息（从控制台复制）
5. 重现问题的步骤


