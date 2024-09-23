import React from "react";
import type { Order } from "../types/types";
import { Link } from "react-router-dom";
import { Card, Badge, Descriptions, Divider } from "antd";

import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";

export default function CardTrips({
  props,
  link,
}: {
  props: Order;
  link: boolean;
}) {
  const { passengers, order_id, payable_status } = props;
  const screens = useBreakpoint();

  let status = { text: "", color: "" };
  switch (payable_status) {
    case 0:
      status.text = "Ожидание обработки";
      status.color = "purple";
      break;
    case 1:
      status.text = "Обработка";
      status.color = "magenta";
      break;
    case 2:
      status.text = "Принято";
      status.color = "green";
      break;
    case 3:
      status.text = "Завершённый";
      status.color = "volcano";
      break;
    case 4:
      status.text = "Отменено без штрафа";
      status.color = "red";
      break;
    case 5:
      status.text = "Отменено со штрафом";
      status.color = "red";
      break;
    case 6:
      status.text = "Неоплаченный";
      status.color = "red";
      break;
    case 7:
      status.text = "Измененный";
      status.color = "pink";
      break;
  }

  return (
    <div style={{ maxWidth: screens.xl ? 480 : "100%", width: "100%" }}>
      <Badge.Ribbon text={status.text} color={status.color}>
        <Card
          hoverable
          title={`ID поездки: ${order_id}`}
          style={{
            display: "block",
            textAlign: "left",
          }}
          size="small"
          bordered={false}
        >
          {passengers.map((item, index) => {
            return (
              <Descriptions
                title="Пассажиры"
                layout="vertical"
                bordered
                size="small"
                style={{ textAlign: "center" }}
                key={index}
              >
                <Descriptions.Item label="Имя">{item.name}</Descriptions.Item>
                <Descriptions.Item label="Email">
                  {item.email}
                </Descriptions.Item>
                <Descriptions.Item label="Телефон">
                  <a href={`tel:${item.phone}`}>{item.phone}</a>
                </Descriptions.Item>
              </Descriptions>
            );
          })}
          {link && (
            <Divider orientation="right">
              <div style={{ textAlign: "right" }}>
                <Link to={`/${order_id}`} style={{ textAlign: "right" }}>
                  Подробнее
                </Link>
              </div>
            </Divider>
          )}
        </Card>
      </Badge.Ribbon>
    </div>
  );
}
