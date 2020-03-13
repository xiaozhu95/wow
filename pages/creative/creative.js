//index.js
//获取应用实例
//const app = getApp();

Page({
  data: {
    multiArray: [
      ['狮心', '范克瑞斯', '雷德', '希尔盖', '萨弗拉斯', '水晶之牙', '毁灭之刃'],
      ['部落', '联盟']
    ],
    checkpoint: ["玛瑟里顿的巢穴", "格鲁尔的巢穴", "毒蛇神殿", "风暴要塞", "海加尔山", "黑暗神庙"],
    multiIndex: [-1,-1],
    checkpointIndex:[-1],
    popupshow: false,
    subsidyList: [{
        "selected": false,
        "title": "指挥"
      },
      {
        "selected": false,
        "title": "MT"
      },
      {
        "selected": false,
        "title": "FT"
      },
      {
        "selected": false,
        "title": "DPS1st"
      },
      {
        "selected": false,
        "title": "DPS2st"
      }, {
        "selected": false,
        "title": "HPS1st"
      }, {
        "selected": false,
        "title": "HPS2st"
      }, {
        "selected": false,
        "title": "HPS3st"
      }
    ],
    subsidyWay: 1,
    iSSubsidy: "",
    way: [{
        type: 1,
        value: '人民币',
        checked: 'true'
      },
      {
        type: 2,
        value: '百分比'
      }
    ],
    output: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
    DPSIndex: 0,
    HPSIndex: 0,
    floor: [{
        type: 1,
        value: '否',
        checked: true
      },
      {
        type: 2,
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
    floorEquipNum: 1,
    equip_popup: false,
    boss:[
      {
        "name":"不洁者海根",
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
    boss_equip: [
      {
        "name": "破冰头盔",
        "yname": "Icebane Helmet",
        "grade":56,
        "type":"板甲"
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
    select_boss:false,
    auction_type:["人民币","金币"],
    auction_typeIndex:0
  },
  onLoad: function (options) {
  
  },
  //确定房间创建
  confirm_Start(){
    wx.redirectTo({
      url: '/pages/room-code/room-code'
    });
  },


  //选择boss
  set_select_boss(){
    this.setData({
      select_boss:true
    })
  },
  //确定装备起拍价格
  set_boss_equip_btn(){
    this.setData({
      select_boss: false
    })
  },
  //选择boss装备起拍价
  equip_boss_Start(){
    this.setData({
      equip_popup: true
    })
  },
  //关闭boss装备起拍价
  close_boss_popup(){
    this.setData({
      equip_popup:false,
      select_boss: false
    })
  },

  //确定补贴
  determine_subsidy() {
    let item = this.data.subsidyList;
    let num = item.filter(str => {
      if (str.selected) {
        return str.val && str.val.length > 0;
      }
    })
    if (num.length == this.data.iSSubsidy.length) {
      this.setData({
        popupshow: false
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '请输入完成的补贴方式',
        success(res) {
          if (res.confirm) {
            // console.log('用户点击确定')
          } else if (res.cancel) {
            // console.log('用户点击取消')
          }
        }
      })
    }
    // console.log(num);
  },

  // 添加补贴
  addSubsidy() {
    this.setData({
      popupshow: true
    })
  },
  selected_subsidy(e) {
    let index = e.currentTarget.dataset.index;
    let item = this.data.subsidyList;
    if (item[index].selected) {
      item[index].selected = false;
    } else {
      item[index].selected = true;
    }
    let num = item.filter(str => {
      return str.selected == true;
    })
    // console.log(num);
    this.setData({
      subsidyList: item,
      iSSubsidy: num
    })
  },
  setSubsidy(e) {
    let index = e.currentTarget.dataset.index;
    let value = e.detail.value;
    this.data.subsidyList[index].val = value
    this.setData({
      subsidyList: this.data.subsidyList
    })
  },

  radioChange: function(e) {
    // console.log('radio发生change事件，携带value值为：', e.detail.value);
    this.setData({
      subsidyWay: e.detail.value
    })
  },
  close() {
    let item = this.data.subsidyList;
    let arr = item.map(str => {
      if (str.selected == true) {
        str.selected = false;
        str.val = "";
      }
      return str;
    })
    this.setData({
      subsidyList: arr,
      popupshow: false
    })
  },
  // 选择服务器和阵营
  bindMultiPickerChange: function(e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex: e.detail.value
    })
  },
  bindMultiPickerColumnChange(e) {
    // console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
  },
  //副本的选择
  checkpointChange(e){
    this.setData({
      checkpointIndex: e.detail.value
    })
  },
  //选择虚高第几名
  outputChange(e) {
    let id = e.currentTarget.dataset.id;
    if (id == "DPS") {
      this.setData({
        DPSIndex: e.detail.value
      })
    } else {
      this.setData({
        HPSIndex: e.detail.value
      })
    }
  },
  //选择起拍类型
  auction_typeChange(e){
    this.setData({
      auction_typeIndex: e.detail.value
    })
  },
  //选择地板
  floorChange(e) {
    this.setData({
      floorNum: e.detail.value
    })
  },
  floorEquipcheckbox(e) {
    this.setData({
      floorEquipNum: e.detail.value
    })
    // console.log(e)
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
  }
});