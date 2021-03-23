// pages/upload/upload.js
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
      tmpfilepath:null,
      url:'http://192.168.3.101:5000/upload'
  },

  /**
   * 组件的方法列表
   */
  methods: {
      upupup(){
        let _that = this
        wx.chooseImage({
          success:function(res){
            console.log(res)
            countL:1;
            _that.setData({tmpfilepath:res.tempFilePaths[0]})
            _that.uploadnow()
          }
        })
      
      },
      uploadnow(){
        let _that = this
        wx.uploadFile({
          filePath: _that.data.tmpfilepath,
          name: 'file',
          url: _that.data.url,
          success(res){
            console.log(res)
          },
          fail(res){
            console.log(res)
          }
        })
      }
  }
})
