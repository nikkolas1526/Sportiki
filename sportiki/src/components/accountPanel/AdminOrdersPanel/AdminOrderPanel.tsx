import "./AdminOrderPanel.css";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import Ax from "axios";
import Order from "./OrderAdmin/Order.tsx";
import Paginazi from "./paginazi/Paginazi.tsx";

interface Order {
  id: number;
  account_id: number;
  status: string;
  total_price: number;
  time: string;
}

interface props {
  searchOrders: string | null | undefined;
}

export default function AdminOrderPanel({ searchOrders }: props) {
  const [Accounts, setAccounts] = useState<Order[]>([]);
  const [Paga, Setpaga] = useState(1);
  const [numberOfAccounts, setNumberOfAccounts] = useState(0);
  const [show, setShow] = useState(0);

  useEffect(() => {
    const man = async () => {
      if (Accounts.length > 0) {
        const GetData2 = async () => {
          const fetchData = async () => {
            const check = await CheckRoots();
            return check;
          };
          const data: string | null = await fetchData();

          if (data == "Good") {
            const data2 = await Ax.get("http://localhost:3001/api/OrdersAdmin");
            return data2.data;
          }
        };
        const bomba = await GetData2();
        const bomba2 = [...bomba].filter((item) =>
          item.id.toString().toLowerCase().includes(searchOrders?.toLowerCase())
        );
        setAccounts(bomba2);
      }
    };
    man();
  }, [searchOrders]);

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
  const GetData = async () => {
    const fetchData = async () => {
      const check = await CheckRoots();
      return check;
    };
    const data: string | null = await fetchData();

    if (data == "Good") {
      const data2 = await Ax.get("http://localhost:3001/api/OrdersAdmin");
      setAccounts(data2.data);
    }
  };

  useEffect(() => {
    GetData();
  }, []);

  useEffect(() => {
    setNumberOfAccounts(Accounts.length);
  }, [Accounts]);

  const rendering = (
    <>
      {" "}
      <div className="main1">
        {" "}
        <h1>Заказы</h1>{" "}
        {Accounts.slice(Paga * 10 - 10, Paga * 10).map((item) => (
          <Order key={item.id} item={item} show={show} setShow={setShow} />
        ))}{" "}
        <Paginazi
          Paga={Paga}
          Setpaga={Setpaga}
          numberOfItems={numberOfAccounts}
        />
      </div>
    </>
  );
  return rendering;
}
