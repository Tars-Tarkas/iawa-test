import React from "react";
import { Flex, Spin } from "antd";

export default function Spinner() {
  return (
    <Flex gap="middle" vertical>
      <Spin tip="Загрузка..." size="large" fullscreen></Spin>
    </Flex>
  );
}
