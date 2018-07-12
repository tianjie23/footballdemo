import {message} from "antd";

message.config({
    maxCount:1
});

export default function alerts(msg, stat){
    switch (stat){
        case "success":
            message.success(msg);
            return;
        case "info":
            message.info(msg);
            return;
        case "error":
            message.error(msg);
            return;
        case "warning":
            message.warning(msg);
            return;
        case "warn":
            message.warn(msg);
            return;
        case "loading":
            message.loading(msg);
            return;
        default:
            message.info(msg);
    }
}