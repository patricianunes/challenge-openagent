import React, { Component } from "react";
import firebase from "../Firebase";
import { Link } from "react-router-dom";

class Show extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: {},
      key: ""
    };
  }

  componentDidMount() {
    const ref = firebase
      .firestore()
      .collection("addresses")
      .doc(this.props.match.params.id);
    ref.get().then(doc => {
      if (doc.exists) {
        this.setState({
          address: doc.data(),
          key: doc.id,
          isLoading: false
        });
      } else {
        console.log("No such document!");
      }
    });
  }

  delete(id) {
    firebase
      .firestore()
      .collection("addresses")
      .doc(id)
      .delete()
      .then(() => {
        console.log("Document successfully deleted!");
        this.props.history.push("/");
      })
      .catch(error => {
        console.error("Error removing document: ", error);
      });
  }

  render() {
    return (
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h4>
              <Link to="/">Address List</Link>
            </h4>
            <h3 className="panel-title">Details</h3>
          </div>
          <div className="panel-body">
            <dl>
              <dt>Property Type:</dt>
              <dd>{this.state.address.propertyType}</dd>
              <dt>Street Number:</dt>
              <dd>{this.state.address.streetNumber}</dd>
              <dt>Unit Number:</dt>
              <dd>{this.state.address.unitNumber}</dd>
              <dt>Street:</dt>
              <dd>{this.state.address.street}</dd>
              <dt>Suburb:</dt>
              <dd>{this.state.address.suburb}</dd>
              <dt>Postcode:</dt>
              <dd>{this.state.address.postCode}</dd>
              <dt>State:</dt>
              <dd>{this.state.address.state}</dd>
            </dl>
            <Link to={`/edit/${this.state.key}`} className="btn btn-success">
              Edit
            </Link>
            &nbsp;
            <button
              onClick={this.delete.bind(this, this.state.key)}
              className="btn btn-danger"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Show;
