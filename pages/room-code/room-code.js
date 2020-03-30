// pages/room-code/room-code.js
var api = require("../../api.js");
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    top_bar_index: 0,
    group_info_popup: false,
    team_info: "",
    team_info_popup: false,
    open_game: false,
    equip_popup: false,
    select_boss: false,
    auction_type: ["人民币", "金币"],
    auction_typeIndex: 0,
    add_equip_popup: false,
    floor_time_wap: ['5', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55', '60'],
    floor_time_pay: ['5', '6', '7', '8', '9', '10'],
    floor_time_wap_index: 5,
    floor_time_pay_index: 0,
    pat_popup: false,
    team_list: "", //团员信息  
    identity: "", //当前用户信息
    team_id: "", //团队id
    user_id: "", //当前用户id
    room_info: "", //房间信息
    boss_list: [],
    auction_equipment: "", //当前拍卖的装备的信息
    trading_list: "", //我的交易列表
    pay_setInterval: "", //点击拍卖列表的拍卖按钮
    info_setInterval: "", //点击拍卖列表的拍卖按钮
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {},
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    let user_info = wx.getStorageSync("user_info");
    this.team_list(this.options.team_id, user_info.id);
    this.team_info(this.options.team_id);

    this.setData({
      user_id: user_info.id,
      team_id: this.options.team_id,
    })
    let that = this;
    that.userTeamIdentity(that.options.team_id, user_info.id);
    that.equipment_list(this.data.top_bar_index);
    that.teamStatus();

    this.data.info_setInterval = setInterval(e=>{
      that.userTeamIdentity(that.options.team_id, user_info.id);
      that.equipment_list(that.data.top_bar_index);
      that.teamStatus();
    },5000)

    this.setData({
      info_setInterval: this.data.info_setInterval
    })
  },
  //地板金币支付 审核
  setReview(e){
    let index = e.currentTarget.dataset.index;
    let order_id = "";
    if (index=="-1"){
      order_id = this.data.floor.order_id;
    }else{
      order_id = this.data.trading_list.data[index].order_id;
    }
    app.request({
      url: api.equipment.review + "?order_id=" + order_id,
      method: "get",
      success: res => {
        wx.showModal({
          title: '提示',
          content: res.msg,
        })
        this.teamStatus();
        this.team_info(this.data.team_id,this.data.user_id);
        this.transaction();
      }
    }) 
  },

  //立即付钱
  auction_pay(e) {

    if (this.data.identity == 3) {
      wx.showModal({
        title: '提示',
        content: '还不是正式团员，不能参加拍卖',
      })
      return;
    }


    let index = e.currentTarget.dataset.index;
    let room_info = this.data.room_info;
    let trading_list = "", trading_dan="";
    let str = "";
    let dan = room_info.floorInfo.currency_type == 2 ? '元' : '金币';
    let currency_type = 1;
    if (index == "-1") {
      str = {
        team_id: this.data.team_id,
        equipment_id: 0,
        confirm_payment_id: 0,
        equipment_name: 0,
        user_id: this.data.user_id,
        price: parseFloat(room_info.floorInfo.price),
        // currency_type: room_info.floorInfo.currency_type,
        currency_type: currency_type,
        auction_log_id: 0,
      }
    } else {
      trading_list = this.data.trading_list.data[index];
      trading_dan = trading_list.currency_type == 2 ? '元' : '金币';
      str = {
        team_id: trading_list.team_id,
        equipment_id: trading_list.equipment_id,
        confirm_payment_id: trading_list.confirm_payment_id,
        equipment_name: trading_list.equipment_name,
        user_id: trading_list.user_id,
        price: parseFloat(trading_list.price),
        currency_type: trading_list.currency_type,
        auction_log_id: trading_list.auction_log_id,
      }
    }


    if (index == "-1") {
      if (currency_type == 1) {
        wx.showModal({
          title: '地板售卖',
          content: '你确定要支付' + room_info.floorInfo.price + dan + "成为地板吗？",
          success(res) {
            if (res.confirm) {
              app.request({
                url: api.payment.auction_pay,
                method: "POST",
                data: str,
                success: res => {
                  // console.log(res);
                }
              })
            } else if (res.cancel) {
              // console.log('用户点击取消')
            }
          }
        })
      } else {
        wx.showModal({
          title: '地板售卖',
          content: '你确定要支付' + room_info.floorInfo.price + dan + "成为地板吗？",
          success(res) {
            if (res.confirm) {
              app.request({
                url: api.payment.auction_pay,
                method: "POST",
                data: str,
                success: res => {
                  // console.log(res);
                }
              })
            } else if (res.cancel) {
              // console.log('用户点击取消')
            }
          }
        })
      }

    } else {
      app.request({
        url: api.payment.auction_pay,
        method: "POST",
        data: str,
        success: res => {
          // console.log(res);
          let text = "";
          if(res.code==0){
            text = '你成功支付' + parseFloat(trading_list.price) + trading_dan;
          }else{
            text = res.msg;
          }
          wx.showModal({
            title: '提示',
            content: text
          })

        }
      })
    }


  },
  //房间信息
  set_room_info(room_id, team_id) {
    app.request({
      url: api.room.room_info + "?room_id=" + room_id + "&team_id=" + team_id,
      method: "get",
      success: res => {
        if (res.code == 0) {
          let id = res.data.transcript_id;
          var transcript_value = wx.getStorageSync("transcript" + id);
          if (transcript_value == "") {
            this.transcriptAndBoos(id);
          } else {
            this.setData({
              boss_list: transcript_value,
              transcript_id: res.data.transcript_id
            })
          }
          this.setData({
            room_info: res.data
          })
        }
      }
    })
  },
  //团信息
  team_info(team_id, user_id) {
    let that = this
    app.request({
      url: api.team.team_info + "?team_id=" + team_id,
      method: "get",
      success: res => {
        if (res.code == 0) {
          that.set_room_info(res.data.data[0].room_id, team_id);
          this.setData({
            team_info: res.data.data
          })

        }
      }
    })
  },
  //成员信息
  team_list(team_id, user_id) {
    app.request({
      url: api.team.team_list + "?team_id=" + team_id + "&user_id=" + user_id,
      method: "get",
      success: res => {
        this.setData({
          team_list: res.data,
          team_list_li: res.list
        })
      }
    })
  },
  //当前用户的身份
  userTeamIdentity(team_id, user_id) {
    app.request({
      url: api.team.userTeamIdentity,
      method: "POST",
      data: {
        team_id: team_id,
        user_id: user_id
      },
      success: res => {
        if (res.code == 0) {
          this.setData({
            identity: res.data.identity
          })
        }
      }
    })
  },
  //解散团队
  teamLeaderDissolutionTeam() {
    let that = this;
    wx.showModal({
      title: '提示',
      content: '你是否要解散团队？',
      success(res) {
        if (res.confirm) {
          app.request({
            url: api.team.teamLeaderDissolutionTeam,
            method: "POST",
            data: {
              team_id: that.data.team_id,
              user_id: that.data.user_id
            },
            success: res => {
              // console.log(res);
              if (res.code == 0) {
                wx.showToast({
                  title: '解散团队成功',
                  icon: "none"
                });
                wx.switchTab({
                  url: '/pages/index/index'
                })
              } else {
                wx.showToast({
                  title: res.msg,
                  icon: "none"
                });
              }
            }
          })
        } else if (res.cancel) {
          // console.log('用户点击取消')
        }
      }
    })
  },
  //将成员踢出团队
  removeTeamMember(e) {
    let index_t = e.currentTarget.dataset.index_t;
    let index = e.currentTarget.dataset.index;
    let team_list = this.data.team_list;
    let that = this;
    wx.showModal({
      title: '提示',
      content: '你确定要踢出这个成员吗？',
      success(res) {
        if (res.confirm) {
          app.request({
            url: api.team.userQuitTeam,
            method: "POST",
            data: {
              team_id: that.data.team_id,
              user_leader_id: that.data.user_id,
              user_id: team_list[index_t].list[index].user_id,
            },
            success: res => {
              // console.log(res);
              if (res.code == 0) {
                wx.showToast({
                  title: '踢出成功',
                  icon: "none"
                });
                team_list[index_t].list.splice(index, 1);
                that.setData({
                  team_list: team_list
                })
              }
            }
          })
        } else if (res.cancel) {
          // console.log('用户点击取消')
        }
      }
    })


  },
  //用户退出团
  userQuitTeam() {
    app.request({
      url: api.team.userQuitTeam,
      method: "POST",
      data: {
        team_id: this.data.team_id,
        user_id: this.data.user_id
      },
      success: res => {
        if (res.code == 0) {
          wx.showToast({
            title: '退出成功',
            icon: "none"
          });

          wx.switchTab({
            url: '/pages/index/index'
          })
        }
      }
    })
  },
  //审核成员
  checkTeamMember(e) {
    let that = this;
    let id = e.currentTarget.dataset.id;
    let index_t = e.currentTarget.dataset.index_t;
    let index = e.currentTarget.dataset.index;
    let team_list = this.data.team_list;
    let str = {
      team_id: this.data.team_id,
      user_leader_id: this.data.user_id,
      user_id: team_list[index_t].list[index].user_id,
      check_status: id,
    }

    app.request({
      url: api.team.checkTeamMember,
      method: "POST",
      data: str,
      success: res => {
        if (res.code == 0) {
          wx.showToast({
            title: res.msg,
            icon: "none"
          });
          if (id == 1) {
            team_list[index_t].list[index].identity = 2

          } else {
            team_list[index_t].list.splice(index, 1)
          }
          that.setData({
            team_list: team_list
          })
        }
      }
    })
  },
  //副本列表 / boss / 装备
  transcriptAndBoos(id) {
    app.request({
      url: api.boss.transcriptAndBoos,
      method: "POST",
      data: {
        parent_id: id
      },
      success: res => {
        res.forEach(e => {
          e.equipment.forEach(ee => {
            ee.currency_type = "0",
              ee.is_select = false
          })
        })
        wx.setStorage({
          key: "transcript" + id,
          data: res
        })
        this.setData({
          boss_list: res
        })
      }

    })
  },
  //设置价格
  set_price(e) {
    let val = e.detail.value;
    let index = e.currentTarget.dataset.index;
    let b_list = this.data.boss_list;
    let b_index = this.data.boss_index;
    b_list[b_index].equipment[index].clap_price = val;
    this.setData({
      boss_list: b_list
    })
  },
  //全选设置价格
  set_check_price(e) {
    let val = e.detail.value;
    let b_list = this.data.boss_list;
    let b_index = this.data.boss_index;
    b_list[b_index].equipment.forEach(e => {
      if (e.is_select) {
        e.clap_price = val
      }
    })
    this.setData({
      boss_list: b_list
    })
  },
  //选择装备
  set_select_equip(e) {
    let index = e.currentTarget.dataset.index;
    let b_list = this.data.boss_list;
    let b_index = this.data.boss_index;
    let b_check = this.data.check_all;
    let is_check = false;
    let current_li = b_list[b_index].equipment[index];
    if (index == "-1") {
      if (b_check) {
        is_check = false
      } else {
        is_check = true
      }
      b_list[b_index].equipment = b_list[b_index].equipment.map(e => {
        e.is_select = is_check;
        return e
      })

    } else {
      if (current_li.is_select) {
        current_li.is_select = false
      } else {
        current_li.is_select = true
      }
    }
    this.setData({
      boss_list: b_list,
      check_all: is_check
    })
  },
  //选择装备起拍类型
  auction_typeChange(e) {
    let index = e.currentTarget.dataset.index;
    let val = e.detail.value;
    let b_list = this.data.boss_list;
    let b_index = this.data.boss_index;

    if (index == "-1") {
      b_list[b_index].equipment = b_list[b_index].equipment.map(e => {
        if (e.is_select) {
          e.currency_type = val;
        }
        return e
      })
    } else {
      b_list[b_index].equipment[index].currency_type = val;
    }
    this.setData({
      auction_typeIndex: val,
      boss_list: b_list
    })
  },

  skip(e) {
    var url = e.currentTarget.dataset.url
    wx.navigateTo({
      url: url
    })
  },
  close_pat_popup() {
    let that = this;
    clearInterval(this.data.pay_setInterval);
    this.setData({
      pat_popup: false,
    })
  },
  //我的交易
  transaction() {
    app.request({
      url: api.equipment.transaction,
      method: "post",
      data: {
        team_id: this.data.team_id,
        user_id: this.data.user_id
      },
      success: res => {
        // console.log(res);
        if (res.code == 0) {
          this.setData({
            trading_list: res.data
          })
        }
      }
    })
  },


  //点击立即参加拍卖
  add_auction() {
    let str = {
      team_id: this.data.team_id,
      user_id: this.data.user_id,
      auction_equipment_id: this.data.auction_equipment.id,
      equipment_id: this.data.auction_equipment.equipment_id,
      equipment_name: this.data.auction_equipment.equipment_name,
      currency_type: this.data.auction_equipment.currency_type,
      price: this.data.now_pat_price,
    }
    app.request({
      url: api.equipment.add_auction,
      method: "POST",
      data: str,
      success: res => {
        // console.log(res, "点击立即参加拍卖");
        if (res.code == 0) {
          this.auction_equip();
          wx.showToast({
            title: '成功',
            icon: 'none',
          })
        } else {
          wx.showModal({
            title: '提示',
            content: res.msg
          })
        }
      }
    })
  },

  //点击列表拍卖
  set_pat_popup(e) {
    if (this.data.identity == 3) {
      wx.showModal({
        title: '提示',
        content: '还不是正式团员，不能参加拍卖',
      })
      return;
    }
    let that = this;

    this.data.pay_setInterval = setInterval(e=>{
      that.auction_equip();
    },3000)


    let index = e.currentTarget.dataset.index;
    let auction_equip = this.data.equip_list[index];
    this.setData({
      pat_popup: true,
      auction_equipment: auction_equip,
      pay_setInterval: this.data.pay_setInterval
    })
    this.auction_equip();
  },
  //参加拍卖填写金额
  pat_price(e) {
    this.setData({
      now_pat_price: e.detail.value
    })
  },
  //拍卖装备详情倒数时间结束
  set_equip_finish() {
    if (this.data.pat_popup) {
      wx.showModal({
        title: '提示',
        content: '当前装备拍卖已结束',
      })
    }
  },
  //参加拍卖详情接口
  auction_equip() {
    app.request({
      url: api.equipment.auction_equip,
      method: "POST",
      data: {
        team_id: this.data.team_id,
        auction_equipment_id: this.data.auction_equipment.id
      },
      success: res => {
        // console.log(res, "参加拍卖详情接口");
        if (res.code == 0) {
          this.setData({
            now_equip_info: res.data.data
          })
        }
      }
    })
  },
  //填写拍卖装备每次加价的金额
  equipIpunt(e) {
    let val = e.detail.value;
    this.setData({
      equip_val: val
    })
  },
  //确定拍卖时间和拍卖时间、支付时间
  set_eqiop_btn() {
    if (!this.data.equip_val || this.data.equip_val.length == 0) {
      wx.showToast({
        title: '请添加每次加价不少于多少钱',
        icon: 'none',
      })
      return;
    }
    let b_list = this.data.boss_list;
    let b_index = this.data.boss_index;
    let now_arr = this.data.now_arr_equip;
    let equipment_id = '',
      equipment_name = "",
      currency_type = "",
      arr_submit_data = [];
    now_arr.forEach(e => {
      let currency_type = e.currency_type;
      if (currency_type == "0") {
        currency_type = "2"
      }
      arr_submit_data.push({
        team_id: this.data.team_id,
        boss_id: b_list[b_index].id,
        finsih_after_time: this.data.floor_time_wap[this.data.floor_time_wap_index],
        pay_after_time: this.data.floor_time_pay[this.data.floor_time_pay_index],
        equipment_id: e.id,
        equipment_name: e.equipmentChineseName,
        price: e.clap_price,
        add_price: this.data.equip_val,
        currency_type: currency_type
      });
    })

    app.request({
      url: api.equipment.addequipment,
      method: "POST",
      data: arr_submit_data,
      success: res => {
        if (res.code == 0) {
          wx.showModal({
            title: '提示',
            content: '设置成功',
            success(res) {}
          })

          b_list[b_index].equipment.map(e => {
            e.is_select = false;
            return e;
          })

          wx.setStorage({
            key: "transcript" + this.data.transcript_id,
            data: b_list
          })
          this.setData({
            equip_popup: false,
            add_equip_popup: false
          })
          this.equipment_list(this.data.top_bar_index);
        }
      }
    })
  },

  //正在拍卖列表/交易/流拍
  equipment_list(type) {
    app.request({
      url: api.equipment.getlist,
      method: "POST",
      data: {
        team_id: this.data.team_id,
        type: type
      },
      success: res => {

        this.setData({
          equip_list: res.data.data
        })
        // console.log(this.data.equip_list);
      }
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

  //批量添加装备
  add_equip() {
    let b_list = this.data.boss_list;
    let b_index = this.data.boss_index;
    let now_arr = b_list[b_index].equipment.filter(e => {
      return e.is_select;
    })
    if (now_arr.length == 0) {
      wx.showModal({
        title: '提示',
        content: '请选择你要添加的装备',
        success(res) {}
      })
      return;
    }
    let isPrice = true;
    now_arr.forEach(e => {
      if (e.clap_price == "0" || !e.clap_price) {
        isPrice = false;
      }
    })
    if (isPrice) {
      this.setData({
        add_equip_popup: true,
        boss_list: b_list,
        now_arr_equip: now_arr
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '选择的装备要填写的价格不能低于等于0',
        success(res) {}
      })
    }
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
  set_select_boss(e) {
    let index = e.currentTarget.dataset.index;
    this.setData({
      boss_index: index,
      select_boss: true
    })
  },

  //开始副本
  open_game() {
    app.request({
      url: api.team.startTeam,
      method: "post",
      data: {
        team_id: this.data.team_id,
        user_id: this.data.user_id
      },
      success: res => {
        wx.showToast({
          title: '开启副本成功',
          icon: 'none',
        })
        this.teamStatus();
      }
    })
  },
  //轮询信息已经开启
  teamStatus() {
    let that = this;
    app.request({
      url: api.team.teamStatus,
      method: "post",
      data: {
        team_id: this.data.team_id,
        user_id: this.data.user_id
      },
      success: res => {
        if (res.code == 0) {
          if (res.data.teamMemberInfo.is_del==2){
            clearInterval(that.data.info_setInterval);
            wx.showModal({
              title: '提示',
              content: '你已被团长踢出！',
              showCancel: false,
              success(res) {
                wx.switchTab({
                  url: "/pages/index/index"
                })
                
              }
            })
            
          }


          // if (res.data.distributionInfo==1){
          //   clearInterval(that.data.info_setInterval);
          //   wx.showModal({
          //     title: '提示',
          //     content: '团长已分账，请前往分账页面查看。',
          //     showCancel:false,
          //     success(res) {
          //       wx.navigateTo({
          //         url: "/pages/account-team/account-team"
          //       })
          //     }
          //   })
          // }
          

          this.setData({
            teamInfo: res.data.teamInfo,
            floor: res.data.floor,
          })
        }
      }
    })
  },
  //拍卖导航切换
  sw_bar(e) {
    let index = e.currentTarget.dataset.index;
    this.setData({
      equip_list: '',
      trading_list: '',
      top_bar_index: index
    })
    if(index==3){
      this.transaction();
    }else{
      this.equipment_list(index);
    }
  },
  //关闭和打开成员详情
  team_popup() {
    this.setData({
      team_info_popup: true
    })
  },
  //关闭成员信息
  close_team_popup() {
    this.team_list(this.data.team_id,this.data.user_id);
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
  copyBtn: function(e) {
    var that = this;
    wx.setClipboardData({
      //去找上面的数据
      data: this.data.room_info.room_num,
      success: function(res) {
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
  onReady: function() {

  },


  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    clearInterval(this.data.info_setInterval);
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    clearInterval(this.data.info_setInterval);
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    this.userTeamIdentity(this.data.team_id, this.data.user_id);
    this.equipment_list(this.data.top_bar_index);
    this.teamStatus();
    this.transaction();
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