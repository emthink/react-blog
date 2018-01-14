/**
 * @desc Webpack配置入口
 * @author codingplayboy
 */
module.exports = function (enviroment) {
  let env;
  let _DEV_ = true;
  let _PROD_ = false;

  switch (enviroment) {
    case 'dev':
      env = 'dev';
      _DEV_ = true;
      _PROD_ = false;
      break;
    case 'production':
      env = 'prod';
      _DEV_ = false;
      _PROD_ = true;
      break;
    default:
      env = 'dev';
      _DEV_ = true;
      _PROD_ = false;
  }

  // 根据环境参数动态决定引入对应配置文件
  return require(`./webpack/${env}.conf.js`)({
    ROOTPATH: __dirname,
    _DEV_,
    _PROD_
  });
};
