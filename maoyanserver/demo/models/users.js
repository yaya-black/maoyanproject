var mongoose = require('mongoose');
var {Head}=require('../utils/config.js');
var url=require('url');
mongoose.set('useCreateIndex', true);
var UserSchema = new mongoose.Schema({  //建字段
    username: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true },
    email: { type: String, required: true, index: { unique: true } },
    date: { type: Date, default: Date.now() },
    isAdmin:{type:Boolean,default:false},
    isFreeze:{type:Boolean,default:false},
    isHead:{type:String,default:url.resolve(Head.baseUrl,'default.jpg')}
});
var UserModel = mongoose.model('user', UserSchema);  //建模型，第一个user为表名
UserModel.createIndexes();//使得用户名和邮箱能够满足唯一的要求
//方法
var save = (data) => {
    var user = new UserModel(data); //创建user的实例
    return user.save()
        .then(() => {
            return true;
        })
        .catch(() => {
            return false;
        });

};
var findLogin = (data) => {
    return UserModel.findOne(data);
}
var updatePassword =(email,password)=>{
    return UserModel.update({ email }, { $set: { password } })
        .then(() => {
            return true;
        })
        .catch(() => {
            return false;
        });
}
var usersList=()=>{
    return UserModel.find();
}
var updateFreeze = (email, isFreeze) => {
    return UserModel.update({ email }, { $set: { isFreeze } })
        .then(() => {
            return true;
        })
        .catch(() => {
            return false;
        });
}
var deleteUser=(email)=>{
    return UserModel.deleteOne({email});
}
var updateUserHead=(username,isHead)=>{
    return UserModel.update({username }, { $set: { isHead } })
    .then(() => {
        return true;
    })
    .catch(() => {
        return false;
    });
  }
module.exports = {
    save,
    findLogin,
    updatePassword,
    usersList,
    updateFreeze,
    deleteUser,
    updateUserHead
};