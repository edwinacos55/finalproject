import React, { Component } from "react";
import { Row, Col,Button, Container} from "reactstrap";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
class RR extends Component {
    constructor(props) {
		super(props);
		this.state = {};
        this.handle_calculate = this.handle_calculate.bind(this);
        this.chartcolors = ["#d51364", "#d513c6", "#5e13d5", "#1334d5", "#13c3d5", "#13d561", "#31d513", "#aed513", "#d59913", "#d55213"]
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
			html += `<span> ${processes[i]} Waiting Time = ${waitTime[i]} || Turn Around Time= ${turnAroundTime[i]}  </span><br>`;
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
		var process_name_objects = document.getElementsByName("process_name");
		var burst_time_objects = document.getElementsByName("burst_time");
        var quantum = document.getElementById("quantum").value;
        if (quantum == '') {
            alert("Please fill quatum parameter.");
        }
        quantum = parseInt(quantum);
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
		this.findavgTime(processes, processes.length, burst_times, quantum);
	}
    componentDidMount() {
	}
    render() {
		return (
			<React.Fragment>
			  <Container fluid>
				<div className="container-mg">
				<h4 className="mb-4">Round Roubin scheduling</h4>
				<h6>
                Round Robin is a CPU scheduling algorithm where each process is assigned a fixed time slot in a cyclic way.
				</h6>
                    <Row className="mb-2">
					<Col md={6}>
                        <span className="me-4">Quantum</span>
                        <input name="quantum" id="quantum" type="number" defaultValue="2" />
                    </Col>
                    </Row>
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



export default RR