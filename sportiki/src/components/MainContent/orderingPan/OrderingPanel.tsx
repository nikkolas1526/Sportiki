import "./OrderingPanel.css";
import { Product } from "../../ItemPage/Interfaces/Interfaces";
import Ax from "axios";
import React, { useState } from "react";

interface Props {
  items: Product[];
  setItems: (value: Product[]) => void;
  sum: number;
  setOrderingPanel: (panel: boolean) => void;
  id: number;
}

export default function OrderingPan({
  items,
  setItems,
  sum,
  id,
  setOrderingPanel,
}: Props) {
  const [orderMessage, setOrderMessage] = useState("");

  const handleNumberChange = async (itemId: number, newNumber: number) => {
    const updatedItems = items.map((item) => {
      if (item.id === itemId) {
        return { ...item, number: newNumber };
      }
      return item;
    });
    setItems(updatedItems);
    await Ax.post("http://localhost:3001/api/BinChangeNumberOfItem", {
      id: id,
      item_id: itemId,
      number: newNumber,
    });
  };

  const handleOrder = async () => {
    try {
      const response = await Ax.post("http://localhost:3001/api/AddOrder", {
        items: items,
        accountId: id,
        totalPrice: sum,
      });
      setOrderMessage(response.data.message); //success
    } catch (error: any) {
      if (error.response && error.response.status === 409) {
        setOrderMessage(error.response.data.message); //if active order
      } else {
        setOrderMessage("Не удалось оформить заказ");
        console.log(error);
      }
    }
  };

  return (
    <div className="mainDivOrderingPan">
      <div className="infoDivOrderingPan">
        <button
          className="goOut"
          onClick={() => {
            setOrderingPanel(false);
          }}
        >
          X
        </button>
        <div>Информация о заказе</div>
        <div>Пункт выдачи: Лобанка 9\2</div>
        <div className="itemsInOrder">
          {items.map((item) => (
            <div key={item.id} className="orderItem">
              <textarea className="itemName2">{item.name}</textarea>
              <div className="itemPrice">{item.price} руб.</div>
              <div className="itemCount">
                <button
                  className="changeNumber3"
                  onClick={() =>
                    handleNumberChange(
                      item.id,
                      item.number > 1 ? item.number - 1 : 1
                    )
                  }
                >
                  -
                </button>
                <input
                  className="numberOfItem3"
                  value={item.number}
                  disabled={true}
                />
                <button
                  className="changeNumber3"
                  onClick={() => handleNumberChange(item.id, item.number + 1)}
                >
                  +
                </button>
              </div>
              <div className="itemTotalPrice">
                {item.price * item.number} руб.
              </div>
            </div>
          ))}
        </div>
        {orderMessage && <div>{orderMessage}</div>}
        <div className="totalPrice">Общая сумма: {sum} руб.</div>
        {orderMessage != "Заказ успешно создан" ? (
          <button className="orderButton" onClick={handleOrder}>
            Оформить заказ
          </button>
        ) : null}
      </div>
    </div>
  );
}
