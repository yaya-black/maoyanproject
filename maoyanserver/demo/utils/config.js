
var mongoose = require('mongoose');
var nodemailer = require('nodemailer');

var Mongoose = {
	
	url : 'mongodb://localhost:27017/maoyan',
	connect(){
		mongoose.connect(this.url ,{ useNewUrlParser: true,useUnifiedTopology: true }, (err)=>{
			if(err){
				console.log('数据库连接失败');
				return;
			}
			console.log('数据库连接成功');
		});
	}
};
var Email = {
	config:{
		host:"smtp.qq.com", //发送的邮箱服务器，在\node_modules\nodemailer\lib\well-known\services.json中查看
		secure: true,
		port: 465, // 端口就是465
		auth: {
		user: 'jylblack@qq.com', //发件人
		pass: 'fkmegredgyaojjba', // 授权码
	  }
},
get transporter(){
	return nodemailer.createTransport(this.config); //创建一个smtp客户端对象
},
//生成验证码
get verify(){
	return Math.random().toString().substring(2,6);
},
get time(){
	return Date.now();//返回毫秒数
}
};
var Head={
    baseUrl:'http://localhost:3000/uploads/'
}
module.exports = {
	Mongoose,
	Email,
	Head
	
};