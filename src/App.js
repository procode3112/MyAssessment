import React from "react";
import axios from "axios";
import PostForm from "./components/PostForm";
import Paginate from "./Paginate";
import "./App.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      users: null,
    };
  }
  componentDidMount() {
    document.body.style.backgroundColor = "#29f2ac";
    fetch(
      "https://mockrestapi.herokuapp.com/api/employee?pageNo=1&limit=5"
    ).then((resp) => {
      resp.json().then((result) => {
        this.setState({ users: result.data });
      });
    });
  }

  render() {
    const postDelete = (id, e) => {
      e.preventDefault();
      axios
        .delete(`https://mockrestapi.herokuapp.com/api/employee/${id}`)
        .then((res) => console.log("Deleted..", res))
        .catch((err) => console.log(err));
    };
    return (
      <div clssname="app-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Country</th>
              <th>Age</th>
              <th>Delete Field</th>
            </tr>
          </thead>
          <tbody>
            {this.state.users
              ? this.state.users.map((item, i) => (
                  <tr>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.phone}</td>
                    <td>{item.address}</td>
                    <td>{item.country}</td>
                    <td>{item.age}</td>
                    <th>
                      <button onClick={(e) => postDelete(item._id, e)}>
                        Delete
                      </button>
                    </th>
                  </tr>
                ))
              : null}
          </tbody>
        </table>
        <Paginate />
        <PostForm />
      </div>
    );
  }
}
export default App;
