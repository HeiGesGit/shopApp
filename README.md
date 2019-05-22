# 这是一个NB的项目

## 哈哈哈哈哈

### 文本三

#### 文本四

##### 文本五 已经改变的内容

###### 使用可视化工具更新到远程仓库
      1. 暂存更改
      2. 写入修改信息
      3. 推送至远程仓库

## 制作首页app组件
      1. 完成Header区域，使用的是mint-ui 中的 Header 组件
      2. 制作底部 tabbar 区域，使用的是mui的tabbar.html
          在制作购物栏的小图标，操作相对多一些
          把扩展样式的小图标拷贝至项目中
          ttf文件拷贝至项目
          为购物车小图标添加样式

## 制作首页轮播图布局

## 加载首页轮播图数据
  1. 获取数据,如何实现 使用vue-resource
  2. 使用 vue-resource 的 $http.get获取数据
  3. 获取到的数据，保存到data上
  4. 使用v-for 循环每个item项

## 改造九宫格 区域的样式


## 改造 新闻资讯路由链接
  1. 绘制界面 使用mui里面的 media-list
  2. 使用vue-resource 获取数据
  3. 渲染真实数据
        
        新闻的接口地址https://3g.163.com/touch/reconstruct/article/list/BBM54PGAwangning/0-10.html 

## 点击新闻列表，可以跳转至对应的新闻页面
  1. 把列表的一项改造为 router-link ，同时，在跳转的时候应该提供唯一的ID表示符
  2. 创建新闻详情的组件页面 newsinfo.vue
  3. 在路由模块中，将英文详情的路由地址和组件页面对应起来

## 实现新闻详情的页面布局和数据渲染
  


## 单独封装一个 comment.vue 的评论子组件
  1. 创建一个单独的commpont组件
  2. 在需要使用xomment 组件的页面中，先手动导入，
    import  comment  from ' ./comment.vue'
  3. 在父组件中使用components 属性，将刚刚导入的comment组件注册为自己的子组件
  4. 将注册的子组件，以标签的形式引用


## 获取所有的评论数据显示到页面中
  1. 为加载更多按钮，绑定点击事件，在事件中拿到
  2. 自己创建一、两个个api，已id的值绑定api的地址。
  3. 访问api的数据加载到网络中去

## 为更多按钮绑定事件
  1. 为实现加载更多按钮，绑定点击事件，请求下一页数据,
  2. 点击加载更多，让 pageindex++ ，然后重新调用getComments 方法重新获取最新一页的数据
  3. 为了防止新数据覆盖老数据的情况，我们在加载更多的时候，每当获取到新数据，应该让老数据调用数组的concat方法 ,拼接新的数组

## 发表评论
  1. 把文本框做双向数据绑定
  2. 发表按钮绑定一个事件
  3. 校验评论内容是否为空，如果为空提示用户
  4. 通过 vue-resource 发送数据到服务器
  5. 当发表评论ok后重新刷新列表,查看最新的评论
    + 思路一: 调用 getComents 方法重新刷新评论列表，只能得到最后一页的评论，前几页获取不到
    + 思路二: 当评论成功后，在客户端，手动拼接出一个最新的评论对象，然后调用数组的unshift方法，把最新的评论追加到data中comments的开头
        这样完美实现刷新的需求
## 改造图片分析按钮为 路由链接并显示对应的组件
  1. 顶部的滑动条
  2. 制作底部的图片列表

## 制作顶部滑动条的坑
  1. 借助mui中的tap-top-webview-main.html
  2. 需要把slider 区域的 fullscreen类去掉
  3. 滑动条无法正常触发滑动，这是js文件，需要被初始化
    3.1 导入 mui.js
    3.2 调用官方提供的方式
      ...
      mui('.mui-scroll-wrapper').scroll({
	      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
      });
      ... 
  4. 在初始化滑动条的时候，导入了 mui.js但是控制台报错
    bundle.js:54234 Uncaught TypeError: 'caller', 'callee', and 'arguments' properties may not be accessed on strict mode functions or the arguments objects for calls to them
     + 发现是由于mui.js 中用到了不严谨的模式，但是打包好的bundle.js中默认使用严格模式
     解决方案: 1. mui.js 的非严格模式的代码改掉
              2. 把 webpack的严格模式禁用
                  a.sudo cnpm i babel-plugin-transform-remove-strict-mode -D
                  b..babelrc文件在plugins中添加
                    "transform-remove-strict-mode"

## 解决手机调试  
  1. 保证手机和电脑连接的同一个wifi
  2. 打开自己项目中pack.json文件,在dev脚本调价host指令,通过host指令，把当前电脑的wifi 地址，设置为--host的指令值
    + 查看自己的ip，打开wifi设置，就有一个ip地址
  3. 

## 图片列表可以使用懒加载
 1. 图片列表需要使用懒加载技术，可以使用minti-ui 提供现成的组件‘lazy-load’
 2. 根据‘lazy-load’的使用文档，尝试使用
 3. 渲染图片列表数据


 ## 实现图片列表的懒加载和样式美化


 ## 实现点击图片跳转图片详情界面
  1. 在改造li成router-link的时候，需要指定tag属性渲染为哪种元素



 ## 实现图片详情页面布局和美化,同时获取数据渲染页面
 
## 使用缩略图 
    1. 安装包
      sudo cnpm i vue-preview -S
    2. 在main。js中导入
      import VuePreview from 'vue-preview'
      Vue.use(VuePreview)
    3. 报错发现