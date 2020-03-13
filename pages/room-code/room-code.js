// pages/room-code/room-code.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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