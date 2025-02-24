import "./Order.css";
import { useState } from "react";
import Ax from "axios";
import Cookies from "js-cookie";

interface Order {
  id: number;
  account_id: number;
  status: string;
  total_price: number;
  time: string;
}
interface Items {
  ordered_item_id: number;
  order_id: number;
  price: number;
  number: number;
}
interface props {
  item: Order;
  show: number;
  setShow: (show: number) => void;
}
export default function Order({ item, show, setShow }: props) {
  const [MyItem, setMyItem] = useState(item);
  const [items, setItems] = useState<Items[]>([]);

  const CheckRoots = async () => {
    const token = Cookies.get("accessToken");
    if (token == undefined) {
      return;
    }
    const response = await fetch("http://localhost:3001/api/isAdmin", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (data.message == "Администратор") {
      return "Good";
    } else {
      return data.message;
    }
  };
  const getData = async () => {
    const id = MyItem.id;
    const result = await Ax.get("http://localhost:3001/api/Order", {
      params: { id: id },
    });
    setItems(result.data);
  };

  const onChange = async (e) => {
    const val = e.target.value;
    setMyItem((prevItem) => ({ ...prevItem, status: val }));
    const adminCheck = await CheckRoots();
    if (adminCheck == "Good") {
      await Ax.post("http://localhost:3001/api/ChangeOrderById", {
        element: { id: MyItem.id, status: val },
      });
    } else {
      console.log("No admin roots");
    }
  };

  const rendering = (
    <div className="OrderBigAdminPanel2">
      {" "}
      <div
        className="OrderAdminOne2"
        onClick={() => {
          setShow(MyItem.id);
          getData();
        }}
      >
        <div className="column2">
          {" "}
          <div style={{ color: "skyblue" }}>Id заказа:</div>
          <div>{MyItem.id}</div>
        </div>
        <div className="column2">
          {" "}
          <div style={{ color: "skyblue" }}>Id Покупателя: </div>
          <div>{MyItem.account_id}</div>{" "}
        </div>
        <div className="column2">
          <div style={{ color: "skyblue" }}>Общая цена: </div>
          <div>{MyItem.total_price} р.</div>
        </div>
        <div className="column2">
          {" "}
          <div style={{ color: "skyblue" }}>Время заказа:</div>
          <div> {MyItem.time.substring(0, 10)}</div>
        </div>
        <div className="column2">
          <div style={{ color: "skyblue" }}>Статус: </div>
          <select value={MyItem.status} onChange={onChange}>
            <option value={"Готов к выдаче"}>Готов к выдаче</option>
            <option value={"Комплектуется"}>Комплектуется</option>
            <option value={"Отменён из-за технических проблем"}>Отменён</option>
            <option value={"Оплачен"}>Оплачен</option>
          </select>
        </div>
      </div>
      {show == MyItem.id
        ? items
          ? items.map((item) => (
              <div className="OrderItems">
                <div>Id: {item.ordered_item_id}</div>
                <div>Количество: {item.number}</div>
                <div>Цена: {item.price} р.</div>
              </div>
            ))
          : null
        : null}
    </div>
  );
  return rendering;
}
