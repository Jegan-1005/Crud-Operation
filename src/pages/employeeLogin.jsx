import React, { useState } from "react";
import axios from "axios";
import "../App.css";

let initialValues = {
  name: "",
  age: "",
  id: "",
};

const Employee = () => {
  const [formValue, setFormValue] = useState(initialValues);
  const { name, age, id } = formValue;
  const [error, setError] = useState({});
  const [user, setUser] = useState("");

  const handlechange = (e) => {
    const { id, value } = e.target;
    let formData = {
      ...formValue,
      ...{
        [id]: value,
      },
    };
    setFormValue(formData);
  };

  const addEmployee = () => {
    axios
      .post("http://localhost:1005/employeeLogin", {
        name,
        age,
        id,
      })
      .then(function (response) {
        if (response && response.data && response.data.status == true) {
          alert(response && response.data && response.data.message);
          setFormValue(initialValues);
          setError({});
        } else {
          setError(response && response.data && response.data.error);
        }
      })
      .catch(function (error) {
        console.log(error, "ssssssssssss");
      });
  };

  const listEmployee = () => {
    axios
      .get("http://localhost:1005/allUser")
      .then(function (response) {
        if (response && response.data && response.data.status == true) {
          setUser(response.data.data);
        }
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  const onDelete = (id) => {
    let data = { id: id };
    axios
      .post("http://localhost:1005/delete", data)
      .then(function (response) {
        if (response.data.status == true) {
          alert(response.data.message);
          listEmployee();
        }
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  return (
    <div className="App">
      <div className="information">
        <h1>Employee Login</h1>
        <label>Name:</label>
        <input type="text" onChange={handlechange} id="name" value={name} />
        <br />
        <span style={{ color: "red" }}>{error && error.name} </span>
        <label>Age:</label>
        <input type="age" onChange={handlechange} id="age" value={age} />
        <span style={{ color: "red" }}>{error && error.age} </span>
        <br />
        <label>Employee ID:</label>
        <input type="number" onChange={handlechange} id="id" value={id} />
        <span style={{ color: "red" }}>{error && error.id} </span>
        <br />
        <button className="btn btn-success" onClick={addEmployee}>
          Log In
        </button>
        <div>
          <button className="btn btn-info" onClick={listEmployee}>
            Show Login details
          </button>
          {user &&
            user.length > 0 &&
            user.map((item, i) => {
              return (
                <div className="employee">
                  <h3>Name:{item.name}</h3>
                  <h3>Age:{item.age}</h3>
                  <h3>Employee Id:{item.id}</h3>
                  <button
                    className="btn"
                    type="button"
                    onClick={() => onDelete(item._id)}
                  >
                    X
                  </button>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Employee;
