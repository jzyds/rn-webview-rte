# rn-webview-rte

A react native rich text Editor based on webview and quilljs

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
