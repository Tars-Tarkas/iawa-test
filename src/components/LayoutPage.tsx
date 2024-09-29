import React from "react";
import { Outlet } from "react-router";
import type { MenuProps } from "antd";
import { logoutUser } from "../store/slice/authSlice";
import { LogoutOutlined } from "@ant-design/icons";
import { Layout, Typography, Menu, theme } from "antd";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import FormSearch from "./FormSearch";
const { Header, Sider, Content, Footer } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

export default function LayoutPage() {
  const dispatch = useDispatch<AppDispatch>();

  const onLogOut = () => {
    dispatch(logoutUser());
  };
  const items: MenuItem[] = [
    {
      key: "1",
      icon: <LogoutOutlined />,
      label: "Выход",
      onClick: () => {
        onLogOut();
      },
    },
  ];

  return (
    <Layout style={{ minHeight: "100%" }}>
      <Layout>
        <Header
          style={{
            padding: 15,
            background: "#fff",
            maxHeight: "100%",
            height: "auto",
          }}
        ></Header>
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{
              maxWidth: "100%",
              padding: 15,
              minHeight: "100%",
              background: "#ccc",
              borderRadius: 10,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}></Footer>
      </Layout>
      <Sider
        width={320}
        breakpoint="xl"
        collapsedWidth={0}
        reverseArrow
        about=""
        style={{ padding: 15 }}
      >
        <Menu
          selectable={false}
          theme="dark"
          mode="inline"
          items={items}
          style={{ marginBottom: 50 }}
        />
        <FormSearch />
      </Sider>
    </Layout>
  );
}
