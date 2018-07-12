const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/football");
const conn = mongoose.connection;
conn.on("connected", function (err, db) {
    if (err) {
        console.log('连接失败！');
        return;
    } else {
        console.log('连接成功！');
    }
});

const userSchema = mongoose.Schema({
    "username": {type: String, required: true},
    "password": {type: String, required: true},
    "phone": {type: String, required: true},
    "phonecode": {type: String},
    "fcname": {type: String, required: true},
    "fc": {type: String, required: true},
    "lx": {type: String, required: true},
    "money":{type: Number, required:true},
    "level":{type: Number, required:true},
    "formation":{type: String},
    "formation_position":{type: Array},
    "createtime": {type: String, required: true}
});

mongoose.model("user", userSchema);

const facilitiesSchema = mongoose.Schema({
    "title":{type:String,required:true},
    "level":{type:Number,required:true},
    "userid":{type:String,required:true},
    "nowTime":{type:String,required:true},
    "needTime":{type:String,required:true},
    "stat":{type:Number,required:true},
    "upgradeTime":{type:String}
});
mongoose.model("facilities", facilitiesSchema);

const playerSchema = mongoose.Schema({
    "truename":{type:String,required:true},
    "pic":{type:String,required:true},
    "nickname":{type:String},
    "nation":{type:String,required:true},           //国籍
    "age":{type:Number,required:true},
    "height":{type:Number,required:true},
    "position":{type:String,required:true},
    "feet":{type:String,required:true},
    "weight":{type:Number,required:true},
    "money":{type:Number,required:true},
    "attack":{type:Number,required:true},
    "defense":{type:Number,required:true},
    "energy":{type:Number,required:true},
    "speed":{type:Number,required:true},
    "dribbling":{type:Number,required:true},
    "short":{type:Number,required:true},
    "long":{type:Number,required:true},
    "shoot":{type:Number,required:true},
    "skill":{type:Number,required:true},
    "gatek":{type:Number,required:true},
    "userid":{type:String,required:true},
    "stat":{type:Number,required:true},                     //0表示替补，1表示首发
    "stat_pos":{type:Number},                               //首发位置
    "statNumber":{type:Number},
    "capacity":{type:Number,required:true},
    "potential":{type:Number,required:true},                //潜能
    "level":{type:Number,required:true},                    //等级
    "talent":{type:Number,required:true},                   //天赋
    "experien":{type:Number,required:true},                 //经验
    "upgrade":{type:Number,required:true},                  //经验
    "upgrade_experien":{type:Number,required:true},         //升级经验
    "types":{type:Number,required:true}                     //0表示一线队，1表示梯队，2表示青年队，3表示选拔队
});

mongoose.model("player",playerSchema);

module.exports = {
    getModel(model) {
        return mongoose.model(model);
    }
};