import React, { Component } from "react";
import { Row, Col,Button, Container} from "reactstrap";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
class Srtf extends Component {
    constructor(props) {
		super(props);
		this.state = {
		};
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


}

export default Srtf