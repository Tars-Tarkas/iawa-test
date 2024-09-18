import React, { useEffect } from "react";
import { Layout } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchData } from "../store/action/fetchDataActions";
import { clearState, logoutUser } from "../store/slice/authSlice";
import { RootState, AppDispatch } from "../store";
const { Header, Content, Footer } = Layout;

export default function ListOfTrips() {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch<AppDispatch>();
  let navigate = useNavigate();
  const { data, isError, isLoading, erroeMessage } = useSelector(
    (state: RootState) => state.fetch
  );

  useEffect(() => {
    if (isError) {
      dispatch(clearState());
      navigate("/login");
    } else dispatch(fetchData({ token: token! }));
  }, [isError]);

  const onLogOut = () => {
    dispatch(logoutUser());
  };

  return (
    <Layout>
      <Header style={{ display: "flex", alignItems: "center" }}>
        <button onClick={onLogOut}>Выйти</button>
      </Header>
      <Content style={{ padding: "0 48px" }}>
        <Layout
          style={{
            padding: "24px 0",
          }}
        >
          <Content style={{ padding: "0 24px", height: "100%" }}>
            Content
          </Content>
        </Layout>
      </Content>
      <Footer style={{ textAlign: "center" }}></Footer>
    </Layout>
  );
}
