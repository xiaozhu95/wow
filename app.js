//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  onShow() {
    this.setApi()
  },
  globalData: {
    userInfo: null
  },
  request: require("utils/request.js"),
  api: require("api.js"),
  setApi: function () {
    function e(n) {
      for (var a in n) "string" == typeof n[a] ? n[a] = n[a].replace("{$_api_root}", t) : n[a] = e(n[a]);
      return n;
    }
    var t = "https://malltest.yigshop.com/app/index.php";
    t = t.replace("app/index.php", ""), t += "index.php/api/",
      this.api = e(this.api);
    // console.log(this.api, "52");
    var n = this.api.default.index,
      a = n.substr(0, n.indexOf("/index.php"));
    this.webRoot = a;
  },
  webRoot: null
})