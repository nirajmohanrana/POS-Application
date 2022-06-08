import React, {  useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form, Input, message } from "antd";
import axios from "axios";
import { useDispatch } from "react-redux";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form] = Form.useForm();
  const handleSubmit = async (value) => {
    try {
      dispatch({ type: "SHOW_LOADING" });
      const res = await axios.post("/api/users/login", value);
      dispatch({ type: "HIDE_LOADING" });
      message.success("User Login Successfully");
      localStorage.setItem("auth", JSON.stringify(res.data));
      navigate("/");
    } catch (error) {
      dispatch({ type: "HIDE_LOADING" });
      message.success("Something Went Wrong");
      console.log(error);
    }
  };

// currently logged in user
useEffect(()=>{
  if(localStorage.getItem('auth')){
    localStorage.getItem('auth')
    navigate('/')
  }
},[navigate])

  return (
    <>
      <div className="register">
        <div className="register-form">
          <h1>POS App</h1>
          <h3>Login Page</h3>
          <Form form={form} layout="vertical" onFinish={handleSubmit}>
            <Form.Item name="userId" label="User ID">
              <Input />
            </Form.Item>
            <Form.Item name="password" label="Password">
              <Input type="password" />
            </Form.Item>
            <div className="d-flex justify-content-between">
              <p className="login-here">
                Not a User? Please
                <Link to="/register">Register Here!</Link>
              </p>
              <div>
                <Button
                  style={{
                    marginRight: "10px",
                  }}
                  onClick={() => {
                    form.resetFields();
                  }}
                >
                  Clear
                </Button>
                <Button type="primary" htmlType="submit">
                  Login
                </Button>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Login;
