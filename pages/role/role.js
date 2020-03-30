var api = require("../../api.js");
const http = getApp();
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
    if (this.options.id){
      this.setData({
        id: this.options.id
      })
    }
   
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
    this.gain_role();

    let data = wx.getStorageSync('role-info-index');

    let indexdata = {
      index: data.index,
      wx_index: data.wx_index,
    }
    this.setData({
      indexdata: indexdata
    }) 
  },
  gain_role() {
    http.request({
      url: api.role.role_lsit,
      data: {
        user_id: wx.getStorageSync("user_info").id,
      },
      success: res => {
        this.setData({
          role_lsit: res.data.data
        })
      }
    })
  },
  skip(e) {
    var url = e.currentTarget.dataset.url
    wx.navigateTo({
      url: url
    })
  },
  go_back(e) {


    var index = e.currentTarget.dataset.index;
    var wx_index = e.currentTarget.dataset.wx_index;


    let indexdata = {
      index: index,
      wx_index: wx_index,
    }
    this.setData({
      indexdata: indexdata
    }) 
    var role_message = this.data.role_lsit[wx_index].list[index];
    wx.setStorageSync("role-info", role_message);
    wx.setStorageSync("role-info-index", indexdata);
    
    if (this.data.id){
      if (this.data.id == 0) {
        wx.navigateBack({
          delta: 1,
        })
      } if (this.data.id == 1) {
        wx.navigateTo({
          url: "/pages/join-us/join"
        })
      } else if(this.data.id == 2){
        wx.navigateTo({
          url: "/pages/creative/creative"
        })
      }
    }
   
    
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