import "./AdminViewPanel.css";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import Ax from "axios";
import Account from "./ViewAdmin/Account";
import Paginazi from "./paginazi/Paginazi";

import { Views } from "../../ItemPage/Interfaces/Interfaces";

interface props {
  searchAccounts: string | null | undefined;
}

export default function AdminViewsPanel({ searchAccounts }: props) {
  const [Accounts, setAccounts] = useState<Account[]>([]);
  const [filteredAccounts, setFilteredAccounts] = useState<Account[]>([]);
  const [show, setShow] = useState(0);
  const [Paga, Setpaga] = useState(1);
  const [numberOfAccounts, setNumberOfAccounts] = useState(0);

  useEffect(() => {
    setNumberOfAccounts(Accounts.length);
  }, [Accounts]);

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
            const data2 = await Ax.get(
              "http://localhost:3001/api/AccountsAdmin"
            );
            return data2.data;
          }
        };
        const bomba = await GetData2();
        const bomba2 = [...bomba].filter((item) =>
          item.nickname.toLowerCase().includes(searchAccounts.toLowerCase())
        );
        setFilteredAccounts(bomba);
        setAccounts(bomba2);
      }
    };
    man();
  }, [searchAccounts]);

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
      const data2 = await Ax.get("http://localhost:3001/api/AccountsAdmin");
      setAccounts(data2.data);
    }
  };

  useEffect(() => {
    GetData();
  }, []);

  let rendering = (
    <div className="main">
      {" "}
      <h3>Аккаунты</h3>{" "}
      {Accounts.slice(Paga * 5 - 5, Paga * 5).map((item) => (
        <Account key={item.id} Account={item} />
      ))}{" "}
      <Paginazi
        Paga={Paga}
        Setpaga={Setpaga}
        numberOfItems={numberOfAccounts}
      />
    </div>
  );
  return rendering;
}
