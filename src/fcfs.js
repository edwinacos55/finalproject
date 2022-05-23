import React, { Component } from "react";
import { Row, Col,Button, Container} from "reactstrap";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
class Fcfs extends Component {
    constructor(props) {
		super(props);
        this.state ={};
        this.handle_calculate = this.handle_calculate.bind(this);
        this.chartcolors = ["#d51364", "#d513c6", "#5e13d5", "#1334d5", "#13c3d5", "#13d561", "#31d513", "#aed513", "#d59913", "#d55213"]
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
        this.findavgTime(processes, processes.length, burst_times);
}

componentDidMount() {
}

render() {
    return (
        <React.Fragment>
          <Container fluid>
            <div className="container-mg">
            <h4 className="mb-4">FCFS scheduling</h4>
            <h6>
            First in, first out (FIFO), also known as first come, first served (FCFS), is the simplest scheduling algorithm. FIFO simply queues processes in the order that they arrive in the ready queue. 
In this, the process that comes first will be executed first and next process starts only after the previous gets fully executed. 
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

export default Fcfs