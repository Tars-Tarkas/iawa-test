import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store";
import { fetchDataDetails } from "../store/action/fetchDataDetailsActions";
import Spinner from "./Spinner";
import { Button, Flex, Descriptions } from "antd";
import CardTrips from "./CardTrips";

export default function TripDetails() {
  const { order_id } = useParams();

  const dispatch = useDispatch<AppDispatch>();
  let navigate = useNavigate();

  const { isLoading, data } = useSelector(
    (state: RootState) => state.fetchDetails
  );

  useEffect(() => {
    dispatch(
      fetchDataDetails({
        token: localStorage.getItem("token")!,
        order_id: order_id!,
      })
    );
  }, [dispatch, order_id]);

  const back = () => {
    navigate(-1);
  };
  const { result } = data;

  return (
    <>
      {isLoading && <Spinner />}
      <Flex align="flex-start" style={{ marginBottom: 30 }}>
        <Button onClick={() => back()}>Назад</Button>
      </Flex>

      {result?.orders?.map((item, index) => {
        return (
          <Flex key={index} gap={20} wrap>
            <CardTrips props={item} link={false} />
            <Descriptions
              title="Даты"
              layout="vertical"
              bordered
              size="small"
              style={{ textAlign: "center", background: "#fff" }}
            >
              <Descriptions.Item label="Дата бронирования">
                {item.date || "нет даты"}
              </Descriptions.Item>
              <Descriptions.Item label="Дата прибытия">
                {item.date_arrival || "нет даты"}
              </Descriptions.Item>
              <Descriptions.Item label="Дата отъезда">
                {item.date_departure || "нет даты"}
              </Descriptions.Item>
              <Descriptions.Item label="Адрес местоположения">
                {item.location_address}
              </Descriptions.Item>
              <Descriptions.Item label="Целевой адрес">
                {item.destination_address}
              </Descriptions.Item>
            </Descriptions>

            <Descriptions
              title="Данные об автомобиле и водителе"
              layout="vertical"
              bordered
              size="small"
              style={{ textAlign: "center", background: "#fff" }}
            >
              <Descriptions.Item label="Название модели автомобиля">
                {item.car_data.models}
              </Descriptions.Item>
              <Descriptions.Item label="Название класса автомобиля">
                {item.car_data.car_class}
              </Descriptions.Item>
              <Descriptions.Item label="Вместимость">
                {item.car_data.capacity}
              </Descriptions.Item>
              <Descriptions.Item label="Имя водителя">
                {item.driver_data?.driver_name || "отсутствуют данные"}
              </Descriptions.Item>
              <Descriptions.Item label="Телефон водителя">
                {item.driver_data?.driver_phone || "отсутствуют данные"}
              </Descriptions.Item>
            </Descriptions>

            <Descriptions
              title="Стоимость поездки"
              layout="vertical"
              bordered
              size="small"
              style={{ textAlign: "center", background: "#fff" }}
            >
              <Descriptions.Item label="Валюта">
                {item.currency}
              </Descriptions.Item>
              <Descriptions.Item label="Стоимость">
                {item.price.price}
              </Descriptions.Item>
            </Descriptions>
          </Flex>
        );
      })}
    </>
  );
}
