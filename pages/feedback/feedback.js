// pages/question/question.js
var wxApp = getApp(),
  http = require("../../api.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    question: [{
      id: 0,
      content: "你觉得怎么样"
    }, {
      id: 1,
      content: "好吗？"
    }, {
      id: 2,
      content: "不好"
    }, {
      id: 3,
      content: "怎么了"
    }, ],
    radio: '',
    fileList: [],
    disabled: true,
    textarea: '',
    fileListImg: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    wx.hideShareMenu();
  },
  //问题提交
  feedback() {
    let that = this,
      arrImg = "";
    that.data.fileListImg.forEach(element => {
      arrImg += element + "#"
    });
    wxApp.request({
      url: http.user.feedback,
      method: "POST",
      data: {
        question_id: that.data.radio,
        content: that.data.textarea,
        url: arrImg
      },
      success: res => {
        if (res.code == 0) {
          wx.showModal({
            title: '提示',
            content: "提交成功",
            showCancel: false,
            success(res) {
              if (res.confirm) {
                // console.log('用户点击确定')
                wx.redirectTo({
                  url: '/pages/index/index'
                })
              } else if (res.cancel) {
                // console.log('用户点击取消')
              }
            }
          })
        }
      }
    })
  },
  radioChange(event) {
    this.setData({
      radio: event.detail
    });
    if (this.data.radio.length > 0 && this.data.textarea.length > 0) {
      this.setData({
        disabled: false
      });
    }
  },
  onClick(event) {
    const {
      name
    } = event.currentTarget.dataset;
    this.setData({
      radio: String(name)
    });
    if (this.data.radio.length > 0 && this.data.textarea.length > 0) {
      this.setData({
        disabled: false
      });
    }
  },

  delete(event) {
    this.data.fileList.splice(event.detail.index, 1);
    this.setData({
      fileList: this.data.fileList
    });
  },
  bindtextarea(event) {
    const {
      value
    } = event.detail;
    let isdisabled = "";
    if (this.data.radio.length > 0 && value.length > 0) {
      isdisabled = false;
    } else if (this.data.radio.length == 0 || value.length == 0) {
      isdisabled = true;
    }
    this.setData({
      textarea: value,
      disabled: isdisabled
    });
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