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
            remaining_burstTime[i] = burstTime[i];
 
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
                       
                        t = t + remaining_burstTime[i];
                        waitTime[i] = t - burstTime[i];
 
                        remaining_burstTime[i] = 0;
                    }
                }
            }
 
            if (done == true)
                break;
        }
    }
    findTurnAroundTime(processes,n, burstTime, waitTime, turnAroundTime){
        for (let i=0; i< n; i++) 
        turnAroundTime[i]= burstTime[i] + waitTime[i];
    }
    findavgTime(processes,n,burstTime, quantum){
        let waitTime = new Array(n), turnAroundTime = new Array(n);
        for(let i=0;i<n;i++){
            waitTime[i]=0;
            turnAroundTime[i]=0;
        }
        let total_waitTime = 0;		
		let total_burstTime = 0;
        let total_turnAroundTime = 0;
        this.findWaitingTime(processes, n, burstTime, waitTime, quantum);
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
        for (let i = 0; i < n; i++) {
			var colorcn = this.chartcolors.length;
            var color_index = i % colorcn;
			html += `<span> ${processes[i]} waiting time = ${waitTime[i]} </span><br>`;
			let width = (100 * burstTime[i] / total_burstTime).toFixed(2);
			chart += `<div class="d-flex" style="width: ${width}%;background-color:${this.chartcolors[color_index]}"></div>`;
			chartdesp += `<div class="d-flex" style="width: ${width}%;">${processes[i]}(${burstTime[i]})</div>`;
        }
		chart += `</div>`;
		chartdesp += `</div>`;
        let s = (total_waitTime / n).toFixed(2);
        let t = (total_turnAroundTime / n).toFixed(2);
		html += `<span> Average waiting time = ${s} </span><br>`;
        html += `<span> Average turn around time = ${t} </span><br>`;
		document.getElementById("result").innerHTML = html;
		document.getElementById("chart").innerHTML = chart;
		document.getElementById("chartdesp").innerHTML = chartdesp;
		
		

    }	
}



export default RR