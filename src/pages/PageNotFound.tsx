import React from "react";
import { Result } from "antd";
import { Link } from "react-router-dom";

export default function PageNotFound() {
  return (
    <div>
      <Result
        status="404"
        title="404"
        subTitle="Извините, страница не найдена"
        extra={<Link to={`/`}>Перейти на домашнюю страницу</Link>}
      />
    </div>
  );
}
