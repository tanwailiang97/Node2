import React, { Component } from "react";

import UserService from "../services/user-service";
import ReactTable from "react-table-6";
import AuthService from "../services/auth-service";

export default class BoardAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: ""
    };
  }
  componentDidMount() {
    UserService.getAdminBoard().then(
      response => {
        this.setState({
          content: Array.from(response.data)
        });
      },
      error => {
        console.log(error);
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
    const columns =[
      {
        Header: "User Name",
        accessor: "username",
        style:{
          textAlign: "center",
        },
        maxWidth: 300
      },
      {
        Header: "Roles",
        accessor: "roles",
        style:{
          textAlign: "center"
        },
        maxWidth: 200
      },
      {
        Header: "Admin",
        Cell: props =>{
          return(
            <div>
            <button className=""
            onClick={()=>{
              AuthService.postChangeRole(props.original.username," ").then(
                response => {
                  if(response.data.includes("roles have been changed")){
                    UserService.getAdminBoard().then(
                      response => {
                        this.setState({
                          content: Array.from(response.data)
                        });
                      },error=> {
                        console.log(error);
                      })
                  }
                }
              )
            }}
            >Remove</button>
            <button className=""
            onClick={()=>{
              AuthService.postChangeRole(props.original.username,"admin").then(
                response => {
                  if(response.data.includes("roles have been changed")){
                    UserService.getAdminBoard().then(
                      response => {
                        this.setState({
                          content: Array.from(response.data)
                        });
                      },error=> {
                        console.log(error);
                      })
                  }
                }
              )
            }}
            >Add</button>
            </div>
          )
        },
        style:{
          textAlign: "center"
        },
        sortable: false,
        filterable: false,
        minWidth: 150
      },
      {
        Header: "Delete",
        Cell: props =>{
          return(
            <button style={{backgroundColor:"red", color:"white"}}
            onClick={()=>{
              AuthService.deleteUser(props.original.username).then(
                response => {
                  if(response.data.includes("have been deleted")){
                    UserService.getAdminBoard().then(
                      response => {
                        this.setState({
                          content: Array.from(response.data)
                        });
                      },error=> {
                        console.log(error);
                      })
                  }
                },error=> {
                  console.log(error);
                }
              )
            }}
            >Delete</button>
          )
        },
        style:{
          textAlign: "center"
        },
        sortable: false,
        filterable: false,
        width: 100
      } 
    ]
    return (
      <div className="container">
        <header className="jumbotron">
          <h1>Admin Board</h1>
        </header>
        {this.state.content!=="" || this.state.content.includes("error")?
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
