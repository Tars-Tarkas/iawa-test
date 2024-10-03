import React, { useEffect } from "react";
import { Flex, Pagination, Result } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store";
import { fetchData } from "../store/action/fetchDataActions";
import {
  setCurrentPage,
  setItems_on_page,
} from "../store/slice/fetchDataSlice";

import { useNavigate } from "react-router-dom";

import CardTrips from "./CardTrips";
import Spinner from "./Spinner";

export default function ListOfTrips() {
  const dispatch = useDispatch<AppDispatch>();
  let navigate = useNavigate();

  const { userToken } = useSelector((state: RootState) => state.auth);

  const { isLoading, data } = useSelector((state: RootState) => state.fetch);
  const { currentPage, currentItems_on_page } = useSelector(
    (state: RootState) => state.fetch
  );

  useEffect(() => {
    if (!userToken) {
      navigate("/login");
    }
  }, [userToken]);

  useEffect(() => {
    dispatch(
      fetchData({
        token: userToken as string,
      })
    );
  }, [userToken]);

  const onChangePagination = (page: number, items_on_page: number) => {
    dispatch(setCurrentPage(page));
    dispatch(setItems_on_page(items_on_page));
  };

  if (!data) {
    return null;
  }
  const { result } = data;

  return (
    <>
      {isLoading && <Spinner />}
      {result?.orders ? (
        <>
          <Flex wrap gap="large" justify="center" align="center" >
            {result?.orders?.map((item) => {
              return <CardTrips key={item.order_id} props={item} link />;
            })}
          </Flex>
          {!isLoading && (
            <Pagination
              hideOnSinglePage
              defaultCurrent={1}
              style={{ padding: 30 }}
              align="center"
              current={currentPage}
              total={result?.page_data?.total_items}
              pageSize={currentItems_on_page}
              onChange={onChangePagination}
              responsive
              showLessItems
              showTotal={(total) => `Количество: ${total}`}
              locale={{
                items_per_page: "Страниц на листе",
                next_page: "Следующая страница",
                page: "страница",
              }}
            />
          )}
        </>
      ) : (
        <Result status="warning" title="Данные не найдены" />
      )}
    </>
  );
}
