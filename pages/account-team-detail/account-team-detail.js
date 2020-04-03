var api = require("../../api.js");
const http = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lodingtiem: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      room_message: JSON.parse(this.options.room_message)
    })
    console.log(JSON.parse(this.options.room_message), "19");
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
    this.get_team();
  },
  get_team() {
    http.request({
      url: api.account.account_detail,
      method: "POST",
      data: {
        team_id: this.data.room_message.team_id,
        user_id: wx.getStorageSync("user_info").id
      },
      success: res => {
        console.log(res, "39");
        this.setData({
          allot: res.data,
          allot_info: res,
          new_userid: wx.getStorageSync("user_info").id
        });
        if (res.status == 2 || res.status == 3) {
          clearTimeout(this.data.lodingtiem);
        } else {
          this.setData({
            lodingtiem: setTimeout(this.get_team, 1000)
          })
        }
      }
    })
  },
  save_select(e) {
    var status = e.currentTarget.dataset.status;
    var allot_list = this.data.allot
    allot_list[0].vote_status = status;
    console.log(allot_list, "51");
    http.request({
      url: api.account.startVote,
      method: "POST",
      data: {
        params: allot_list
      },
      success: res => {
        console.log(res, "58");
      }
    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    clearTimeout(this.data.lodingtiem);
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    clearTimeout(this.data.lodingtiem);
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