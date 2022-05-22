import React, { Component } from "react";
import { Row, Col,Button, Container} from "reactstrap";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
class Fcfs extends Component {
    constructor(props) {
		super(props);
    }

    findWaitingTime(processes,n,burstTime,waitTime){
        waitTime[0] = 0;
        for (let i = 1; i < n; i++) {
            waitTime[i] = burstTime[i - 1] + waitTime[i - 1];
        }
    }

    findTurnAroundTime(processes, n, burstTime, waitTime, turnAroundTime) {
        for(let i=0; i < n; i++) {
            turnAroundTime[i] = burstTime[i] + waitTime[i];
        }
    }
    findavgTime(processes,n,burstTime){
        let waitTime = new Array(n), turnAroundTime = new Array(n);
        for(let i=0;i<n;i++){
            waitTime[i]=0;
            turnAroundTime[i]=0;
        }
        let total_turnAroundTime = 0; 		
		let total_burstTime = 0;
        let total_waitTime = 0;
       
        this.findWaitingTime(processes, n, burstTime, waitTime);
        this.findTurnAroundTime(processes, n, burstTime, waitTime, turnAroundTime);
		for (let i = 0; i < n; i++) {
            total_waitTime = total_waitTime + waitTime[i];
			total_burstTime = total_burstTime + burstTime[i];
			total_turnAroundTime = total_turnAroundTime + turnAroundTime[i];
		}
        let html = "";		
		let chart = "";
		let chartdesp = "";
		chart += `<div class="d-flex h-cu">`;
		chartdesp += `<div class="d-flex h-cu mb-1">`;


}
}
export default Fcfs