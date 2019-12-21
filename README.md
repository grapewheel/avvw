# AVVW APICLOUD 开发框架

Apicloud + Vue2 + Vant2（有赞前端）+ Webpack4 (Vue-cli3) 打包，是一个采用 Vue 数据绑定特性和 Apicloud 手机操控能力相结合的 APP 开发框架，此框架**并非**采用 Vue 的 SPA 单页面应用方式，而是遵从 Apicloud 的多页面原生渲染效率方式，Vue+Webpack 只是为了提供更佳的 ES2015+语法、模块分割和数据绑定代码体验，弥补 Apicloud 本身无法应用在庞大工程协作的缺点。

> 使用 AVVW 可以极速开发出流畅的商用级别 APP，让你轻松应付各种开发需求

> 采用最新 Vue-cli3 脚手架制作，开发、编译和维护更轻便快捷

# 目录结构

- dist 编译代码，压缩后上传到 Apicloud 发布 App
- src 源代码，所有开发在此开始，除 pages 目录外，其他目录可随意增删
  - components Vue 公用组件
  - libs 公共库
  - **pages** Apicloud 使用 openWin 和 openFrame 打开的页面，vue 组件化，支持**多级目录**
- public Webpack 编译时的模板文件，**不能随意修改，除非您知道自己在干什么**
  - js/fastclick.min.js 移动端减少触点反馈时间
  - js/vue.js 未压缩 vue 库，用于开发环境
  - js/vue.min.js 压缩 vue 库，用于生产环境
  - index.html Apicloud 启动文件
  - page.ejs 将 pages 下 vue 编译为 Apicloud 可用的模板
  - config.xml Apicloud 配置文件
- .env 开发和生成环境对应的入口地址
- 其他省略

# 开始使用

git clone 或者 直接下载 master 包，cd 进入包目录后安装依赖

```bash
npm i # 初始化安装npm模块
```

### 手机实时调试

```bash
npm run wifi-start # 开wifi服务，Apploader连接wifi服务，wifi-stop 停止服务
```

待 wifi 服务开启后，查看本地 ip 地址，如下地址：

```bash
APICloud Is Listening on ip: ["192.168.0.104","192.168.146.1","192.168.69.1"]
```

然后打开./.env，修改 VUE_APP_ENTRY_DEV 测试环境下调试手机能访问你本地测试服的局域网 IP:8080，如下：

```text
VUE_APP_ENTRY_DEV=http://192.168.0.104:8080/home.html
VUE_APP_ENTRY_PRD=./home.html
```

然后再打开本地测试服

```bash
npm run dev # 开启本地测试服
```

待本地测试服开启后，可以开始同步文件到手机 Apploader 进行调试

```bash
 npm run wifi-sync # 真机wifi同步
 npm run wifi-log # 真机wifi日志输出
```

> 注意：wifi-sync 和 wifi-log 都只需要运行一次，Apploader 第一次同步完成后，修改./src 文件保存后手机自动同步和浏览器热加载一样！无需再手动 wifi-sync 同步一次！

> **特别注意：很多小伙伴发现开发时页面第一次加载比较慢，其实是因为手机从本地局域网电脑无线获取页面数据而导致的，但编译为发布包时，页面文件会一并打入 APP，所以开发时的页面加载速度可忽略！**

### config.xml

使用自定义 Apploader 时，./public/config.xml 的 `<widget id="A0000000000023" version="0.0.1">` 的 widget id 必须修改为您的 App id 才能 Wifi 同步成功

### 本地浏览器调试

```bash
npm run dev # 开启本地测试服
```

打开浏览器输入例如 http://localhost:8080/home.html 即可对某个页面进行调试，注意由于在本地浏览器环境下，所以无法调试 Apicloud sdk 的相关功能

### 编译上传

```bash
 npm run build # 编译
```

编译后，修改./dist 目录名称为 ./widget，压缩./widget 文件夹生成 widget.zip 上传 apicloud 后台的“代码”处即可进行发布

# 如何升级

从 v1.3.0 之前的版本升级，只需获取框架最新源代码后，将旧项目的./src 下除 templates 外的文件全部覆盖到 v1.3.0 框架下的./src 下，然后对比修改 package.json，同时对比修改 public/index.html 和 page.ejs 后，重新运行 npm i 安装新开发依赖即可！

# 开发细节

如无需高级配置，那么只需关注 src 目录下文件，这里说明一下 pages 文件：

### xxx.vue

任何 vue 语法都可以使用，而且直接`export default`vue 即可，**无需再像 v1.3.0 之前版本那样 window.xxxVue 这样处理**

> 由于框架并非采用 Vue 的 SPA，所以无法在多页面间使用 vue-router、vuex 之类的单页面应用的数据共享技术，而只能采用 Apicloud API 提供的相关页面跳转传递、数据共享技术

### 多级目录引用

Apicloud 引用打开多级目录页面时，以./src/pages 作为根目录如下调用:

```js
this.$ac.openFrameGroup({
  name: "homeTabs",
  frames: [
    {
      name: "tab1",
      url: "./tabs-tab1.html" // 引用多级目录文件格式: ./[subdir]-[...]-[filename].html
    },
    {
      name: "tab2",
      url: "./tabs-tab2.html",
      bounces: true
    },
    {
      name: "tab3",
      url: "./tabs-tab3.html"
    }
  ]
});
```

### 首页入口

框架默认 home.html 为 App 首页入口，你也可以修改其他页面为入口，只需修改./.env

```text
VUE_APP_ENTRY_DEV=http://192.168.0.104:8080/home.html # 修改home.html为main.html, eg.
VUE_APP_ENTRY_PRD=./home.html # 修改home.html为main.html, eg.
```

### 本地浏览器预览

npm run dev 开启测试服，但和一般的 vue 测试不同的是，你需要手动切换需要测试的页面，eg. [http://localhost:8080/home.html](http://localhost:8080/home.html)，不能测试 index.html，因为此文件是 Apicloud 所用，页面测试时遇到**api is not defined**不用理会，因为 api 是 Apicloud App 环境下才初始化的对象

> 浏览器预览是用来调节界面排版布局，体验性测试请使用真机 Apploader

### Apicloud API SDK

你可以在 vue 中直接使用 api.xxx，也可以使用 this.\$ac.xxx 来调用 api sdk

### ES6 支持

> vue 支持大部分 ES6 语法，但要注意的是如果你修改 public 下的 page.ejs 和 index.html，请不要使用 ES6 语法，因为 webpack 默认没有转义模板文件

### 按需加载和异步加载

> 手机 CPU 和内存有限，而且 Apicloud 采用 Hybird 技术，在性能上尤其低端安卓上肯定大打折扣，所以使用按需加载、异步加载和懒加载会更好地让 App 保持流畅原生感

# 扩展使用

框架集成了[有赞 vant2](https://youzan.github.io/vant/#/zh-CN/intro)前端框架，适用大部分需求，当然你也可以更换其他 Vue 前端框架。

> 欢迎扩展和完善此框架，接下去我会放出更多其他更好用的开发框架

---

_Copyright by [Grape Studio](https://github.com/grapewheel?tab=repositories)_  
_QQ 群 492968709_
