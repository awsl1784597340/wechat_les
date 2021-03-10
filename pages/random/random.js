// pages/random/random.js
let touchDotX = 0;//X按下时坐标
let touchDotY = 0;//y按下时坐标
let interval;//计时器
let time = 0;//从按下到松开共多少时间*100
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },
  /**
   * 组件的初始数据
   */
  data: {
    seed:0,
    show:false,
    focus:null,
    showdownload:false,
    path:[],
    urlapi:"https://source.unsplash.com/random"
  },
  /**
   * 组件的方法列表
   */
  methods: {
    Popup() {
      this.setData({ showdownload: true });
    },
  
    CloseLoad() {
      this.setData({ showdownload: false });
    },
    onClose() {
      this.setData({ show: false });
    },
    showPopup(event) {
      // console.log(event)
      // console.log(2*event.currentTarget.dataset.hi)
      let tmp =this.data.seed+2*event.currentTarget.dataset.hi+event.currentTarget.dataset.hj
      this.setData({focus: tmp});
      // console.log(this.data.focus)
      this.setData({ show: true });
    },
    touchStart: function(e) {
      touchDotX = e.touches[0].pageX; // 获取触摸时的原点
      touchDotY = e.touches[0].pageY;
      // 使用js计时器记录时间    
      interval = setInterval(function() {
        time++;
      }, 100);
    },
    refresh(){
      this.setData({seed:this.data.seed+6})
      console.log("777")
    },
    // 触摸结束事件
    touchEnd: function(e) {
      let touchMoveX = e.changedTouches[0].pageX;
      let touchMoveY = e.changedTouches[0].pageY;
      let tmX = touchMoveX - touchDotX;
      let tmY = touchMoveY - touchDotY;
      if (time < 20) {
        let absX = Math.abs(tmX);
        let absY = Math.abs(tmY);
        if (absX > 2 * absY) {
          if (tmX<0){
            // this.toPrevious()
          }else{
            // this.toNext()
          }
        }
        if (absY > absX * 2 && tmY<0) {
          
        }
        if (absY > absX * 2 && tmY>0) {
          this.refresh()
        }
      }
      clearInterval(interval); // 清除setInterval
      time = 0;
      touchDotX = 0;//X按下时坐标
      touchDotY = 0;//y按下时坐标
      interval;//计时器
    },
    longPress(){
      this.Popup()
    },
    downloadImage(){
      let _that = this
      wx.downloadFile({
        url: `${_that.data.urlapi}?${_that.data.focus}`,     //仅为示例，并非真实的资源
        success: function (res) {
          // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
          if (res.statusCode === 200) {
            wx.saveImageToPhotosAlbum({
              filePath: res.tempFilePath,
              success(res) {
                wx.showToast({
                  title: '保存图片成功！',
                })
              },
              fail(res) {
                wx.showToast({
                  title: '保存图片失败！',
                })
              }
            })
          }
        }
      })
    },
    // imagepreview(){
    //   wx.clearStorage()
    //   let _that = this
    //   for(let i = 0 +_that.data.seed; i < 6 + _that.data.seed ; i++){
    //     wx.downloadFile({
    //       url: `https://source.unsplash.com/random?${i}`,
    //       success: function(res) {
    //         if (res.statusCode === 200) {
    //           console.log('图片下载成功' + res.tempFilePath)
    //           // const fs = wx.getFileSystemManager()
    //           // fs.saveFile({
    //           //   tempFilePath: res.tempFilePath, // 传入一个临时文件路径
    //           //   success(res) {
    //           //     console.log('图片缓存成功', res.savedFilePath) // res.savedFilePath 为一个本地缓存文件路径  
    //           //     wx.setStorageSync(`image_cache${i}`, res.savedFilePath)
    //           //   }
    //           // })
    //         }else {
    //           console.log('响应失败', res.statusCode)
    //         }
    //       }
    //     })
    //     _that.setData({"path[i]":wx.getStorageSync(`image_cache${i}`)})
    //   }
    // }
  }
  
})
