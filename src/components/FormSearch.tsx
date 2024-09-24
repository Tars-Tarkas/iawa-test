import React from "react";
import type { FormProps } from "antd";

import { Form, Input, TreeSelect, Button, Space } from "antd";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";

type FieldType = {
  queryName: string;
  queryEmail: string;
  queryStatus: number;
};

const selectData = [
  { label: "Ожидание обработки", value: "0" },
  { label: "Обработка", value: "1" },
  { label: "Принято", value: "2" },
  { label: "Завершённый", value: "3" },
  { label: "Отменено без штрафа", value: "4" },
  { label: "Отменено со штрафом", value: "5" },
  { label: "Неоплаченный", value: "6" },
  { label: "Измененный", value: "7" },
];

type PagePropsType = {
  getValue: (value: FieldType) => void;
};

export default function FormSearch({ getValue }: PagePropsType) {
  const screens = useBreakpoint();

  const onFinish: FormProps<FieldType>["onFinish"] = ({
    queryName = "",
    queryEmail = "",
    queryStatus = 0,
  }) => {
    getValue({ queryName, queryEmail, queryStatus });
  };

  const onReset = () => {
    getValue({ queryName: "", queryEmail: "", queryStatus: 0 });
  };
  return (
    <Form
      name="formSearch"
      style={{
        maxWidth: "100%",
        justifyContent: "center",
        gap: 10,
        padding: 5,
        display: "flex",
        flexWrap: "wrap",
        flexDirection: !screens.xl ? "column" : "inherit",
        alignItems: !screens.xl ? "flex-end" : "center",
        background: "#fff",
        borderRadius: 5,
        marginBottom: 15,
      }}
      autoComplete="off"
      layout={screens.lg ? "inline" : "vertical"}
      size="middle"
      onFinish={onFinish}
    >
      <Form.Item<FieldType>
        name="queryName"
        label={!screens.sm ? "" : "Поиск по имени"}
        layout="horizontal"
      >
        <Input
          style={{ maxWidth: "100%", width: 240 }}
          placeholder={screens.sm ? "" : "Поиск по имени"}
        />
      </Form.Item>

      <Form.Item<FieldType>
        name="queryEmail"
        label={!screens.sm ? "" : "Поиск по Email"}
        layout="horizontal"
      >
        <Input
          style={{ maxWidth: "100%", width: 240 }}
          placeholder={screens.sm ? "" : "Поиск по Email"}
        />
      </Form.Item>

      <Form.Item
        name="queryStatus"
        label={!screens.sm ? "" : "Поиск по статусу"}
        layout="horizontal"
        style={{ textAlign: "left" }}
      >
        <TreeSelect
          treeData={selectData}
          style={{ maxWidth: "100%", width: 240 }}
          placeholder={screens.sm ? "" : "Поиск по статусу"}
          allowClear
        />
      </Form.Item>
      <Space.Compact
        direction="horizontal"
        style={{ width: 240, justifyContent: "center" }}
      >
        <Button type="primary" htmlType="submit" style={{ width: 120 }}>
          Поиск
        </Button>
        <Button
          type="dashed"
          htmlType="reset"
          onClick={onReset}
          style={{ width: 120 }}
        >
          Очистить поиск
        </Button>
      </Space.Compact>
    </Form>
  );
}
