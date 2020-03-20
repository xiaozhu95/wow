var _api_root = "{$_api_root}",
  api = {
    default: {
      index: _api_root + "nihao1"
    },
    passport: {
      login: _api_root + "user/wechatloginminiprogram"
    },
    user: {
      user_info: _api_root + "user/wechatloginminiprogram"
    },
    boss: {
      transcriptAndBoos: _api_root + "transcript_boss/transcriptAndBoos"
    },
    room:{
      createRoomNumber: _api_root + "room/createRoomNumber",
      createRoom: _api_root + "room/createRoom",
    }
  }
module.exports = api;