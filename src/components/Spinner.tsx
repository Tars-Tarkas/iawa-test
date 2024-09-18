import React from "react";
import { Alert, Flex, Spin } from "antd";

export default function Spinmer() {
  return (
    <Spin tip="Loading...">
      <Alert
        message="Alert message title"
        description="Further details about the context of this alert."
        type="info"
      />
    </Spin>
  );
}
