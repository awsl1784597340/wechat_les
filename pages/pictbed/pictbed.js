// pages/pictbed/pictbed.js
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
  lifetimes:{
    
    attached(){
      let _that=this
      wx.request({
        url: 'http://192.168.3.101:5000/history',
        success(res){
          console.log(res)
          _that.setData({datalist:res.data.data})
          console.log(_that.data.datalist)
          _that.setData({countx:Math.ceil(_that.data.datalist.length/2)})
          console.log(_that.data.countx)
        }
      })
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    datalist:null,
    url:'http://192.168.3.101:5000',
    countx:null,
    focus:null,
    show:false,
    showdownload:false,
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
    showPopup(event) {
      // console.log(event)
      // console.log(2*event.currentTarget.dataset.hi)
      let tmp =2*event.currentTarget.dataset.hi+event.currentTarget.dataset.hj
      console.log(tmp)
      this.setData({focus: tmp});
      // console.log(this.data.focus)
      this.setData({ show: true });
    },
    longPress(){
      this.Popup()
    },
    onClose() {
      this.setData({ show: false });
    },
    downloadImage(){
      let _that = this
      wx.downloadFile({
        url: `${_that.data.url}${_that.data.datalist[_that.data.focus]}`, 
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



    touchStart: function(e) {
      touchDotX = e.touches[0].pageX; // 获取触摸时的原点
      touchDotY = e.touches[0].pageY;
      // 使用js计时器记录时间    
      interval = setInterval(function() {
        time++;
      }, 100);
    },
    refresh(){
      let _that=this
      wx.request({
        url: 'http://192.168.3.101:5000/history',
        success(res){
          console.log(res)
          _that.setData({datalist:res.data.data})
          console.log(_that.data.datalist)
          _that.setData({countx:Math.ceil(_that.data.datalist.length/2)})
          console.log(_that.data.countx)
        }
      })
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



  }
})
