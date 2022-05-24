import React, { Component } from "react";
import { Row, Col,Button, Container} from "reactstrap";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
class Process
{
    constructor(pid,burstTime,art)
    {
        this.pid = pid;    // Process ID
        this.burstTime = burstTime;    // Burst Time
        this.art = art;    // Arrival Time
    }
}
class Srtf extends Component {
	constructor(props) {
		super(props);
		this.state = {
		};
		this.handle_calculate = this.handle_calculate.bind(this);
		this.chartcolors = ["#d51364", "#d513c6", "#5e13d5", "#1334d5", "#13c3d5", "#13d561", "#31d513", "#aed513", "#d59913", "#d55213"]
	}

	findWaitingTime(proc,n,waitTime){
    let rt = new Array(n);
         
        for (let i = 0; i < n; i++)
            rt[i] = proc[i].burstTime;
         
        let complete = 0, t = 0, minm = Number.MAX_VALUE;
        let shortest = 0, finish_time;
        let check = false;
         
        while (complete != n) {
         
          
            for (let j = 0; j < n; j++) 
            {
                if ((proc[j].art <= t) &&
                  (rt[j] < minm) && rt[j] > 0) {
                    minm = rt[j];
                    shortest = j;
                    check = true;
                }
            }
         
            if (check == false) {
                t++;
                continue;
            }
         
        
            rt[shortest]--;
         
         
            minm = rt[shortest];
            if (minm == 0)
                minm = Number.MAX_VALUE;
         
           
            if (rt[shortest] == 0) {
         
               
                complete++;
                check = false;
         
                
                finish_time = t + 1;
         
              
                waitTime[shortest] = finish_time -
                             proc[shortest].burstTime -
                             proc[shortest].art;
         
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

	handle_calculate() {
		var process_name_objects = document.getElementsByName("process_name");
		var burst_time_objects = document.getElementsByName("burst_time");
        var arrival_time_objects = document.getElementsByName("arrival_time");
		var process_cn = process_name_objects.length;
		
		var processes = [];
		var burst_times = [];
		for (var i = 0; i < process_cn; i++) {
			if (process_name_objects[i].value == '' && (burst_time_objects[i].value !== '' || arrival_time_objects[i].value !== '')) {
				var row_nm = i + 1;
				alert("Process name is missing at row number " + row_nm.toString());
				return;
			}
			if (burst_time_objects[i].value == '' && (process_name_objects[i].value !== '' || arrival_time_objects[i].value !== '')) {
				var row_nm = i + 1;
				alert("Burst time is missing at row number " + row_nm.toString());
				return;
			}
            if (arrival_time_objects[i].value == '' && (process_name_objects[i].value !== '' || burst_time_objects[i].value !== '')) {
				var row_nm = i + 1;
				alert("Arrival time is missing at row number " + row_nm.toString());
				return;
			}
			if (process_name_objects[i].value == '' && burst_time_objects[i].value == '' && arrival_time_objects[i].value == '') {
				continue;
			}			
			processes.push(new Process(process_name_objects[i].value, parseInt(burst_time_objects[i].value), parseInt(arrival_time_objects[i].value) ));
		}

		if (processes.length == 0) {
			alert("Please fill at least one row");
			return;
		}
		this.findavgTime(processes, processes.length);
	}

	componentDidMount() {
	}

	render() {
		return (
			<React.Fragment>
			  <Container fluid>
				<div className="container-mg">
				<h4 className="mb-4">SRTF scheduling</h4>
				<h6>
				In the Shortest Remaining Time First (SRTF) scheduling algorithm, the process with the smallest amount of time remaining until completion is selected to execute. Since the currently executing process is the one with the shortest amount of time remaining by definition, and since that time should only reduce as execution progresses, processes will always run until they complete or a new process is added that requires a smaller amount of time.
				</h6>
					<Row>
					<Col md={6}>
						<Row className="mb-2">
							<Col md={4}><span>Process Name</span></Col>
							<Col md={4}><span>Burst Time</span></Col>
                            <Col md={4}><span>Arrival Time</span></Col>
						</Row>
						<Row className="mb-2">
							<Col md={4}><input name="process_name" className="w-100" type="text" /></Col>
							<Col md={4}><input name="burst_time" className="w-100" type="number" /></Col>
                            <Col md={4}><input name="arrival_time" className="w-100" type="number" /></Col>
						</Row>
						<Row className="mb-2">
                            <Col md={4}><input name="process_name" className="w-100" type="text" /></Col>
							<Col md={4}><input name="burst_time" className="w-100" type="number" /></Col>
                            <Col md={4}><input name="arrival_time" className="w-100" type="number" /></Col>
						</Row>
						<Row className="mb-2">
                            <Col md={4}><input name="process_name" className="w-100" type="text" /></Col>
							<Col md={4}><input name="burst_time" className="w-100" type="number" /></Col>
                            <Col md={4}><input name="arrival_time" className="w-100" type="number" /></Col>
						</Row>
						<Row className="mb-2">
                            <Col md={4}><input name="process_name" className="w-100" type="text" /></Col>
							<Col md={4}><input name="burst_time" className="w-100" type="number" /></Col>
                            <Col md={4}><input name="arrival_time" className="w-100" type="number" /></Col>
						</Row>
						<Row className="mb-2">
                            <Col md={4}><input name="process_name" className="w-100" type="text" /></Col>
							<Col md={4}><input name="burst_time" className="w-100" type="number" /></Col>
                            <Col md={4}><input name="arrival_time" className="w-100" type="number" /></Col>
						</Row>
						<Row className="mb-2">
                            <Col md={4}><input name="process_name" className="w-100" type="text" /></Col>
							<Col md={4}><input name="burst_time" className="w-100" type="number" /></Col>
                            <Col md={4}><input name="arrival_time" className="w-100" type="number" /></Col>
						</Row>
						<Row className="mb-2">
                            <Col md={4}><input name="process_name" className="w-100" type="text" /></Col>
							<Col md={4}><input name="burst_time" className="w-100" type="number" /></Col>
                            <Col md={4}><input name="arrival_time" className="w-100" type="number" /></Col>
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

export default Srtf