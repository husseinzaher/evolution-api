"use strict";
const _0x2a27d5 = _0x8ef7;
function _0x8ef7(_0x3e0524, _0x4dad15) {
  const _0x3af655 = _0x3af6();
  return (
    (_0x8ef7 = function (_0x8ef737, _0x3b817b) {
      _0x8ef737 = _0x8ef737 - 0xbd;
      let _0x173d8a = _0x3af655[_0x8ef737];
      return _0x173d8a;
    }),
    _0x8ef7(_0x3e0524, _0x4dad15)
  );
}
(function (_0x5c2d40, _0x2d1285) {
  const _0x21d5d4 = _0x8ef7,
    _0xda91fc = _0x5c2d40();
  while (!![]) {
    try {
      const _0x31f97c =
        -parseInt(_0x21d5d4(0xbe)) / 0x1 +
        (-parseInt(_0x21d5d4(0xc7)) / 0x2) * (parseInt(_0x21d5d4(0xd2)) / 0x3) +
        parseInt(_0x21d5d4(0xbf)) / 0x4 +
        (-parseInt(_0x21d5d4(0xce)) / 0x5) *
          (-parseInt(_0x21d5d4(0xd8)) / 0x6) +
        (parseInt(_0x21d5d4(0xcd)) / 0x7) * (parseInt(_0x21d5d4(0xcc)) / 0x8) +
        -parseInt(_0x21d5d4(0xd4)) / 0x9 +
        (parseInt(_0x21d5d4(0xcf)) / 0xa) * (parseInt(_0x21d5d4(0xd1)) / 0xb);
      if (_0x31f97c === _0x2d1285) break;
      else _0xda91fc["push"](_0xda91fc["shift"]());
    } catch (_0x54bd48) {
      _0xda91fc["push"](_0xda91fc["shift"]());
    }
  }
})(_0x3af6, 0x8da09);
const fs = require("fs"),
  chats = (_0x26e14f, _0x11fef5) => {
    const _0x596266 = _0x8ef7,
      {
        token: _0x1b0f06,
        type: _0x560e8e,
        jid: _0x13f425,
      } = _0x26e14f[_0x596266(0xc4)];
    if (_0x1b0f06 && _0x560e8e)
      try {
        const _0x53d1ba = fs[_0x596266(0xc6)](
          _0x596266(0xbd) + _0x1b0f06 + _0x596266(0xc8),
          { encoding: _0x596266(0xcb) }
        );
        let _0x54bcf5 = JSON["parse"](_0x53d1ba);
        if (_0x560e8e === _0x596266(0xd5))
          _0x54bcf5 = _0x54bcf5[_0x596266(0xd5)];
        else {
          if (_0x560e8e === "contacts") _0x54bcf5 = _0x54bcf5[_0x596266(0xd7)];
          else {
            if (_0x560e8e === _0x596266(0xca))
              _0x13f425
                ? (_0x54bcf5 = _0x54bcf5["messages"][_0x13f425])
                : (_0x54bcf5 = _0x54bcf5[_0x596266(0xca)]);
            else
              return _0x11fef5[_0x596266(0xc5)]({
                status: ![],
                message: _0x596266(0xd0),
              });
          }
        }
        if (typeof _0x54bcf5 === "undefined")
          return _0x11fef5["send"]({ status: ![], message: _0x596266(0xc3) });
        return _0x11fef5["send"](
          _0x54bcf5[_0x596266(0xc2)] > 0x0
            ? _0x54bcf5[_0x596266(0xd9)]()
            : _0x54bcf5
        );
      } catch (_0xb32ee1) {
        return (
          process[_0x596266(0xc9)]["NODE_ENV"] !== _0x596266(0xc0)
            ? console[_0x596266(0xd6)](_0xb32ee1)
            : null,
          _0x11fef5[_0x596266(0xc5)]({ status: ![], error: _0xb32ee1 })
        );
      }
    _0x11fef5[_0x596266(0xc5)]({ status: ![], error: _0x596266(0xd3) });
  };
module[_0x2a27d5(0xc1)] = { chats: chats };
function _0x3af6() {
  const _0x5c5c40 = [
    "exports",
    "length",
    "Data\x20Not\x20Found",
    "body",
    "send",
    "readFileSync",
    "1604tSgDzf",
    "/multistore.js",
    "env",
    "messages",
    "utf8",
    "872VtqNDS",
    "31976GQOPcL",
    "1110245jmkqwD",
    "580eXEPKJ",
    "Unknown\x20type",
    "32098ZKAtMC",
    "1905nawosy",
    "wrong\x20parameters",
    "5810805EtnVxH",
    "chats",
    "log",
    "contacts",
    "18VPPZIS",
    "reverse",
    "credentials/",
    "661288NdGlnu",
    "4252020cPgyUi",
    "production",
  ];
  _0x3af6 = function () {
    return _0x5c5c40;
  };
  return _0x3af6();
}
