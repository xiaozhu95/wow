// pages/room-code/room-code.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    top_bar_index: 1,
    group_info_popup: false,
    team_info_popup: false,
    open_game: false,
    equip_popup: false,
    boss: [{
      "name": "不洁者海根",
      "yname": "Heigan the Unclean"
    },
    {
      "name": "‘收割者’高希",
      "yname": "Gothik the Harvester"
    },
    {
      "name": "‘瘟疫使者’诺斯",
      "yname": "Noth the Plaguebringer"
    },
    {
      "name": "伏晨",
      "yname": "Feugen"
    },
    {
      "name": "古鲁斯",
      "yname": "Gluth"
    },
    {
      "name": "大寡妇费琳娜",
      "yname": "Grand Widow Faerlina"
    }
    ],
    boss_equip: [{
      "name": "破冰头盔",
      "yname": "Icebane Helmet",
      "grade": 56,
      "type": "板甲"
    },
    {
      "name": "寒鳞罩帽",
      "yname": "Icy Scale Coif",
      "grade": 56,
      "type": "板甲"
    },
    {
      "name": "导师之帽",
      "yname": "Preceptor's Hat",
      "grade": 56,
      "type": "板甲"
    },
    {
      "name": "尸身项链",
      "yname": "Necklace of Necropsy",
      "grade": 56,
      "type": "板甲"
    },
    {
      "name": "古鲁斯",
      "yname": "Gluth",
      "grade": 56,
      "type": "板甲"
    },
    {
      "name": "大寡妇费琳娜",
      "yname": "Grand Widow Faerlina",
      "grade": 56,
      "type": "板甲"
    },
    {
      "name": "破冰头盔",
      "yname": "Icebane Helmet",
      "grade": 56,
      "type": "板甲"
    },
    {
      "name": "寒鳞罩帽",
      "yname": "Icy Scale Coif",
      "grade": 56,
      "type": "板甲"
    },
    {
      "name": "导师之帽",
      "yname": "Preceptor's Hat",
      "grade": 56,
      "type": "板甲"
    },
    {
      "name": "尸身项链",
      "yname": "Necklace of Necropsy",
      "grade": 56,
      "type": "板甲"
    },
    {
      "name": "古鲁斯",
      "yname": "Gluth",
      "grade": 56,
      "type": "板甲"
    },
    {
      "name": "大寡妇费琳娜",
      "yname": "Grand Widow Faerlina",
      "grade": 56,
      "type": "板甲"
    }
    ],
    select_boss: false,
    auction_type: ["人民币", "金币"],
    auction_typeIndex: 0,
    add_equip_popup: false,
    floor_time_wap: ['5', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55', '60'],
    floor_time_pay: ['5', '6', '7', '8', '9', '10'],
    floor_time_wap_index: 5,
    floor_time_pay_index: 0,
    pat_popup: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  //立即拍
  pat_popup() {

  },
  skip(e) {
    var url = e.currentTarget.dataset.url
    wx.navigateTo({
      url: url
    })
  },
  close_pat_popup() {
    this.setData({
      pat_popup: false
    })
  },
  set_pat_popup() {
    this.setData({
      pat_popup: true
    })
  },

  //点击确定 设定时间
  set_eqiop_btn() {
    this.setData({
      equip_popup: false,
      add_equip_popup: false
    })
  },
  add_equip_btn() {
    this.setData({
      equip_popup: true,
    })
  },
  //关闭boss装备起拍价
  close_boss_popup() {
    this.setData({
      equip_popup: false,
      select_boss: false
    })
  },
  add_equip() {
    this.setData({
      add_equip_popup: true
    })
  },
  floor_time_Change(e) {
    let id = e.currentTarget.dataset.id;
    if (id == "wap") {
      this.setData({
        floor_time_wap_index: e.detail.value
      })
    } else {
      this.setData({
        floor_time_pay_index: e.detail.value
      })
    }
  },
  close_add_popup() {
    this.setData({
      add_equip_popup: false
    })
  },
  //选择boss
  set_select_boss() {
    this.setData({
      select_boss: true
    })
  },

  //开始副本
  open_game() {
    this.setData({
      open_game: true
    })
  },
  sw_bar(e) {
    // console.log(e); 
    let index = e.currentTarget.dataset.index;
    this.setData({
      top_bar_index: index
    })
  },
  //关闭和打开成员详情
  team_popup() {
    this.setData({
      team_info_popup: true
    })
  },
  close_team_popup() {
    this.setData({
      team_info_popup: false
    })
  },
  //关闭和打开房间详情
  group_popup() {
    this.setData({
      group_info_popup: true
    })
  },
  close_group_popup() {
    this.setData({
      group_info_popup: false
    })
  },
  //返回首页
  handlerGohomeClick() {
    wx.switchTab({
      url: '/pages/index/index'
    })
  },
  //复制
  copyBtn: function (e) {
    var that = this;
    wx.setClipboardData({
      //去找上面的数据
      data: "123345",
      success: function (res) {
        wx.showToast({
          title: '复制成功',
        });
      }
    });
  },
  //返回首页
  handlerGohomeClick() {
    wx.switchTab({
      url: '/pages/index/index'
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  //创建连接
  startConnect: function () {
    //本地测试使用 ws协议 ,正式上线使用 wss 协议
    var url = 'ws://47.99.177.103:2347';
    wx.connectSocket({
      url: url,
      success: res => {
        console.log(res, "38");
      }
    })
    var wxst = wx.connectSocket({
      url: url
    });
    wxst.onOpen(res => {
      console.info('连接打开成功');
    });
    wxst.onError(res => {
      console.info('连接识别');
      console.error(res);
    });
    wxst.onMessage(res => {
      var data = res.data;
      console.info(data);
    });
    wxst.onClose(() => {
      console.info('连接关闭');
    });
  },
  //发送内容
  sendOne: function () {
    if (wxst.readyState == wxst.OPEN) {
      wxst.send({
        data: '小程序端测试',
        success: () => {
          console.info('客户端发送成功');
        }
      });
    } else {
      console.error('连接已经关闭');
    }
  },
  //关闭连接
  closeOne: function () {
    wxst.close();
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})