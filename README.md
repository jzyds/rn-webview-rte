# rn-webview-rte

A react native rich text Editor based on webview and quilljs

## Dependencies

请保证已安装 [react-native-webview](https://github.com/react-native-community/react-native-webview) 到项目中

## Install

```
npm i rn-webview-rte --save
```

android 端需要将以下配置添加至 /app/build.gradle

```
project.afterEvaluate {
    apply from: '../../node_modules/rn-webview-rte/htmlCopy.gradle'
}
```

## Usage

``` jsx
import RTEWebview from 'rn-webview-rte'

<RTEWebview ref={rich_text => (this.rich_text = rich_text)} />
```

***

## Props

| Property                  |   Type   | Description                              |
| ------------------------- | :------: | :--------------------------------------- |
| onEditorLoaded            | Function | 编辑器加载完成后触发 |
| placeholder               | String   |  |
***

## Methods

> 通过ref调用编辑器的方法

* resetContent (new_content) : 初始化或重置编辑器的内容
* updateContentSelection ()  : 保存当前的光标位置，常用于在选择相册之前调用
* insertVideo (video_url)    : 编辑器添加视频
* insertImage (img_url)      : 编辑器添加图片
* getContentHtml ()          : 获取编辑器内容
