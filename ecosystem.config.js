// global environment
const commonEnv = {
  dev: {
    MONGO_URI: 'mongodb://localhost:27017',
    MONGO_DB_NAME: 'serviceDB'
  },
  prod: {
    MONGO_URI: 'mongodb://localhost:27017',
    MONGO_DB_NAME: 'serviceDB'
  }
}
module.exports = {
  apps: [{
    cwd: 'pm2-api',
    name: 'pm2-api',
    script: 'npm',
    args: 'run build',
    restartDelay: 1000,
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '200M',
    env: {
      ...commonEnv.dev,
      SERVICE_NAME: 'pm2-api',
      PORT: 9999,
      NODE_ENV: 'development'
    },
    env_production: {
      ...commonEnv.prod,
      SERVICE_NAME: 'pm2-api',
      PORT: 9999,
      NODE_ENV: 'production'
    }
  },
  {
    cwd: 'pm2-auth',
    name: 'pm2-auth',
    script: 'npm',
    args: 'run build',
    restartDelay: 1000,
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '200M',
    env: {
      ...commonEnv.dev,
       SERVICE_NAME: 'pm2-auth',
      PORT: 4000,
      NODE_ENV: 'development'
    },
    env_production: {
      ...commonEnv.prod,
      SERVICE_NAME: 'pm2-auth',
      PORT: 4000,
      NODE_ENV: 'production'
    }
  },
  {
    name: 'pm2-mongodb',
    script: 'mongod',
    args: '--dbpath pm2-mongodb',
    instances: 1,
    autorestart: true,
    watch: false
  }]
};