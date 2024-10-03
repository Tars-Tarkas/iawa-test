import React, { useState, useEffect, ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store";
import { fetchData } from "../store/action/fetchDataActions";
import { useSearchParams } from "react-router-dom";
import type { FormProps } from "antd";
import { Form, Input, TreeSelect, Button, Space } from "antd";

const { SHOW_PARENT } = TreeSelect;

type QueryType = {
  names: string;
  email: string;
  order_status: string[];
};

const treeData = [
  { title: "Ожидание обработки", value: 0, key: "0" },
  { title: "Обработка", value: 1, key: "1" },
  { title: "Принято", value: 2, key: "2" },
  { title: "Завершённый", value: 3, key: "3" },
  { title: "Отменено без штрафа", value: 4, key: "4" },
  { title: "Отменено со штрафом", value: 5, key: "5" },
  { title: "Неоплаченный", value: 6, key: "6" },
  { title: "Измененный", value: 7, key: "7" },
];

export default function FormSearch() {
  const { userToken } = useSelector((state: RootState) => state.auth);
  const { currentPage, currentItems_on_page, isLoading } = useSelector(
    (state: RootState) => state.fetch
  );

  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch<AppDispatch>();
  const [valueTreeSelect, setValueTreeSelect] = useState<string[]>([]);
  const [query, setQuery] = useState<QueryType>({
    names: "",
    email: "",
    order_status: [],
  });

  useEffect(() => {
    setQuery({
      ...query,
      names: searchParams.get("names") || "",
      email: searchParams.get("email") || "",
      order_status: searchParams.getAll("order_status") || [],
    });
  }, []);
  
  useEffect(() => {
    if (!isLoading) {
      dispatch(
        fetchData({
          token: userToken as string,
          query: decodeURIComponent(searchParams.toString()),
        })
      );
    }
  }, [searchParams]);

  useEffect(() => {
    setSearchParams({
      page: currentPage.toString(),
      items_on_page: currentItems_on_page.toString(),
      names: query.names,
      email: query.email,
      "order_status[]": query.order_status,
    });
  }, [query, currentPage, currentItems_on_page]);

  const onFinish: FormProps<QueryType>["onFinish"] = ({
    names = "",
    email = "",
  }) => {
    setQuery({
      ...query,
      names: names,
      email: email,
      order_status: valueTreeSelect,
    });
  };

  const onReset = () => {
    setQuery({
      ...query,
      names: "",
      email: "",
      order_status: [],
    });
    setSearchParams();
    dispatch(
      fetchData({
        token: userToken as string,
      })
    );
  };

  const onChange = (newValue: string[]) => {
    setValueTreeSelect(newValue);
    if (newValue.length === 0) {
      setQuery({ ...query, order_status: [] });
    }
  };

  const tProps = {
    treeData,
    onChange,
    treeCheckable: true,
    showCheckedStrategy: SHOW_PARENT,
  };
  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.type === "click") {
      setQuery({ ...query, names: "", email: "" });
    }
  };

  return (
    <Form
      initialValues={query}
      name="formSearch"
      title="Поиск"
      style={{
        maxWidth: "100%",
        justifyContent: "center",
        gap: 10,
        padding: 5,
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "column",
        alignItems: "center",
        color: "#fff",
        borderRadius: 5,
        marginBottom: 15,
      }}
      autoComplete="off"
      layout={"vertical"}
      size="middle"
      onFinish={onFinish}
    >
      <Form.Item<QueryType>
        name="names"
        label={<label style={{ color: "#fff" }}>Поиск по имени</label>}
        layout="vertical"
        style={{ width: "100%", color: "#fff" }}
      >
        <Input allowClear onChange={onChangeInput} />
      </Form.Item>

      <Form.Item<QueryType>
        name="email"
        label={<label style={{ color: "#fff" }}>Поиск по Email</label>}
        layout="vertical"
        style={{ width: "100%" }}
        rules={[
          {
            type: "email",
            message: "Введенный адрес электронной почты неверен!",
          },
        ]}
      >
        <Input allowClear onChange={onChangeInput} />
      </Form.Item>

      <Form.Item<QueryType>
        name="order_status"
        label={<label style={{ color: "#fff" }}>Поиск по статусу</label>}
        layout="vertical"
        style={{ width: "100%", color: "#fff" }}
      >
        <TreeSelect
          {...tProps}
          placeholder={"Поиск по статусу"}
          allowClear
          value={valueTreeSelect}
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
