#!/usr/bin/env node

/**
 * 项目设置测试脚本
 * 用于验证项目是否正确配置
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 检查项目配置...\n');

const checks = [];
let hasErrors = false;

// 检查文件是否存在
function checkFile(filePath, description) {
  const exists = fs.existsSync(filePath);
  checks.push({
    name: description,
    status: exists ? '✅' : '❌',
    file: filePath
  });
  if (!exists) hasErrors = true;
  return exists;
}

// 检查目录是否存在
function checkDir(dirPath, description) {
  const exists = fs.existsSync(dirPath) && fs.statSync(dirPath).isDirectory();
  checks.push({
    name: description,
    status: exists ? '✅' : '❌',
    file: dirPath
  });
  if (!exists) hasErrors = true;
  return exists;
}

// 检查package.json中的依赖
function checkDependencies(packagePath, description) {
  try {
    const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
    const hasDeps = pkg.dependencies && Object.keys(pkg.dependencies).length > 0;
    checks.push({
      name: description,
      status: hasDeps ? '✅' : '⚠️',
      file: packagePath
    });
    return hasDeps;
  } catch (error) {
    checks.push({
      name: description,
      status: '❌',
      file: packagePath,
      error: error.message
    });
    hasErrors = true;
    return false;
  }
}

// 执行检查
console.log('📁 检查项目结构...');
checkDir('server', '服务器目录');
checkDir('client', '客户端目录');
checkDir('client/src', '客户端源码目录');
checkDir('client/src/components', '组件目录');
checkDir('server/services', '服务目录');

console.log('\n📄 检查关键文件...');
checkFile('package.json', '根package.json');
checkFile('server/package.json', '服务器package.json');
checkFile('server/index.js', '服务器入口文件');
checkFile('server/services/marketServices.js', '市场服务文件');
checkFile('client/package.json', '客户端package.json');
checkFile('client/vite.config.js', 'Vite配置');
checkFile('client/tailwind.config.js', 'Tailwind配置');
checkFile('client/index.html', 'HTML入口');
checkFile('client/src/App.jsx', '主应用组件');
checkFile('client/src/main.jsx', 'React入口');
checkFile('client/src/index.css', '样式文件');

console.log('\n📦 检查依赖配置...');
checkDependencies('package.json', '根依赖');
checkDependencies('server/package.json', '服务器依赖');
checkDependencies('client/package.json', '客户端依赖');

console.log('\n📊 检查结果汇总:\n');
checks.forEach(check => {
  console.log(`${check.status} ${check.name}`);
  if (check.error) {
    console.log(`   错误: ${check.error}`);
  }
});

console.log('\n' + '='.repeat(50));

if (hasErrors) {
  console.log('\n❌ 发现一些问题，请检查上述错误');
  console.log('\n建议操作:');
  console.log('1. 确保所有文件都已创建');
  console.log('2. 运行: npm run install:all');
  console.log('3. 查看 DEBUG.md 获取更多帮助');
  process.exit(1);
} else {
  console.log('\n✅ 项目结构检查通过！');
  console.log('\n下一步:');
  console.log('1. 运行: npm run install:all');
  console.log('2. 运行: npm run dev');
  console.log('3. 访问: http://localhost:3000');
  process.exit(0);
}


