var _api_root = "{$_api_root}",
  api = {
    default: {
      index: _api_root + "nihao1"
    },
    passport: {
      login: _api_root + "user/wechatloginminiprogram"
    },
    user: {
      user_info: _api_root + "user/wechatloginminiprogram",
      room: _api_root + "room/joinRoom"
    },
    boss: {
      transcriptAndBoos: _api_root + "transcript_boss/transcriptAndBoos"
    },
    room: {
      createRoomNumber: _api_root + "room/createRoomNumber",
      createRoom: _api_root + "room/createRoom",
    },
    team: {
      team_list: _api_root + "team_member/getlist",
      boss_list: _api_root + "transcript_boss/transcriptAndBoos"
    },
    role: {
      add_role: _api_root + "role/addrole",
      server: _api_root + "service/getlist",
      profession: _api_root + "occupation/getlist",
      role_lsit: _api_root + "role/getlist",
      talent: _api_root + "talent/getchilds"
    }
  }
module.exports = api;