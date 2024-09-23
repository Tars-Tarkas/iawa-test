import React from "react";
import { Result } from "antd";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export default function ErrorAuth() {
  const { errorMessage } = useSelector((state: RootState) => state.fetch);

  return (
    <Result
      status="403"
      title="403"
      subTitle={errorMessage}
      extra={<Link to={`/login`}>Войти</Link>}
    />
  );
}
