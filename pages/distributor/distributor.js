// pages/distributor/distributor.js
var api = require("../../api.js");
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.hideShareMenu();

    let user_info = wx.getStorageSync("user_info");
    this.userTeamIdentity(this.options.team_id, user_info.id);
    this.getPayList();
  },
  //当前用户的身份
  userTeamIdentity(team_id, user_id) {
    app.request({
      url: api.team.userTeamIdentity,
      method: "POST",
      data: {
        team_id: team_id,
        user_id: user_id
      },
      success: res => {
        if (res.code == 0) {
          this.setData({
            identity: res.data.identity
          })
        }
      }
    })
  },
  getPayList(){
    app.request({
      url: api.team.getPayList + "?team_id=" + this.options.team_id,
      method: "get",
      success: res => {
        console.log(res);
        this.setData({
          currencyMoney: res.data.currencyMoney,
          currencyCoin: res.data.currencyCoin,
          teaminfo: res.data.teaminfo
        })
      }
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

  },
  skip(e) {
    var url = e.currentTarget.dataset.url;
    if (parseFloat(this.data.teaminfo.amount) > 0 || parseFloat(this.data.teaminfo.gold_coin) > 0){
      wx.navigateTo({
        url: url + "?team_id=" + this.options.team_id + "&room_id=" + this.options.room_id,
      })
    }else{
      wx.showToast({
        title: '分配总金额和金币不能都等于0',
        icon: "none"
      })
      return;
    }

  
  },
  handlerGobackClick(delta) {
    const pages = getCurrentPages();
    if (pages.length >= 2) {
      wx.navigateBack({
        delta: delta
      });
    } else {
      wx.switchTab({
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