import React, { useEffect, useState } from "react";
import { EmployeeData } from "./data/EmployeeData";
import "./App.css";
const App = () => {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({ name: "", email: "", age: null });
  useEffect(() => {
    setData(EmployeeData);
  }, []);
  //handle edit
  const handleEdit = (id) => {
    // Find the employee with the given id
    const employee = data.find((item) => item.id === id);

    // Update formData with the employee's data
    setFormData({
      name: employee.name,
      email: employee.email,
      age: employee.age,
    });
  };

  //handle delete
  const handleDelete = (id) => {
    if (window.confirm("Are you sure to delete ?")) {
      const deletedData = data.filter((item) => item.id !== id);
      setData(deletedData);
    }
  };

  //handleSave
  const handleSave = () => {
    // Check if any of the form fields are empty
    if (!formData.name || !formData.email || !formData.age) {
      alert("Please fill in all fields.");
      return;
    }

    // Find the index of the employee being edited
    const index = data.findIndex((item) => item.id === formData.id);

    // If the employee exists, update the data
    if (index !== -1) {
      // Create a copy of the data array to modify
      const updatedData = [...data];

      // Update the corresponding employee's data in the copied array
      updatedData[index] = {
        ...updatedData[index],
        name: formData.name,
        email: formData.email,
        age: formData.age,
      };

      // Update the state with the updated data
      setData(updatedData);

      // Clear the form fields after saving
      setFormData({ name: "", email: "", age: null });
      alert("Employee data updated successfully.");
    } else {
      alert("Employee not found.");
    }
  };

  //handleClear
  const handleClear = () => {
    setFormData({ name: "", email: "", age: "" });
  };

  //handle Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="update-form">
        <label htmlFor="">Name:</label>
        <input
          type="text"
          onChange={handleChange}
          value={formData.name}
          name="name"
          placeholder="Enter Name"
        />
        <label htmlFor="">Email:</label>
        <input
          type="text"
          onChange={handleChange}
          value={formData.email}
          name="email"
          placeholder="Enter Email"
        />
        <label htmlFor="">Age:</label>
        <input
          type="number"
          onChange={handleChange}
          value={formData.age}
          name="age"
          placeholder="Enter Age"
        />
        <td className="btn btn-primary ml-3 mb-3" onClick={() => handleSave()}>
          Save
        </td>
        <td className="btn btn-danger ml-3 mb-3" onClick={() => handleClear()}>
          Clear
        </td>
      </div>
      <table border={1}>
        <thead>
          <tr>
            <td>Sr.</td>
            <td>Id</td>
            <td>Name</td>
            <td>Email</td>
            <td>Age</td>
            <td>Actions</td>
          </tr>
        </thead>
        <tbody>
          {data.map((item, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.age}</td>
              <td
                className="btn btn-primary ml-3"
                onClick={() => handleEdit(item.id)}
              >
                Edit
              </td>
              <td
                className="btn btn-danger ml-3"
                onClick={() => handleDelete(item.id)}
              >
                Delete
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default App;
