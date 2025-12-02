module.exports = {
  apps: [
    {
      name: "ppanel-user-web",
      script: "apps/user/server.js",
      interpreter: "bun",
      watch: true,
      instances: "max",
      exec_mode: "cluster",
      env: {
        PORT: 3002
      }
    }
  ]
};
