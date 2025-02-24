import "./Account.css";
import { useEffect, useState } from "react";
import Ax from "axios";
import Cookies from "js-cookie";

interface Account {
  id: number;
  nickname: string;
  name: string;
  surname: string;
  ban: boolean;
}

interface props {
  Account: Account;
}
export default function Account({ Account }: props) {
  const [MyAccount, setMyAccount] = useState(Account);
  const UpdateBan = async (AccountChanged: Account) => {
    const data = await CheckRoots();
    if (data == "Good") {
      await Ax.post("http://localhost:3001/api/BanAccountAdmin", {
        id: AccountChanged.id,
        ban: AccountChanged.ban,
      });
    }
  };

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

  const rendering = (
    <div className="OrderBigAdminPanel">
      {" "}
      <div className="OrderAdminOne">
        <div className="column">
          {" "}
          <div style={{ color: "skyblue" }}>Id:</div>
          <div>{MyAccount.id}</div>
        </div>
        <div className="column">
          <div style={{ color: "skyblue" }}>Логин: </div>
          <div>{MyAccount.nickname}</div>
        </div>
        <div className="column">
          {" "}
          <div style={{ color: "skyblue" }}>Имя: </div>
          <div>{MyAccount.name}</div>{" "}
        </div>
        <div className="column">
          {" "}
          <div style={{ color: "skyblue" }}>Фамилия: </div>
          <div>{MyAccount.surname}</div>{" "}
        </div>{" "}
        {MyAccount.ban ? (
          <button
            className="BanButtonGreen"
            onClick={() => {
              setMyAccount({ ...Account, ban: false });
              const AccountChanged = { ...Account, ban: false };
              UpdateBan(AccountChanged);
            }}
          >
            Разбанить
          </button>
        ) : (
          <button
            className="BanButtonRed"
            onClick={() => {
              setMyAccount({ ...Account, ban: true });
              const AccountChanged = { ...Account, ban: true };
              UpdateBan(AccountChanged);
            }}
          >
            Забанить
          </button>
        )}
      </div>
    </div>
  );
  return rendering;
}
