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

handle_calculate() {
    let process_name_objects = document.getElementsByName("process_name");
    let burst_time_objects = document.getElementsByName("burst_time");
    let process_cn = process_name_objects.length;

    let processes = [];
    let burst_times = [];
    for (var i = 0; i < process_cn; i++) {
        if (process_name_objects[i].value == '' && burst_time_objects[i].value !== '') {
            var row_nm = i + 1;
            alert("Burst time exists but process name is missing at row number " + row_nm.toString());
            return;
        }
        if (process_name_objects[i].value != '' && burst_time_objects[i].value == '') {
            var row_nm = i + 1;
            alert("Process name exists but burst time is missing at row number " + row_nm.toString());
            return;
        }
    
   

}
}
}
export default Fcfs