var http = getApp(),
  api = require("../../api.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show_member: false,
    show_punishment: false
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
  onShow: function() {
    this.get_message();
    this.member();
  },
  member() {
    http.request({
      url: api.room.member,
      data: {
        team_id: 4
      },
      success: res => {
        var troops = res.data;
        for (let i in troops) {
          troops[i].checked = false;
          troops[i].select = false;
        }
        this.setData({
          team_list: res.data
        })
      }
    })
  },
  get_message() {
    if (!wx.getStorageSync("subsidy") == "") {
      return (this.setData({
        subsidy: wx.getStorageSync("subsidy").subsidy,
        subsidy_list: wx.getStorageSync("subsidy").subsidy_list
      }))
    }
    http.request({
      url: api.room.room_detail,
      data: {
        room_id: 4,
        team_id: 4
      },
      success: res => {
        this.setData({
          subsidy: res.data.subsidy,
          subsidy_list: res.data.subsidy.subsidy
        })
      }
    })
  },
  show_madel(e) {
    var profession = e.currentTarget.dataset.index;
    this.setData({
      show_member: !this.data.show_member,
      prof_index: profession
    })
  },
  show_punishment() {
    var seat = this.data.subsidy_list;
    var team_list = this.data.team_list;
    team_list.forEach(item => {
      item.select = false;
    })
    var seat_list = [];
    seat.forEach(res => {
      if (res.user_id)
        seat_list = [...seat_list, ...res.user_id]
    })
    seat_list = Array.from(new Set(seat_list));
    seat_list.forEach(res => {
      team_list.forEach(item => {
        if (res == item.user_id) {
          item.select = true;
        }
      })
    })
    this.setData({
      show_punishment: !this.data.show_punishment,
      team_list: team_list
    })
  },
  sure_people() {
    var new_index = this.data.prof_index;
    var people_id = [];
    var select_people = this.data.team_list.filter(res => {
      return res.checked == true
    });
    for (let i in select_people) {
      people_id.push(select_people[i].user_id);
    }
    this.data.subsidy_list[new_index].user_id = people_id;
    this.data.subsidy_list[new_index].user_info = select_people;
    this.setData({
      show_member: !this.data.show_member,
      subsidy_list: this.data.subsidy_list
    });
  },
  sure_punishment() {
    var select_punishment = this.data.team_list.filter(res => {
      return res.punishment == true
    });
    this.setData({
      punishment_list: select_punishment,
      show_punishment: !this.data.show_punishment
    })
  },
  checkboxChange: function(e) {
    var checked = e.detail.value
    var changed = {}
    console.log(this.data.team_list, "108");
    for (var i = 0; i < this.data.team_list.length; i++) {
      if (checked.indexOf(this.data.team_list[i].user_role_name) !== -1) {
        changed['team_list[' + i + '].checked'] = true;
      } else {
        changed['team_list[' + i + '].checked'] = false;
      }
    }
    this.setData(changed)
  },
  check_punishment: function(e) {
    var checked = e.detail.value
    var changed = {}
    for (var i = 0; i < this.data.team_list.length; i++) {
      if (checked.indexOf(this.data.team_list[i].user_role_name) !== -1) {
        changed['team_list[' + i + '].punishment'] = true
      } else {
        changed['team_list[' + i + '].punishment'] = false
      }
    }
    this.setData(changed)
  },
  allowance() {
    var new_subsidy = this.data.subsidy_list.filter(item => {
      return item.user_id && item.user_id.length > 0
    });
    if (this.data.punishment_list) {
      var punitive = [];
      for (let i in this.data.punishment_list) {
        punitive.push(this.data.punishment_list[i].user_id);
      }
      new_subsidy.push({
        name: "不分钱",
        user_id: punitive,
        value: 0
      })
    }
    var new_message = {};
    new_message.subsidy = this.data.subsidy;
    new_message.subsidy_list = this.data.subsidy_list;
    wx.setStorageSync("subsidy", new_message);
    http.request({
      url: api.room.allowance,
      method: "POST",
      data: {
        room_id: 4,
        team_id: 4,
        currency_type: this.data.subsidy.currency_type,
        status: this.data.subsidy.status,
        subsidy: new_subsidy
      },
      success: res => {
        console.log(res, "130");
        if (res.code == 0) {
          wx.navigateTo({
            url: '/pages/distributor-sure/distributor-sure?allocation=' + JSON.stringify(res.data)
          })
        }
      }
    })
  },
  skip(e) {
    var url = e.currentTarget.dataset.url
    wx.navigateTo({
      url: url
    })
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
    wx.removeStorageSync('subsidy');
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