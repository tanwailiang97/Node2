import React, { Component } from "react";

import UserService from "../services/user-service";

import ReactTable from "react-table-6";
import "react-table-6/react-table.css";

export default class BoardTemp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  componentDidMount() {
    UserService.getTempBoard().then(
      response => {
        const data = Object.values(response.data);
        data.forEach((element) => {
          let date = new Date(element.date);
          element.time = date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit' ,hour12: false});
          element.date = date.toLocaleDateString();
        })        
        this.setState({
          content: response.data
        });
        
      },
      error => {
        this.setState({
          content:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        });
      }
    );
  }

  render() {
    const columns = [
      {
        Header: "Date",
        accessor: "date",
        style:{
          textAlign: "center"
        },
        width: 100
      },
      {
        Header: "Time",
        accessor: "time",
        style:{
          textAlign: "center"
        },
        width: 100
      },
      {
        Header: "Temperature (°C)",
        accessor: "temperature",
        style:{
          textAlign: "center"
        },
        width: 200
      }
    ]
    return (
      <div className="container">
        <header className="jumbotron">
          <h1>Temperature Record</h1>
        </header>
        {this.state.content.length>0?
        <ReactTable
          columns ={columns}
          data ={this.state.content}
          filterable 
          defaultPageSize={10}
          showPaginationTop
          showPaginationBottom={false}
        >
        </ReactTable>
        :
        <div>Loading...</div>
        }
        <div></div>
      </div>
      
    );
  }
}
