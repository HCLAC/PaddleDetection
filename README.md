# 领途羊小程序

### 发布流程

### TODO
- 短视频图片显示问题
- 骨架屏，无网状态显示
- 首页重新加载，文章页面一直加载中，提示请稍后
- 页面data设置默认值
- 重试请求
- 云测试
- Waiting (TTFB)
- metabs吸顶，去掉监控滚动
- auth区分dev和master
- 更新h5，删除无用插件
- 百度输入法隐藏键盘后无法调起问题
- 路线添加关键词
- 图片加载优化，后端返回图片宽高上传图片压缩
- 个人下拉的问题
- 升级uview-需要兼容之前修改的组件
- transition实现平移，占位图根据宽度缩小，文章占位图问题
- 测试用例
### 图片加载优化
- 后台服务返回图片宽高
- 图片处理参数说明
```
开头：x-oss-process=image
加水印：/watermark,image_d2F0ZXJtYXJrLnBuZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSxQXzg=,g_sw,x_30,y_10
修改质量：/quality,q_50
转换jpg:/format,jpg
```
### 遇到的问题：
- [改动一：二级页面使用自定义导航栏时，需要预留返回按钮位置，避免界面元素冲突](https://smartprogram.baidu.com/forum/topic/show/125547#:~:text=%E6%94%B9%E5%8A%A8%E4%B8%80%EF%BC%9A%E4%BA%8C%E7%BA%A7%E9%A1%B5%E9%9D%A2%E4%BD%BF%E7%94%A8%E8%87%AA%E5%AE%9A%E4%B9%89%E5%AF%BC%E8%88%AA%E6%A0%8F%E6%97%B6%EF%BC%8C%E9%9C%80%E8%A6%81%E9%A2%84%E7%95%99%E8%BF%94%E5%9B%9E%E6%8C%89%E9%92%AE%E4%BD%8D%E7%BD%AE%EF%BC%8C%E9%81%BF%E5%85%8D%E7%95%8C%E9%9D%A2%E5%85%83%E7%B4%A0%E5%86%B2%E7%AA%81)
- 修改创建或者组件样式：在对应vue页面的样式中添加，例子：
```
Q. 如何重置mescroll默认样式,比如修改空布局的样式 ?

推荐使用scss最简单,且支持多平台 ( 把样式名拷贝一份, 加 /deep/ 和 !important ) :
.mescroll-empty .empty-tip,
/deep/.mescroll-empty .empty-tip { color: red !important }

```
- uni.showLoading如果在onInit中，有一定几率显示失败，因为onInit还没进入视图渲染。