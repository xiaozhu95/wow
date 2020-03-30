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
      room: _api_root + "room/joinRoom",
      addQusetion: _api_root + "user_question/addQusetion",
      wxappInfo: _api_root + "user/wxappInfo",
      sms: _api_root + "sms/sms",
      smsLogin: _api_root + "sms/smsLogin"
    },
    boss: {
      transcriptAndBoos: _api_root + "transcript_boss/transcriptAndBoos"
    },
    room: {
      createRoomNumber: _api_root + "room/createRoomNumber",
      createRoom: _api_root + "room/createRoom",
      checkUserRoomExit: _api_root + "room/checkUserRoomExit",
      room_info: _api_root + "room/getlist",
      room_detail: _api_root + "room/getlist",
      member: _api_root + "team_member/getTeamMemberInfo",
      allowance: _api_root + "room/calculationUserSubsidy",
      distribution: _api_root + "room/confirmDistribution"
    },
    team: {
      startTeam: _api_root + "team/startTeam",
      team_info: _api_root + "team/getlist",
      team_list: _api_root + "team_member/getlist",
      boss_list: _api_root + "transcript_boss/transcriptAndBoos",
      userTeamIdentity: _api_root + "team_member/userTeamIdentity",
      checkTeamMember: _api_root + "team_member/checkTeamMember",
      userQuitTeam: _api_root + "team_member/userQuitTeam",
      teamLeaderDissolutionTeam: _api_root + "team_member/teamLeaderDissolutionTeam",
      teamStatus: _api_root + "team_member/ajaxPullTeamStatusAndUserStatus",
      removeTeamMember: _api_root + "team_member/removeTeamMember",
    },
    role: {
      add_role: _api_root + "role/addrole",
      server: _api_root + "service/getlist",
      profession: _api_root + "occupation/getlist",
      role_lsit: _api_root + "role/getlist",
      talent: _api_root + "talent/getchilds"
    },
    payment: {
      pay: _api_root + "pay_log/add",
      auction_pay: _api_root + "auction_pay/pay",
    },
    equipment: {
      addequipment: _api_root + "auction_equipment/addequipment",
      getlist: _api_root + "auction_equipment/getlist",
      auction_equip: _api_root + "auction_log/getlist",
      add_auction: _api_root + "auction_log/addauction",
      transaction: _api_root + "auction_equipment/transaction",
      review: _api_root + "user_money_log/review",
    },
    account: {
      team_account: _api_root + "team_member/userTeamInfo",
      account_detail: _api_root + "distribution/getDistributionDetail",
      startVote: _api_root + "distribution/startVote"
    }
  }
module.exports = api;