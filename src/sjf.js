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
}
export default Sjf