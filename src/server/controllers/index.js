"use strict";
const _0x62cd03 = _0x3795;
(function (_0x44e43b, _0x40a86c) {
  const _0x275b0b = _0x3795,
    _0x57b267 = _0x44e43b();
  while (!![]) {
    try {
      const _0x53961f =
        -parseInt(_0x275b0b(0x199)) / 0x1 +
        parseInt(_0x275b0b(0x18f)) / 0x2 +
        (parseInt(_0x275b0b(0x1a3)) / 0x3) *
          (parseInt(_0x275b0b(0x198)) / 0x4) +
        (-parseInt(_0x275b0b(0x18d)) / 0x5) *
          (-parseInt(_0x275b0b(0x19d)) / 0x6) +
        parseInt(_0x275b0b(0x194)) / 0x7 +
        -parseInt(_0x275b0b(0x19b)) / 0x8 +
        (parseInt(_0x275b0b(0x1a2)) / 0x9) * (parseInt(_0x275b0b(0x1a9)) / 0xa);
      if (_0x53961f === _0x40a86c) break;
      else _0x57b267["push"](_0x57b267["shift"]());
    } catch (_0x56d87d) {
      _0x57b267["push"](_0x57b267["shift"]());
    }
  }
})(_0x5d8a, 0xe1e85);
function _0x3795(_0x13fdd5, _0x333143) {
  const _0x5d8a91 = _0x5d8a();
  return (
    (_0x3795 = function (_0x37953d, _0x361548) {
      _0x37953d = _0x37953d - 0x18c;
      let _0x207029 = _0x5d8a91[_0x37953d];
      return _0x207029;
    }),
    _0x3795(_0x13fdd5, _0x333143)
  );
}
function _0x5d8a() {
  const _0xdda097 = [
    "processing",
    "2721888pkYgfW",
    "message",
    "141780TaDpPi",
    "end",
    "sendListMessage",
    "Check\x20your\x20parameterr",
    "status",
    "23211xKBEXA",
    "9183QrrnTw",
    "Check\x20your\x20whatsapp\x20connection",
    "sendButtonMessage",
    "body",
    "sendPollMessage",
    "../whatsapp",
    "1570DSzRzP",
    "Check\x20your\x20parameter",
    "../lib/helper",
    "85DFrzJa",
    "deleteCredentials",
    "106316fSkByr",
    "connectToWhatsApp",
    "parse",
    "Token\x20needed",
    "sendText",
    "9215759ClFvwQ",
    "Processing",
    "send",
    "Check\x20your\x20parameterrs",
    "1188guAlLH",
    "1819872tRUfzj",
  ];
  _0x5d8a = function () {
    return _0xdda097;
  };
  return _0x5d8a();
}
const { formatReceipt } = require(_0x62cd03(0x18c)),
  wa = require(_0x62cd03(0x1a8)),
  createInstance = async (_0x55e349, _0x482326) => {
    const _0x356c95 = _0x62cd03,
      { token: _0x45082b } = _0x55e349["body"];
    if (_0x45082b)
      try {
        const _0x2e1bb8 = await wa[_0x356c95(0x190)](
            _0x45082b,
            _0x55e349["io"]
          ),
          _0x3d19b2 = _0x2e1bb8?.[_0x356c95(0x1a1)],
          _0x2ac49f = _0x2e1bb8?.[_0x356c95(0x19c)];
        return _0x482326[_0x356c95(0x196)]({
          status: _0x3d19b2 ?? _0x356c95(0x19a),
          qrcode: _0x2e1bb8?.["qrcode"],
          message: _0x2ac49f ? _0x2ac49f : _0x356c95(0x195),
        });
      } catch (_0x2a879e) {
        return (
          console["log"](_0x2a879e),
          _0x482326[_0x356c95(0x196)]({ status: ![], error: _0x2a879e })
        );
      }
    _0x482326[_0x356c95(0x1a1)](0x193)[_0x356c95(0x19e)](_0x356c95(0x192));
  },
  sendText = async (_0x3a55f0, _0x5c7cfd) => {
    const _0x4fa532 = _0x62cd03,
      {
        token: _0x52ff70,
        number: _0x597364,
        text: _0x230f2f,
      } = _0x3a55f0[_0x4fa532(0x1a6)];
    if (_0x52ff70 && _0x597364 && _0x230f2f) {
      const _0x2bcd2a = await wa[_0x4fa532(0x193)](
        _0x52ff70,
        _0x597364,
        _0x230f2f
      );
      return handleResponSendMessage(_0x2bcd2a, _0x5c7cfd);
    }
    _0x5c7cfd[_0x4fa532(0x196)]({ status: ![], message: _0x4fa532(0x1aa) });
  },
  sendMedia = async (_0x8e3db0, _0x4c0cbc) => {
    const _0x349035 = _0x62cd03,
      {
        token: _0x54f1e6,
        number: _0x55537c,
        type: _0x162986,
        url: _0xe1c3fc,
        caption: _0xebe061,
        ptt: _0x3d32ef,
        filename: _0x66c77,
      } = _0x8e3db0[_0x349035(0x1a6)];
    if (_0x54f1e6 && _0x55537c && _0x162986 && _0xe1c3fc) {
      const _0x597a0f = await wa["sendMedia"](
        _0x54f1e6,
        _0x55537c,
        _0x162986,
        _0xe1c3fc,
        _0xebe061 ?? "",
        _0x3d32ef,
        _0x66c77
      );
      return handleResponSendMessage(_0x597a0f, _0x4c0cbc);
    }
    _0x4c0cbc[_0x349035(0x196)]({ status: ![], message: _0x349035(0x1aa) });
  },
  sendButtonMessage = async (_0x5dcf40, _0x554ed0) => {
    const _0x5e21a1 = _0x62cd03,
      {
        token: _0x570dcb,
        number: _0x175ac0,
        button: _0x63e3b1,
        message: _0x3b336e,
        footer: _0x521385,
        image: _0x67edc6,
      } = _0x5dcf40[_0x5e21a1(0x1a6)],
      _0x35e2e3 = JSON["parse"](_0x63e3b1);
    if (_0x570dcb && _0x175ac0 && _0x63e3b1 && _0x3b336e) {
      const _0x4ecd0c = await wa[_0x5e21a1(0x1a5)](
        _0x570dcb,
        _0x175ac0,
        _0x35e2e3,
        _0x3b336e,
        _0x521385,
        _0x67edc6
      );
      return handleResponSendMessage(_0x4ecd0c, _0x554ed0);
    }
    _0x554ed0[_0x5e21a1(0x196)]({
      status: ![],
      message: "Check\x20your\x20parameterr",
    });
  },
  sendTemplateMessage = async (_0x3b6068, _0x8a3ef5) => {
    const _0x247714 = _0x62cd03,
      {
        token: _0x2a3d6b,
        number: _0x2c0928,
        button: _0x4dc3b9,
        text: _0x486852,
        footer: _0x28d871,
        image: _0x3b43a9,
      } = _0x3b6068[_0x247714(0x1a6)];
    if (_0x2a3d6b && _0x2c0928 && _0x4dc3b9 && _0x486852 && _0x28d871) {
      const _0x2b34ac = await wa["sendTemplateMessage"](
        _0x2a3d6b,
        _0x2c0928,
        JSON["parse"](_0x4dc3b9),
        _0x486852,
        _0x28d871,
        _0x3b43a9
      );
      return handleResponSendMessage(_0x2b34ac, _0x8a3ef5);
    }
    _0x8a3ef5[_0x247714(0x196)]({ status: ![], message: _0x247714(0x1aa) });
  },
  sendListMessage = async (_0x361dfc, _0x1b57db) => {
    const _0x299b6a = _0x62cd03,
      {
        token: _0x5f2e0b,
        number: _0xd34ab9,
        list: _0x4cc6e0,
        text: _0x79eab9,
        footer: _0x14b82a,
        title: _0x19f52c,
        buttonText: _0x404178,
      } = _0x361dfc[_0x299b6a(0x1a6)];
    if (
      _0x5f2e0b &&
      _0xd34ab9 &&
      _0x4cc6e0 &&
      _0x79eab9 &&
      _0x19f52c &&
      _0x404178
    ) {
      const _0x3935b4 = await wa[_0x299b6a(0x19f)](
        _0x5f2e0b,
        _0xd34ab9,
        JSON[_0x299b6a(0x191)](_0x4cc6e0),
        _0x79eab9,
        _0x14b82a ?? "",
        _0x19f52c,
        _0x404178
      );
      return handleResponSendMessage(_0x3935b4, _0x1b57db);
    }
    _0x1b57db["send"]({ status: ![], message: _0x299b6a(0x1a0) });
  },
  sendPoll = async (_0x1c4bb0, _0x1e0341) => {
    const _0x4d7010 = _0x62cd03,
      {
        token: _0xc0af6e,
        number: _0x19a127,
        name: _0x397412,
        options: _0xb8541b,
        countable: _0x225ec9,
      } = _0x1c4bb0["body"];
    if (_0xc0af6e && _0x19a127 && _0x397412 && _0xb8541b && _0x225ec9) {
      const _0x42e0f0 = await wa[_0x4d7010(0x1a7)](
        _0xc0af6e,
        _0x19a127,
        _0x397412,
        JSON[_0x4d7010(0x191)](_0xb8541b),
        _0x225ec9
      );
      return handleResponSendMessage(_0x42e0f0, _0x1e0341);
    }
    _0x1e0341[_0x4d7010(0x196)]({ status: ![], message: _0x4d7010(0x197) });
  },
  fetchGroups = async (_0x1be587, _0x67bff5) => {
    const _0x5463e8 = _0x62cd03,
      { token: _0x97d709 } = _0x1be587["body"];
    if (_0x97d709) {
      const _0x43ce9e = await wa["fetchGroups"](_0x97d709);
      return handleResponSendMessage(_0x43ce9e, _0x67bff5);
    }
    _0x67bff5["send"]({ status: ![], message: _0x5463e8(0x1aa) });
  },
  deleteCredentials = async (_0x340461, _0x16fda2) => {
    const _0x1dbd9a = _0x62cd03,
      { token: _0x27239c } = _0x340461["body"];
    if (_0x27239c) {
      const _0x3cb615 = await wa[_0x1dbd9a(0x18e)](_0x27239c);
      return handleResponSendMessage(_0x3cb615, _0x16fda2);
    }
    _0x16fda2[_0x1dbd9a(0x196)]({ status: ![], message: _0x1dbd9a(0x1aa) });
  },
  handleResponSendMessage = (_0x250593, _0x431abf, _0x22c446 = null) => {
    const _0xe2d4b2 = _0x62cd03;
    if (_0x250593) return _0x431abf["send"]({ status: !![], data: _0x250593 },200);
    return _0x431abf[_0xe2d4b2(0x196)]({
      status: ![],
      message: _0xe2d4b2(0x1a4),
    },400);
  },
  checkNumber = async (_0x193c18, _0x2e38eb) => {
    const _0x4f8301 = _0x62cd03,
      { token: _0x320086, number: _0x51b711 } = _0x193c18[_0x4f8301(0x1a6)];
    if (_0x320086 && _0x51b711) {
      const _0x37a7d9 = await wa["isExist"](_0x320086, _0x51b711);
      return (
        console["log"](_0x37a7d9),
        _0x2e38eb[_0x4f8301(0x196)]({ status: !![], active: _0x37a7d9 })
      );
    }
    _0x2e38eb[_0x4f8301(0x196)]({ status: ![], message: _0x4f8301(0x1aa) });
  },
  logoutDevice = async (_0x1b9985, _0x23b016) => {
    const _0x382f35 = _0x62cd03,
      { token: _0x143ce5 } = _0x1b9985[_0x382f35(0x1a6)];
    if (_0x143ce5) {
      const _0x410b97 = await wa["deleteCredentials"](_0x143ce5);
      return _0x23b016["send"](_0x410b97);
    }
    return _0x23b016[_0x382f35(0x196)]({
      status: ![],
      message: _0x382f35(0x1aa),
    });
  };
module["exports"] = {
  createInstance: createInstance,
  sendText: sendText,
  sendMedia: sendMedia,
  sendButtonMessage: sendButtonMessage,
  sendTemplateMessage: sendTemplateMessage,
  sendListMessage: sendListMessage,
  deleteCredentials: deleteCredentials,
  fetchGroups: fetchGroups,
  sendPoll: sendPoll,
  logoutDevice: logoutDevice,
  checkNumber: checkNumber,
};
