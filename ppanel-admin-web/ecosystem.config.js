module.exports = {
  apps: [
    {
      name: "ppanel-admin-web",
      script: "apps/admin/server.js",
      interpreter: "bun",
      watch: true,
      instances: "max",
      exec_mode: "cluster",
      env: {
        PORT: 3001
      }
    }
  ]
};
