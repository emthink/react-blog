# Webpack自动化构建实践指南

由于现在的博客是使用wordpress搭建，自己得经常修改过一些代码，但是修改第三方源码真的比较痛苦，于是决定计划开始使用React + Node.js / Python开发新博客项目，最终替换当前博客代码，方便以后博客的维护和更新，也能实现自我开发技术，架构设计，解决问题能力的提升，同时记录下整个开发历程，总结，分享，希望能与读者们一起进步。本篇介绍如何使用Webpack和Babel，Eslint，documentation.js等搭建项目开发环境和生产环境，也算项目的准备工作，下一期计划介绍项目的架构设计和技术栈选择。

## npm VS Yarn

在本项目我们使用Yarn管理项目三方依赖，不过放心，Yarn和NPM不冲突，也不是要替代NPM，使用方式基本一致，只需要简单了解以下几点。

### 三方库版本管理

npm 和 Yarn 都使用 `package.json` 来跟踪项目的依赖，版本号并非一直准确，因为你可以定义版本号范围，npm的不同更新范围，可能导致在拥有相同 `package.json` 文件的机器上安装不同版本包，这可能导致一些差异的异常和冲突。

那npm有解决方式嘛？npm中可以使用 `npm shrinkwrap`生成一个版本锁文件`npm-shrinkwrap.json`，在 `npm install` 时会在读取 `package.json` 前先读取这个文件，但是当更新包版本时，版本锁文件并不会自动更新，我们得手动再次执行`npm shrinkwrap`命令更新它。

那么Yarn有什么优势呢？每次添加或更新安装库包时，Yarn 都会创建（或更新）`yarn.lock` 文件，这样可以确保所有机器安装相同版本包，同时支持 `package.json` 中定义的允许版本范围，和npm的区别在于Yarn总会自动更新 `yarn.lock`，而npm需要手动更新。

### 并发安装

npm通常是按顺序一个一个安装依赖，而Yarn支持并行加载安装多个三方库包，所有其速度和效率都更快。

### 离线缓存

使用Yarn管理包时，三方库包存放在本地磁盘，下次安装将直接使用本地文件而不是再次下载，这也从另一方面使其安装速度优于npm。

简而言之就是，Yarn和npm使用方式几乎一样，但是其版本管理更方便，安装速度更快，更有优势，但是实际上它的所有三方库包加载地址和npm都是统一的。

## Webpack

我们使用Webpack打包工具作为项目的自动化构建工具，将JavaScript，CSS，图片等资源都当作JavaScript模块（使用Webpack loader处理转换）进行统一管理，关于Webpack博主之前总结过两篇文章，可以参考：

1. [Webpack搭建SPA应用开发环境](http://blog.codingplayboy.com/2017/05/31/webpack_spa_build_env/)
2. [Webpack模块化管理CSS和图片等资源](http://blog.codingplayboy.com/2017/06/06/webpack_resource_manage/)

有了前文的铺垫，本文就不打算展开介绍Webpack的工作原理和具体配置，而计划从项目实践开发和测试，打包层面思考如何更好的组织Webpack，如何使用Webpack提告项目开发，打包效率。

### Webpack配置文件

首先我们在根目录下创建`webpack.config.js`配置文件：

```javascript
module.exports = function () {
  let env
  let _DEV_ = true // 开发环境
  let _PROD_ = false // 生产环境
  
  switch (process.env.NODE_ENV) {
    case 'dev':
      env = 'dev'
      _DEV_ = true
      _PROD_ = false
      break
    case 'production':
      env = 'prod'
      _DEV_ = false
      _PROD_ = true
      break
    default:
      env = 'dev'
      _DEV_ = true
      _PROD_ = false
  }
  // 根据环境参数动态决定引入对应配置文件
  return require(`./webpack/${env}.conf.js`)({
    ROOTPATH: __dirname,
    _DEV_,
    _PROD_
  })
}
```

根据`process.env.NODE_ENV`环境参数动态决定加载对应配置文件：

1. `dev`：加载`webpack/env.conf.js`配置文件；
2. `prod`：加载`webpack/prod.conf.js`配置文件；

我们在项目根目录下创建了`webpack`目录，其内创建了三个配置文件：

1. `base.conf.js`：基础配置文件，在开发，生产环境都需要的配置；
2. `dev.conf.js`：开发环境配置文件；
3. `prod.conf.js`：生产环境打包配置文件；

### 开发环境配置

开发环境配置文件中定义了一些开发使用的构建配置，然后引入基础配置文件，使用`webpack-merge`三方库，将开发环境配置合并至基础配置对象，然后返回开发环境打包构建配置对象，作为Webpack打包构建的参数：

```javascript
const webpackMerge = require('webpack-merge')
const PUBLICPATH = '/assets/'
const PORT = '9090'
let options = { /* ... */ }
module.exports = function (args) {
  options.ROOTPATH = args.ROOTPATH
  options.env = args.env
  return webpackMerge(require('./base.conf')(options), {
    devtool: 'source-map',
    devServer: {
      contentBase: path.join(args.ROOTPATH, './src'),
      historyApiFallback: true,
      inline: true,
      hot: true,
      port: PORT,
      proxy: {
        '*': `http://localhost:${PORT}/${PUBLICPATH}/`
      }
    },
    plugins: []
  })
}
```

### 生产环境配置

生产环境配置文件中定义了的是生产环境使用的构建配置，然后也是引入基础配置文件，使用`webpack-merge`三方库，将生产环境配置合并至基础配置，然后返回配置对象，作为Webpack打包构建的参数：

```javascript
let options = { /* ... */}
module.exports = function (args) {
  options.ROOTPATH = args.ROOTPATH
  options.env = args.env
  return webpackMerge(require('./base.conf')(options), {
    plugins: [
      new webpack.DefinePlugin({
        'process.env': 'production'
      }),
      // 生成独立css文件
      new ExtractTextPlugin({
        filename: 'css/[name].css'
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      })
    ]
  })
}
```

### 指令

然后就是为不同环境配置可执行指令，我们使用`npm scripts`方式，在`package.json`文件中配置执行指令：

```json
{
  "scripts": {
    "start": "cross-env NODE_ENV=dev webpack-dev-server",
    "build": "cross-env NODE_ENV=production webpack"
  }
}
```

1. `start`：开发环境运行指令，使用`cross-env`三方库设置`process.env.NODE_ENV`为`dev`，并在本地开启webpack开放服务器，方便开放；
2. `build`：生产环境运行指令，使用`cross-env`三方库设置`process.env.NODE_ENV`为`production`，将打包输出代码和资源文件；

最后分别执行`yarn start`和`yarn build`指令即可分别执行开发和生产构建打包了。

## Babel

可自定义配置型的通用编译器，需要明确指定期望babel做什么，通过安装**插件（plugins）**或**预设（presets，也就是一组插件）**来指示 Babel 去做什么事情。

### 配置文件

首先需要创建一个配置文件，即在项目的根路径下创建 `.babelrc` 文件。然后输入以下内容作为开始：

```json
{
  "presets": [],
  "plugins": []
}
```

之后就可以拓展这个配置文件以指定此项目中 Babel 的功能。

### babel-preset-es2015

我们期望在项目中能使用更新潮的ES6版本语法，但由于目前还有许多JavaScript环境不能很好兼容ES6，所以需要Babel将ES6代码编译成ES5语法代码，保证应用的使用范围。

执行如下命令，安装 "es2015" Babel 预设：

```javascript
yarn add --dev babel-preset-es2015
```

修改`.babelrc`配置文件：

```json
{
  "presets": [
    "es2015"
  ],
  "plugins": []
}
```

### babel-preset-stage-num

另外，JavaScript还有一些提案，正在推进，不久的将来也可能成为标准的一部分，所以目前将这些草案提出，内容更新直至最终成为标准，添加进标准库的过程划分为 5（0－4）个阶段。 根据提案的状态和内容，将其在各个阶段更新（阶段0至阶段3），最终在阶段 4表明该提案被标准正式采纳，当然不被采纳的提案不会进入阶段4。

以下是4个不同阶段的打包预设：

- `babel-preset-stage-0`
- `babel-preset-stage-1`
- `babel-preset-stage-2`
- `babel-preset-stage-3`

**注： stage-4 预设不存在，它其实就是上文介绍的 `es2015` 预设。**

以上每种预设都包含紧随的后期阶段预设，同时还可能包含其他额外特性。例如，`babel-preset-stage-0` 包含 `babel-preset-stage-1`， `babel-preset-stage-2`，`babel-preset-stage-3`，而 `babel-preset-stage-1`则包含 `babel-preset-stage-2`，`babel-preset-stage-3`依次后推。

[点此查看关于各阶段预设的详细特性内容文档](https://babeljs.io/docs/plugins/preset-stage-0/)

我们次选择支持特性最全面的预设：

```javascript
yarn add --dev babel-preset-stage-0
```

在`.babelrc` 配置文件内添加：

```json
{
  "presets": [
    "es2015",
    "stage-0"
  ],
  "plugins": []
}
```

### babel-preset-react

我们的项目期望使用React开发，所以需要拓展支持React/JSX语法，安装预设：

```shell
yarn add --dev babel-preset-react
```

 `.babelrc` 配置文件内添加：

```json
{
  "presets": [
    "es2015",
    "stage-0",
    "react"
  ],
  "plugins": []
}
```

### babel-polyfill

至此，使用Babel，我们的·项目几乎可以支持所有的ES6及ES7语法，但是对于新增的JavaScript API是无能为力的，如`Symbol`这种新API，并不是通过语法转换能实现的，所以我们需要另外的方式解决。

业内提出了Polyfill(填充)，以添加额外代码的方式使得当前运行环境支持不存在的原生Api ，拓展了尚处在推进阶段的API的使用范围。

```javascript
yarn add babel-polyfill
```

*此处不需要添加`--dev`参数。*

然后在文件入口引入即可：

```javascript
import "babel-polyfill";
```

### babel-runtime

前面提到的Babel通过转换语法以支持我们以ES6等更新的语法方式开发代码，这时Babel会在每一个处理的文件头部注入辅助代码，会产生很多冗余，重复性的内容，导致代码量暴增，所以我们需要将这些辅助代码抽取至一个统一环境，Babel提供的就是运行时（runtime）环境。

要实现Babel运行时环境，需要安装 `babel-plugin-transform-runtime` 和 `babel-runtime`：

```shell
yarn add --dev babel-plugin-transform-runtime babel-runtime
```

然后更新 `.babelrc`：

```json
{
  "plugins": [
    "transform-runtime",
  ]
}
```

### 按需加载（babel-plugin-import）

很多时候，我们开发业务并不需要自制UI，会选择一些开源组件库以快速开发实现产品，如antd，weui，material-ui等，我们可以选择直接提前加载三方库所有模块，但是很多时候我们希望能实现按需加载，减少初始代码包的体积，这时，我们可以在babel配置文件中声明按需加载该第三方库，当然首先得安装插件`babel-plugin-import`：

```shell
yarn add --dev babel-plugin-import
```

然后在配置文件`.babelrc`中添加配置：

```json
{
  "plugins": [
    "import",
    {
      "style": "../styles", // 加载样式解析方式，（值为true时，可能是less／Sass），此处值设为相对libraryName具体模块请求路径值
      "libraryDirectory": "", // 加载包的目录，(默认是lib，即node_modules/lib/)
      "libraryName": "material-ui" // 加载三方组件库名，当然另外需要安装该三方库
    }
  ]
}
```

此时，webapck loader处理css时不能添加`exclude: /node_modules/`。

### 其他插件

我们还可以根据项目实际需求和爱好自定义安装插件，更多信息查看[官方插件文档](http://babeljs.io/docs/plugins/)。

在这里推荐一款`babel-pliugin-transform-s2015-classes`插件拓展以实现JavaScript内置class对象的`extends`继承特性，参考文档[ES2015 classes transform](http://babeljs.io/docs/plugins/transform-es2015-classes#caveats)。

```shell
yarn add --dev babel-plugin-transform-es2015-classes
```

在`.babelrc`文件内添加plugins内容：

```json
{
  "plugins": [
    "transform-runtime",
    "transform-es2015-classes",
    [
      "import",
      {
        "style": "css",
        "libraryDirectory": "",
        "libraryName": "material-ui"
      }
    ]
  ]
}
```

## 语法检测（Eslint）

为了保证代码质量，统一代码风格是很重要的，而只靠团队口头约定明显是不能尽如人意，所以通常需要在自动化构建层面进行代码语法检测，有很多语法检测工具如jslint，eslint，目前使用率最高的要数eslint了，所以我们的项目也引入eslint，首先安装依赖：

```shell
yarn add --dev eslint
```

更多细节参考[配置文档](http://eslint.cn/docs/user-guide/configuring)，下文简要介绍主要。

### 配置文件

然后在项目根目录下建立eslint配置文件`.eslintrc`，内容是一个对象：

```json
{}
```

### 解析器（parser）

另外，ESLint 默认使用[Espree](https://github.com/eslint/espree)作为其解析器，你可以在配置文件中指定一个不同的解析器，如babel-eslint，esprima等，我们项目使用babel-eslint：

```shell
yarn add --dev babel-eslint
```

在配置文件内添加`parser`属性：

```json
{
  "parser": "babel-eslint"
}
```

### eslint-plugin-babel

eslint还支持可选安装插件，拓展eslint，如`eslint-plugin-babel`，该插件与`babel-eslint`协作，使得eslint可以更好的与babel同时工作，更多请查看[参考文档](https://github.com/babel/eslint-plugin-babel)。

```shell
yarn add --dev eslint-plugin-babel
```

在配置文件添加声明：

```json
{
  "plugins": [
    "babel"
  ],
}
```

### aslant-plugin-react

eslint默认是检测JavaScript语言语法的，而对于React／JSX这类包含其自定义语法和语法糖的框架而言，需要另外拓展安装插件才能和eslint结合使用，所以使用eslint检测React特定语法需要安装`eslint-plugin-react`插件：

```shell
yarn add --dev eslint-plugin-react
```

添加配置文件：

```json
{
  "plugins": [
    "babel",
    "react"
  ]
}
```

### 拓展（extends）

除了自定义语法检查规则外，我们可以使用Eslint提供的集成拓展包，使用共享的语法检测配置对象，如`eslint-config-standard`和`eslint-config-standard-react`：

```shell
yarn add --dev eslint-config-standard eslint-config-standard-react eslint-plugin-standard eslint-plugin-promise eslint-plugin-import eslint-plugin-node eslint-plugin-react
```

*注：这里包含了上一小节提到的eslint-plugin-react是为了支持eslint-config-standard-react配置包。*

然后在`.eslintrc`配置文件中添加拓展：

```json
{
  "extends": [
    "standard",
    "standard-react"
  ]
}
```

**若不想使用这类集成语法检测规则，可以移除配置文件中内容并移除依赖：**

```shell
yarn remove eslint-config-standard eslint-config-standard-react eslint-plugin-standard eslint-plugin-promise eslint-plugin-import eslint-plugin-node eslint-plugin-react
```

### 语法规则（rules）

要添加语法规则，只需要声明在`rules`属性对象中，如：

```json
{
  "rules": {
    "strict": 0,
    "semi": 2, // 强制语句末尾添加符号，否则报错
    "quotes": [
      1,
      "single"
    ],
  }
}
```

### 规则结构

当声明语法检测规则时，需要设置规则 ID为以下值之一：

- `"off"` 或 `0` - 关闭规则
- `"warn"` 或 `1` - 开启规则，使用警告级别的错误：`warn` (不会导致程序退出)
- `"error"` 或 `2` - 开启规则，使用错误级别的错误：`error` (当被触发的时候，程序会退出)

```json
{
  "rules": {
  	eqeqeq: 0, // or "off"
  	curly: 2 // or "error"
  }
}
```

某些规则还可能有额外的配置选项，可以使用数组指定，如：

```json
{
  "rules": {
    "eqeqeq": "off",
    "curly": "error",
    "quotes": ["warn", "single"] // 开启使用单引号，若使用双引号将发出警告
  }
}
```

### 指令

要执行语法检测，只需要执行`./node_modules/.bin/eslint src `（项目本地安装eslint，而非全局安装，则需要指定执令脚本路径），将会遍历检查`src`目录下的所有源码文件语法并输出结果，当然我们最终需要将指令根据`npm scripts`规范插入`package.json`文件：

```json
{
  "scripts": {
    "lint": "eslint --cache --fix src"
  }
}
```

**使用npm scripts执行指令时，无论项目本地安装还是全局安装，都可以省略指令脚本路径，因为npm将自动匹配可用路径。**

## 文档

一个优秀的项目当然少不了文档，文档可以帮助其他开发者快速了解整个项目内容及进度，也有助于bug修复时查找内容，追踪溯源，所以文档是有必要的，于是通过调研发现了JSdoc和[documentation.js](https://github.com/documentationjs/documentation)帮助自动化产出API文档。

### documentation

和[JSdoc](http://usejsdoc.org/)一样，documentation也是根据代码注释自动构建出项目文档，前提是我们的代码注释必须按照其规范指南，详情[参考JSdoc文档](http://usejsdoc.org/)。

我们首先安装[documentation.js](https://github.com/documentationjs/documentation):

```shell
yarn add --dev documentation
```

### 指令

然后可以执行指令：

```shell
./node_modules/.bin/documentation build src/app.js -f md > API.md
```

会发现在根目录输出了API.md文件。

我们在package.json文件中配置`npm scripts`执行脚本：

```json
"scripts": {
  "doc": "./node_modules/.bin/documentation build src/app.js -f md > API.md"
}
```

**项目本地安装documentation时，直接在命令行终端执行指令时需要指定`./node_modules/.bin/documentation`路径，若全局安装则只可直接使用`documentation`指令。而执行package.json中的脚步，可以直接简写，npm将为我们自动匹配。**

