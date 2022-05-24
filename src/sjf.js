import React, { Component } from "react";
import { Row, Col,Button, Container} from "reactstrap";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
class Sjf extends Component {
    constructor(props) {
		super(props);
		this.state = {};
        this.handle_calculate = this.handle_calculate.bind(this);
        this.chartcolors = ["#d51364", "#d513c6", "#5e13d5", "#1334d5", "#13c3d5", "#13d561", "#31d513", "#aed513", "#d59913", "#d55213"]
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

    findavgTime(processes,n,burstTime){
        let waitTime = new Array(n), turnAroundTime = new Array(n);
        for(let i=0;i<n;i++){
            waitTime[i]=0;
            turnAroundTime[i]=0;
        }
        let total_waitTime = 0;		
		let total_burstTime = 0;
        let total_turnAroundTime = 0;
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
			html += `<span> ${processes[i]} Waiting Time = ${waitTime[i]} || Turn Around Time= ${turnAroundTime[i]} </span><br>`;
			let width = (100 * burstTime[i] / total_burstTime).toFixed(2);
			chart += `<div class="d-flex" style="width: ${width}%;background-color:${this.chartcolors[color_index]}"></div>`;
			chartdesp += `<div class="d-flex" style="width: ${width}%;">${processes[i]}(${waitTime[i]}-${turnAroundTime[i]})</div>`;
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
		var process_name_objects = document.getElementsByName("process_name");
		var burst_time_objects = document.getElementsByName("burst_time");
		var process_cn = process_name_objects.length;
		
		var processes = [];
		var burst_times = [];
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
			if (process_name_objects[i].value == '' && burst_time_objects[i].value == '') {
				continue;
			}			
			processes.push(process_name_objects[i].value);
			burst_times.push(parseInt(burst_time_objects[i].value));
		}

		if (processes.length == 0) {
			alert("Please fill at least one row");
			return;
		}
        var res = this.sort_process(processes, burst_times);
        var processes = res["sorted_processes"];
        var burst_times = res["sorted_burstTime"];
		this.findavgTime(processes, processes.length, burst_times);
	}
    componentDidMount() {
	}
    render() {
		return (
			<React.Fragment>
			  <Container fluid>
				<div className="container-mg">
				<h4 className="mb-4">SJf scheduling</h4>
				<h6>SJf scheduling is a scheduling policy that selects the waiting process with the smallest execution time to execute next.
				</h6>
					<Row>
					<Col md={6}>
						<Row className="mb-2">
							<Col md={6}><span>Process Name</span></Col>
							<Col md={6}><span>Burst Time</span></Col>
						</Row>
						<Row className="mb-2">
							<Col md={6}><input name="process_name" className="w-100" type="text" /></Col>
							<Col md={6}><input name="burst_time" className="w-100" type="number" /></Col>
						</Row>
						<Row className="mb-2">
							<Col md={6}><input name="process_name" className="w-100" type="text" /></Col>
							<Col md={6}><input name="burst_time" className="w-100" type="number" /></Col>
						</Row>
						<Row className="mb-2">
							<Col md={6}><input name="process_name" className="w-100" type="text" /></Col>
							<Col md={6}><input name="burst_time" className="w-100" type="number" /></Col>
						</Row>
						<Row className="mb-2">
							<Col md={6}><input name="process_name" className="w-100" type="text" /></Col>
							<Col md={6}><input name="burst_time" className="w-100" type="number" /></Col>
						</Row>
						<Row className="mb-2">
							<Col md={6}><input name="process_name" className="w-100" type="text" /></Col>
							<Col md={6}><input name="burst_time" className="w-100" type="number" /></Col>
						</Row>
						<Row className="mb-2">
							<Col md={6}><input name="process_name" className="w-100" type="text" /></Col>
							<Col md={6}><input name="burst_time" className="w-100" type="number" /></Col>
						</Row>
						<Row className="mb-2">
							<Col md={6}><input name="process_name" className="w-100" type="text" /></Col>
							<Col md={6}><input name="burst_time" className="w-100" type="number" /></Col>
						</Row>
						<Row className="mb-2">
							<Col md={6}></Col>
							<Col md={6}><Button type="button" onClick={this.handle_calculate} className="fl-right">Calculate</Button></Col>
						</Row>
					</Col>
					<Col md={6}>
						<div className="resdv">
							<div id="result" className="mb-2"></div>
							<div id="chartdesp"></div>
							<div id="chart"></div>
						</div>
					</Col>
					</Row>
				</div>
				</Container>
			</React.Fragment>
		);
	}
}
export default Sjf