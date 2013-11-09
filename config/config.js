var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'yeoman'
    },
    port: 3000,
    db: 'mongodb://localhost/yeoman-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'yeoman'
    },
    port: 3000,
    db: 'mongodb://localhost/yeoman-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'yeoman'
    },
    port: 3000,
    db: 'mongodb://localhost/yeoman-production'
  }
};

module.exports = config[env];
