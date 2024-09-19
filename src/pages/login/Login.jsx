import React, {useState} from "react";
import "./Login.css";
import Form from "../../shared/form/Form";
import Button from "../../shared/button/Button";
import image from "../../../assets/login.avif";

const Login = () => {
    const [role, setRole] = useState("user");
  
    const handleSubmit = (event) => {
      event.preventDefault();
    };
  
    const handleRoleChange = (event) => {
      setRole(event.target.value);
    };

  return (
    <div className="login">
      <div className="login-image">
        <img src={image} alt="image" />
      </div>
      <div className="form-container">
        <p className="login-header">Login</p>
        <div className="radio-group">
          <label className="radio-label label-text">
            <input
              style={{ margin: "0", marginRight: "6px" }}
              className="radio-input"
              type="radio"
              name="role"
              value="user"
              checked={role==="user"}
              onChange={handleRoleChange}
            />{" "}
            User
          </label>
          <label className="radio-label label-text">
            <input
              style={{ margin: "0", marginRight: "6px" }}
              className="radio-input"
              type="radio"
              name="role"
              value="admin"
              checked={role==="admin"}
              onChange={handleRoleChange}
            />{" "}
            Admin
          </label>
        </div>
        <label
          style={{ marginBottom: "5px" }}
          className="label-text"
          htmlFor="email"
        >
          {role==="admin" ? "Mobile Number/Email:" : "Mobile Number:"}
        </label>
        <input
          className="login-input"
          type="mobile"
          id="mobile"
          // value={email}
          // onChange={handleEmailChange}
          required
        />
        <label
          style={{ marginBottom: "5px" }}
          className="label-text"
          htmlFor="password"
        >
          Password:
        </label>
        <input
          className="login-input"
          type="text"
          id="password"
          // value={password}
          // onChange={handlePasswordChange}
          required
        />
        <Button text="Login" type="submit" />
      </div>
    </div>
  );
};

export default Login;
