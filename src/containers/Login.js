import { useState } from "react";
import { Form, Input, Button, message } from "antd";

import { login } from "../utils/auth";
export const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUserChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePassChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = () => {
    if (login(username, password)) {
      message.success("Login successful");
      onLogin();
    } else {
      message.error("Incorrect username or password");
    }
  };

  return (
    <Form className="formLogin" onFinish={handleSubmit} autoComplete="off">
      <Form.Item
        label="Username"
        name="formUsername"
        style={{ marginRight: 10 }}
        rules={[
          {
            required: true,
            message: "Please enter your username",
          },
        ]}
      >
        <Input
          style={{ marginLeft: 10, marginRight: 10 }}
          onChange={handleUserChange}
          value={username}
        />
      </Form.Item>
      <Form.Item
        label="Password"
        style={{ marginLeft: 20, marginRight: 10 }}
        name="formPassword"
        rules={[
          {
            required: true,
            message: "Please enter your password",
          },
        ]}
      >
        <Input.Password
          style={{ marginLeft: 10 }}
          onChange={handlePassChange}
          value={password}
        />
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          style={{ marginLeft: 30 }}
          className="button"
          htmlType="submit"
        >
          LOGIN
        </Button>
      </Form.Item>
    </Form>
  );
};
