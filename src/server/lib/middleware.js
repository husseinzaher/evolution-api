const _0x5e225c = _0x18a2;
function _0x18a2(_0x254b59, _0x16ce48) {
  const _0x367667 = _0x3676();
  return (
    (_0x18a2 = function (_0x18a2aa, _0xa7abe5) {
      _0x18a2aa = _0x18a2aa - 0xb9;
      let _0x3ffdbc = _0x367667[_0x18a2aa];
      return _0x3ffdbc;
    }),
    _0x18a2(_0x254b59, _0x16ce48)
  );
}
(function (_0x267483, _0x4374c4) {
  const _0x3ce989 = _0x18a2,
    _0xa6f619 = _0x267483();
  while (!![]) {
    try {
      const _0x5c165e =
        -parseInt(_0x3ce989(0xc1)) / 0x1 +
        parseInt(_0x3ce989(0xc2)) / 0x2 +
        -parseInt(_0x3ce989(0xc7)) / 0x3 +
        (-parseInt(_0x3ce989(0xbe)) / 0x4) *
          (-parseInt(_0x3ce989(0xbd)) / 0x5) +
        (-parseInt(_0x3ce989(0xc5)) / 0x6) * (parseInt(_0x3ce989(0xcb)) / 0x7) +
        parseInt(_0x3ce989(0xcd)) / 0x8 +
        parseInt(_0x3ce989(0xbc)) / 0x9;
      if (_0x5c165e === _0x4374c4) break;
      else _0xa6f619["push"](_0xa6f619["shift"]());
    } catch (_0x122002) {
      _0xa6f619["push"](_0xa6f619["shift"]());
    }
  }
})(_0x3676, 0x9f728);
function _0x3676() {
  const _0x4f7d11 = [
    "\x20connection\x20error,try\x20to\x20relogin",
    "connectWaBeforeSend",
    "836205vySaUs",
    "1850284wCdOfm",
    "Unauthorized",
    "../whatsapp",
    "148704sKpNqS",
    "Failed\x20to\x20send\x20blast\x20with\x20sender\x20",
    "2236236QqgRYe",
    "exports",
    "The\x20destination\x20Number\x20not\x20registered\x20in\x20WhatsApp\x20or\x20your\x20sender\x20not\x20connected",
    "body",
    "322naCSgp",
    "parse",
    "6359224rgxKpk",
    "send",
    "data",
    "sender",
    "8789985QsMzQd",
    "65YwyXUv",
    "208636UxKvxp",
  ];
  _0x3676 = function () {
    return _0x4f7d11;
  };
  return _0x3676();
}
const wa = require(_0x5e225c(0xc4)),
  { formatReceipt } = require("./helper"),
  fs = require("fs"),
  checkDestination = async (_0x1c9882, _0x4b0f67, _0x2377f9) => {
    const _0x1490da = _0x5e225c,
      { token: _0x4f6c3a, number: _0x47a7fa } = _0x1c9882["body"];
    if (_0x4f6c3a && _0x47a7fa) {
      const _0x270306 = await wa["isExist"](
        _0x4f6c3a,
        formatReceipt(_0x47a7fa)
      );
      if (!_0x270306)
        return _0x4b0f67[_0x1490da(0xb9)]({
          status: ![],
          message: _0x1490da(0xc9),
        });
      _0x2377f9();
    } else
      _0x4b0f67[_0x1490da(0xb9)]({
        status: ![],
        message: "Check\x20your\x20parameter dddd",
      });
  },
  checkConnectionBeforeBlast = async (_0x251b05, _0x53dc71, _0x2ac2ad) => {
    const _0x15d6f2 = _0x5e225c,
      _0x11b8ba = JSON[_0x15d6f2(0xcc)](
        _0x251b05[_0x15d6f2(0xca)][_0x15d6f2(0xba)]
      );
    try {
      const _0x3da497 = await wa[_0x15d6f2(0xc0)](_0x11b8ba[_0x15d6f2(0xbb)]);
      if (!_0x3da497)
        return _0x53dc71[_0x15d6f2(0xb9)]({
          status: ![],
          message: _0x15d6f2(0xc3),
        });
      _0x2ac2ad();
    } catch (_0x25c3a3) {
      return _0x53dc71[_0x15d6f2(0xb9)]({
        status: ![],
        message: _0x15d6f2(0xc6) + _0x11b8ba[_0x15d6f2(0xbb)] + _0x15d6f2(0xbf),
      });
    }
  };
module[_0x5e225c(0xc8)] = {
  checkDestination: checkDestination,
  checkConnectionBeforeBlast: checkConnectionBeforeBlast,
};
