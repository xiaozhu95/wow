var e = require("../../api.js"),
  t = getApp();

Page({
  data: {
    show_madel: false,
    legalchecked: true,
    legal_show: false,
    mobile: ''
  },
  onLoad: function(e) {
    wx.hideShareMenu();
    // t.pageOnLoad(this);
    // this.agreement();
  },
  onReady: function() {
    // t.pageOnReady(this);
  },
  onShow: function() {
    console.log(e.passport.login, "13");
    // t.pageOnShow(this);
  },
  onHide: function() {
    t.pageOnHide(this);
  },
  onUnload: function() {
    t.pageOnUnload(this);
  },
  get_user() {
    getApp().request({
      url: e.user.user_info,
      dat: {},
      success: res => {
        if (0 == res.code) {
          wx.setStorageSync("user_info", res.data);
          let ismobile = res.data.mobile.length > 0 ? false : true;
          this.setData({
            user_info: res.data,
            mobile: res.data.mobile,
            show_madel: ismobile
          })
          if (!ismobile) {
            this.refuse();
          }
        }
      }
    })
  },
  getUserInfo: function(t) {
    console.log(t.detail.rawData, "50");
    var that = this;
    "getUserInfo:ok" == t.detail.errMsg && (wx.showLoading({
      title: "正在登录",
      mask: !0
    }), wx.login({
      success: function(o) {
        var n = o.code;
        getApp().request({
          url: e.passport.login,
          method: "POST",
          data: {
            code: n,
            user_info: t.detail.rawData,
            encryptedData: t.detail.encryptedData,
            iv: t.detail.iv,
            signature: t.detail.signature
          },
          success: function(e) {
            console.log(e, "69");
            if (1 == e.status) {
              wx.setStorageSync("access_token", e.data.token);
              wx.setStorageSync("user_info", e.data);
              wx.showToast({
                title: "授权成功",
                icon: "none"
              });
              that.setData({
                show_madel: true
              })
              that.get_user();

            } else wx.showModal({
              title: "提示",
              content: e.msg,
              showCancel: !1
            });
          },
          complete: function() {
            wx.hideLoading();
          }
        });
      },
      fail: function(e) {}
    }));
  },
  getPhoneNumber: function(t) {
    var a = this;
    "getPhoneNumber:fail user deny" == t.detail.errMsg ? wx.showModal({
      title: "提示",
      showCancel: !1,
      content: "未授权",
      success: function(n) {}
    }) : wx.login({
      success: function(i) {
        if (i.code) {
          var o = i.code;
          getApp().request({
            url: e.user.wxappInfo,
            method: "POST",
            data: {
              iv: t.detail.iv,
              encryptedData: t.detail.encryptedData,
              code: o,
              access_token: a.data.access
            },
            success: function(n) {
              0 == n.code ? a.setData({
                PhoneNumber: n.data.dataObj
              }) : wx.showToast({
                title: "授权失败,请重试"
              });
              if (0 == n.code) {
                a.data.user_info.mobile = n.data.mobile;
                wx.setStorageSync('user_info', a.data.user_info);
                wx.showToast({
                  title: "手机号授权成功",
                  icon: "none"
                });
                a.refuse();
              }
            }
          });
        } else wx.showToast({
          title: "获取用户登录态失败！" + i.errMsg,
          image: "/images/icon-warning.png"
        });
      }
    });
  },
  refuse() {
    // this.goback();
    wx.navigateBack({
      delta: 1
    })
  },
  legalChange(event) {
    this.setData({
      legalchecked: event.detail
    });
  },
  //文章详情接口
  agreement() {
    t.request({
      url: e.user.agreement + "?type=user_agreement",
      // data: { article_id: id },
      success: res => {
        var str = res.data.content.replace(/\<img/gi, '<img style="display: block; width: 100%;height: auto;margin:20px 0px;"');
        this.setData({
          mes_content: str,
        })
      }
    })
  },
  legalClose() {
    this.setData({
      legal_show: false
    });
  },
  go_legal_show() {
    this.setData({
      legal_show: true
    });
  },
  goback() {
    var that = this;
    var t = wx.getStorageSync("login_pre_page");
    var o = 0;
    (o = t.options && t.options.user_id ? t.options.user_id : t.options && t.options.scene ? t.options.scene : wx.getStorageSync("parent_id")) && 0 != o && getApp().bindParent({
      parent_id: o
    }), wx.redirectTo({
      url: "/" + t.route + "?" + getApp().utils.objectToUrlParams(t.options)
    });
    if (that.options.id == 1) {
      return (wx.redirectTo({
        url: '/pages/couponlogin/index',
      }));
    } else {
      if (that.options.id == 2) {
        return (wx.redirectTo({
          url: '/pages/luckdraw/index',
        }));
      } else {
        if (that.options.id == 3) {
          return (wx.redirectTo({
            url: '/pages/user-detail/user-detail',
          }));
        } else {
          if (that.options.id == 4) {
            return (wx.redirectTo({
              url: '/pages/integration/integration',
            }));
          } else {
            t && t.route || wx.redirectTo({
              url: "/pages/index/index"
            });
          }
        }
      }
    }
  }
});