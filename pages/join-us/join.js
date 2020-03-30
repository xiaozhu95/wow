var api = require("../../api.js");
const http = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputPassword: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
  inputPassword(e) {
    //键盘输入的密码 赋值给inputPassword
    if (this.data.inputPassword.length >= 6) {

    } else {
      this.data.inputPassword = this.data.inputPassword + e.currentTarget.dataset.key;
      console.log(this.data.inputPassword, "36");
      this.setData({
        inputPassword: this.data.inputPassword
      });
    }
    // //当输入密码正确时 
    // if (this.data.inputPassword.length == 6 && this.data.password == this.data.inputPassword) {

    //   this.passwordInputHidden(); //关闭小键盘
    // }
    // //当输入密码错误时 给个提示 并且把输入的密码清零
    // if (this.data.inputPassword.length == 6 && this.data.password != this.data.inputPassword) {
    //   wx.showModal({
    //     title: "提示",
    //     content: "输入密码错误",
    //   })
    //   this.setData({
    //     inputPassword: ''
    //   });
    // }
  },
  //删除输入错误的密码
  clear() {
    var index = this.data.inputPassword.length;
    if (index > 0) {
      var inputPassword = this.data.inputPassword.substr(0, index - 1);
      this.setData({
        inputPassword: inputPassword
      });
    }
  },
  join_room() {
    console.log(this.data.inputPassword.length < 6, "73");
    if (this.data.inputPassword.length < 6) {
      return wx.showToast({
        title: '请输入完整房间码',
        icon: 'none'
      })
    }
    var role_mesage = wx.getStorageSync("role-info");
    var user_info = wx.getStorageSync("user_info")
    var user = {};
    user.user_id = user_info.id;
    user.user_role_name = role_mesage.role_name;
    user.role_id = role_mesage.id;
    user.avatar = user_info.avatar;
    http.request({
      url: api.user.room,
      method: "POST",
      data: {
        room_number: this.data.inputPassword,
        role_id: role_mesage.id,
        service_id: role_mesage.service_id,
        camp_id: role_mesage.camp_id,
        user_info: user
      },
      success: res => {
        console.log(res);
        if (res.code == 1) {
          return wx.showToast({
            title: res.msg,
            icon: 'none'
          })
        }
        if (res.code == 0) {
          wx.redirectTo({
            url: '/pages/room-code/room-code?team_id=' + res.data
          })
        }
      }
    })
  },
})