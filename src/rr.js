import React, { Component } from "react";
import { Row, Col,Button, Container} from "reactstrap";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
class RR extends Component {
    constructor(props) {
		super(props);
		this.state = {};
    }


    findWaitingTime(processes,n,burstTime,waitTime, quantum){
        let remaining_burstTime = new Array(n).fill(0); //this is current remaining burst Time

        for (let i = 0; i < n; i++)
            rem_burstTime[i] = burstTime[i];
 
        let t = 0; //this tells us current time
        
        while (1) {
            let done = true;
 
           
            for (let i = 0; i < n; i++) {
               
                if (remaining_burstTime[i] > 0) {
                    done = false; 
 
                    if (remaining_burstTime[i] > quantum) {
                       
                        t += quantum;
                        remaining_burstTime[i] -= quantum;
                    }
 
                  
                    else {
                       
                        t = t + rem_burstTime[i];
                        waitTime[i] = t - burstTime[i];
 
                        remaining_burstTime[i] = 0;
                    }
                }
            }
 
            if (done == true)
                break;
        }
    }
}

export default RR