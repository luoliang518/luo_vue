const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 80, // 配置端口
    open: true, // 自动打开浏览器
    allowedHosts: 'all',
    client: {
      webSocketURL: 'wss://47c7-115-236-36-106.ngrok-free.app/ws',
    },
   },
});
