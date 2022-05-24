import React, { Component } from "react";
import { Row, Col,Button, Container} from "reactstrap";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
class Process
{
    constructor(pid,burstTime,arrivalTime)
    {
        this.pid = pid;    // Process ID
        this.burstTime = burstTime;    // Burst Time
        this.arrivalTime = this.arrivalTime;    // Arrival Time
    }
}
class Srtf extends Component {
    constructor(props) {
		super(props);
		this.state = {};
    }
    findWaitingTime(proc,n,waitTime){
        let rt = new Array(n);
             
            for (let i = 0; i < n; i++)
                rt[i] = proc[i].burstTime;
             
            let complete = 0, t = 0, minimum = Number.MAX_VALUE;
            let shortest = 0, finish_time;
            let check = false;
             
            while (complete != n) {
             
              
                for (let j = 0; j < n; j++) 
                {
                    if ((proc[j].arrivalTime <= t) &&
                      (rt[j] < minimum) && rt[j] > 0) {
                        minimum = rt[j];
                        shortest = j;
                        check = true;
                    }
                }
             
                if (check == false) {
                    t++;
                    continue;
                }
             
            
                rt[shortest]--;
             
             
                minimum = rt[shortest];
                if (minimum == 0)
                    minimum = Number.MAX_VALUE;
             
               
                if (rt[shortest] == 0) {
             
                   
                    complete++;
                    check = false;
             
                    
                    finish_time = t + 1;
             
                  
                    waitTime[shortest] = finish_time -proc[shortest].burstTime -proc[shortest].arrivalTime;
             
                    if (waitTime[shortest] < 0)
                        waitTime[shortest] = 0;
                }
                
                t++;
            }
        }

        findTurnAroundTime(proc,n,waitTime,turnAroundTime)
    {
        for (let i = 0; i < n; i++)
            turnAroundTime[i] = proc[i].burstTime + waitTime[i];
    }
findavgTime(processes,n){
        let waitTime = new Array(n);
        let turnAroundTime = new Array(n);
        for(let i=0;i<n;i++)
        {
            waitTime[i]=0;
            turnAroundTime[i]=0;
        }
        let total_waitTime = 0;		
		let total_burstTime = 0;
        let total_turnAroundTime = 0;
        this.findWaitingTime(processes, n, waitTime);
        this.findTurnAroundTime(processes, n, waitTime, turnAroundTime);
		
		for (let i = 0; i < n; i++) {
            total_waitTime = total_waitTime + waitTime[i];
			total_burstTime = total_burstTime + processes[i].burstTime;
            total_turnAroundTime = total_turnAroundTime + turnAroundTime[i];
		}
        console.log(processes);
		let html = "";		
		let chart = "";
		let chartdesp = "";
		chart += `<div class="d-flex h-cu">`;
		chartdesp += `<div class="d-flex h-cu mb-1">`;
        for (let i = 0; i < n; i++) {
            var colorcn = this.chartcolors.length;
            var color_index = i % colorcn;
			html += `<span> ${processes[i].pid} Waiting Time = ${waitTime[i]} || Turn Around Time= ${turnAroundTime[i]} </span><br>`;
			let width = (100 * processes[i].burstTime / total_burstTime).toFixed(2);
			chart += `<div class="d-flex" style="width: ${width}%;background-color:${this.chartcolors[color_index]}"></div>`;
			chartdesp += `<div class="d-flex" style="width: ${width}%;">${processes[i].pid}(${processes[i].burstTime})</div>`;
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

export default Srtf