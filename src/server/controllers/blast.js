const _0x390438 = _0x3d13;
(function (_0x25af0a, _0x402410) {
  const _0x3b07a9 = _0x3d13,
    _0x2d031d = _0x25af0a();
  while (!![]) {
    try {
      const _0x4b6009 =
        (-parseInt(_0x3b07a9(0xb7)) / 0x1) *
          (-parseInt(_0x3b07a9(0x9d)) / 0x2) +
        -parseInt(_0x3b07a9(0x9c)) / 0x3 +
        parseInt(_0x3b07a9(0xa6)) / 0x4 +
        (parseInt(_0x3b07a9(0xa2)) / 0x5) * (-parseInt(_0x3b07a9(0xc5)) / 0x6) +
        parseInt(_0x3b07a9(0xb1)) / 0x7 +
        parseInt(_0x3b07a9(0xa0)) / 0x8 +
        (-parseInt(_0x3b07a9(0xb3)) / 0x9) * (-parseInt(_0x3b07a9(0xb2)) / 0xa);
      if (_0x4b6009 === _0x402410) break;
      else _0x2d031d["push"](_0x2d031d["shift"]());
    } catch (_0x5253bf) {
      _0x2d031d["push"](_0x2d031d["shift"]());
    }
  }
})(_0x141e, 0xcd63b);
const { dbQuery } = require(_0x390438(0xae)),
  { formatReceipt } = require(_0x390438(0xab)),
  wa = require(_0x390438(0x99)),
  fs = require("fs");
function _0x141e() {
  const _0x1a4b62 = [
    "../lib/helper",
    "parse",
    "message",
    "../database",
    "length",
    "wrong\x20data,\x20progress\x20canceled!",
    "4386214rcsCeW",
    "234190GsziKz",
    "198IYjsbw",
    "ptt",
    "receiver",
    "SELECT\x20status\x20FROM\x20blasts\x20WHERE\x20receiver\x20=\x20\x27",
    "1KIIvPs",
    "\x27\x20WHERE\x20receiver\x20=\x20\x27",
    "\x27\x20AND\x20campaign_id\x20=\x20\x27",
    "log",
    "type",
    "failed",
    "Error\x20in\x20send\x20operation:\x20",
    "send",
    "503",
    "exports",
    "caption",
    "progress\x20campaign\x20ID\x20:\x20",
    "Error\x20in\x20wa.isExist:\x20",
    "still\x20any\x20progress\x20in\x20campaign\x20id\x20",
    "24gydQFX",
    "catch",
    "data",
    "../whatsapp",
    "sender",
    "campaign_id",
    "2690412OEkNwv",
    "2628086tlfHGC",
    "sendMessage",
    ",\x20request\x20canceled.\x20",
    "1354704VsAmqW",
    "sendMedia",
    "1128250VYPpFy",
    "UPDATE\x20blasts\x20SET\x20status\x20=\x20\x27",
    "status",
    "error",
    "61912McvDFB",
    "body",
    "Server\x20is\x20busy,\x20waiting\x20for\x205\x20seconds\x20before\x20retrying...",
    "in_progress",
    "\x20started",
  ];
  _0x141e = function () {
    return _0x1a4b62;
  };
  return _0x141e();
}
function _0x3d13(_0x9cbee9, _0x116544) {
  const _0x141e6e = _0x141e();
  return (
    (_0x3d13 = function (_0x3d1330, _0x16734f) {
      _0x3d1330 = _0x3d1330 - 0x97;
      let _0x9e43c2 = _0x141e6e[_0x3d1330];
      return _0x9e43c2;
    }),
    _0x3d13(_0x9cbee9, _0x116544)
  );
}
let inProgress = [];
const updateStatus = async (_0x5ee1a8, _0x2f8881, _0x54ef2a) => {
    const _0x5f19b7 = _0x390438;
    await dbQuery(
      _0x5f19b7(0xa3) +
        _0x54ef2a +
        _0x5f19b7(0xb8) +
        _0x2f8881 +
        _0x5f19b7(0xb9) +
        _0x5ee1a8 +
        "\x27"
    );
  },
  checkBlast = async (_0x5bffee, _0x2c54aa) => {
    const _0x1b4a03 = _0x390438,
      _0x28c64c = await dbQuery(
        _0x1b4a03(0xb6) + _0x2c54aa + _0x1b4a03(0xb9) + _0x5bffee + "\x27"
      );
    return (
      _0x28c64c[_0x1b4a03(0xaf)] > 0x0 &&
      _0x28c64c[0x0][_0x1b4a03(0xa4)] === "pending"
    );
  },
  sendBlastMessage = async (_0x15a9a1, _0x88d546) => {
    const _0x3ef3cf = _0x390438,
      _0xd4b49d = JSON[_0x3ef3cf(0xac)](
        _0x15a9a1[_0x3ef3cf(0xa7)][_0x3ef3cf(0x98)]
      ),
      _0x3e3aba = _0xd4b49d[_0x3ef3cf(0x98)],
      _0x58a754 = _0xd4b49d[_0x3ef3cf(0x9b)],
      _0x42d5b4 = (_0xfbb1f0) =>
        new Promise((_0x4c80bc) => setTimeout(_0x4c80bc, _0xfbb1f0));
    if (inProgress[_0x58a754])
      return (
        console[_0x3ef3cf(0xba)](_0x3ef3cf(0xc4) + _0x58a754 + _0x3ef3cf(0x9f)),
        _0x88d546["send"]({ status: _0x3ef3cf(0xa9) })
      );
    (inProgress[_0x58a754] = !![]),
      console[_0x3ef3cf(0xba)](_0x3ef3cf(0xc2) + _0x58a754 + _0x3ef3cf(0xaa)),
      _0x88d546[_0x3ef3cf(0xbe)]({ status: _0x3ef3cf(0xa9) });
    const _0x528249 = async () => {
      const _0x1528e0 = _0x3ef3cf;
      for (let _0x2155b6 in _0x3e3aba) {
        const _0x5a19bb = _0xd4b49d["delay"];
        await _0x42d5b4(_0x5a19bb * 0x3e8);
        if (
          _0xd4b49d[_0x1528e0(0x9a)] &&
          _0x3e3aba[_0x2155b6][_0x1528e0(0xb5)] &&
          _0x3e3aba[_0x2155b6][_0x1528e0(0xad)]
        ) {
          const _0x1a69ca = await checkBlast(
            _0x58a754,
            _0x3e3aba[_0x2155b6][_0x1528e0(0xb5)]
          );
          if (_0x1a69ca) {
            try {
              const _0x333ed2 = await wa["isExist"](
                _0xd4b49d[_0x1528e0(0x9a)],
                formatReceipt(_0x3e3aba[_0x2155b6][_0x1528e0(0xb5)])
              );
              if (!_0x333ed2) {
                await updateStatus(
                  _0x58a754,
                  _0x3e3aba[_0x2155b6][_0x1528e0(0xb5)],
                  _0x1528e0(0xbc)
                );
                continue;
              }
            } catch (_0x4de781) {
              console["error"](_0x1528e0(0xc3), _0x4de781),
                await updateStatus(
                  _0x58a754,
                  _0x3e3aba[_0x2155b6][_0x1528e0(0xb5)],
                  _0x1528e0(0xbc)
                );
              continue;
            }
            try {
              let _0x1d12d3;
              if (_0xd4b49d[_0x1528e0(0xbb)] === "media") {
                const _0x46611b = JSON["parse"](
                  _0x3e3aba[_0x2155b6][_0x1528e0(0xad)]
                );
                console[_0x1528e0(0xba)]("fileDetail", _0x46611b),
                  (_0x1d12d3 = wa[_0x1528e0(0xa1)](
                    _0xd4b49d["sender"],
                    _0x3e3aba[_0x2155b6]["receiver"],
                    _0x46611b[_0x1528e0(0xbb)],
                    _0x46611b["url"],
                    _0x46611b[_0x1528e0(0xc1)],
                    _0x46611b[_0x1528e0(0xb4)],
                    _0x46611b["filename"]
                  ));
              } else
                _0x1d12d3 = await wa[_0x1528e0(0x9e)](
                  _0xd4b49d[_0x1528e0(0x9a)],
                  _0x3e3aba[_0x2155b6][_0x1528e0(0xb5)],
                  _0x3e3aba[_0x2155b6]["message"]
                );
              const _0x5b4ef1 = _0x1d12d3 ? "success" : "failed";
              await updateStatus(
                _0x58a754,
                _0x3e3aba[_0x2155b6][_0x1528e0(0xb5)],
                _0x5b4ef1
              );
            } catch (_0x386626) {
              console[_0x1528e0(0xa5)](_0x386626),
                _0x386626[_0x1528e0(0xad)]["includes"](_0x1528e0(0xbf))
                  ? (console[_0x1528e0(0xba)](_0x1528e0(0xa8)),
                    await _0x42d5b4(0x1388),
                    _0x2155b6--)
                  : await updateStatus(
                      _0x58a754,
                      _0x3e3aba[_0x2155b6]["receiver"],
                      "failed"
                    );
            }
          } else console[_0x1528e0(0xba)]("no\x20pending,\x20not\x20send!");
        } else console[_0x1528e0(0xba)](_0x1528e0(0xb0));
      }
      delete inProgress[_0x58a754];
    };
    _0x528249()[_0x3ef3cf(0x97)]((_0x2aaf47) => {
      const _0x3f9465 = _0x3ef3cf;
      console["error"](_0x3f9465(0xbd) + _0x2aaf47),
        delete inProgress[_0x58a754];
    });
  };
module[_0x390438(0xc0)] = { sendBlastMessage: sendBlastMessage };
