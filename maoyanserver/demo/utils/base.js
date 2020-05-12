const crypto = require('crypto');
const svgCaptcha= require("svg-captcha");
var setCrypto=(info)=>{
   return crypto.createHmac('sha256', 'abcdefg')
                .update(info)
                .digest('hex');
}
var createverify=(req,res,next)=>{
  var verifyImg = svgCaptcha.create({
    size: 4,// 验证码长度
    ignoreChars: '0o1i', // 验证码字符中排除 0o1i
    noise: 2, // 干扰线条的数量
    height: 44 ,
    width:150,
    fontSize:42,
    color:true,//开启文字颜色
    background:"#cc9966",//背景色
  });
  req.session.verifyImg=verifyImg.text.toLowerCase(); //存session用于验证接口获取文字码,不区分大小写
  console.log( req.session.verifyImg);
  var codeData = {
    img:verifyImg.data
}
res.type('svg');
res.status(200).send(verifyImg.data);
}
module.exports={
  setCrypto,
  createverify

}