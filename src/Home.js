import React, { Component } from "react";
import { Row, Col, Container } from "reactstrap";
import { Link} from "react-router-dom";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
class Home extends Component {
    constructor(props) {
		super(props);
		this.state = {};
    }


    render() {
        const newLocal = <Link to="/fcfs">FCFS</Link>;
		return (
			<React.Fragment>
				<h1>CPU Scheduling Algorithms Calculator</h1>
			  <Container fluid>
				<div className="container-mg mb-4">
					<Row><Col md={12}>
                    </Col></Row>
				</div>
				</Container>
			</React.Fragment>
		);
	}
 }

export default Home