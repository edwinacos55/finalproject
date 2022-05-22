import React, { Component } from "react";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
class Home extends Component {
    constructor(props) {
		super(props);
		this.state = {};
    }
    render() {
		return (
			<React.Fragment>
				<h1>CPU Scheduling Algorithms Calculator</h1>
			  <Container fluid>
				<div className="container-mg mb-4">
					<Row><Col md={12}>
                        <Link to="/fcfs">FCFS</Link>
                    </Col></Row>
                    <Row><Col md={12}>
                        <Link to="/sjf">SJF</Link>
                    </Col></Row>
                    <Row><Col md={12}>
                        <Link to="/rr">Round Robin</Link>
                    </Col></Row>
                    <Row><Col md={12}>
                        <Link to="/srtf">SRTF</Link>
                    </Col></Row>
				</div>
				</Container>
			</React.Fragment>
		);
	}
}
export default Home