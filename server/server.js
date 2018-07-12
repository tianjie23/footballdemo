const express = require("express");
const bodyParser = require("body-parser");
const cookieparser = require("cookie-parser");
const router = require("./router");

const app = express();

app.use(cookieparser()); // 解析cookie数据
app.use(bodyParser.json());// 解析请求体(ajax请求: json数据格式)
app.use(bodyParser.urlencoded({exception:false})); // 解析请求体(表单数据)

app.use("/api",router);

app.listen("8888",()=>{
    console.log("服务器已启动，端口为：8888");
});