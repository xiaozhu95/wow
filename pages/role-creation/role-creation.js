// pages/role-creation/role-creation.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    grade: [],
    grade_index: 60,
    multiArray: [
      ['战士', '圣骑士', '猎人', '法师', '牧师'],
      ['人类', '矮人', '亡灵', '牛头人', '巨魔']
    ],
    objectMultiArray: [
      [{
          id: 0,
          name: '无脊柱动物'
        },
        {
          id: 1,
          name: '脊柱动物'
        }
      ],
      [{
          id: 0,
          name: '扁性动物'
        },
        {
          id: 1,
          name: '线形动物'
        },
        {
          id: 2,
          name: '环节动物'
        },
        {
          id: 3,
          name: '软体动物'
        },
        {
          id: 3,
          name: '节肢动物'
        }
      ],
      [{
          id: 0,
          name: '猪肉绦虫'
        },
        {
          id: 1,
          name: '吸血虫'
        }
      ]
    ],
    multiIndex: [0, 0, 0],
    items: [{
        name: 'USA',
        value: '联盟',
        checked: 'true'
      },
      {
        name: 'CHN',
        value: '部落',

      }
    ],
    show_madel: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var arr = [];
    for (let i = 0; i <= 60; i++) {
      arr.push(i)
    }
    this.setData({
      grade: arr
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
  show_sel() {
    this.setData({
      show_madel: !this.data.show_madel
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

  },
  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      grade_index: e.detail.value
    })
  },
  bindMultiPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex: e.detail.value
    })
  },
  bindMultiPickerColumnChange: function(e) {
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    switch (e.detail.column) {
      case 0:
        switch (data.multiIndex[0]) {
          case 0:
            data.multiArray[1] = ['人类', '矮人', '亡灵', '牛头人', '巨魔'];

            break;
          case 1:
            data.multiArray[1] = ['人类', '矮人', '亡灵', '牛头人', '巨魔'];
            break;
        }
        data.multiIndex[1] = 0;
        data.multiIndex[2] = 0;
        break;
      case 1:
        switch (data.multiIndex[0]) {
          case 0:
            data.multiArray[1] = ['人类', '矮人', '亡灵', '牛头人', '巨魔'];

            break;
          case 1:
            data.multiArray[1] = ['人类', '矮人', '亡灵', '牛头人', '巨魔'];
            break;
        }
        data.multiIndex[2] = 0;
        console.log(data.multiIndex);
        break;
    }
    this.setData(data);
  },
  radioChange: function(e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
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