import React, { useEffect, useState } from "react";
import { Flex, Pagination, Result } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store";
import { fetchData } from "../store/action/fetchDataActions";

import { clearState } from "../store/slice/authSlice";
import { useNavigate } from "react-router-dom";

import CardTrips from "./CardTrips";
import Spinner from "./Spinner";
import FormSearch from "./FormSearch";

type queryType = {
  queryName: string;
  queryEmail: string;
  queryStatus: string;
};

export default function ListOfTrips() {
  const dispatch = useDispatch<AppDispatch>();
  let navigate = useNavigate();

  const [query, setSquery] = useState<queryType>({
    queryName: "",
    queryEmail: "",
    queryStatus: "",
  });

  const [paginationModel, setPaginationModel] = useState({
    page: 1,
    pageSize: 25,
  });

  const { isError, isLoading, data, isSuccess } = useSelector(
    (state: RootState) => state.fetch
  );

  useEffect(() => {
    dispatch(clearState());
    if (isError) {
      navigate("/errorauth");
    }
  }, [isSuccess, isError]);

  useEffect(() => {
    if (!isLoading) {
      dispatch(
        fetchData({
          token: localStorage.getItem("token")!,
          page: paginationModel.page,
          itemsOnPage: paginationModel.pageSize,
          names: query.queryName,
          email: query.queryEmail,
          order_status: query.queryStatus,
        })
      );
    }
  }, [paginationModel, query]);

  if (!data) {
    return null;
  }
  const { result } = data;

  const onChangePagination = (page: number, pageSize: number) => {
    setPaginationModel({ page: page, pageSize: pageSize });
  };

  const queryValue = (value: queryType) => {
    setSquery({
      queryName: value.queryName,
      queryEmail: value.queryEmail,
      queryStatus: value.queryStatus,
    });
  };

  return (
    <>
      {isLoading && <Spinner />}
      {result?.orders ? (
        <>
          <FormSearch getValue={queryValue} />
          <Flex wrap gap="large" justify="center" align="center">
            {result?.orders?.map((item) => {
              return <CardTrips key={item.order_id} props={item} link />;
            })}
          </Flex>
          {!isLoading && (
            <Pagination
              defaultCurrent={1}
              style={{ padding: 30 }}
              align="center"
              current={paginationModel.page}
              total={result?.page_data?.total_items}
              pageSize={paginationModel.pageSize}
              onChange={onChangePagination}
              responsive
              showLessItems
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
