var api = require("../../api.js");
const http = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},
  money(e) {
    this.setData({
      money: e.delta.value
    })
  },
  money_pay() {
    wx.showLoading({
        title: '正在加载',
      }),
      http.request({
        url: api.payment.pay,
        method: "POST",
        data: {
          id: 1,
          type: 4,
          user_id: wx.getStorageSync("user_info").id,
          price: this.data.money
        },
        success: res => {
          console.log(res.data.timeStamp, "40");
          wx.hideLoading();
          var pay_data = res.data;
          0 == res.code && wx.requestPayment({
            timeStamp: pay_data.timeStamp,
            nonceStr: pay_data.nonceStr,
            package: pay_data.package,
            signType: pay_data.signType,
            paySign: pay_data.paySign,
            success(arr) {
              console.log(arr, "54");
            },
            fail(arr) {
              console.log(arr, "56");
              console.log(pay_data, "57")
            },
            complete: function(e) {
              console.log(e, "61");
            }
          })
          console.log(57);
        }
      })
  },
  showPopup() {
    this.setData({
      show: !this.data.show
    });
  },
  handlerGobackClick(delta) {
    const pages = getCurrentPages();
    if (pages.length >= 2) {
      wx.navigateBack({
        delta: delta
      });
    } else {
      wx.navigateTo({
        url: '/pages/index/index'
      });
    }
  },
  handlerGohomeClick() {
    wx.navigateTo({
      url: '/pages/index/index'
    });
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