module.exports = {
  apps: [
    {
      name: 'meowzip-front',
      script: 'pnpm',
      args: 'start',
      env: {
        NODE_ENV: 'production'
      }
    }
  ]
};
