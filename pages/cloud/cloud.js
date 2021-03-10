// pages/cloud/cloud.js
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
        url: 'https://file-up.vercel.app/list',
        success(res){
          console.log(res)
          _that.setData({datalist:res.data.filelist})
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
    url:'https://file-up.vercel.app',
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
        url: `${_that.data.url}/uploads/${_that.data.datalist[_that.data.focus]}`,     //仅为示例，并非真实的资源
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
  }
})
