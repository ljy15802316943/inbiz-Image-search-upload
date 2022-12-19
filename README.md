# 组件使用tsdx框架开发的npm包。

![image](https://raw.githubusercontent.com/ljy15802316943/inbiz-image-search-upload/main/src/images/file.png)

## 安装依赖

```bash
npm install inbiz-image-search-upload
```

## 页面引入
```bash
import { InbizImageSearchUpload } from 'inbiz-image-search-upload';
```

```bash
示例
<InbizImageSearchUpload
  token="xxxxxx"
  uploadUrl="xxxxxxxxxxxxx"
  onOk={(data) => {
    console.log(data);
  }}
/>
```

## 参数描述

```bash

interface propsType {
  token:string;//请求koken。
  uploadUrl:string;//上传图片接口地址
  visible: boolean;//显示组件
  onOk:Function;//上传完成获取图片结果
  onCancel:Function;//关闭组件回调
  themeColor?: string;//主题色
  style?: any;
  className?:string;//自定义样式
  close?:boolean;//是否支持点击组件外关闭组件。
};

```
