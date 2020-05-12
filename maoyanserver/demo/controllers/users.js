var {Email,Head }=require('../utils/config.js');
var UserModel=require('../models/users.js');
var {setCrypto,createverify} = require('../utils/base.js');
var fs=require('fs');
var url=require('url');
var login = async (req,res,next)=>{
  var {username,password,verifyImg}=req.body;
  if(verifyImg!=req.session.verifyImg){
    res.send({
      msg:'验证码输入错误',
      status:-3
    })
    return;
  }
  var result=await UserModel.findLogin({
    username,
    password:setCrypto(password),
  })
  if(result){
    req.session.username=username;
    req.session.isAdmin=result.isAdmin;
    req.session.isHead=result.isHead;
    if(result.isFreeze){
      res.send({
        msg:'账号已冻结',
        status:-2
      });
    }
  else{
    res.send({
      msg:'登录成功',
      status:0
    });
  }
  }
  else{
    res.send({
      msg:'登录失败',
      status:-1
    });
  }
};


var register = async (req,res,next)=>{
	
	var {username,password,email,verify}=req.body;  //post请求解析
    if(email!==req.session.email||verify!==req.session.verify){
        res.send({
            msg:'验证码错误',
            status:-1
        });
        return;
    }
    if((Email.time-req.session.time)/1000>60){
      res.send({
        msg:'验证码已过期',
        status:-3
      });
      return;
    }
    var result=await UserModel.save({
      username,
      password:setCrypto(password),
      email
    });
    if(result){
      res.send({
          msg:'注册成功',
          status:0
      });
  }
  else{
      res.send({
          msg:'注册失败',
          status:-2
      });
  }
};

var verify = async (req,res,next)=>{
    var email=req.query.email;
    var verify=Email.verify; 
    // 下面两行通过session来数据持久化（邮箱与验证码需要对应）
    req.session.verify=verify;
    req.session.email=email;
    req.session.time=Email.time;

    // req.session.time=Email.time;
    var mailOptions = {
        from: 'jylblack@qq.com', // 发送者,与上面的user一致
        to:email, // 接收者,可以同时发送多个,以逗号隔开
        subject: '喵喵网邮箱验证码', // 标题
        text: '验证码:'+verify // 文本
      };
      Email.transporter.sendMail(mailOptions,(err)=>{  
        if(err){
        res.send({
                msg:'验证码发送失败',
                status:-1,
            });
        }
        else{
        res.send({
          msg:'验证码发送成功',
          status:0
      }); 
    }
  });
	
};

var logout = async (req,res,next)=>{
  req.session.username='';
  res.send({
    msg:'退出成功',
    status:0
  });
};

var getUser = async (req,res,next)=>{
	if(req.session.username){
    res.send({
      msg:"获取用户信息成功",
      status:0,
      data:{
        username:req.session.username,
        isAdmin:req.session.isAdmin,
        isHead:req.session.isHead
      }
    })
  }
  else{
    res.send({
      msg:"获取用户信息失败",
      status:-1
    });
  }

};

var findPassword = async (req,res,next)=>{
  var{email,password,verify}=req.body;
  if(email==req.session.email&&verify==req.session.verify){
    if((Email.time-req.session.time)/1000>60){
      res.send({
        msg:'验证码已过期',
        status:-3
      });
      return;
    }
    var result=await UserModel.updatePassword(email,setCrypto(password));
    if(result){
      res.send({
        msg:'修改密码成功',
        status:0
      });
      
    }
    else{
      res.send({
        msg:'修改密码失败',
        status:-1
      });
    }
  }
  else{
    res.send({
      msg:'验证码错误',
      status:-2
    });
  }
};

//验证码部分的方法
var verifyImg = async (req,res,next)=>{
  var result=await createverify(req,res);
  if(result){
    // res.send(result);
    res.send({
      msg:'图片生成成功',
      status:0
    })
  } 
}

var uploadUserHead = async (req,res,next)=>{
	await fs.rename('public/uploads/'+req.file.filename,'public/uploads/'+req.session.username+'.jpg',function() {});
  // console.log(req.file);
  var result=await UserModel.updateUserHead(req.session.username,url.resolve(Head.baseUrl,req.session.username+'.jpg'));
  if(result){
    res.send({
      msg:'头像修改成功',
      status:0,
      data:{
        isHead: url.resolve(Head.baseUrl,req.session.username+'.jpg')
      }
    })
  }
  else{
    res.send({
      msg:'头像修改失败',
      status:-1
    });
  }
}

module.exports = {
	login,
	register,
	verify,
	logout,
	getUser,
	findPassword,
	verifyImg,
	uploadUserHead
};