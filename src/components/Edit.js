import React, { Component } from "react";
import firebase from "../Firebase";
import { Link } from "react-router-dom";

class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: "",
      propertyType: "",
      streetNumber: "",
      unitNumber: "",
      street: "",
      suburb: "",
      postCode: "",
      state: ""
    };
  }

  componentDidMount() {
    const ref = firebase
      .firestore()
      .collection("addresses")
      .doc(this.props.match.params.id);
    ref.get().then(doc => {
      if (doc.exists) {
        const address = doc.data();
        this.setState({
          key: doc.id,
          propertyType: address.propertyType,
          streetNumber: address.streetNumber,
          unitNumber: address.unitNumber,
          street: address.street,
          suburb: address.suburb,
          postCode: address.postCode,
          state: address.state
        });
      } else {
        console.log("No such document!");
      }
    });
  }

  onChange = e => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState({ address: state });
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

    const updateRef = firebase
      .firestore()
      .collection("addresses")
      .doc(this.state.key);
    updateRef
      .set({
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
          key: "",
          propertyType: "",
          streetNumber: "",
          unitNumber: "",
          street: "",
          suburb: "",
          postCode: "",
          state: ""
        });
        this.props.history.push("/show/" + this.props.match.params.id);
      })
      .catch(error => {
        console.error("Error adding document: ", error);
      });
  };

  render() {
    return (
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">EDIT ADDRESS</h3>
          </div>
          <div className="panel-body">
            <h4>
              <Link to={`/show/${this.state.key}`} className="btn btn-primary">
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
                  value={this.state.propertyType}
                  onChange={this.onChange}
                  placeholder="apartment or house"
                />
              </div>
              <div className="form-group">
                <label htmlFor="streetNumber">Street Number:</label>
                <input
                  type="text"
                  className="form-control"
                  name="streetNumber"
                  value={this.state.streetNumber}
                  onChange={this.onChange}
                  placeholder="10"
                />
              </div>
              <div className="form-group">
                <label htmlFor="unitNumber">Unit Number:</label>
                <input
                  type="text"
                  className="form-control"
                  name="unitNumber"
                  value={this.state.unitNumber}
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
                  value={this.state.street}
                  onChange={this.onChange}
                  placeholder="Street"
                />
              </div>
              <div className="form-group">
                <label htmlFor="suburb">Suburb:</label>
                <input
                  type="text"
                  className="form-control"
                  name="suburb"
                  value={this.state.suburb}
                  onChange={this.onChange}
                  placeholder="Suburb"
                />
              </div>
              <div className="form-group">
                <label htmlFor="postCode">Postcode:</label>
                <input
                  type="text"
                  className="form-control"
                  name="postCode"
                  value={this.state.postCode}
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
                  value={this.state.state}
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

export default Edit;
