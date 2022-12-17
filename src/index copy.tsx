import React, { useEffect, useState, useRef } from 'react';
import { Button, Input } from "antd";
import 'antd/dist/antd.min.css';
import './index.less';

interface propsType {
  width: number;
  height: number;
  // visible: boolean;//显示组件
  onCancel:Function;//关闭组件
  themeColor?: string;//主题色
  close?:boolean;//是否支持点击组件外关闭组件。
};

//警告图标
let iconIcDetails = `<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg t="1671170147793" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="17000" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M544 64A480 480 0 1 0 1024 544 480 480 0 0 0 544 64z m0 876.8a396.8 396.8 0 1 1 396.8-396.8 397.248 397.248 0 0 1-396.8 396.8z" p-id="17001"></path><path d="M544 316.48m-56.896 0a56.896 56.896 0 1 0 113.792 0 56.896 56.896 0 1 0-113.792 0Z" p-id="17002"></path><path d="M544 430.208a56.896 56.896 0 0 0-56.896 56.896v284.416a56.896 56.896 0 0 0 113.792 0v-284.416a56.896 56.896 0 0 0-56.896-56.896z" p-id="17003"></path></svg>`;
//上传图标
let iconUpload = `<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg t="1671183346832" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="43094" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><path d="M583.488 572.288v318.528a28.928 28.928 0 0 1-28.928 28.928h-57.6a28.928 28.928 0 0 1-28.928-28.928V572.288H375.36a11.584 11.584 0 0 1-9.28-18.56l150.592-200.768a11.584 11.584 0 0 1 18.56 0l150.592 200.768a11.584 11.584 0 0 1-9.28 18.56z" p-id="43095"></path><path d="M778.624 681.344a133.184 133.184 0 0 0 40.192-260.224l-41.472-12.8-15.104-40.832a266.496 266.496 0 0 0-499.968 0l-15.04 40.832-41.472 12.8a133.248 133.248 0 0 0 40.192 260.224 44.416 44.416 0 1 1 0 88.768 221.952 221.952 0 0 1-66.944-433.664 355.264 355.264 0 0 1 666.624 0 222.08 222.08 0 0 1-66.944 433.664 44.416 44.416 0 1 1 0-88.768z" p-id="43096"></path></svg>`;
//关闭图标
let iconClose = `<svg t="1671244253047" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="43245"><path d="M541.866667 587.904l-211.2 211.2-60.330667-60.330667 211.2-211.2-211.2-211.2L330.666667 256l211.2 211.2L753.066667 256l60.330666 60.330667-211.2 211.2 211.2 211.2-60.330666 60.373333z" p-id="43246"></path></svg>`;
export const InbizImageSearchUpload: React.FC<propsType> = (props) => {
  const { 
    themeColor="#1989fa", 
    // visible=true 
  } = props;
  const [uploadErrText, setUploadErrText] = useState<string>('');
  //获取主题色
  let styleColor: any = { '--themeColor': themeColor };
  // 获取元素信息并绑定拖拽事件
  let uploadBoxBg: any = useRef(null);
  let fileupload: any = useRef(null);

  useEffect(() => {
    init();
    if (props.close) {
      document.addEventListener('click', () => {
        setVisible(false);
        props.onCancel&&props.onCancel();
      });
    };
    return () => {
      uploadBoxBg = null;
      fileupload = null;
    };
  }, []);

  const init = () => {
    // 获取元素信息并绑定拖拽事件
    uploadBoxBg.current.addEventListener("dragover", function (event:any) {
      event.stopPropagation();
      event.preventDefault();
      // 使其半透明
      event.target.style.opacity = 1;
      event.dataTransfer.dropEffect = 'copy';
      // console.log('拖拽前');
    }, false);

    uploadBoxBg.current.addEventListener("dragleave", function (event:any) {
      event.stopPropagation();
      event.preventDefault();
      // 重置透明度
      event.target.style.opacity = 0;
      // console.log('拖拽离开');
    }, false);

    /* 放下目标节点时触发事件 */
    uploadBoxBg.current.addEventListener("drop", function (event:any) {
      // 阻止默认动作
      event.stopPropagation();
      event.preventDefault();
      event.target.style.opacity = 0;
      console.log(event.dataTransfer.files, 'event.dataTransfer.files');
      getFiles(event.dataTransfer.files);
      // console.log('拖拽放开');
    }, false);

    // 上传完成
    fileupload.current.addEventListener('change', function (this:any, e:any) {
      getFiles(this.files);
    });

    fileupload.current.addEventListener('paste', function (e:any) {
      if (e.clipboardData && visible) {
        for (let i = 0; i < e.clipboardData.items.length; i++) {
          let c = e.clipboardData.items[i];
          let f = c.getAsFile();
          let reader = new FileReader();
          reader.onload = function (e:any) {
            let file = base64ToFile(e.target.result);
            let formData = new window.FormData();
            formData.append('file', file);
          }
          reader.readAsDataURL(f);
        }
      }
    });
  };

  const base64ToFile = (baseData:any) => {
    let arr = baseData.split(',');
    let type = arr[0].match(/:(.*?);/)[1];
    let bytes = atob(arr[1]);
    let n = bytes.length;
    let bufferArray = new Uint8Array(n);
    while (n--) {
      bufferArray[n] = bytes.charCodeAt(n);
    }
    return new File([bufferArray], 'test' + Math.random() + '.jpg', { type: type });
  };

  // 获取上传图片结果
  const getFiles = (files:any) => {
    if (!files.length) return;
    const file = files[files.length - 1];
    //按照产品要求，需要支持以下格式的文件上传
    // ".bmp,.dib,.jpeg,.jpg,.jpe,.jp2,.png,.webp,.pbm,.pgm,.ppm,.pxm,.pnm,.pfm,.sr,.ras,.tiff,.tif,.exr,.hdr,.pic,.gif";
    const imgType = 'image/png, image/jpg, image/bmg, image/gif, image/jpeg, image/bmp, image/dib, image/jpe, image/jp2, image/webp, image/pbm, image/pgm, image/pxm, image/pxm, image/pnm, image/pfm, image/sr, image/ras, image/tiff, image/tif, image/exr, image/hdr, image/pic';
    console.log(file, 'file');
    if (imgType.indexOf(file.type) == -1) {
      setUploadErrText('抱歉，您上传的文件不是图片格式，请');
      return;
    }

    var size = file.size / 1024 / 1024 < 10;
    if (!size) {
      setUploadErrText('抱歉，您上传的文件大小超过10M，请');
      return;
    }
    setUploadErrText('');
    var formData = new window.FormData();
    formData.append('file', file);
  };

  const [visible, setVisible] = useState<boolean>(false);
  
  return (
    <div className='box'>
      <Input />
      <Button type="primary" onClick={(e)=>{
        e.stopPropagation();
        setVisible(!visible);
      }}>打开</Button>
      {/* 上传组件相关 */}
      <div id="drop_area" className="uploadBox" style={{...styleColor, display: visible?'block':'none'}}
        onClick={(e)=>{
          e.stopPropagation();
          fileupload.current.click()
        }}
      >
        <div id="uploadBoxBg" ref={uploadBoxBg} />
        <div className="uploadGroup">
          {!uploadErrText ? (
            <div className="t1">
              <p className="p1">拖拽一张图片至此区域任意位置</p>
              <p className="p2">或</p>
              <div className="btn">
                <span className="iconUpload" dangerouslySetInnerHTML={{__html: iconUpload}} />
                <span>选择图片</span>
              </div>
            </div>
          ) : (
          <div className="t2">
            <span className="iconIcDetails" dangerouslySetInnerHTML={{__html: iconIcDetails}} /><span>{uploadErrText}</span><a> 重新上传</a>
          </div>)}
        </div>
        <div className="uploadFooter">
          <span>支持10M以下jpg、jpeg、png、bmg、gif等格式图片</span>
          <span className="uploadBoxClose" dangerouslySetInnerHTML={{__html: iconClose}}
            onClick={(e)=>{
              e.stopPropagation();
              setVisible(false);
              props.onCancel&&props.onCancel();
            }}
          />
        </div>
        <input style={{ display: 'none' }} id="fileupload" ref={fileupload} type="file" name="file" accept="image/*" multiple></input>
      </div>
    </div>
  )
};