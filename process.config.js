module.exports = {
  apps: [
    {
      name: "Furnis",
      cwd: "./",
      script: "./server.js",
      watch: true,
      env_development: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
      instances: 1,
      exec_mode: "cluster",
    },
  ],
};
