// pages/user/user.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var log_state = wx.getStorageSync("user_info") == "" ? false : true;
    var a = {
      user_info: log_state ? wx.getStorageSync("user_info") : '',
      log_state: log_state
    }
    this.setData(a)
  },
  skip(e) {
    if (!this.data.log_state) {
      return wx.showModal({
        title: '提示',
        content: '您还未登录，请登录后操作',
        success(res) {
          if (res.confirm) {
            wx.navigateTo({
              url: "/pages/login/login"
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
    var url = e.currentTarget.dataset.url
    wx.navigateTo({
      url: url
    })
  },
  go_login(e) {
    var url = e.currentTarget.dataset.url
    wx.navigateTo({
      url: url
    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})