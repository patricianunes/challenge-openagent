import React, { Component } from "react";
import firebase from "../Firebase";
import { Link } from "react-router-dom";

class Create extends Component {
  constructor() {
    super();
    this.ref = firebase.firestore().collection("addresses");
    this.state = {
      propertyType: "",
      streetNumber: "",
      unitNumber: "",
      street: "",
      suburb: "",
      postCode: "",
      state: ""
    };
  }
  onChange = e => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  };

  onSubmit = e => {
    e.preventDefault();

    const {
      propertyType,
      streetNumber,
      unitNumber,
      street,
      suburb,
      postCode,
      state
    } = this.state;

    this.ref
      .add({
        propertyType,
        streetNumber,
        unitNumber,
        street,
        suburb,
        postCode,
        state
      })
      .then(docRef => {
        this.setState({
          propertyType: "",
          streetNumber: "",
          unitNumber: "",
          street: "",
          suburb: "",
          postCode: "",
          state: ""
        });
        this.props.history.push("/");
      })
      .catch(error => {
        console.error("Error adding document: ", error);
      });
  };

  render() {
    const {
      propertyType,
      streetNumber,
      unitNumber,
      street,
      suburb,
      postCode,
      state
    } = this.state;
    return (
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">ADD ADDRESS</h3>
          </div>
          <div className="panel-body">
            <h4>
              <Link to="/" className="btn btn-primary">
                Address List
              </Link>
            </h4>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label htmlFor="propertyType">Property Type:</label>
                <input
                  type="text"
                  className="form-control"
                  name="propertyType"
                  value={propertyType}
                  onChange={this.onChange}
                  placeholder="apartament or house"
                />
              </div>
              <div className="form-group">
                <label htmlFor="streetNumber">Street Number:</label>
                <input
                  type="text"
                  className="form-control"
                  name="streetNumber"
                  onChange={this.onChange}
                  placeholder="10"
                  value={streetNumber}
                />
              </div>
              <div className="form-group">
                <label htmlFor="unitNumber">Unit Number:</label>
                <input
                  type="text"
                  className="form-control"
                  name="unitNumber"
                  value={unitNumber}
                  onChange={this.onChange}
                  placeholder="100"
                />
              </div>
              <div className="form-group">
                <label htmlFor="street">Street:</label>
                <input
                  type="text"
                  className="form-control"
                  name="street"
                  value={street}
                  onChange={this.onChange}
                  placeholder="Pottinger Street"
                />
              </div>
              <div className="form-group">
                <label htmlFor="suburb">Suburb:</label>
                <input
                  type="text"
                  className="form-control"
                  name="suburb"
                  value={suburb}
                  onChange={this.onChange}
                  placeholder="The Rocks"
                />
              </div>
              <div className="form-group">
                <label htmlFor="postCode">Post Code:</label>
                <input
                  type="text"
                  className="form-control"
                  name="postCode"
                  value={postCode}
                  onChange={this.onChange}
                  placeholder="2000"
                />
              </div>
              <div className="form-group">
                <label htmlFor="state">State:</label>
                <input
                  type="text"
                  className="form-control"
                  name="state"
                  value={state}
                  onChange={this.onChange}
                  placeholder="NSW"
                />
              </div>
              <button type="submit" className="btn btn-success">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Create;
