//index.js
//获取应用实例
var api = require("../../api.js");
const app = getApp()

Page({
  data: {
    log_state: '',
    checkUserRoomExit:""

  },
  onLoad: function () {

  },

  onShow() {
    var log_state = wx.getStorageSync("user_info") == "" ? false : true;
    if (log_state){
      this.checkUserRoomExit(wx.getStorageSync("user_info").id);
    }
    this.setData({
      log_state: log_state
    })
  },
  create(){
    if (this.data.log_state) {
      if (this.data.code_id==2){
        wx.showToast({
          title: '你已经在房间中，不能创建活动',
          icon: 'none',
        })
      }else{
        wx.navigateTo({
          url: '/pages/role/role?id=2'
        })
      }
    } else {
      wx.navigateTo({
        url: '/pages/login/login'
      })
    }
  },
  //判断这个用户是否已经进入过房间
  checkUserRoomExit(user_id){
    app.request({
      url: api.room.checkUserRoomExit,
      method: "POST",
      data: { user_id: user_id},
      success: res => {
        if (res.code==0){
          this.setData({
            code_id: res.code
          })
        } else if(res.code == 2){
          this.setData({
            code_id: res.code,
            checkUserRoomExit: res.data
          })
        }
       
      }
    })
  },
  join_activity(){
    if (this.data.log_state) {
      wx.navigateTo({
        url: '/pages/role/role?id=1'
      })
    } else {
      wx.navigateTo({
        url: '/pages/login/login'
      })
    }
  },
  skip(e) {
    var url = e.currentTarget.dataset.url;
    // wx.navigateTo({
    //   url: url
    // })
  
    if (this.data.log_state) {
      wx.navigateTo({
        url: url
      })
    } else {
      wx.navigateTo({
        url: '/pages/login/login'
      })
    }


  }
})