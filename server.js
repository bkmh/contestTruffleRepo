const express = require('express');
const app = express();
const port = 3000 || process.env.PORT;
const Web3 = require('web3');

// truffle 기반으로 설정을 위한 js 파일 로드
const truffle_connect = require('./src/etherApp.js');

// batteryPaymentToken Contract 관련 js 파일 로드
const batteryPaymentToken_connect = require('./src/batteryPaymentTokenApp.js');

const bodyParser = require('body-parser');
const multer = require('multer');
//const cors = require('cors');
const path = require('path');
const fs = require('fs');
const crpyto = require('crypto');
const request = require('request');
const utf8 = require('utf8');

const IS_SAVING_COMPAIRE_IMAGE_DATA = 'N';
const THRESHOLD = 0;

// For ENOENT Error Debugging
// 해당 함수를 통해 실제 누락되는 부분에 대해 확인 가능함
(function() {
  var childProcess = require("child_process");
  var oldSpawn = childProcess.spawn;
  function mySpawn() {
      console.log('spawn called');
      console.log(arguments);
      var result = oldSpawn.apply(this, arguments);
      return result;
  }
  childProcess.spawn = mySpawn;
})();

// multer storage setup
var _storage = multer.diskStorage({
  // 사용자가 전송한 파일의 저장위치
  destination: function (req, file, cb) {
    let dir = path.join(__dirname, '/uploads/');
    !fs.existsSync(dir) && fs.mkdirSync(dir); // 폴더가 없을 경우 생성
    cb(null, dir);
  },

  // 사용자 전송한 파일의 파일명
  // filename 속성을 입력하지 않으면, multer에서 자동으로 파일명을 중복되지 않도록 생성해주나,
  // 파일의 확장자가 없어지므로, 확장자를 함께 입력하면서, 중복되지 않은 파일명을 생성하도록 입력
  filename: function (req, file, cb) {

    // crypto 함수를 통해 18byte의 random 문자열 생성
    let customFileName = crpyto.randomBytes(18).toString('hex');
    
    console.log(file.mimetype);

    if (file.mimetype.split('/')[0] != 'image') {
      throw new Error('This file is not Image');
    }
    
    let extension = file.mimetype.split('/')[1];

    // mimetype 이 image/jpeg인 경우에도 .jpg 파일로 생성
    if (extension == 'jpeg') {
      extension = 'jpg';
    }

    cb(null, customFileName + "." + extension);

  }
});

var upload = multer({ storage: _storage });