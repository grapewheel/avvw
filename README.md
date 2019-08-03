# AVVW APICLOUD 开发框架

Apicloud + Vue2 + Vant（有赞前端）+ Webpack4 打包，是一个采用 Vue 数据绑定特性和 Apicloud 手机操控能力相结合的 APP 开发框架，此框架**并非**采用 Vue 的 SPA 单页面应用方式，而是遵从 Apicloud 的多页面原生渲染效率方式，Vue+Webpack 只是为了提供更佳的 ES2015+语法、模块分割和数据绑定代码体验，弥补 Apicloud 本身无法应用在庞大工程协作的缺点。

> 使用 AVVW 可以极速开发出流畅的商用级别 APP，让你轻松应付各种开发需求

> 已适配 IOS8、Android 6 以下低端机型，在此非常感谢[@ftlh2005](https://github.com/ftlh2005)同学的[Issue](https://github.com/grapewheel/avvw/issues/2#issue-404622819)

> v1.1.0 已全面提升页面加载速度，在此非常感谢[@Viarotel](https://github.com/Viarotel)同学的[Issue](https://github.com/grapewheel/avvw/issues/8)

> v1.2.0 已实现手机调试热加载，在此非常感谢[@amnextking](https://github.com/amnextking)同学的[Issue](https://github.com/grapewheel/avvw/issues/10)

# 目录结构

- dist 编译代码，连同 config.xml 上传到 Apicloud 发布 App
- src 源代码，所有开发在此开始，除 pages、templates 目录外，其他目录可随意增删
  - components vue 公用模块
  - libs 公共库
  - **pages** Apicloud 使用 openWin 和 openFrame 打开的页面，vue 组件化
  - **templates** Webpack 编译时的模板文件
    - api.js Apicloud 前端库源文件，保留
    - fastclick.min.js 移动端减少触点反馈时间
    - index.html Apicloud 入口文件
    - page.ejs 将 pages 下 vue 编译为 Apicloud 可用的模板
    - vue.js 未压缩 vue 库，用于开发环境
    - vue.min.js 压缩 vue 库，用于生产环境
- .syncignore 不同步到 Apploader 的文件列表
- config.xml Apicloud 配置文件
- 其他省略

# 开始使用

git clone 或者 直接下载 master 包，cd 进入包目录

### 手机实时调试

```bash
npm i

npm run wifi-start # 开wifi服务，Apploader连接wifi服务，wifi-stop 停止服务
npm run dev # 开启本地测试服
```

待本地测试服完全开启后，查看测试服端口，如下：

```bash
 ℹ ｢wds｣: Project is running at http://0.0.0.0:8080/
```

然后打开./src/templates/index.html，修改 development 环境下调试手机能访问你本地测试服的局域网 IP 和测试服端口，如下：

```html
<script type="text/javascript">
  var url = './home.html'   // You can change the main entry in 'production' ENV
  if ('<%= htmlWebpackPlugin.options.env %>' === 'development') {
    url = 'http://192.168.0.104:8080/home.html' // You can change the main entry in 'development' ENV
  }
  ...
</script>
```

接着可以开始同步文件到手机 Apploader 进行调试

```bash
 npm run wifi-dev # 真机wifi无压缩同步，速度快
 npm run wifi-log # 真机wifi日志输出
```

> 注意：wifi-dev 和 wifi-log 都只需要运行一次，Apploader 第一次同步完成后，修改./src 文件保存后手机自动同步和浏览器热加载一样！无需再手动 wifi 同步一次，这是 1.2.0 后版本的新特性！

> **特别注意：很多小伙伴发现开发时页面第一次加载比较慢，其实是因为手机从本地局域网电脑无线获取页面数据而导致的，但编译为发布包时，页面文件会一并打入 APP，所以开发时的页面加载速度可忽略！**

### 本地浏览器调试

```bash
npm run dev # 开启本地测试服
```

打开浏览器输入例如 http://0.0.0.0:8080/tab1.html 即可对某个页面进行调试，注意由于在本地浏览器环境下所以无法调试 Apicloud sdk 的相关功能

### 编译上传

```bash
 npm run support # 测试兼容机型（可选）
 npm run build # 编译
```

编译后，新建./widget 文件夹，然后将./dist 文件夹和 config.xml 拷贝到./widget 下，压缩./widget 文件夹生成 widget.zip 上传 apicloud 后台的“代码”处即可进行发布

# 如何升级

从 v1.2.0 之前的版本升级到 v.1.2.0，只需获取框架最新源代码后，除./src/templates/index.html 保留外，将你项目的./src 下的文件全部覆盖到 v1.2.0 框架下的./src 下的文件，然后对比你项目的 package.json 和 v1.2.0 的 package.json 差别修改后，重新运行 npm i 安装新开发依赖即可！

# 开发细节

如无需高级配置，那么只需关注 src 下 pages 目录文件，这里说明一下 pages 文件：

### home.vue

任何 vue 语法都可以使用，但有一处要留意！

```js
// 首先在全局window中带入 文件名 + Vue 的vue export object
window.homeVue = {
    ....
}

// 然后才export
export default window.homeVue
```

这是与本来 vue 直接 export 不同之处，因为在 templates 中的 page.ejs 模板文件中，需要从 window 中拿回 vue export object 来在页面上构建 vue 初始化！而 components 目录文件则无需如此！

> 由于框架并非采用 Vue 的 SPA，所以无法在多页面间使用 vue-router、vuex 之类的单页面应用的数据共享技术，而只能采用 Apicloud API 提供的相关页面跳转传递、数据共享技术

### 首页入口

框架默认 home.html 为 App 首页入口，你也可以修改其他页面为入口，只需修改./src/templates 下的 index.html 即可

```js
var url = './home.html'; // 生产环境下，修改此处对应pages的文件名即可 eg. ./main.html
if ('<%= htmlWebpackPlugin.options.env %>' === 'development') {
  url = 'http://192.168.0.104:8080/home.html'; // 开发环境下，修改此处对应pages的文件名即可 eg. ./main.html
}
```

### 本地浏览器预览

npm run dev 开启测试服，但和一般的 vue 测试不同的是，你需要手动切换需要测试的页面，eg. [http://localhost:8080/home.html](http://localhost:8080/home.html)，不能测试 index.html，因为此文件是 Apicloud 所用，页面测试时遇到**api is not defined**不用理会，因为 api 是 Apicloud App 环境下才初始化的对象

> 浏览器预览是用来调节界面排版布局，体验性测试请使用真机 Apploader

### Apicloud API SDK

你可以在 vue 中直接使用 api.xxx，也可以使用 this.\$ac.xxx 来调用 api sdk

### ES6 支持

> vue 支持大部分 ES6 语法，但要注意的是如果你修改 templates 下的 page.ejs 和 index.html，请不要使用 ES6 语法，因为 webpack 默认没有转义模板文件

### 按需加载和异步加载

> 手机 CPU 和内存有限，而且 Apicloud 采用 Hybird 技术，在性能上尤其低端安卓上肯定大打折扣，所以使用按需加载、异步加载和懒加载会更好地让 App 保持流畅原生感

# 扩展使用

框架集成了[有赞 vant](https://youzan.github.io/vant/#/zh-CN/intro)前端框架，适用大部分需求，当然你也可以更换其他 Vue 前端框架。

> 欢迎扩展和完善此框架，接下去我会放出更多其他更好用的开发框架

---

_Copyright by [Grape Studio](https://github.com/grapewheel?tab=repositories)_
