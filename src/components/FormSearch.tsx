import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store";
import { fetchData } from "../store/action/fetchDataActions";
import { useSearchParams } from "react-router-dom";
import type { FormProps } from "antd";
import { Form, Input, TreeSelect, Button, Space } from "antd";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import {
  setCurrentPage,
  setItems_on_page,
} from "../store/slice/fetchDataSlice";
const { SHOW_PARENT } = TreeSelect;

type QueryType = {
  names: string;
  email: string;
  "order_status[]": string[];
  page: number;
  items_on_page: number;
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
  const screens = useBreakpoint();
  const [valuetreeselect, setValuetreeselect] = useState<string[]>([]);

  const [query, setQuery] = useState<QueryType>({
    names: searchParams.get("names") || "",
    email: searchParams.get("email") || "",
    "order_status[]": [],
    page: Number(searchParams.get("page")) || 1,
    items_on_page: Number(searchParams.get("items_on_page")) || 11,
  });

  useEffect(() => {
    setQuery({ ...query, names: searchParams.get("names") || "" });
    setSearchParams((params) => {
      params.set("page", query.page.toString());
      params.set("items_on_page", query.items_on_page.toString());
      return params;
    });
    dispatch(setCurrentPage(query.page));
    dispatch(setItems_on_page(query.items_on_page));
  }, [searchParams, currentPage, currentItems_on_page]);

  useEffect(() => {
    if (!isLoading) {
      dispatch(
        fetchData({
          token: userToken as string,
          query: decodeURIComponent(searchParams.toString()),
        })
      );
    }
  }, [searchParams, currentPage, currentItems_on_page]);

  const onFinish: FormProps<QueryType>["onFinish"] = ({
    names = "",
    email = "",
  }) => {
    setQuery({
      page: currentPage,
      items_on_page: currentItems_on_page,
      names: names,
      email: email,
      "order_status[]": valuetreeselect,
    });

    setSearchParams({
      page: currentPage.toString(),
      items_on_page: currentItems_on_page.toString(),
      names: names,
      email: email,
      "order_status[]": query["order_status[]"],
    });
  };

  const onReset = () => {
    setQuery({
      ...query,
      names: "",
      email: "",
      "order_status[]": [],
    });
    setSearchParams();
    dispatch(
      fetchData({
        token: userToken as string,
      })
    );
  };

  const onChange = (newValue: string[]) => {
    setValuetreeselect(newValue);
  };

  const tProps = {
    treeData,
    valuetreeselect,
    onChange,
    treeCheckable: true,
    showCheckedStrategy: SHOW_PARENT,
  };

  return (
    <Form
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
        <Input allowClear />
      </Form.Item>

      <Form.Item<QueryType>
        name="email"
        label={<label style={{ color: "#fff" }}>Поиск по Email</label>}
        layout="vertical"
        style={{ width: "100%" }}
      >
        <Input allowClear />
      </Form.Item>

      <Form.Item<QueryType>
        name="order_status[]"
        label={<label style={{ color: "#fff" }}>Поиск по статусу</label>}
        layout="vertical"
        // style={{ textAlign: "left" }}
        style={{ width: "100%", color: "#fff" }}
      >
        <TreeSelect {...tProps} placeholder={"Поиск по статусу"} allowClear />
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
