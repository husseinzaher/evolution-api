'use strict';
const _0x49c27d = _0x3c2a;
(function (_0x4c9738, _0x22c7da) {
  const _0x2715d3 = _0x3c2a,
    _0x1b0b32 = _0x4c9738();
  while ([]) {
    try {
      const _0x194206 =
        (-parseInt(_0x2715d3(0x179)) / 0x1) * (-parseInt(_0x2715d3(0x139)) / 0x2) +
        (parseInt(_0x2715d3(0x171)) / 0x3) * (parseInt(_0x2715d3(0x15c)) / 0x4) +
        (-parseInt(_0x2715d3(0x15f)) / 0x5) * (-parseInt(_0x2715d3(0x138)) / 0x6) +
        (parseInt(_0x2715d3(0x157)) / 0x7) * (parseInt(_0x2715d3(0x164)) / 0x8) +
        (-parseInt(_0x2715d3(0x145)) / 0x9) * (parseInt(_0x2715d3(0x125)) / 0xa) +
        parseInt(_0x2715d3(0x10a)) / 0xb +
        -parseInt(_0x2715d3(0x140)) / 0xc;
      if (_0x194206 === _0x22c7da) break;
      else _0x1b0b32['push'](_0x1b0b32['shift']());
    } catch (_0x3c4088) {
      _0x1b0b32['push'](_0x1b0b32['shift']());
    }
  }
})(_0x4fea, 0x348f3);
const _ = require('lodash'),
  { Boom } = require(_0x49c27d(0x15d)),
  { default: makeWASocket } = require(_0x49c27d(0x17f)),
  { fetchLatestBaileysVersion, useMultiFileAuthState, makeCacheableSignalKeyStore } = require(_0x49c27d(0x17f)),
  { DisconnectReason } = require(_0x49c27d(0x17f)),
  QRCode = require(_0x49c27d(0x137)),
  fs = require('fs');
let sock = [],
  qrcode = [],
  intervalStore = [];
const { setStatus } = require(_0x49c27d(0x177)),
  { IncomingMessage } = require(_0x49c27d(0x13a)),
  { formatReceipt } = require(_0x49c27d(0x129)),
  axios = require(_0x49c27d(0x15a)),
  MAIN_LOGGER = require('./lib/pino'),
  { log } = require(_0x49c27d(0x17c)),
  logger = MAIN_LOGGER[_0x49c27d(0x10d)]({}),
  useMobile = process[_0x49c27d(0x17b)][_0x49c27d(0x146)](_0x49c27d(0x162)),
  connectToWhatsApp = async (_0x7f9c3e, _0x5aad8c = null) => {
    const _0x1876b3 = _0x49c27d;
    if (typeof qrcode[_0x7f9c3e] !== 'undefined')
      return (
        _0x5aad8c !== null &&
          _0x5aad8c[_0x1876b3(0x170)](_0x1876b3(0x137), {
            token: _0x7f9c3e,
            data: qrcode[_0x7f9c3e],
            message: _0x1876b3(0x13f),
          }),
        {
          status: ![],
          sock: sock[_0x7f9c3e],
          qrcode: qrcode[_0x7f9c3e],
          message: _0x1876b3(0x144),
        }
      );
    try {
      let _0x9bf25c = sock[_0x7f9c3e][_0x1876b3(0x161)]['id']['split'](':');
      _0x9bf25c = _0x9bf25c[0x0] + '@s.whatsapp.net';
      const _0x28659b = await getPpUrl(_0x7f9c3e, _0x9bf25c);
      return (
        _0x5aad8c !== null &&
          (_0x5aad8c['emit'](_0x1876b3(0x114), {
            token: _0x7f9c3e,
            user: sock[_0x7f9c3e][_0x1876b3(0x161)],
            ppUrl: _0x28659b,
          }),
          console[_0x1876b3(0x10c)](sock[_0x7f9c3e][_0x1876b3(0x161)])),
        { status: !![], message: _0x1876b3(0x160) }
      );
    } catch (_0x1234f8) {
      _0x5aad8c !== null &&
        _0x5aad8c[_0x1876b3(0x170)]('message', {
          token: _0x7f9c3e,
          message: 'Connecting..\x20(1)',
        });
    }
    const { version: _0x2af30f, isLatest: _0x2ca0d3 } = await fetchLatestBaileysVersion();
    console[_0x1876b3(0x10c)](_0x1876b3(0x17a)),
      console[_0x1876b3(0x10c)]('using\x20WA\x20v' + _0x2af30f[_0x1876b3(0x123)]('.') + _0x1876b3(0x10f) + _0x2ca0d3);
    const { state: _0x55cc44, saveCreds: _0x407109 } = await useMultiFileAuthState(_0x1876b3(0x130) + _0x7f9c3e);
    return (
      (sock[_0x7f9c3e] = makeWASocket({
        version: _0x2af30f,
        browser: ['Apploxa', _0x1876b3(0x14f), _0x1876b3(0x126)],
        logger: logger,
        printQRInTerminal: !![],
        mobile: useMobile,
        auth: {
          creds: _0x55cc44[_0x1876b3(0x143)],
          keys: makeCacheableSignalKeyStore(_0x55cc44[_0x1876b3(0x173)], logger),
        },
        generateHighQualityLinkPreview: !![],
      })),
      await whatsappEvents(_0x7f9c3e, sock[_0x7f9c3e]),
      sock[_0x7f9c3e]['ev'][_0x1876b3(0x158)](async (_0x3966d4) => {
        const _0x1435a7 = _0x1876b3;
        if (_0x3966d4[_0x1435a7(0x16d)]) {
          const _0x2aa837 = _0x3966d4[_0x1435a7(0x16d)],
            { connection: _0x43d883, lastDisconnect: _0x5c1e5a, qr: _0x1daee9 } = _0x2aa837;
          if (_0x43d883 === _0x1435a7(0x16c)) {
            if (
              (_0x5c1e5a?.[_0x1435a7(0x151)] instanceof Boom)?.[_0x1435a7(0x16f)]?.[_0x1435a7(0x174)] !==
              DisconnectReason[_0x1435a7(0x154)]
            ) {
              delete qrcode[_0x7f9c3e];
              if (_0x5aad8c != null)
                _0x5aad8c['emit'](_0x1435a7(0x122), {
                  token: _0x7f9c3e,
                  message: _0x1435a7(0x113),
                });
              if (
                _0x5c1e5a[_0x1435a7(0x151)]?.[_0x1435a7(0x16f)]?.['payload']?.[_0x1435a7(0x122)] ===
                'QR\x20refs\x20attempts\x20ended'
              ) {
                delete qrcode[_0x7f9c3e], sock[_0x7f9c3e]['ws'][_0x1435a7(0x16c)]();
                if (_0x5aad8c != null)
                  _0x5aad8c['emit'](_0x1435a7(0x122), {
                    token: _0x7f9c3e,
                    message: _0x1435a7(0x136),
                  });
                return;
              }
              _0x5c1e5a?.[_0x1435a7(0x151)]?.['output']?.['payload']?.[_0x1435a7(0x151)] === _0x1435a7(0x128) &&
                (setStatus(_0x7f9c3e, _0x1435a7(0x11d)),
                clearConnection(_0x7f9c3e),
                connectToWhatsApp(_0x7f9c3e, _0x5aad8c)),
                _0x5c1e5a?.[_0x1435a7(0x151)]['output'][_0x1435a7(0x16b)][_0x1435a7(0x122)] != _0x1435a7(0x120) &&
                  connectToWhatsApp(_0x7f9c3e, _0x5aad8c);
            } else
              setStatus(_0x7f9c3e, _0x1435a7(0x11d)),
                console[_0x1435a7(0x10c)](_0x1435a7(0x155)),
                _0x5aad8c !== null &&
                  _0x5aad8c['emit'](_0x1435a7(0x122), {
                    token: _0x7f9c3e,
                    message: 'Connection\x20closed.\x20You\x20are\x20logged\x20out.',
                  }),
                clearConnection(_0x7f9c3e),
                connectToWhatsApp(_0x7f9c3e, _0x5aad8c);
          }
          _0x1daee9 &&
            QRCode['toDataURL'](_0x1daee9, function (_0x4d75b4, _0x8178be) {
              const _0x501409 = _0x1435a7;
              _0x4d75b4 && console[_0x501409(0x10c)](_0x4d75b4),
                (qrcode[_0x7f9c3e] = _0x8178be),
                _0x5aad8c !== null &&
                  _0x5aad8c['emit'](_0x501409(0x137), {
                    token: _0x7f9c3e,
                    data: _0x8178be,
                    message: _0x501409(0x159),
                  });
            });
          if (_0x43d883 === _0x1435a7(0x13c)) {
            setStatus(_0x7f9c3e, _0x1435a7(0x13d));
            let _0x4ffc42 = sock[_0x7f9c3e][_0x1435a7(0x161)]['id'][_0x1435a7(0x13b)](':');
            _0x4ffc42 = _0x4ffc42[0x0] + _0x1435a7(0x141);
            const _0x376213 = await getPpUrl(_0x7f9c3e, _0x4ffc42);
            _0x5aad8c !== null &&
              _0x5aad8c[_0x1435a7(0x170)]('connection-open', {
                token: _0x7f9c3e,
                user: sock[_0x7f9c3e][_0x1435a7(0x161)],
                ppUrl: _0x376213,
              }),
              delete qrcode[_0x7f9c3e];
          }
        }
        if (_0x3966d4[_0x1435a7(0x152)]) {
          const _0x2d02ca = _0x3966d4[_0x1435a7(0x152)];
          _0x407109(_0x2d02ca);
        }
        if (_0x3966d4[_0x1435a7(0x148)]) {
          const _0x420289 = _0x3966d4[_0x1435a7(0x148)];
          console[_0x1435a7(0x10c)](_0x420289);
        }
        if (_0x3966d4[_0x1435a7(0x17d)]) {
          const _0x40241a = _0x3966d4[_0x1435a7(0x17d)];
          IncomingMessage(_0x40241a, sock[_0x7f9c3e]);
        }
      }),
      { sock: sock[_0x7f9c3e], qrcode: qrcode[_0x7f9c3e] }
    );
  };
const { waMonitor } = require('../api/server.module');
async function connectWaBeforeSend(_0x38523d) {
  const _0x4e9226 = _0x49c27d;
  let _0xb5a854 = undefined,
    _0xa672f1;
  (_0xa672f1 = await connectToWhatsApp(_0x38523d)),
    await _0xa672f1[_0x4e9226(0x16a)]['ev']['on'](_0x4e9226(0x16d), (_0xda7aaf) => {
      const _0x547f11 = _0x4e9226,
        { connection: _0x468643, qr: _0x165656 } = _0xda7aaf;
      _0x468643 === _0x547f11(0x13c) && (_0xb5a854 = !![]), _0x165656 && (_0xb5a854 = ![]);
    });
  let _0x255e2e = 0x0;
  while (typeof _0xb5a854 === _0x4e9226(0x116)) {
    _0x255e2e++;
    if (_0x255e2e > 0x4) break;
    await new Promise((_0x15b431) => setTimeout(_0x15b431, 0x3e8));
  }
  return _0xb5a854;
}
const sendText = async (_0x435db8, _0x37e08f, _0x45392c) => {
    const _0x23e5a4 = _0x49c27d;
    try {
      const _0x5707d5 = await sock[_0x435db8][_0x23e5a4(0x176)](formatReceipt(_0x37e08f), { text: _0x45392c });
      return _0x5707d5;
    } catch (_0x101fe7) {
      return (
        fs[_0x23e5a4(0x11e)](JSON['stringify'](_0x101fe7), _0x23e5a4(0x156)),
        console[_0x23e5a4(0x10c)](_0x23e5a4(0x134), JSON[_0x23e5a4(0x168)](_0x101fe7)),
        ![]
      );
    }
  },
  sendMessage = async (_0x50c293, _0x12117b, _0x43755e) => {
    const _0x72496a = _0x49c27d;
    try {
      const _0x4c833f = await sock[_0x50c293][_0x72496a(0x176)](formatReceipt(_0x12117b), JSON['parse'](_0x43755e));
      return _0x4c833f;
    } catch (_0x13433d) {
      return console['log'](_0x13433d), ![];
    }
  };
async function sendMedia(_0x3f8a83, _0x45ba44, _0x95f891, _0x5d88b5, _0x24ddb8, _0x3c0598, _0x1a7ab5) {
  const _0x8fba8e = _0x49c27d,
    _0x193916 = formatReceipt(_0x45ba44);
  try {
    if (_0x95f891 == _0x8fba8e(0x165))
      var _0x54daf3 = await sock[_0x3f8a83][_0x8fba8e(0x176)](_0x193916, {
        image: _0x5d88b5 ? { url: _0x5d88b5 } : fs[_0x8fba8e(0x178)](_0x8fba8e(0x175) + fileName),
        caption: _0x24ddb8 ? _0x24ddb8 : null,
      });
    else {
      if (_0x95f891 == _0x8fba8e(0x14e))
        var _0x54daf3 = await sock[_0x3f8a83][_0x8fba8e(0x176)](_0x193916, {
          video: _0x5d88b5 ? { url: _0x5d88b5 } : fs[_0x8fba8e(0x178)](_0x8fba8e(0x175) + _0x1a7ab5),
          caption: _0x24ddb8 ? _0x24ddb8 : null,
        });
      else {
        if (_0x95f891 == _0x8fba8e(0x133))
          var _0x54daf3 = await sock[_0x3f8a83][_0x8fba8e(0x176)](_0x193916, {
            audio: _0x5d88b5 ? { url: _0x5d88b5 } : fs[_0x8fba8e(0x178)](_0x8fba8e(0x175) + _0x1a7ab5),
            ptt: _0x3c0598 == 0x0 ? ![] : !![],
            mimetype: _0x8fba8e(0x142),
          });
        else {
          if (_0x95f891 == _0x8fba8e(0x118))
            var _0x54daf3 = await sock[_0x3f8a83][_0x8fba8e(0x176)](
              _0x193916,
              {
                document: { url: _0x5d88b5 },
                mimetype: _0x8fba8e(0x11b),
                fileName: _0x1a7ab5 + _0x8fba8e(0x12c),
              },
              { url: _0x5d88b5 },
            );
          else {
            if (_0x95f891 == _0x8fba8e(0x127))
              var _0x54daf3 = await sock[_0x3f8a83][_0x8fba8e(0x176)](
                _0x193916,
                {
                  document: { url: _0x5d88b5 },
                  mimetype: _0x8fba8e(0x12f),
                  fileName: _0x1a7ab5 + _0x8fba8e(0x14c),
                },
                { url: _0x5d88b5 },
              );
            else {
              if (_0x95f891 == _0x8fba8e(0x10b))
                var _0x54daf3 = await sock[_0x3f8a83][_0x8fba8e(0x176)](
                  _0x193916,
                  {
                    document: { url: _0x5d88b5 },
                    mimetype: _0x8fba8e(0x147),
                    fileName: _0x1a7ab5 + '.xlsx',
                  },
                  { url: _0x5d88b5 },
                );
              else {
                if (_0x95f891 == _0x8fba8e(0x153))
                  var _0x54daf3 = await sock[_0x3f8a83][_0x8fba8e(0x176)](
                    _0x193916,
                    {
                      document: { url: _0x5d88b5 },
                      mimetype: _0x8fba8e(0x11a),
                      fileName: _0x1a7ab5 + _0x8fba8e(0x115),
                    },
                    { url: _0x5d88b5 },
                  );
                else {
                  if (_0x95f891 == _0x8fba8e(0x124))
                    var _0x54daf3 = await sock[_0x3f8a83][_0x8fba8e(0x176)](
                      _0x193916,
                      {
                        document: { url: _0x5d88b5 },
                        mimetype: _0x8fba8e(0x14b),
                        fileName: _0x1a7ab5 + _0x8fba8e(0x12d),
                      },
                      { url: _0x5d88b5 },
                    );
                  else {
                    if (_0x95f891 == _0x8fba8e(0x112))
                      var _0x54daf3 = await sock[_0x3f8a83]['sendMessage'](
                        _0x193916,
                        {
                          document: { url: _0x5d88b5 },
                          mimetype: _0x8fba8e(0x172),
                          fileName: _0x1a7ab5 + _0x8fba8e(0x12b),
                        },
                        { url: _0x5d88b5 },
                      );
                    else {
                      if (_0x95f891 == _0x8fba8e(0x10e))
                        var _0x54daf3 = await sock[_0x3f8a83][_0x8fba8e(0x176)](
                          _0x193916,
                          {
                            document: { url: _0x5d88b5 },
                            mimetype: _0x8fba8e(0x163),
                          },
                          { url: _0x5d88b5 },
                        );
                      else
                        return (
                          console[_0x8fba8e(0x10c)](_0x8fba8e(0x12e)),
                          {
                            error: !![],
                            message: 'Please\x20add\x20your\x20won\x20role\x20of\x20mimetype',
                          }
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
    return _0x54daf3;
  } catch (_0x49ee29) {
    return ![];
  }
}
async function sendButtonMessage(_0x241def, _0x1386e6, _0x1aa963, _0x13c255, _0x20e356, _0x408aec) {
  const _0x5339b8 = _0x49c27d;
  let _0x33656c = _0x5339b8(0x15b);
  try {
    const _0x711b24 = _0x1aa963[_0x5339b8(0x135)]((_0x38a396, _0x110b8b) => {
      return {
        buttonId: _0x110b8b,
        buttonText: { displayText: _0x38a396['displayText'] },
        type: 0x1,
      };
    });
    if (_0x408aec)
      var _0x47a58f = {
        image: _0x33656c == _0x5339b8(0x15b) ? { url: _0x408aec } : fs[_0x5339b8(0x178)](_0x5339b8(0x175) + _0x408aec),
        caption: _0x13c255,
        footer: _0x20e356,
        buttons: _0x711b24,
        headerType: 0x4,
        viewOnce: !![],
      };
    else
      var _0x47a58f = {
        text: _0x13c255,
        footer: _0x20e356,
        buttons: _0x711b24,
        headerType: 0x1,
        viewOnce: !![],
      };
    const _0x6ae6cc = await sock[_0x241def][_0x5339b8(0x176)](formatReceipt(_0x1386e6), _0x47a58f);
    return _0x6ae6cc;
  } catch (_0x532a48) {
    return console[_0x5339b8(0x10c)](_0x532a48), ![];
  }
}
function _0x3c2a(_0x57bbac, _0x1f3256) {
  const _0x4feab5 = _0x4fea();
  return (
    (_0x3c2a = function (_0x3c2afa, _0x54c478) {
      _0x3c2afa = _0x3c2afa - 0x10a;
      let _0x262d92 = _0x4feab5[_0x3c2afa];
      return _0x262d92;
    }),
    _0x3c2a(_0x57bbac, _0x1f3256)
  );
}
async function sendTemplateMessage(_0x5de8c1, _0x4ae702, _0x25058c, _0x1e04d4, _0x371212, _0x3212b6) {
  const _0x415170 = _0x49c27d;
  try {
    if (_0x3212b6)
      var _0x366878 = {
        caption: _0x1e04d4,
        footer: _0x371212,
        viewOnce: !![],
        templateButtons: _0x25058c,
        image: { url: _0x3212b6 },
        viewOnce: !![],
      };
    else
      var _0x366878 = {
        text: _0x1e04d4,
        footer: _0x371212,
        viewOnce: !![],
        templateButtons: _0x25058c,
      };
    const _0x4109ed = await sock[_0x5de8c1]['sendMessage'](formatReceipt(_0x4ae702), _0x366878);
    return _0x4109ed;
  } catch (_0x12266f) {
    return console[_0x415170(0x10c)](_0x12266f), ![];
  }
}
async function sendListMessage(_0x2e67d3, _0x4699cd, _0x510451, _0x3b3229, _0x58c9ee, _0x3e496b, _0x2e4562) {
  try {
    const _0x22692a = {
        text: _0x3b3229,
        footer: _0x58c9ee,
        title: _0x3e496b,
        buttonText: _0x2e4562,
        sections: [_0x510451],
        viewOnce: !![],
      },
      _0x4cb7f2 = await sock[_0x2e67d3]['sendMessage'](formatReceipt(_0x4699cd), _0x22692a, {
        ephemeralExpiration: 0x93a80,
      });
    return _0x4cb7f2;
  } catch (_0xda03bc) {
    return console['log'](_0xda03bc), ![];
  }
}
async function sendPollMessage(_0x4e721e, _0x38b358, _0x1f6f07, _0x180fe1, _0x33ff4b) {
  try {
    const _0x1edb9f = await sock[_0x4e721e]['sendMessage'](formatReceipt(_0x38b358), {
      poll: {
        name: _0x1f6f07,
        values: _0x180fe1,
        selectableCount: _0x33ff4b,
      },
    });
    return _0x1edb9f;
  } catch (_0x519d68) {
    return console['log'](_0x519d68), ![];
  }
}
async function fetchGroups(_0x3e28d7) {
  const _0x12c810 = _0x49c27d;
  try {
    let _0x50c2a9 = await sock[_0x3e28d7][_0x12c810(0x12a)](),
      _0x2c1958 = Object[_0x12c810(0x16e)](_0x50c2a9)
        ['slice'](0x0)
        [_0x12c810(0x135)]((_0x436b41) => _0x436b41[0x1]);
    return _0x2c1958;
  } catch (_0x23878d) {
    return ![];
  }
}
async function isExist(_0x15d63b, _0x4bf7d6) {
  const _0x41fdd9 = _0x49c27d;
  try {
    if (typeof sock[_0x15d63b] === _0x41fdd9(0x116)) {
      const _0x3673d0 = await connectWaBeforeSend(_0x15d63b);
      if (!_0x3673d0) return ![];
    }
    if (_0x4bf7d6[_0x41fdd9(0x146)]('@g.us')) return !![];
    else {
      const [_0x1dba98] = await sock[_0x15d63b][_0x41fdd9(0x149)]('+' + _0x4bf7d6);
      return _0x4bf7d6[_0x41fdd9(0x166)] > 0xb ? _0x1dba98 : !![];
    }
  } catch (_0x1ac559) {
    return ![];
  }
}
async function getPpUrl(_0x252eb9, _0x3a3054, _0x547ab9) {
  const _0x3dd37f = _0x49c27d;
  let _0x375723;
  try {
    return (_0x375723 = await sock[_0x252eb9][_0x3dd37f(0x119)](_0x3a3054)), _0x375723;
  } catch (_0x128083) {
    return _0x3dd37f(0x121);
  }
}
function _0x4fea() {
  const _0x430594 = [
    '25999fGzzwT',
    'You\x20re\x20using\x20whatsapp\x20gateway\x20M\x20Pedia\x20v5.0.0\x20-\x20Contact\x20admin\x20if\x20any\x20trouble\x20:\x20082298859671',
    'argv',
    'console',
    'messages.upsert',
    'logout',
    '@whiskeysockets/baileys',
    '2119546WFeyWC',
    'xlsx',
    'log',
    'child',
    'mp3',
    ',\x20isLatest:\x20',
    '\x20is\x20deleted',
    '\x20Connection\x20failed,please\x20scan\x20first',
    'zip',
    'Connecting..',
    'connection-open',
    '.doc',
    'undefined',
    'rmSync',
    'pdf',
    'profilePictureUrl',
    'application/msword',
    'application/pdf',
    '\x20connection\x20failed',
    'Disconnect',
    'writeFileSync',
    'send',
    'Stream\x20Errored\x20(conflict)',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/1200px-WhatsApp.svg.png',
    'message',
    'join',
    'docx',
    '340030lSZaZX',
    '122.0.6261.111',
    'xls',
    'Unauthorized',
    './lib/helper',
    'groupFetchAllParticipating',
    '.zip',
    '.pdf',
    '.docx',
    'Please\x20add\x20your\x20won\x20role\x20of\x20mimetype',
    'application/excel',
    '../instances/',
    'exports',
    'credentials/',
    'audio',
    '/error.txt',
    'map',
    'Request\x20QR\x20ended.\x20reload\x20scan\x20to\x20request\x20QR\x20again',
    'qrcode',
    '771708nNQkwz',
    '24ZEepjr',
    './controllers/incomingMessage',
    'split',
    'open',
    'Connected',
    '\x20connection\x20restored',
    'please\x20scan\x20with\x20your\x20Whatsapp\x20Account',
    '12268236ihtrDq',
    '@s.whatsapp.net',
    'audio/mpeg',
    'creds',
    'Please\x20scann\x20qrcode',
    '27MUpnLx',
    'includes',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'contacts.upsert',
    'onWhatsApp',
    'json',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    '.xls',
    'Nothing\x20deleted',
    'video',
    'Chrome',
    'status',
    'error',
    'creds.update',
    'doc',
    'loggedOut',
    'Connection\x20closed.\x20You\x20are\x20logged\x20out.',
    'utf-8',
    '34076ruMAuz',
    'process',
    'Please\x20scan\x20with\x20your\x20Whatsapp\x20Account',
    'axios',
    'url',
    '60AujWLh',
    '@hapi/boom',
    'existsSync',
    '10bJieUJ',
    'Already\x20connected',
    'user',
    '--mobile',
    'application/mp3',
    '640thIqgJ',
    'image',
    'length',
    'body',
    'stringify',
    'Deleting\x20session\x20and\x20credential',
    'sock',
    'payload',
    'close',
    'connection.update',
    'entries',
    'output',
    'emit',
    '37659oLhWeZ',
    'application/zip',
    'keys',
    'statusCode',
    'src/public/temp/',
    'sendMessage',
    './database/index',
    'readFileSync',
  ];
  _0x4fea = function () {
    return _0x430594;
  };
  return _0x4fea();
}
async function deleteCredentials(_0x1db27a, _0x166ce6 = null) {
  const _0x33317e = _0x49c27d;
  _0x166ce6 !== null &&
    _0x166ce6[_0x33317e(0x170)](_0x33317e(0x122), {
      token: _0x1db27a,
      message: 'Logout\x20Progres..',
    });
  try {
    if (typeof sock[_0x1db27a] === _0x33317e(0x116)) {
      const _0x590c8e = await connectWaBeforeSend(_0x1db27a);
      _0x590c8e && (sock[_0x1db27a][_0x33317e(0x17e)](), delete sock[_0x1db27a]);
    } else sock[_0x1db27a][_0x33317e(0x17e)](), delete sock[_0x1db27a];
    return (
      delete qrcode[_0x1db27a],
      clearInterval(intervalStore[_0x1db27a]),
      setStatus(_0x1db27a, _0x33317e(0x11d)),
      _0x166ce6 != null &&
        (_0x166ce6[_0x33317e(0x170)](_0x33317e(0x128), _0x1db27a),
        _0x166ce6[_0x33317e(0x170)]('message', {
          token: _0x1db27a,
          message: _0x33317e(0x155),
        })),
      fs['existsSync'](_0x33317e(0x130) + _0x1db27a) &&
        fs[_0x33317e(0x117)](_0x33317e(0x130) + _0x1db27a, { recursive: !![], force: !![] }, (_0x919548) => {
          const _0x398374 = _0x33317e;
          if (_0x919548) console[_0x398374(0x10c)](_0x919548);
        }),
      { status: !![], message: _0x33317e(0x169) }
    );
  } catch (_0x33a5f9) {
    return console['log'](_0x33a5f9), { status: !![], message: _0x33317e(0x14d) };
  }
}
function clearConnection(_0x526411) {
  const _0x4eaf0c = _0x49c27d;
  clearInterval(intervalStore[_0x526411]),
    delete sock[_0x526411],
    delete qrcode[_0x526411],
    setStatus(_0x526411, _0x4eaf0c(0x11d)),
    fs[_0x4eaf0c(0x15e)](_0x4eaf0c(0x130) + _0x526411) &&
      (fs[_0x4eaf0c(0x117)](_0x4eaf0c(0x130) + _0x526411, { recursive: !![], force: !![] }, (_0x491701) => {
        const _0x561202 = _0x4eaf0c;
        if (_0x491701) console[_0x561202(0x10c)](_0x491701);
      }),
      console[_0x4eaf0c(0x10c)](_0x4eaf0c(0x132) + _0x526411 + _0x4eaf0c(0x110)));
}
async function initialize(_0x224115, _0x430ec6) {
  const _0x5ef93a = _0x49c27d,
    { token: _0x122975 } = _0x224115[_0x5ef93a(0x167)];
  if (_0x122975) {
    const _0x4e9796 = require('fs'),
      _0x2ce2be = _0x5ef93a(0x130) + _0x122975;
    if (_0x4e9796[_0x5ef93a(0x15e)](_0x2ce2be)) {
      sock[_0x122975] = undefined;
      const _0x16efc0 = await connectWaBeforeSend(_0x122975);
      return _0x16efc0
        ? _0x430ec6['status'](0xc8)[_0x5ef93a(0x14a)]({
            status: !![],
            message: _0x122975 + _0x5ef93a(0x13e),
          })
        : _0x430ec6[_0x5ef93a(0x150)](0xc8)['json']({
            status: ![],
            message: _0x122975 + _0x5ef93a(0x11c),
          });
    }
    return _0x430ec6['send']({
      status: ![],
      message: _0x122975 + _0x5ef93a(0x111),
    });
  }
  return _0x430ec6[_0x5ef93a(0x11f)]({
    status: ![],
    message: 'Wrong\x20Parameterss',
  });
}

async function whatsappEvents(session, socket) {
  // the process function lets you process all events that just occurred
  // efficiently in a batch
  socket.ev.process(
    // events is a map for event name => event data
    async (events) => {
      // something about the connection changed
      // maybe it closed, or we received all offline message or connection opened
      if (events['connection.update']) {
        const update = events['connection.update'];
        // await callWebHook(session, 'connection.update', update);
      }

      if (events['labels.association']) {
        // await callWebHook(session, 'labels.association', events['labels.association']);
      }

      if (events['labels.edit']) {
        // await callWebHook(session, 'labels.edit', events['labels.edit']);
      }

      if (events.call) {
        // await callWebHook(session, 'call', events.call);
      }

      // history received
      if (events['messaging-history.set']) {
        // await callWebHook(session, 'messaging-history.set', events['messaging-history.set']);
        await waMonitor.loadInstance();

        const { chats, contacts, messages, isLatest } = events['messaging-history.set'];
        console.log(
          `recv ${chats.length} chats, ${contacts.length} contacts, ${messages.length} msgs (is latest: ${isLatest})`,
        );
      }

      // received a new message
      if (events['messages.upsert']) {
        // await callWebHook(session, 'messages.upsert', events['messages.upsert']);
      }

      // messages updated like status delivered, message deleted etc.
      if (events['messages.update']) {
        // await callWebHook(session, 'messages.update', events['messages.update']);
      }

      if (events['message-receipt.update']) {
        // await callWebHook(session, 'message-receipt.update', events['message-receipt.update']);
      }

      if (events['messages.reaction']) {
        // await callWebHook(session, 'messages.reaction', events['messages.reaction']);
        console.log(events['messages.reaction']);
      }

      if (events['presence.update']) {
        // await callWebHook(session, 'presence.update', events['presence.update']);
        console.log(events['presence.update']);
      }

      if (events['chats.update']) {
        // await callWebHook(session, 'chats.update', events['chats.update']);
        console.log(events['chats.update']);
      }

      if (events['contacts.update']) {
        // await callWebHook(session, 'contacts.update', events['contacts.update']);
      }

      if (events['chats.delete']) {
        // await callWebHook(session, 'chats.delete', events['chats.delete']);
        console.log('chats deleted ', events['chats.delete']);
      }
    },
  );
  return socket;
}

async function callWebHook(session, event, data) {
  console.log('session callback');
  console.log(session);
  const webhook = `https://api.apploxa.com/hook/whatsapp/callback?session=${session.session ?? session}`;
  let allData = { data, event };
  console.log('allData');
  console.log(allData);
  if (webhook) {
    await axios
      .post(webhook, allData)
      .then(() => {})
      .catch((e) => {
        console.log('Error calling Webhook.', e);
      });
  }
}

module[_0x49c27d(0x131)] = {
  connectToWhatsApp: connectToWhatsApp,
  sendText: sendText,
  sendMedia: sendMedia,
  sendButtonMessage: sendButtonMessage,
  sendTemplateMessage: sendTemplateMessage,
  sendListMessage: sendListMessage,
  sendPollMessage: sendPollMessage,
  isExist: isExist,
  getPpUrl: getPpUrl,
  fetchGroups: fetchGroups,
  deleteCredentials: deleteCredentials,
  sendMessage: sendMessage,
  initialize: initialize,
  connectWaBeforeSend: connectWaBeforeSend,
};
