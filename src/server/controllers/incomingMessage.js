const _0x585f4c = _0x6027;
(function (_0x38d566, _0x275bac) {
  const _0x59b7c0 = _0x6027,
    _0x23f049 = _0x38d566();
  while (!![]) {
    try {
      const _0x215f36 =
        parseInt(_0x59b7c0(0xc6)) / 0x1 +
        parseInt(_0x59b7c0(0xbc)) / 0x2 +
        (-parseInt(_0x59b7c0(0xd3)) / 0x3) *
          (-parseInt(_0x59b7c0(0xa7)) / 0x4) +
        (-parseInt(_0x59b7c0(0xd0)) / 0x5) *
          (-parseInt(_0x59b7c0(0xb8)) / 0x6) +
        (parseInt(_0x59b7c0(0xb5)) / 0x7) * (parseInt(_0x59b7c0(0xc7)) / 0x8) +
        (parseInt(_0x59b7c0(0xd1)) / 0x9) * (parseInt(_0x59b7c0(0xcb)) / 0xa) +
        -parseInt(_0x59b7c0(0xca)) / 0xb;
      if (_0x215f36 === _0x275bac) break;
      else _0x23f049["push"](_0x23f049["shift"]());
    } catch (_0x368730) {
      _0x23f049["push"](_0x23f049["shift"]());
    }
  }
})(_0xceae, 0x444f3);
const { parseIncomingMessage, formatReceipt } = require(_0x585f4c(0xa0));
require(_0x585f4c(0xa4))["config"]();
function _0x6027(_0x3f8a19, _0x4ae061) {
  const _0xceae5b = _0xceae();
  return (
    (_0x6027 = function (_0x60270f, _0x494273) {
      _0x60270f = _0x60270f - 0x98;
      let _0x199320 = _0xceae5b[_0x60270f];
      return _0x199320;
    }),
    _0x6027(_0x3f8a19, _0x4ae061)
  );
}
const axios = require("axios"),
  {
    isExistsEqualCommand,
    isExistsContainCommand,
    getUrlWebhook,
  } = require(_0x585f4c(0x98)),
  IncomingMessage = async (_0x3704e8, _0x110118) => {
    const _0x3e37d2 = _0x585f4c;
    try {
      let _0x12b661 = ![];
      if (!_0x3704e8[_0x3e37d2(0xa8)]) return;
      _0x3704e8 = _0x3704e8[_0x3e37d2(0xa8)][0x0];
      const _0x36b7f9 = _0x3704e8?.[_0x3e37d2(0xbf)] || "";
      if (_0x3704e8[_0x3e37d2(0x9a)][_0x3e37d2(0xb9)] === !![]) return;
      if (_0x3704e8[_0x3e37d2(0x9a)][_0x3e37d2(0xb4)] === "status@broadcast")
        return;
      const _0xa12da5 =
          _0x3704e8[_0x3e37d2(0x9a)]["participant"] &&
          formatReceipt(_0x3704e8[_0x3e37d2(0x9a)][_0x3e37d2(0xd4)]),
        {
          command: _0x56214c,
          bufferImage: _0x37c201,
          from: _0x3dac84,
        } = await parseIncomingMessage(_0x3704e8);
      let _0x5c3a9b, _0x3a41e1;
      const _0x24f6d3 =
          _0x110118[_0x3e37d2(0x99)]["id"][_0x3e37d2(0xcf)](":")[0x0],
        _0x565dc2 = await isExistsEqualCommand(_0x56214c, _0x24f6d3);
      _0x565dc2[_0x3e37d2(0xc9)] > 0x0
        ? (_0x3a41e1 = _0x565dc2)
        : (_0x3a41e1 = await isExistsContainCommand(_0x56214c, _0x24f6d3));
      if (_0x3a41e1[_0x3e37d2(0xc9)] === 0x0) {
        console[_0x3e37d2(0xc5)](_0x3704e8);
        const _0x228efd = await getUrlWebhook(_0x24f6d3);
        if (_0x228efd == null) return;
        const _0x467943 = await sendWebhook({
          command: _0x56214c,
          bufferImage: _0x37c201,
          from: _0x3dac84,
          url: _0x228efd,
          participant: _0xa12da5,
        });
        if (_0x467943 === ![]) return;
        if (_0x467943 === undefined) return;
        if (typeof _0x467943 != _0x3e37d2(0xa2)) return;
        (_0x12b661 = _0x467943?.[_0x3e37d2(0xd2)] ? !![] : ![]),
          (_0x5c3a9b = JSON["stringify"](_0x467943));
      } else {
        replyorno =
          _0x3a41e1[0x0][_0x3e37d2(0xaa)] == _0x3e37d2(0xa3)
            ? !![]
            : _0x3a41e1[0x0][_0x3e37d2(0xaa)] == _0x3e37d2(0xc4) &&
              _0x3704e8["key"][_0x3e37d2(0xb4)][_0x3e37d2(0x9d)]("@g.us")
            ? !![]
            : _0x3a41e1[0x0][_0x3e37d2(0xaa)] == "Personal" &&
              !_0x3704e8[_0x3e37d2(0x9a)][_0x3e37d2(0xb4)]["includes"](
                _0x3e37d2(0xba)
              )
            ? !![]
            : ![];
        if (replyorno === ![]) return;
        (_0x12b661 = _0x3a41e1[0x0][_0x3e37d2(0xa5)] ? !![] : ![]),
          typeof _0x3a41e1[0x0][_0x3e37d2(0xa1)] === _0x3e37d2(0xa2)
            ? (_0x5c3a9b = JSON[_0x3e37d2(0xc8)](
                _0x3a41e1[0x0][_0x3e37d2(0xa1)]
              ))
            : (_0x5c3a9b = _0x3a41e1[0x0][_0x3e37d2(0xa1)]);
      }
      return (
        (_0x5c3a9b = _0x5c3a9b["replace"](/{name}/g, _0x36b7f9)),
        (_0x5c3a9b = JSON[_0x3e37d2(0xb0)](_0x5c3a9b)),
        _0x3a41e1[0x0][_0x3e37d2(0xc3)] === "media"
          ? await sendMedia(
              _0x110118,
              _0x3704e8[_0x3e37d2(0x9a)][_0x3e37d2(0xb4)],
              _0x5c3a9b[_0x3e37d2(0xc3)],
              _0x5c3a9b["url"],
              _0x5c3a9b[_0x3e37d2(0xc2)],
              _0x5c3a9b[_0x3e37d2(0xc0)],
              _0x5c3a9b["filename"]
            )[_0x3e37d2(0xcd)]((_0x3c9408) => {
              const _0x19f3a0 = _0x3e37d2;
              console[_0x19f3a0(0xc5)](_0x3c9408);
            })
          : await _0x110118[_0x3e37d2(0xd5)](
              _0x3704e8[_0x3e37d2(0x9a)]["remoteJid"],
              _0x5c3a9b,
              { quoted: _0x12b661 ? _0x3704e8 : null }
            )["catch"]((_0x2910a1) => {
              const _0x3c8112 = _0x3e37d2;
              console[_0x3c8112(0xc5)](_0x2910a1);
            }),
        !![]
      );
    } catch (_0x50d289) {
      console["log"](_0x50d289);
    }
  };
async function sendWebhook({
  command: _0x58ee26,
  bufferImage: _0x217e18,
  from: _0x3dfb89,
  url: _0x24b457,
  participant: _0xe6301b,
}) {
  const _0xd8b14 = _0x585f4c;
  try {
    const _0x4be130 = {
        message: _0x58ee26,
        bufferImage: _0x217e18 == undefined ? null : _0x217e18,
        from: _0x3dfb89,
        participant: _0xe6301b,
      },
      _0x3350f6 = { "Content-Type": "application/json;\x20charset=utf-8" },
      _0x44d6b6 = await axios[_0xd8b14(0x9f)](_0x24b457, _0x4be130, _0x3350f6)[
        _0xd8b14(0xcd)
      ](() => {
        return ![];
      });
    return _0x44d6b6[_0xd8b14(0xae)];
  } catch (_0x2a1f4c) {
    return console["log"](_0xd8b14(0xbd), _0x2a1f4c), ![];
  }
}
async function sendMedia(
  _0x158e45,
  _0x49916b,
  _0xed6f45,
  _0x5eddd1,
  _0x3dcbfe,
  _0x5d9fd9,
  _0x3213a8
) {
  const _0x3f6441 = _0x585f4c,
    _0x240923 = formatReceipt(_0x49916b);
  try {
    if (_0xed6f45 == _0x3f6441(0x9b))
      var _0x62792b = await _0x158e45[_0x3f6441(0xd5)](_0x240923, {
        image: _0x5eddd1
          ? { url: _0x5eddd1 }
          : fs[_0x3f6441(0x9c)](_0x3f6441(0xaf) + fileName),
        caption: _0x3dcbfe ? _0x3dcbfe : null,
      });
    else {
      if (_0xed6f45 == _0x3f6441(0xad))
        var _0x62792b = await _0x158e45[_0x3f6441(0xd5)](_0x240923, {
          video: _0x5eddd1
            ? { url: _0x5eddd1 }
            : fs[_0x3f6441(0x9c)](_0x3f6441(0xaf) + _0x3213a8),
          caption: _0x3dcbfe ? _0x3dcbfe : null,
        });
      else {
        if (_0xed6f45 == _0x3f6441(0xce))
          var _0x62792b = await _0x158e45[_0x3f6441(0xd5)](_0x240923, {
            audio: _0x5eddd1
              ? { url: _0x5eddd1 }
              : fs[_0x3f6441(0x9c)](_0x3f6441(0xaf) + _0x3213a8),
            ptt: _0x5d9fd9 == 0x0 ? ![] : !![],
            mimetype: _0x3f6441(0xb7),
          });
        else {
          if (_0xed6f45 == "pdf")
            var _0x62792b = await _0x158e45[_0x3f6441(0xd5)](
              _0x240923,
              {
                document: { url: _0x5eddd1 },
                mimetype: "application/pdf",
                fileName: _0x3213a8 + _0x3f6441(0xcc),
              },
              { url: _0x5eddd1 }
            );
          else {
            if (_0xed6f45 == "xls")
              var _0x62792b = await _0x158e45[_0x3f6441(0xd5)](
                _0x240923,
                {
                  document: { url: _0x5eddd1 },
                  mimetype: _0x3f6441(0xb2),
                  fileName: _0x3213a8 + _0x3f6441(0x9e),
                },
                { url: _0x5eddd1 }
              );
            else {
              if (_0xed6f45 == "xlsx")
                var _0x62792b = await _0x158e45[_0x3f6441(0xd5)](
                  _0x240923,
                  {
                    document: { url: _0x5eddd1 },
                    mimetype: _0x3f6441(0xbe),
                    fileName: _0x3213a8 + ".xlsx",
                  },
                  { url: _0x5eddd1 }
                );
              else {
                if (_0xed6f45 == "doc")
                  var _0x62792b = await _0x158e45[_0x3f6441(0xd5)](
                    _0x240923,
                    {
                      document: { url: _0x5eddd1 },
                      mimetype: _0x3f6441(0xa9),
                      fileName: _0x3213a8 + ".doc",
                    },
                    { url: _0x5eddd1 }
                  );
                else {
                  if (_0xed6f45 == _0x3f6441(0xa6))
                    var _0x62792b = await _0x158e45[_0x3f6441(0xd5)](
                      _0x240923,
                      {
                        document: { url: _0x5eddd1 },
                        mimetype: _0x3f6441(0xb6),
                        fileName: _0x3213a8 + _0x3f6441(0xb1),
                      },
                      { url: _0x5eddd1 }
                    );
                  else {
                    if (_0xed6f45 == "zip")
                      var _0x62792b = await _0x158e45[_0x3f6441(0xd5)](
                        _0x240923,
                        {
                          document: { url: _0x5eddd1 },
                          mimetype: _0x3f6441(0xc1),
                          fileName: _0x3213a8 + _0x3f6441(0xb3),
                        },
                        { url: _0x5eddd1 }
                      );
                    else {
                      if (_0xed6f45 == "mp3")
                        var _0x62792b = await _0x158e45["sendMessage"](
                          _0x240923,
                          {
                            document: { url: _0x5eddd1 },
                            mimetype: _0x3f6441(0xac),
                          },
                          { url: _0x5eddd1 }
                        );
                      else
                        return (
                          console[_0x3f6441(0xc5)](
                            "Please\x20add\x20your\x20won\x20role\x20of\x20mimetype"
                          ),
                          { error: !![], message: _0x3f6441(0xab) }
                        );
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    return _0x62792b;
  } catch (_0x14ecf4) {
    return ![];
  }
}
module[_0x585f4c(0xbb)] = { IncomingMessage: IncomingMessage };
function _0xceae() {
  const _0x4331c1 = [
    "application/excel",
    ".zip",
    "remoteJid",
    "637MioTry",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "audio/mpeg",
    "6eCRpoY",
    "fromMe",
    "@g.us",
    "exports",
    "153172tTbMQz",
    "error\x20send\x20webhook",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "pushName",
    "ptt",
    "application/zip",
    "caption",
    "type",
    "Group",
    "log",
    "36889erayHj",
    "24432SMddsP",
    "stringify",
    "length",
    "7343919XvbQbK",
    "689760nyyoRa",
    ".pdf",
    "catch",
    "audio",
    "split",
    "89710vtBJVF",
    "27XgdLKu",
    "quoted",
    "15lNBwae",
    "participant",
    "sendMessage",
    "../database/model",
    "user",
    "key",
    "image",
    "readFileSync",
    "includes",
    ".xls",
    "post",
    "../lib/helper",
    "reply",
    "object",
    "All",
    "dotenv",
    "is_quoted",
    "docx",
    "264932bMBacS",
    "messages",
    "application/msword",
    "reply_when",
    "Please\x20add\x20your\x20won\x20role\x20of\x20mimetype",
    "application/mp3",
    "video",
    "data",
    "src/public/temp/",
    "parse",
    ".docx",
  ];
  _0xceae = function () {
    return _0x4331c1;
  };
  return _0xceae();
}
