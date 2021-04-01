// pages/audio/audio.js
let touchDotX = 0;//X按下时坐标
let touchDotY = 0;//y按下时坐标
let interval;//计时器
let time = 0;//从按下到松开共多少时间*100
Page({
  data: {
    poster: null,
    name: null,
    author: null,
    src: null,
    musiclist:null,
    showtab:true,
    musicid:0,
  },
  toClose(){
    // console.log("666")
    this.setData({
      showtab:false
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  refresh(){
    if(!this.data.musiclist){
      let _that=this
      let newid=Math.floor(Math.random()*10);
      _that.setData({musicid:newid})
      wx.request({
        url: 'https://cloud-music-api.vercel.app/top/song',//链接云端API
        success (res) {
          if(res.data.code===200){
            _that.setData({musiclist:res.data.data})
            // console.log(_that.data.musiclist)
            _that.setMusic()
          }
          else{
            _that.setData({musiclist:null,showtab:false})
          }
        },
        fail (){
          _that.setData({musiclist:null,showtab:false})
        }
      })
    }
  },
  onLoad: function (options) {
    this.refresh()
  },
  setMusic(){
    let _that=this
    _that.setData({
      src:`https://music.163.com/song/media/outer/url?id=${_that.data.musiclist[_that.data.musicid].id}.mp3`,
      poster:_that.data.musiclist[_that.data.musicid].album.blurPicUrl,
      name:_that.data.musiclist[_that.data.musicid].name,
      author:_that.data.musiclist[_that.data.musicid].artists[0].name
    })
    // this.audioCtx.play()
  },
  toOpen(){
    this.setData({showtab:true})
  },
  toNext(){
    // console.log(this.data.musiclist.length)
    let newid=(this.data.musicid+1)%(this.data.musiclist.length)
    this.setData({musicid:newid})
    this.setMusic()
    this.audioCtx.play()
  },
  toPrevious(){
    let newid=(this.data.musicid-1)%(this.data.musiclist.length)
    this.setData({musicid:newid})
    this.setMusic()
    this.audioCtx.play()
  },

// 触摸开始事件
  touchStart: function(e) {
    touchDotX = e.touches[0].pageX; // 获取触摸时的原点
    touchDotY = e.touches[0].pageY;
    // 使用js计时器记录时间    
    interval = setInterval(function() {
      time++;
    }, 100);
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
          this.toPrevious()
        }else{
          this.toNext()
        }
      }
      if (absY > absX * 2 && tmY<0) {
        this.refresh()
      }
      if (absY > absX * 2 && tmY>0) {
        this.setData({
          showtab:false
        })
      }
    }
    clearInterval(interval); // 清除setInterval
    time = 0;
    touchDotX = 0;//X按下时坐标
    touchDotY = 0;//y按下时坐标
    interval;//计时器
  },



  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (e) {
    this.audioCtx = wx.createInnerAudioContext("myAudio")
  },



  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})