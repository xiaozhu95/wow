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
    // this.get_team();
    this.team_king();
    this.team_status();
  },
  team_king() {
    http.request({
      url: api.team.userTeamIdentity,
      method: "POST",
      data: {
        user_id: wx.getStorageSync("user_info").id,
        team_id: this.data.room_message.team_id
      },
      success: res => {
        console.log(res.data.identity, "44");
        this.setData({
          identity: res.data.identity
        })
      }
    })
  },
  team_status() {
    http.request({
      url: api.account.team_status,
      data: {
        team_id: this.data.room_message.team_id
      },
      success: res => {
        if (res.data == null) {
          return wx.showModal({
            title: '提示',
            content: '该团暂没有产生账单',
            showCancel: false,
            success: function(res) {
              wx.navigateBack({
                delta: 1
              })
            },
          });
        }
        if (res.data.status == 3 || res.data.status == 2) {
          this.setData({
            new_status: res.data.status
          })
          this.team_message(res.data.id);
        } else {
          this.get_team();
        }
      }
    })
  },
  team_message(e) {
    http.request({
      url: api.account.team_message,
      data: {
        id: e
      },
      success: res => {
        console.log(res, "79");
        var team_list = res.data.content;
        var new_list = team_list.filter(item => {
          return item.userId == wx.getStorageSync("info").id
        })
        console.log(new_list, "95");
        this.setData({
          allot: res.data.content,
          voteDate: res.voteDate
        })
      }
    })
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
          voteDate: res.voteDate,
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
    http.request({
      url: api.account.startVote,
      method: "POST",
      data: {
        params: allot_list
      },
      success: res => {
        if (res.code == 1) {
          wx.showToast({
            title: res.msg,
            icon: "none"
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

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    clearTimeout(this.data.lodingtiem);
  },
  anew() {
    let new_message = this.data.room_message;
    wx.navigateTo({
      url: '/pages/distributor/distributor?team_id=' + new_message.team_id + "&room_id=" + new_message.room_id,
    })
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