import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
const moment = require("moment");
const border = {
  border: "2px solid #73AD21",
  borderRadius: "5px",
  padding: "20px",
  marginBottom: "10px",
  marginLeft: "10px"
}
export default class DonorList extends Component {
  state = {
    customers: [],
    isLoading: false,
    searchCustomerText: "",
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    //this.SearchCustomer("")
  }


  render() {
    /*if (this.state.isLoading)
      return (
        <div>
          <Spinner />
        </div>
      );*/
    return (
      <div
        style={{
          backgroundColor: "hsl(0deg 0% 95%)",
          padding: "10px",
        }}
      >
        <div className="form-row" style={border}>
          <div className="col-md-12">
            <h1>List Customer</h1>
          </div>
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Search"
              value={this.state.searchCustomerText}
              onChange={(e) => this.SearchCustomer(e.target.value)}
              ref={(input) => {
                this.searchCustomerTextInput = input;
              }}
            />
          </div>

          <table
            style={{
              backgroundColor: "hsl(0deg 0% 95%)",
              padding: "10px",
              marginTop: "10px",
            }}
            className="table-bordered"
          >
            <thead>
              <tr>
                <th>Customer Code</th>
                <th>Customer Name</th>
                <th>Phone Number</th>
                <th>Email</th>
                <th>NRIC</th>
              </tr>
            </thead>
            <tbody>
              {this.state.customers.map((customer, index) => (
                <tr
                  key={customer.customerCode}>
                  <td >{customer.customerCode}</td>
                  <td>{customer.customerName}</td>
                  <td>{customer.phoneNumber}</td>
                  <td>{customer.email}</td>
                  <td>{customer.nric}</td>
                  <td>
                    <button
                      type="button"
                      class="btn btn-primary" 
                      onClick={this.SaveCustomerToLocalAndReload.bind(
                        this,
                        customer.customerCode
                      )}
                    >
                      Select
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
