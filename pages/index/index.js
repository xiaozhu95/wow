//index.js
//获取应用实例
var http = require("../../api.js");
const app = getApp()

Page({
  data: {
    log_state: '',

  },
  onLoad: function () {

  },

  onShow() {
    var log_state = wx.getStorageSync("user_info") == "" ? false : true;
    this.setData({
      log_state: log_state
    })
  },
  skip(e) {
    var url = e.currentTarget.dataset.url;
    wx.navigateTo({
      url: url
    })
  
    // if (this.data.log_state) {
    //   wx.navigateTo({
    //     url: url
    //   })
    // } else {
    //   wx.navigateTo({
    //     url: '/pages/login/login'
    //   })
    // }


  }
})