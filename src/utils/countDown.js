import React, {
    Component
} from 'react'

export default class countDown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            day: 0,
            hour: 0,
            minute: 0,
            second: 0
        }
    }

    componentDidMount() {
        let Time = this.props.nowTime;
        this.countFun(Time);
    }

    countFun = (time) => {
        let timer = "";
        if (time) {
            let end_time = time,
                sys_second = (end_time - new Date().getTime());
            timer = setInterval(function () {
                if (sys_second >= 0) {
                    sys_second -= 10;
                    let day = Math.floor((sys_second / 1000 / 3600) / 24);
                    let hour = Math.floor((sys_second / 1000 / 3600) % 24);
                    let minute = Math.floor((sys_second / 1000 / 60) % 60);
                    let second = Math.floor(sys_second / 1000 % 60);
                    if (day <= 0) day = 0;
                    if (hour <= 0) hour = 0;
                    if (minute <= 0) minute = 0;
                    if (second <= 0) second = 0;
                    //let haomiao = Math.floor(sys_second % 1000);
                    this.setState({
                        day: day,
                        hour: hour < 10 ? "0" + hour : hour,
                        minute: minute < 10 ? "0" + minute : minute,
                        second: second < 10 ? "0" + second : second
                    });
                } else {
                    this.props.changeUpgrade(0);
                    clearInterval(timer);
                    //if (day === 0 && hour === 0 && minute === 0 && second === 0) {
                    //}
                }
            }.bind(this), 10);
        } else {
            this.props.changeUpgrade(1);
            clearInterval(timer);
        }
    };

    render() {
        return (
            <span>{this.state.day}天{this.state.hour}:{this.state.minute}:{this.state.second}</span>
        )
    }
}