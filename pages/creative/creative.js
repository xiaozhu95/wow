var api = require("../../api.js");
var app = getApp();
Page({
  data: {
    transcript: "",
    transcriptText: {
      id: -1,
      name: "选择副本"
    },
    transcript_popup: false,
    subsidies_type: [{
        type: 1,
        value: '人民币',
        checked: 'true'
      },
      {
        type: 2,
        value: '金币'
      }
    ],
    subsidies_index: 1,
    allot_type: [{
        type: 1,
        value: '百分比',

      },
      {
        type: 2,
        value: '固定',
        checked: 'true'
      }
    ],
    allot_index: 2,
    popupshow: false,
    subsidy_data: [{
        "name": "指挥",
        "list": [{
          "name": "指挥",
          "value": ""
        }]
      },
      {
        "name": "T",
        "list": [{
            "name": "MT",
            "value": ""
          }, {
            "name": "FT",
            "value": ""
          }, {
            "name": "火炕",
            "value": ""
          },
          {
            "name": "酱油",
            "value": ""
          }
        ]
      }, {
        "name": "HPS",
        "list": [{
          "name": "1st",
          "value": ""
        }, {
          "name": "2st",
          "value": ""
        }, {
          "name": "3st",
          "value": ""
        }]
      }, {
        "name": "DPS",
        "list": [{
          "name": "1st",
          "value": ""
        }, {
          "name": "2st",
          "value": ""
        }, {
          "name": "3st",
          "value": ""
        }]
      }, {
        "name": "奶",
        "list": [{
          "name": "奶",
          "value": ""
        }]
      }, {
        "name": "其他",
        "list": [{
          "name": "驱散",
          "value": ""
        }, {
          "name": "灭火",
          "value": ""
        }]
      }, {
        "name": "惩罚",
        "list": [{
          "name": "惩罚",
          "value": ""
        }]
      }
    ],
    output: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
    high_dps: {
      key: 1,
      value: "0"
    },
    high_hps: {
      key: 1,
      value: "0"
    },
    floor_time_wap: ['5', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55', '60'],
    floor_time_pay: ['5', '6', '7', '8', '9', '10'],
    floor_time_wap_index: 5,
    floor_time_pay_index: 0,
    floor: [{
        type: 2,
        value: '否',
        checked: true
      },
      {
        type: 1,
        value: '是',
        checked: false
      }
    ],
    floorNum: 1,
    floorEquip: [{
        name: 1,
        value: '紫'
      },
      {
        name: 2,
        value: '蓝'
      },
      {
        name: 3,
        value: '绿'
      }
    ],
    floorEquipNum: "",
    equip_popup: false,
    boss_list: [],
    boss_index: "", //选择当前第几个boss
    select_boss: false,
    check_all: false, //全选
    auction_type: ["人民币", "金币"],
    auction_typeIndex: 0,
    floor_popup: false,
    floor_way: [{
        type: 1,
        value: '人民币',
        checked: 'true'
      },
      {
        type: 2,
        value: '金币'
      }
    ],
    floor_info: { //起拍地板信息
      currency_type: 1, //币种，1-人民币，2-金币
      price: "", //价格
      add_price: "", //每次加价
      purple: 2, //紫 1-开启，2-不开启
      blue: 2, //蓝 1-开启，2-不开启
      green: 2, //绿 1-开启，2-不开启
      end_time: "30", //结束时间
      pay_end_time: "5", //支付时间
    },
    user_info: "", //用户信息,
    role_info:"",  //角色信息
    roomNumber: "", //房间号
    yy_room_number: "", //YY房间号
    expenditure: "",  //支出
    note:"", //团长备注
    floor_status:1,
  },
  onLoad: function(options) {
    var role_info = wx.getStorageSync("role-info");
    if (role_info){
      this.setData({
        role_info: role_info
      })
    }else{
      wx.redirectTo({
        url: '/pages/role/role'
      })
    }


    var user_info = wx.getStorageSync("user_info");
    this.setData({
      user_info: user_info
    })
    this.createRoomNumber();
    this.transcriptAndBoos(0);
  },

  //确定房间创建
  confirm_Start() {
    let current_data = this.data;

    let subsidy = {
      currency_type: this.data.subsidies_index,
      status: this.data.allot_index,
      subsidy: this.data.subsidy_data
    }

    let id = this.data.transcriptText.id;
    if (id == -1) {
      wx.showToast({
        title: '请选择副本',
        icon: 'none',
      })
      return;
    }

    let createRoomStr = {
      room_num: current_data.roomNumber, //房间号
      service_id: 1, //服务器id
      service_name: "地域世界", //服务器名称
      camp_id: 1, //阵营id
      camp_name: "部落", //阵营名称
      transcript_id: current_data.transcriptText.id, //副本id 
      transcript_name: current_data.transcriptText.name, //副本id 
      team_type: "自强", //
      equipment_score: 0, //装备评分
      subsidy: subsidy, //补贴方式
      yy_room_number: current_data.yy_room_number, //YY房间号
      expenditure: current_data.expenditure, //支出
      high_dps: current_data.high_dps, //DPS需高于第一名的百分比
      high_hps: current_data.high_hps, //HPS需高于第一名的百分比
      floor_status: current_data.floor_status, //是否开启底板，1-开启，2-不开启
      floor_info: current_data.floor_info, //底板信息 
      note: current_data.note, //底板信息 
      user_info: {
        user_id: this.data.user_info.id,
        user_role_name: this.data.role_info.role_name,
        role_id: this.data.role_info.id,
        avatar: this.data.user_info.avatar,
      }, //用户信息 
    }


    app.request({
      url: api.room.createRoom,
      method: "POST",
      data: createRoomStr,
      success: res => {
        console.log(res);
        if(res.code==0){
          wx.redirectTo({
            url: '/pages/room-code/room-code?team_id=' + res.data.team_id
          })
        }else{
          wx.showToast({
            title: res.msg,
            icon: 'none',
          })
        }
      }
    })
    // wx.redirectTo({
    //   url: '/pages/room-code/room-code'
    // });
  },
  setNote(e){
    this.setData({
      note: e.detail.value
    })
  },
  //设置yy 房间号
  set_yy(e) {
    this.setData({
      yy_room_number: e.detail.value
    })
  },
  //设置支出
  set_expenditure(e) {
    this.setData({
      expenditure: e.detail.value
    })
  },

  //补贴方式
  subsidiesChange(e) {
    let id = e.currentTarget.dataset.id;
    if (id == "0") {
      this.setData({
        subsidies_index: e.detail.value
      })
    } else if (id == "1") {
      this.setData({
        allot_index: e.detail.value
      })
    }
  },
  //设置补贴
  subsidiesInput(e) {
    let val = e.detail.value;
    let index = e.currentTarget.dataset.index;
    let idx = e.currentTarget.dataset.idx;
    this.data.subsidy_data[index].list[idx].value = val
    this.setData({
      subsidy_data: this.data.subsidy_data
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



  //副本选择
  transcriptConfirm(e) {
    console.log(e.detail.value);
    this.setData({
      transcriptText: e.detail.value,
      transcript_popup: false
    })
  },
  //副本关闭
  transcriptCancel() {
    this.setData({
      transcript_popup: false
    })
  },
  //副本打开
  set_transcript_popup() {
    this.setData({
      transcript_popup: true
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
        // console.log(res);
        if (id == 0) {
          let str = res.map(e => {
            if (e.type == "0") {
              e.disabled = true;
            }
            return e;
          })
          this.setData({
            transcript: str
          })
        } else {
          res.forEach(e => {
            e.equipment.forEach(ee => {
              ee.currency_type = 0
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
      }
    })
  },
  // 生成房间号
  createRoomNumber() {

    let user = {
      user_id: this.data.user_info.id,
      user_role_name: "地域之门",
      role_id: "1",
      avatar: this.data.user_info.avatar
    }
    app.request({
      url: api.room.createRoomNumber,
      method: "POST",
      data: {
        user_info: user
      },
      success: res => {

        if (res.code == 0) {
          console.log(res);
          this.setData({
            roomNumber: res.data.roomNumber
          })
        }
      }
    })
  },


  //设置地板
  set_floor_btn() {
    this.setData({
      floor_popup: false
    })
  },
  close_floor_btn() {
    let arr = this.data.floor.map(e => {
      if (e.type == this.data.floorNum) {
        e.checked = false;
      } else {
        e.checked = true;
      }
      return e;
    })
    console.log(arr);
    this.setData({
      floor_popup: false,
      floor: arr
    })
  },
  //选择boss
  set_select_boss(e) {
    // console.log(e.currentTarget.dataset.index);
    let index = e.currentTarget.dataset.index;
    this.setData({
      boss_index: index,
      select_boss: true
    })
  },
  //确定装备起拍价格和选择的币种
  set_boss_equip_btn() {
    wx.setStorage({
      key: "transcript" + this.data.transcriptText.id,
      data: this.data.boss_list
    })
    this.setData({
      select_boss: false
    })
  },
  //选择boss装备起拍价
  equip_boss_Start() {
    let id = this.data.transcriptText.id;
    if (id == -1) {
      wx.showToast({
        title: '请选择副本',
        icon: 'none',
      })
      return;
    }

    var transcript_value = wx.getStorageSync("transcript" + id);
    if (transcript_value == "") {
      this.transcriptAndBoos(id);
    } else {
      this.setData({
        boss_list: transcript_value
      })
    }
    this.setData({
      equip_popup: true
    })
  },


  //关闭boss装备起拍价
  close_boss_popup() {
    this.setData({
      equip_popup: false,
      select_boss: false
    })
  },

  //副本的选择
  checkpointChange(e) {
    this.setData({
      checkpointIndex: e.detail.value
    })
  },

  //选择虚高第几名
  outputChange(e) {
    let id = e.currentTarget.dataset.id;
    let DPS = this.data.high_dps;
    let HPS = this.data.high_hps;
    if (id == "DPS") {
      DPS.key = this.data.output[e.detail.value]
    } else {
      HPS.key = this.data.output[e.detail.value]
    }
    this.setData({
      high_dps: DPS,
      high_hps: HPS,
    })
  },
  //虚高多少的百分比
  outputInput(e) {
    let id = e.currentTarget.dataset.id;
    let DPS = this.data.high_dps;
    let HPS = this.data.high_hps;
    if (id == "DPS") {
      DPS.value = e.detail.value
    } else {
      HPS.value = e.detail.value
    }
    this.setData({
      high_dps: DPS,
      high_hps: HPS,
    })
  },

  //选择地板
  floorChange(e) {
    if (e.detail.value == 1) {
      this.setData({
        floor_popup: true,
      })
    }
    this.setData({
      floorNum: e.detail.value,
      note: e.detail.value
    })
  },
  //选择地板起拍币种
  floor_way_Change: function(e) {
    // console.log('radio发生change事件，携带value值为：', e.detail.value);
    let val = e.detail.value;
    let floor_way = this.data.floor_way;
    floor_way.forEach(s => {
      if (s.type == val) {
        s.checked = true
      } else {
        s.checked = false
      }
    })
    this.data.floor_info.currency_type = val;
    this.setData({
      floor_info: this.data.floor_info,
      floor_way: floor_way
    })
  },
  //设置地板起拍价格/每次加价金额
  floor_price(e) {
    let id = e.currentTarget.dataset.id;
    let val = e.detail.value;
    if (id == "0") {
      this.data.floor_info.price = val;
    } else {
      this.data.floor_info.add_price = val;
    }
    this.setData({
      floor_info: this.data.floor_info
    })
  },
  //选择地板装备颜色
  floorEquipcheckbox(e) {
    let arr = e.detail.value;
    let floorEquip = this.data.floorEquip;
    let floor_info = this.data.floor_info;
    floor_info.purple = 2;
    floor_info.blue = 2;
    floor_info.green = 2;
    floorEquip = floorEquip.map(s => {
      s.checked = false;
      return s;
    })
    arr.forEach(s => {
      floorEquip = floorEquip.map(a => {
        if (s == a.name) {
          a.checked = true;
        }
        return a;
      })

      if (s == "1") {
        floor_info.purple = 1;
      } else if (s == "2") {
        floor_info.blue = 1
      } else if (s == '3') {
        floor_info.green = 1
      }
    })


    this.setData({
      floor_info: floor_info,
      floorEquip: floorEquip
    })
  },

  //设置地板时间
  floor_time_Change(e) {
    let id = e.currentTarget.dataset.id;
    let val = e.detail.value;
    let floor_info = this.data.floor_info;
    let floor_time_wap = this.data.floor_time_wap;
    let floor_time_pay = this.data.floor_time_pay;
    if (id == "wap") {
      floor_info.end_time = floor_time_wap[val]
    } else {
      floor_info.pay_end_time = floor_time_pay[val]
    }
    this.setData({
      floor_info: floor_info
    })
  },
  handlerGobackClick(delta) {
    const pages = getCurrentPages();
    if (pages.length >= 2) {
      wx.navigateBack({
        delta: delta
      });
    } else {
      wx.switchTab({
        url: '/pages/index/index'
      });
    }
  },
  handlerGohomeClick() {
    wx.navigateTo({
      url: '/pages/index/index'
    });
  }
});