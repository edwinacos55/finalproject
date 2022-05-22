import React, { Component } from "react";
import { Link, BrowserRouter, Routes, Route } from "react-router-dom";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Fcfs from "./fcfs";
import Sjf from "./sjf";
import Srtf from "./srtf";
import RR from "./rr";
import Home from "./home";


class  App extends Component() {
  constructor(props) {
		super(props);
		this.state = {};}
    render() {
      return (
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="fcfs" element={<Fcfs />} />
          <Route path="sjf" element={<Sjf />} />
          <Route path="rr" element={<RR />} />
          <Route path="srtf" element={<Srtf />} />				
        </Routes>
        </BrowserRouter>
      );
    }
  }

export default App;
