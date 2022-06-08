import { Link, useNavigate } from "react-router-dom";
import { Button, Form, Input, message } from "antd";
import React, {  useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form] = Form.useForm();
  const handleSubmit = async (value) => {
    try {
      dispatch({ type: "SHOW_LOADING" });
      await axios.post("/api/users/register", value);
      message.success("Registered Successfully");
      navigate("/login");

      dispatch({ type: "HIDE_LOADING" });
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
          <h3>Register Page</h3>
          <Form form={form} layout="vertical" onFinish={handleSubmit}>
            <Form.Item name="name" label="Name">
              <Input />
            </Form.Item>
            <Form.Item name="userId" label="User ID">
              <Input />
            </Form.Item>
            <Form.Item name="password" label="Password">
              <Input type="password" />
            </Form.Item>
            <div className="d-flex justify-content-between">
              <p className="login-here">
                Already Registered? Please
                <Link to="/login">Login Here!</Link>
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
                  Register
                </Button>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Register;
