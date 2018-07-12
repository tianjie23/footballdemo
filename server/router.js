const express = require("express");
const md5 = require("blueimp-md5");
const async = require('async');
const models = require("./models");
const familyNames_data = require("./familyNames-data");
const givenNames_data = require("./givenNames-data");
const position_data = require("./position-data");
const nation_data = require("./nation-data");
const feet_data = require("./feet-data");
const player_imgs_data = require("./player-imgs-data");
const filter = {password: 0};

const UserModel = models.getModel("user");
const FacilitiesModel = models.getModel("facilities");
const PlayerModel = models.getModel("player");
const time = new Date().getTime();
const router = express.Router();

// function listenLogin(req,res){
//     const userid = req.cookies.userid;
//     if(!userid){
//         res.send({status:10,msg:"未登录"});
//         //return;
//     }else{
//         UserModel.findOne({_id:userid}, function (err, user) {
//             if (err) {
//                 res.send({status: 1, msg: "登录有误！" + err});
//                 //return;
//             }
//             if (!user) {
//                 res.send({status: 10,msg:"未登录"});
//             }
//         });
//     }
// }


//用户注册路由
router.post("/register", function (req, res) {
    const {username, password, fcname, phone, fc, lx} = req.body;
    UserModel.findOne({username}, function (err, user) {
        if (user) {
            res.send({status: 1, msg: "用户已存在"});
            // return;
        } else {
            UserModel.findOne({fcname}, function (err, user) {
                if (user) {
                    res.send({status: 1, msg: "球队名称已存在"});
                    // return;
                } else {
                    new UserModel({
                        username,
                        password: md5(password),
                        fcname,
                        phone,
                        fc,
                        lx,
                        level: 1,
                        money: 1000000,
                        createtime: time
                    }).save(function (err, user) {
                        //console.log("添加有误！" + err);
                        if (err) {
                            res.send({status: 1, msg: "注册有误！" + err});
                            return;
                        }
                        new FacilitiesModel({
                            title: "训练设施",
                            level: 1,
                            userid: user._id,
                            nowTime: "30",
                            needTime: "30",
                            stat: 0
                        }).save();

                        new FacilitiesModel({
                            title: "学院设施",
                            level: 1,
                            userid: user._id,
                            nowTime: "30",
                            needTime: "30",
                            stat: 0
                        }).save();

                        new FacilitiesModel({
                            title: "球探中心",
                            level: 1,
                            userid: user._id,
                            nowTime: "30",
                            needTime: "30",
                            stat: 0
                        }).save();

                        new FacilitiesModel({
                            title: "体育场",
                            level: 1,
                            userid: user._id,
                            nowTime: "30",
                            needTime: "30",
                            stat: 0
                        }).save();

                        new FacilitiesModel({
                            title: "医疗中心",
                            level: 1,
                            userid: user._id,
                            nowTime: "30",
                            needTime: "30",
                            stat: 0
                        }).save();
                        //res.clearCookie("userid");
                        //console.log("1",req.cookies.userid,user._id);
                        res.cookie("userid", user._id, {maxAge: 1000 * 60 * 60 * 24 * 7});
                        //console.log("2",req.cookies.userid,user._id);
                        res.send({status: 0, data: {_id: user._id, username, fcname, phone, fc, lx}});
                    });
                }
            });
        }
    })
});


router.post("/get_upgrade_facilities", function (req, res) {
    // 取出cookie中的userid
    const userid = req.cookies.userid;
    const {id} = req.body;
    if (!id) {
        return res.send({status: 1, msg: '未找到信息1'})
    }
    //console.log(userid);
    if (!userid) {
        return res.send({status: 1, msg: '请先登陆'})
    }
    FacilitiesModel.findOne({_id: id, userid}, function (err, fac) {
        if (!fac) {
            return res.send({status: 1, msg: '未找到信息2'})
        }
        const level = fac.level;
        const nowTime = fac.nowTime;
        const stat = fac.stat;
        const data = {level, nowTime, stat};
        res.send({status: 0, data});
    });
});

router.post("/upgrade_facilities", function (req, res) {
    // 取出cookie中的userid
    const userid = req.cookies.userid;
    const {id, stat} = req.body;
    if (!id) {
        return res.send({status: 1, msg: '未找到信息1'})
    }
    //console.log(userid);
    if (!userid) {
        return res.send({status: 1, msg: '请先登陆'})
    }
    FacilitiesModel.findOne({_id: id, userid}, function (err, fac) {
        if (!fac) {
            return res.send({status: 1, msg: '未找到信息2'})
        }
        const level = fac.level;
        if (level >= 9) {
            return res.send({status: 1, msg: '已经最高等级'})
        }
        //console.log("-----------------------");
        if (stat === 0) {
            const needTime = (level + 1) * 1 * 1000;      //一个等级需要15秒
            const nowTime = new Date().getTime() + needTime;
            FacilitiesModel.update({_id: id, userid}, {needTime, nowTime, stat: 1}, {multi: true}, function (err, fac) {
                res.send({status: 0, nowTime}) // 更新的数量
            })
        } else {
            FacilitiesModel.update({_id: id, userid, stat: 1}, {
                level: level + 1,
                stat: 0
            }, {multi: true}, function (err, fac) {
                res.send({status: 0, level}) // 更新的数量
            })
        }
    });
});

//用户登录路由
router.post("/login", function (req, res) {
    const {username, password, remember} = req.body;
    UserModel.findOne({username, password: md5(password)}, filter, function (err, user) {
        if (err) {
            res.send({status: 1, msg: "登录有误！" + err});
            return;
        }
        if (!user) {
            res.send({status: 1, msg: "用户名或密码错误！"});
        } else {
            //console.log(remember);
            var n = 0;
            if (remember) {
                n = 7
            }
            res.cookie("userid", user._id, {maxAge: 1000 * 60 * 60 * 24 * n});
            res.send({status: 0, data: user});
        }
    });
});


// 根据cookie获取对应的user
router.get('/user', function (req, res) {
    // 取出cookie中的userid
    const userid = req.cookies.userid;
    //console.log(userid);
    if (!userid) {
        return res.send({status: 1, msg: '请先登陆'})
    }

    // 查询对应的user
    UserModel.findOne({_id: userid}, filter, function (err, user) {
        if (!user) {
            // 清除浏览器保存userid的cookie
            res.clearCookie('userid');
            return res.send({status: 1, msg: '请先登陆'})
        } else {
            return res.send({status: 0, data: user})
        }
    })
});


// 根据cookie获取对应的user
router.get('/facilities', function (req, res) {
    // 取出cookie中的userid
    const userid = req.cookies.userid;
    //console.log("userid",userid);
    if (!userid) {
        return res.send({status: 1, msg: '请先登陆'})
    }

    // 查询对应的user
    FacilitiesModel.find({userid: userid}, filter, function (err, facilities) {
        if (!facilities) {
            // 清除浏览器保存userid的cookie
            res.clearCookie('userid');
            return res.send({status: 1, msg: '请先登陆'})
        } else {
            return res.send({status: 0, data: facilities})
        }
    })
});

router.get("/get_player_info", function (req, res) {
    const userid = req.cookies.userid;
    let {id} = req.query;
    if (!userid) {
        return res.send({status: 1, msg: '请先登陆'});
    }
    if (!id) {
        return res.send({status: 1, msg: '信息有误'});
    }
    PlayerModel.findOne({userid, _id: id}, function (err, player) {
        if (err) {
            return res.send({status: 1, msg: '信息有误'})
        }
        if (!player) {
            return res.send({status: 1, msg: '信息有误'})
        }
        res.send({status: 0, data: player})
    })
});

router.get("/get_player", function (req, res) {

    const userid = req.cookies.userid;
    let {types, limit} = req.query;
    //console.log(types,"---",limit)
    if (!types) {
        types = 0
    } else {
        types = parseInt(types)
    }
    if (!limit) {
        limit = 0
    } else {
        limit = parseInt(limit)
    }
    //console.log(limits)
    if (!userid) {
        return res.send({status: 1, msg: '请先登陆'});
    }
    PlayerModel.find({userid: userid, types}).sort({'stat_pos':'desc'}).limit(limit).exec(function (err, playerList) {
        //console.log(playerList+err)
        if (err) {
            res.send({status: 1, msg: "球员列表获取失败！" + err});
            return;
        }
        if (playerList.length === 0) {
            res.send({status: 1, msg: "没有球员"});
        } else {
            res.send({status: 0, data: playerList});
        }
    })
});

//修改球员昵称
router.post('/set_player_nickname', function (req, res) {
    const userid = req.cookies.userid;
    if (!userid) {
        return res.send({status: 1, msg: '请先登陆'});
    }
    let {id, nickname} = req.body;
    if (!id) {
        return res.send({status: 1, msg: '有错'})
    }
    // if(!nickname){
    //     return res.send({status: 1, msg: '请填写昵称'})
    // }
    PlayerModel.findOne({_id: id, userid}, function (err, player) {
        if (err) {
            return res.send({status: 1, msg: '有错'})
        }
        if (!player) {
            return res.send({status: 1, msg: '未找到'})
        }
        PlayerModel.findByIdAndUpdate({_id: id}, {nickname: nickname}, function (err, player) {
            if (err) {
                return res.send({status: 1, msg: '有错'})
            }
            if (!player) {
                return res.send({status: 1, msg: '未找到'})
            }
            res.send({status: 0, data: player})
        })
    })
});


//球员调整
router.post('/set_player_types', function (req, res) {
    const userid = req.cookies.userid;
    if (!userid) {
        return res.send({status: 1, msg: '请先登陆'});
    }
    let {id, types} = req.body;
    if (!id) {
        return res.send({status: 1, msg: '有错'})
    }
    let playerNumber=0,
        msg="";
    PlayerModel.find({userid, types}, function (err, players) {
        playerNumber = players.length;
        if(playerNumber>=32){
            if(types===0){
                msg="一线队";
            }else if(types===1){
                msg="梯队"
            }else if(types===2){
                msg="青年队"
            }
            return res.send({status: 1, msg: msg+'人员已满'})
        }
        PlayerModel.findOne({_id: id, userid}, function (err, player) {
            if (err) {
                return res.send({status: 1, msg: '有错'})
            }
            if (!player) {
                return res.send({status: 1, msg: '未找到'})
            }
            PlayerModel.findByIdAndUpdate({_id: id}, {types: types}, function (err, player) {
                if (err) {
                    return res.send({status: 1, msg: '有错'})
                }
                if (!player) {
                    return res.send({status: 1, msg: '未找到'})
                }
                res.send({status: 0, data: player})
            })
        })
    });
});


//球员删除
router.post('/delete_player', function (req, res) {
    const userid = req.cookies.userid;
    if (!userid) {
        return res.send({status: 1, msg: '请先登陆'});
    }
    let {id} = req.body;
    if (!id) {
        return res.send({status: 1, msg: '有错'})
    }
    PlayerModel.findOne({_id: id, userid}, function (err, player) {
        if (err) {
            return res.send({status: 1, msg: '有错'})
        }
        // if(!player){
        //     return res.send({status: 1, msg: '未找到'+id})
        // }
        PlayerModel.remove({_id: id}, function (err, result) {
            if (err) {
                return res.send({status: 1, msg: '有错'})
            }
            res.send({status: 0, data: result})
        });
    })
});


//提升球员经验
router.post('/set_play_experien', function (req, res) {
    const userid = req.cookies.userid;
    if (!userid) {
        return res.send({status: 1, msg: '请先登陆'});
    }
    let {id} = req.body;
    let money = 0;
    // 查询用户金额
    UserModel.findOne({_id: userid}, filter, function (err, user) {
        if (!user) {
            // 清除浏览器保存userid的cookie
            res.clearCookie('userid');
            return res.send({status: 1, msg: '请先登陆'})
        } else {
            money = user.money;
        }
    });
    PlayerModel.findOne({_id: id, userid}, function (err, player) {
        if (!player) {
            return res.send({status: 1, msg: '未找到信息2'})
        }
        const talent = player.talent;                           //天赋
        let level = player.level;                             //等级
        const upgrade = player.upgrade;                         //所需固定经验
        let upgrade_experien = player.upgrade_experien;       //所需经验
        let experien = player.experien;                         //当前经验
        let attack = player.attack;
        let defense = player.defense;
        let energy = player.energy;
        let speed = player.speed;
        let dribbling = player.dribbling;
        let short = player.short;
        let long = player.long;
        let shoot = player.shoot;
        let skill = player.shoot;
        let gatek = player.shoot;
        let capacity = player.capacity;
        const potential = player.potential;

        if (level >= 9) {
            return res.send({status: 1, msg: '球员等级已经很高了'})
        }
        experien = experien + Math.round(Math.random() * (10 * talent) + 10);
        //console.log(level,experien,upgrade_experien,"*/*/*/*/*/*");
        if (money < level * 150) {
            return res.send({status: 1, msg: '金额不足'});
        } else {
            money = money - level * 150;
        }
        if (experien >= upgrade_experien) {                         //如果达到升级
            experien = experien - upgrade_experien;                 //升级所需经验-当前经验=剩余经验
            level = level + 1;
            //console.log("upgrade",upgrade);
            upgrade_experien = upgrade + Math.round(Math.random() * (100 - (10 * talent)) + 100);
            if (potential > capacity) {
                attack = player.attack + Math.round(Math.random() * talent + 1);
                defense = player.defense + Math.round(Math.random() * talent + 1);
                energy = player.energy + Math.round(Math.random() * talent + 1);
                speed = player.speed + Math.round(Math.random() * talent + 1);
                dribbling = player.dribbling + Math.round(Math.random() * talent + 1);
                short = player.short + Math.round(Math.random() * talent + 1);
                long = player.long + Math.round(Math.random() * talent + 1);
                shoot = player.shoot + Math.round(Math.random() * talent + 1);
                skill = player.skill + Math.round(Math.random() * talent + 1);
                gatek = player.gatek + Math.round(Math.random() * talent + 1);
            }
            capacity = parseInt((attack + defense + energy + speed + dribbling + short + long + shoot + skill + gatek) / 10);
        }
        //console.log(level,experien,upgrade_experien,"*/*/*/*/*/*")
        //console.log(capacity,"***")
        UserModel.findByIdAndUpdate({_id: userid}, {money: money}, function (err, user) {
            if (err) {
                return res.send({status: 1, msg: '出现错误'});
            }
            PlayerModel.findByIdAndUpdate({_id: id}, {
                experien,
                upgrade_experien,
                level,
                capacity,
                attack,
                defense,
                energy,
                speed,
                dribbling,
                short,
                long,
                shoot,
                skill,
                gatek,
            }, {new: true}, function (err, player) {
                if (err) {
                    return res.send({status: 1, msg: '出现错误'})
                }
                if (!player) {
                    return res.send({status: 1, msg: '出现错误'})
                }
                res.send({status: 0, data: player})
            })
        });
    })
});

//生成球员
router.post("/createplayer", function (req, res) {
    // 取出cookie中的userid
    var error1 = "";
    const userid = req.cookies.userid;
    let {number, types} = req.body;
    if (!number) {
        number = 13       //初始球员
    } else {
        number = parseInt(number)
    }
    if (!types) {
        types = 0         //初始一线队
    } else {
        types = parseInt(types)
    }
    if (!userid) {
        return res.send({status: 1, msg: '请先登陆'});
    }
    let playerNumber = 0;
    PlayerModel.find({userid, types}, function (err, players) {
        playerNumber = players.length;
        if (playerNumber >= 32) {
            return res.send({status: 1, msg: '球员数量不得超过32人'});
        } else {
            number = 32 - playerNumber;
        }
        //console.log(playerNumber,number);
        //return;
        FacilitiesModel.findOne({title: "学院设施", userid}, function (err, fac) {
            if (!fac) {
                return res.send({status: 1, msg: '未找到信息2'})
            }
            const level = fac.level;
            let stat = 0;
            for (let i = 1; i <= number; i++) {
                const truename = familyNames_data.familyNames[Math.floor(Math.random() * familyNames_data.familyNames.length)] + givenNames_data.givenNames[Math.floor(Math.random() * givenNames_data.givenNames.length)];
                const nation = nation_data.nation[Math.floor(Math.random() * nation_data.nation.length)];
                const position = position_data.position[Math.floor(Math.random() * position_data.position.length)];
                const feet = feet_data.feet[Math.floor(Math.random() * feet_data.feet.length)];
                const player_imgs = player_imgs_data.playerImgs[Math.floor(Math.random() * player_imgs_data.playerImgs.length)];
                let maxValue = 7,
                    minValue = 5;
                if (types === 2) {              //青年队
                    maxValue = 6;
                    minValue = 5;
                } else if (types === 3) {        //选拔队
                    maxValue = 5;
                    minValue = 4;
                }
                // if (i <= 11) {
                //     stat = 1;
                // } else {
                //     stat = 0;
                // }
                const attack = Math.floor(Math.random() * ((maxValue * level + 37) - (minValue * level + 25)) + (minValue * level + 25));
                const defense = Math.floor(Math.random() * ((maxValue * level + 37) - (minValue * level + 25)) + (minValue * level + 25));
                const energy = Math.floor(Math.random() * ((maxValue * level + 37) - (minValue * level + 25)) + (minValue * level + 25));
                const speed = Math.floor(Math.random() * ((maxValue * level + 37) - (minValue * level + 25)) + (minValue * level + 25));
                const dribbling = Math.floor(Math.random() * ((maxValue * level + 37) - (minValue * level + 25)) + (minValue * level + 25));
                const short = Math.floor(Math.random() * ((maxValue * level + 37) - (minValue * level + 25)) + (minValue * level + 25));
                const long = Math.floor(Math.random() * ((maxValue * level + 37) - (minValue * level + 25)) + (minValue * level + 25));
                const shoot = Math.floor(Math.random() * ((maxValue * level + 37) - (minValue * level + 25)) + (minValue * level + 25));
                const skill = Math.floor(Math.random() * ((maxValue * level + 37) - (minValue * level + 25)) + (minValue * level + 25));
                const gatek = Math.floor(Math.random() * ((maxValue * level + 37) - (minValue * level + 25)) + (minValue * level + 25));
                const capacity = parseInt((attack + defense + energy + speed + dribbling + short + long + shoot + skill + gatek) / 10);
                let potential = capacity + Math.round(Math.random() * (7 * level) + 0);
                if (potential >= 100) potential = 100;
                const playerLevel = Math.floor(Math.random() * level) + 1;
                const upgrade = Math.round(Math.random() * (100 - playerLevel * 5) + (150 - (10 * level + 10)));
                new PlayerModel({
                    "truename": truename,
                    "pic":player_imgs,
                    "nation": nation,
                    "age": Math.round(Math.random() * 2 + 16),           //随机生成16到18，包括16和18
                    "height": Math.round(Math.random() * 40 + 160),      //随机生成160-200
                    "position": position,
                    "feet": feet,
                    "weight": Math.round(Math.random() * 35 + 65),      //随机生成65-100  kg
                    "money": 0,
                    attack,
                    defense,
                    energy,
                    speed,
                    dribbling,
                    short,
                    long,
                    shoot,
                    skill,
                    gatek,
                    "userid": userid,
                    stat,             //0表示替补，1表示首发
                    capacity,
                    potential,        //潜能
                    level: "1",
                    talent: playerLevel,
                    experien: 0,
                    upgrade: upgrade,              //升级固定经验
                    upgrade_experien: upgrade,     //升级所需经验
                    types
                }).save();
            }

            //res.on("end",function(){
            //console.log(data);
            return res.send({status: 0})
            //});

        });
    });

});

router.post('/set_user_formation', function (req, res) {
    const userid = req.cookies.userid;
    if (!userid) {
        return res.send({status: 1, msg: '请先登陆'});
    }
    const {formation,formation_position} = req.body;
    UserModel.findByIdAndUpdate({_id:userid}, {formation,formation_position}, {new: true}, function (err, user) {
        if(err){
            return res.send({status: 1, msg: '出错了a'});
        }
        if(!user){
            return res.send({status: 1, msg: '出错了b'});
        }
        return res.send({status: 0, data: user});
    })
});

//获取首发名单
router.get('/get_starter',function(req, res){
    const userid = req.cookies.userid;
    if (!userid) {
        return res.send({status: 1, msg: '请先登陆'});
    }
    PlayerModel.find({userid,stat:1,types:0},function(err, players){
        if(err){
            return res.send({status: 1, msg: '出错了a'});
        }
        if(!players){
            return res.send({status: 1, msg: '出错了b'});
        }
        // console.log(players);
        return res.send({status: 0, data: players});
    })
});

//设置首发位置
router.post('/set_starter',function(req, res){
    const userid = req.cookies.userid;
    if (!userid) {
        return res.send({status: 1, msg: '请先登陆'});
    }
    const {starter_pos,id} = req.body;
    PlayerModel.update({userid,stat_pos:starter_pos,stat:1},{stat_pos:0,stat:0},{ multi: true },function(err, player){
        if(err){
            return res.send({status: 1, msg: '出错了a'});
        }
        if(!player){
            return res.send({status: 1, msg: '出错了b'});
        }
        console.log(id,starter_pos,player);
        PlayerModel.findByIdAndUpdate({_id:id},{stat_pos:starter_pos,stat:1},{new:true},function(err, player12){
            if(err){
                return res.send({status: 1, msg: '出错了a'});
            }
            if(!player){
                return res.send({status: 1, msg: '出错了b'});
            }
            console.log(player12,player12.stat_pos);
            return res.send({status: 0, data:player12});
        })
    })
});

module.exports = router;