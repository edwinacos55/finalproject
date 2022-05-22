import React, { Component } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Fcfs from "./fcfs";
import Sjf from "./sjf";
import Srtf from "./srtf";
import RR from "./rr";
import Home from "./Home";


class  App extends Component() {
  constructor(props) {
		super(props);
		this.state = {};}
  }

export default App;
