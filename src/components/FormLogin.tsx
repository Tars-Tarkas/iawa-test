import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userLogin } from "../store/action/authActions";
import { clearState } from "../store/slice/authSlice";
import { RootState, AppDispatch } from "../store";
import { Button, Form, Input, Row, Alert, Card, Typography } from "antd";
import type { FormProps } from "antd";

type FieldType = {
  login?: string;
  password?: string;
};
const login = process.env.REACT_APP_LOGIN;
const pass = process.env.REACT_APP_PASS;

export default function FormLogin() {
  const dispatch = useDispatch<AppDispatch>();
  let navigate = useNavigate();
  const { Title } = Typography;
  const [form] = Form.useForm();
  const { isError, isSuccess, errorMessage } = useSelector(
    (state: RootState) => state.auth
  );

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    dispatch(userLogin({ login: values.login!, password: values.password! }));
  };

  useEffect(() => {
    return () => {
      dispatch(clearState());
      form.resetFields();
    };
  }, []);

  useEffect(() => {
    if (isSuccess) {
      setTimeout(function () {
        navigate("/");
      }, 1000);
    }
  }, [isError, isSuccess]);

  return (
    <Row justify="center" align="middle" style={{ minHeight: "100vh" }}>
      <Card style={{ width: 500 }}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Title level={2}>Авторизация пользователя</Title>
        </div>
        <Form
          form={form}
          size="middle"
          name="form_login"
          style={{
            maxWidth: 600,
            borderRadius: 6,
            border: "1px solid #40a9ff",
            padding: 30,
            marginBottom: 30,
          }}
          initialValues={{
            remember: true,
            ["login"]: login,
            ["password"]: pass,
          }}
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item<FieldType>
            name="login"
            rules={[
              {
                required: true,
                message: "Пожалуйста, введит имя пользователя!",
              },
            ]}
          >
            <Input placeholder="Введите имя пользователя" />
          </Form.Item>

          <Form.Item<FieldType>
            name="password"
            rules={[{ required: true, message: "Пожалуйста, введите пароль!" }]}
          >
            <Input.Password placeholder="Введите пароль" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
              Отправить
            </Button>
          </Form.Item>
        </Form>
        {isSuccess ? (
          <Alert message="Доступ разрешен" type="success" showIcon />
        ) : null}
        {isError ? (
          <Alert message={errorMessage} type="error" showIcon />
        ) : null}
      </Card>
    </Row>
  );
}
