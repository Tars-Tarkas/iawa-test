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
  const { passengers, order_id, status } = props;
  const screens = useBreakpoint();

  let p_status = { text: "", color: "" };
  switch (status) {
    case 0:
      p_status.text = "Ожидание обработки";
      p_status.color = "purple";
      break;
    case 1:
      p_status.text = "Обработка";
      p_status.color = "magenta";
      break;
    case 2:
      p_status.text = "Принято";
      p_status.color = "green";
      break;
    case 3:
      p_status.text = "Завершённый";
      p_status.color = "volcano";
      break;
    case 4:
      p_status.text = "Отменено без штрафа";
      p_status.color = "red";
      break;
    case 5:
      p_status.text = "Отменено со штрафом";
      p_status.color = "red";
      break;
    case 6:
      p_status.text = "Неоплаченный";
      p_status.color = "red";
      break;
    case 7:
      p_status.text = "Измененный";
      p_status.color = "pink";
      break;
  }

  return (
    <div
      style={{
        maxWidth: screens.xl ? 640 : "100%",
        width: "100%",
        minHeight: "100%",
        height: "100%",
      }}
    >
      <Badge.Ribbon text={p_status.text} color={p_status.color}>
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
                title="Пассажир"
                key={index}
                layout="vertical"
                bordered
                size="small"
                style={{ textAlign: "center", marginBottom: 10 }}
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
                <Link
                  to={`/tripsdetails/${order_id}`}
                  style={{ textAlign: "right" }}
                >
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
