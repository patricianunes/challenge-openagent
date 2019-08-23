import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./App.css";
import firebase from "./Firebase";

class App extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection("addresses");
    this.unsubscribe = null;
    this.state = {
      addresses: [],
      search: ""
    };
  }

  onCollectionUpdate = querySnapshot => {
    const addresses = [];
    querySnapshot.forEach(doc => {
      const {
        propertyType,
        streetNumber,
        unitNumber,
        street,
        suburb,
        postCode,
        state
      } = doc.data();
      addresses.push({
        key: doc.id,
        doc,
        propertyType,
        streetNumber,
        unitNumber,
        street,
        suburb,
        postCode,
        state
      });
    });
    this.setState({
      addresses
    });
  };

  //TODO: change to a search component
  onChange = e => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);

    const db = this.ref
      .orderBy("propertyType")

      .startAt(e.target.value)
      .endAt(e.target.value + "\uf8ff");
    db.get()
      .then(querySnapshot => {
        if (querySnapshot) {
          const array = [];

          querySnapshot.forEach(function(doc) {
            const mock = {
              key: doc.id,
              propertyType: doc.data().propertyType,
              unitNumber: doc.data().unitNumber,
              streetNumber: doc.data().streetNumber,
              street: doc.data().street,
              suburb: doc.data().suburb,
              postCode: doc.data().postCode,
              state: doc.data().state
            };
            array.push(mock);
          });

          this.setState({ addresses: array });
          console.log(array);
        } else {
          console.log("Not found"); //TODO: create a label not found
        }
      })
      .catch(function(error) {
        console.log("Error getting document:", error);
      });
  };

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  render() {
    return (
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title mt-4 mb-4">ADDRESS LIST</h3>
          </div>
          <div className="panel-body">
            <input
              type="text"
              className="form-control mb-4"
              name="search"
              value={this.state.search}
              onChange={this.onChange}
              placeholder="Search"
            />

            <table className="table table-stripe">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Type </th>
                  <th>St Number</th>
                  <th>Unit Number</th>
                  <th>Street</th>
                  <th>Suburb</th>
                  <th>Postcode</th>
                  <th>State</th>
                </tr>
              </thead>
              <tbody>
                {this.state.addresses.map(address => (
                  <tr key={address.key}>
                    <td>
                      <Link to={`/show/${address.key}`}>Details</Link>
                    </td>
                    <td>{address.propertyType}</td>
                    <td>{address.streetNumber}</td>
                    <td>{address.unitNumber}</td>
                    <td>{address.street}</td>
                    <td>{address.suburb}</td>
                    <td>{address.postCode}</td>
                    <td>{address.state}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <h4>
              <Link to="/create">Add Address</Link>
            </h4>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
