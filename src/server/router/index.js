"use strict";
function _0x30a6(_0x4fce58, _0x3e0572) {
  const _0x4ec043 = _0x4ec0();
  return (
    (_0x30a6 = function (_0x30a638, _0x311cd7) {
      _0x30a638 = _0x30a638 - 0x84;
      let _0x24dbd8 = _0x4ec043[_0x30a638];
      return _0x24dbd8;
    }),
    _0x30a6(_0x4fce58, _0x3e0572)
  );
}
const _0x2f60e6 = _0x30a6;
(function (_0x189ddb, _0xb3f943) {
  const _0x3bc65b = _0x30a6,
    _0xc6523a = _0x189ddb();
  while (!![]) {
    try {
      const _0x53b9ca =
        parseInt(_0x3bc65b(0x8b)) / 0x1 +
        (parseInt(_0x3bc65b(0x89)) / 0x2) * (parseInt(_0x3bc65b(0x85)) / 0x3) +
        (parseInt(_0x3bc65b(0xa2)) / 0x4) * (parseInt(_0x3bc65b(0xb0)) / 0x5) +
        (-parseInt(_0x3bc65b(0x84)) / 0x6) * (parseInt(_0x3bc65b(0xac)) / 0x7) +
        parseInt(_0x3bc65b(0x91)) / 0x8 +
        -parseInt(_0x3bc65b(0x9f)) / 0x9 +
        (parseInt(_0x3bc65b(0xa8)) / 0xa) * (-parseInt(_0x3bc65b(0x9e)) / 0xb);
      if (_0x53b9ca === _0xb3f943) break;
      else _0xc6523a["push"](_0xc6523a["shift"]());
    } catch (_0x4de7d4) {
      _0xc6523a["push"](_0xc6523a["shift"]());
    }
  }
})(_0x4ec0, 0x98634);
function _0x4ec0() {
  const _0x16ce55 = [
    "../../public/index.html",
    "success",
    "Cache\x20cleared",
    "6718971qrVcNP",
    "log",
    "/backend-send-media",
    "/backend-logout",
    "4918955XZqlUw",
    "6WAZjAV",
    "2220288Zfabuz",
    "sendTemplateMessage",
    "fetchGroups",
    "logoutDevice",
    "2OUoclV",
    "flushAll",
    "506604QbddIM",
    "/backend-blast",
    "./../lib/cache",
    "get",
    "/backend-check-number",
    "/backend-clearCache",
    "8827768LmLAIR",
    "join",
    "Router",
    "/backend-generate-qr",
    "/backend-logout-device",
    "path",
    "/backend-initialize",
    "sendButtonMessage",
    "/backend-send-list",
    "sendPoll",
    "checkNumber",
    "../controllers",
    "deleteCredentials",
    "6791675Zbompu",
    "10192536hFRXaZ",
    "express",
    "../controllers/blast",
    "4fqCZzx",
    "/backend-send-button",
    "post",
    "createInstance",
    "../whatsapp",
    "myCache",
    "10nGzsBi",
  ];
  _0x4ec0 = function () {
    return _0x16ce55;
  };
  return _0x4ec0();
}
const cache = require(_0x2f60e6(0x8d)),
  express = require(_0x2f60e6(0xa0)),
  router = express[_0x2f60e6(0x93)](),
  controllers = require(_0x2f60e6(0x9c)),
  { initialize } = require(_0x2f60e6(0xa6)),
  { sendBlastMessage } = require(_0x2f60e6(0xa1)),
  {
    checkDestination,
    checkConnectionBeforeBlast,
  } = require("../lib/middleware");
router[_0x2f60e6(0x8e)]("/", (_0x5a98a8, _0x26f99b) => {
  const _0x200486 = _0x2f60e6,
    _0xdba14 = require(_0x200486(0x96));
  _0x26f99b["sendFile"](_0xdba14[_0x200486(0x92)](__dirname, _0x200486(0xa9)));
}),
  router[_0x2f60e6(0xa4)](_0x2f60e6(0xaf), controllers[_0x2f60e6(0x9d)]),
  router[_0x2f60e6(0xa4)](_0x2f60e6(0x94), controllers[_0x2f60e6(0xa5)]),
  router[_0x2f60e6(0xa4)](_0x2f60e6(0x97), initialize),
  router[_0x2f60e6(0xa4)](
    _0x2f60e6(0x99),
    checkDestination,
    controllers["sendListMessage"]
  ),
  router[_0x2f60e6(0xa4)](
    "/backend-send-template",
    checkDestination,
    controllers[_0x2f60e6(0x86)]
  ),
  router[_0x2f60e6(0xa4)](
    _0x2f60e6(0xa3),
    checkDestination,
    controllers[_0x2f60e6(0x98)]
  ),
  router[_0x2f60e6(0xa4)](
    _0x2f60e6(0xae),
    checkDestination,
    controllers["sendMedia"]
  ),
  router["post"](
    "/backend-send-text",
    checkDestination,
    controllers["sendText"]
  ),
  router["post"](
    "/backend-send-poll",
    checkDestination,
    controllers[_0x2f60e6(0x9a)]
  ),
  router[_0x2f60e6(0xa4)]("/backend-getgroups", controllers[_0x2f60e6(0x87)]),
  router["post"](_0x2f60e6(0x8c), checkConnectionBeforeBlast, sendBlastMessage),
  router[_0x2f60e6(0xa4)](_0x2f60e6(0x95), controllers[_0x2f60e6(0x88)]),
  router[_0x2f60e6(0xa4)](_0x2f60e6(0x8f), controllers[_0x2f60e6(0x9b)]),
  router["post"](_0x2f60e6(0x90), async (_0x41355b, _0x5406e3) => {
    const _0x3b2c08 = _0x2f60e6;
    return (
      await cache[_0x3b2c08(0xa7)][_0x3b2c08(0x8a)](),
      console[_0x3b2c08(0xad)](_0x3b2c08(0xab)),
      _0x5406e3["json"]({ status: _0x3b2c08(0xaa) })
    );
  }),
  (module["exports"] = router);

