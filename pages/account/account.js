var api = require("../../api.js");
const http = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    p: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      user_info: wx.getStorageSync("user_info")
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.recod_money();
  },
  money(e) {
    this.setData({
      money: e.detail.value
    })
  },
  getmoney() {
    wx.showToast({
      title: '敬请期待',
      icon: 'none',
    })
  },
  money_pay() {
    var that = this;
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
          wx.hideLoading();
          var pay_data = res.data;
          0 == res.code && wx.requestPayment({
            timeStamp: pay_data.timeStamp,
            nonceStr: pay_data.nonceStr,
            package: pay_data.package,
            signType: pay_data.signType,
            paySign: pay_data.paySign,
            success(arr) {
              that.setData({
                show: false
              })
              that.get_userinfo();
              that.recod_money();
            },
            fail(arr) {},
            complete: function(e) {}
          })
          console.log(57);
        }
      })
  },
  recod_money() {
    wx.showLoading({
        title: '正在加载中',
      }),
      http.request({
        url: api.payment.recode_mony,
        data: {
          user_id: wx.getStorageSync("user_info").id
        },
        success: res => {
          wx.hideLoading();
          this.setData({
            recode: res.data.data,
            p: this.data.p + 1
          })
        }
      })
  },
  get_userinfo() {
    http.request({
      url: api.user.getuserinfo,
      data: {
        user_id: wx.getStorageSync("user_info").id
      },
      success: res => {
        if (res.code == 0) {
          wx.setStorageSync("user_info", res.data), this.setData({
            user_info: wx.getStorageSync("user_info")
          })
        } else {
          wx.showToast({
            title: res.msg,
            icon: "none"
          })
        }
      }
    })
  },
  showPopup() {
    this.setData({
      show: !this.data.show
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
    console.log("11");
    wx.showLoading({
        title: '正在加载中',
      }),
      http.request({
        url: api.payment.recode_mony,
        data: {
          user_id: wx.getStorageSync("user_info").id,
          p: this.data.p
        },
        success: res => {
          wx.hideLoading();
          if (res.data.data.length > 0) {
            var new_list = [...this.data.recode, ...res.data.data];
            this.setData({
              p: this.data.p + 1,
              recode: new_list
            })
          } else {
            wx.showToast({
              title: "没有更多了",
              icon: "none"
            })
          }
        }
      })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})