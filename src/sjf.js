import React, { Component } from "react";
import { Row, Col,Button, Container} from "reactstrap";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
class Sjf extends Component {
    constructor(props) {
		super(props);
		this.state = {
		};
    }
    findWaitingTime(processes,n,burstTime,waitTime){
        waitTime[0] = 0;
        for (let i = 1; i < n; i++) {
            waitTime[i] = burstTime[i - 1] + waitTime[i - 1];
        }
    }
    findTurnAroundTime(processes,n,burstTime,waitTime,turnAroundTime){
        for (let i = 0; i < n; i++) {
            turnAroundTime[i] = burstTime[i] + waitTime[i];
        }
    }
    sort_process(processes, burst_times) {
        var obj = [];
        for (var i = 0; i < processes.length; i++) {
            obj.push({"process": processes[i], "burstTime": burst_times[i]})
        }
        obj.sort((a, b) => (a.burstTime > b.burstTime) ? 1 : -1);
        var sorted_processes = [];
        var sorted_burstTime = [];
        for (var i = 0; i < obj.length; i++) {
            sorted_processes.push(obj[i].process);
            sorted_burstTime.push(obj[i].burstTime);
        }
        return {"sorted_processes": sorted_processes, "sorted_burstTime": sorted_burstTime}
    }
}
export default Sjf