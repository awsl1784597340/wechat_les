// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    hasUserInfo: false,
  },
  // 事件处理函数
  // bindViewTap() {
  //   wx.navigateTo({
  //     url: '../logs/logs'
  //   })
  // },
  toMain(){
    wx.navigateTo({
      url:"/pages/audio/audio"
    })
  },
  toInfo(){
    wx.navigateTo({
      url:'/pages/pageinfo/pageinfo'
    })
  }
})
