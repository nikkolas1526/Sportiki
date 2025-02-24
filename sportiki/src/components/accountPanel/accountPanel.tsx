import "./accountPanel.css";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  token: string | null;
  setToken: (token: string | null) => void;
  setLoad: (load: boolean) => void;
  setAdmin: (admin: boolean) => void;
  setAccountPanel: (accountPanel: boolean) => boolean;
  setAdminAccountsPanel: (accountPanel: boolean) => boolean;
  setAdminOrdersPanel: (accountPanel: boolean) => boolean;
}

interface Order {
  id: number;
  account_id: number;
  total_price: number;
  time: string;
  status: string;
  items?: {
    ordered_item_id: number;
    order_id: number;
    number: number;
    price: number;
    item_name: string;
  }[];
}

interface Item {
  id: number;
  name: string;
  price: number;
  sale: number;
  availability: boolean;
  photo: string;
  kategory: string;
  description: string;
}

export default function AccountPanel({
  token,
  setToken,
  setLoad,
  setAdmin,
  setAccountPanel,
  setAdminOrdersPanel,
  setAdminAccountsPanel,
}: Props) {
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [user, setUser] = useState<any>({});
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  const [showPastOrders, setShowPastOrders] = useState(false);
  const [pastOrders, setPastOrders] = useState<Order[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [confirmationSent, setConfirmationSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const handleEditClick = () => {
    setEditMode(true);
    setNickname(user.nickname);
    setName(user.name);
    setSurname(user.surname);
    setEmail(user.email);
  };
  const handleCancelEdit = () => {
    setEditMode(false);
    setError(null);
  };
  useEffect(() => {
    const fetchUserData = async () => {
      if (!token) {
        setLoad(false);
        return;
      }
      try {
        const response = await fetch(
          "http://localhost:3001/api/getInfoAccount",
          {
            method: "POST",
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    const fetchCurrentOrder = async () => {
      if (!token) {
        setLoad(false);
        return;
      }
      try {
        const response = await fetch(
          "http://localhost:3001/api/getCurrentOrder",
          {
            method: "POST",
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          if (response.status === 404) {
            setCurrentOrder(null);
            setLoad(false);
            setLoading(false);
            return;
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const orderData = await response.json();
        setCurrentOrder(orderData);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch current order:", error);
        setCurrentOrder(null);
      } finally {
        setLoad(false);
        setLoading(false);
      }
    };

    fetchUserData();
    fetchCurrentOrder();
  }, [token, setLoad]);

  useEffect(() => {
    const fetchPastOrders = async () => {
      if (!token || !showPastOrders) {
        return;
      }
      try {
        const response = await fetch(
          "http://localhost:3001/api/getPastOrders",
          {
            method: "POST",
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const pastOrdersData = await response.json();
        setPastOrders(pastOrdersData);
      } catch (error) {
        console.error("Failed to fetch past orders:", error);
      }
    };
    fetchPastOrders();
  }, [token, showPastOrders]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/items", {
          method: "GET",
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const itemsData = await response.json();
        setItems(itemsData);
      } catch (error) {
        console.error("Failed to fetch items:", error);
      }
    };

    fetchItems();
  }, []);

  const handlePastOrdersClick = () => {
    setShowPastOrders(true);
  };
  const handleBackToAccount = () => {
    setShowPastOrders(false);
  };

  const getItemName = (itemId: number): string => {
    const item = items.find((item) => item.id === itemId);
    return item ? item.name : "Unknown item";
  };

  const renderOrderItems = (order: Order) => {
    if (!order.items || order.items.length === 0) {
      return <p>Нет товаров в заказе</p>;
    }

    return (
      <ul className="OrderItemList">
        {order.items.map((item, index) => (
          <li key={index} className="OrderItem">
            <div className="OrderItemName">
              {getItemName(item.ordered_item_id)}
            </div>
            <div className="OrderItemPrice">Цена: {item.price}</div>
            <div className="OrderItemQuantity">Количество {item.number}</div>
          </li>
        ))}
      </ul>
    );
  };
  const handleUpdateAccount = async () => {
    setError(null);
    try {
      const response = await fetch("http://localhost:3001/api/updateAccount", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nickname,
          password,
          name,
          surname,
          email,
        }),
      });
      if (response.ok) {
        setEditMode(false);
        if (email !== user.email) {
          setConfirmationSent(true);
          setError(
            "Изменения сохранены. Пожалуйста, проверьте вашу электронную почту для подтверждения нового email адреса."
          );
        } else {
          setError("Изменения сохранены.");
          setConfirmationSent(true);
        }
        await response.json();
        const response2 = await fetch(
          "http://localhost:3001/api/getInfoAccount",
          {
            method: "POST",
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "application/json",
            },
          }
        );
        const data2 = await response2.json();
        setUser(data2);
      } else {
        const errorData = await response.json();
        setError(errorData.error);
      }
    } catch (error) {
      console.error("Ошибка при обновлении данных:", error);
      setError("Ошибка при обновлении данных");
    }
  };
  let rendering = <></>;
  if (confirmationSent) {
    rendering = (
      <div className="BiggestPig">
        <div className="LineMain">{error && <p>{error}</p>}</div>
        <div className="buttonsAdminPanel">
          <button
            className="Exit"
            onClick={() => {
              setConfirmationSent(false);
            }}
          >
            Хорошо
          </button>
        </div>
      </div>
    );
  } else if (editMode) {
    rendering = (
      <div className="BiggestPig">
        <div className="LineMain">Редактирование профиля</div>
        {error && (
          <p style={{ color: "tomato", textAlign: "center", margin: "2vh" }}>
            {error}
          </p>
        )}
        <div className="Nicky">
          <div className="textik">Логин</div>
          <div className="Inputik">
            <input
              type="text"
              id="nicknameInput"
              placeholder="Введите логин"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
          </div>
        </div>
        <div className="Email">
          <div className="textik">Почта</div>
          <div className="Inputik">
            <input
              type="email"
              id="emailInput"
              placeholder="Введите почту"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div className="Pass">
          <div className="textik">Пароль</div>
          <div className="Inputik">
            <input
              type="password"
              id="passwordInput"
              placeholder="Введите пароль"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="RegisterName">
          <div className="textik">Имя</div>
          <div className="Inputik">
            <input
              type="text"
              id="registerNameInput"
              placeholder="Введите имя"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>
        <div className="RegisterSurname">
          <div className="textik">Фамилия</div>
          <div className="Inputik">
            <input
              type="text"
              id="registerSurnameInput"
              placeholder="Введите фамилию"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
            />
          </div>
        </div>
        <div className="buttonsAdminPanel">
          <button className="buttonAdminPanel" onClick={handleUpdateAccount}>
            Сохранить изменения
          </button>
          <button className="Exit" onClick={handleCancelEdit}>
            Отмена
          </button>
        </div>
      </div>
    );
  } else {
    rendering = (
      <div className="BiggestPig">
        {showPastOrders ? (
          <>
            {" "}
            <div className="LineMain">
              Прошлые заказы
              <button className={"Exit"} onClick={handleBackToAccount}>
                Назад
              </button>
            </div>
            {pastOrders.length > 0 ? (
              pastOrders.map((order) => (
                <div key={order.id} className="BigPig">
                  <div className="Line">Номер заказа: {order.id}</div>
                  <div className="Line">Статус: {order.status}</div>
                  <div className="Line">Сумма: {order.total_price}</div>
                  {renderOrderItems(order)}
                </div>
              ))
            ) : (
              <p>Нет прошлых заказов</p>
            )}
          </>
        ) : (
          <>
            {" "}
            <div className="LineMain">Личный кабинет</div>
            <div className="BigPig">
              <div className="Line">Имя: {user?.name}</div>
              <div className="Line">Фамилия: {user?.surname}</div>
              <div className="Line">Логин: {user?.nickname}</div>
              <div className="Line">
                Администратор: {user?.administrator ? "Да" : "Нет"}
              </div>
            </div>
            {loading ? (
              <p>Загрузка...</p>
            ) : currentOrder ? (
              <div className="currentOrder">
                <p className="LineMain">Текущий заказ:</p>
                <div className="BigPig">
                  <div className="Line">Номер заказа: {currentOrder.id}</div>
                  <div className="Line">Статус: {currentOrder.status}</div>
                  <div className="Line">Сумма: {currentOrder.total_price}</div>
                  {renderOrderItems(currentOrder)}
                </div>
              </div>
            ) : !user.administrator ? (
              <div className="currentOrder">
                <p className="LineMain">Нет активных заказов</p>
              </div>
            ) : null}
            {user?.administrator ? (
              <div className="buttonsAdminPanel">
                <button
                  className="buttonAdminPanel"
                  onClick={() => {
                    navigate("/adminOrders");
                    setAdminOrdersPanel(true);
                    setAccountPanel(false);
                  }}
                >
                  Заказы
                </button>
                <button
                  className="buttonAdminPanel"
                  onClick={() => {
                    navigate("/adminAccounts");
                    setAdminAccountsPanel(true);
                    setAccountPanel(false);
                  }}
                >
                  Аккаунты
                </button>
                <button
                  className="Exit"
                  onClick={() => {
                    setAdmin(false);
                    Cookies.remove("accessToken");
                    Cookies.remove("refreshToken");
                    setToken(null);
                    navigate("/items");
                  }}
                >
                  Выйти
                </button>
              </div>
            ) : !showPastOrders ? (
              <div className="buttonsAdminPanel">
                <button className="buttonAdminPanel" onClick={handleEditClick}>
                  Изменить данные
                </button>
                <button
                  className="buttonAdminPanel"
                  onClick={handlePastOrdersClick}
                >
                  Прошлые заказы
                </button>
                <button
                  className="Exit"
                  onClick={() => {
                    setAccountPanel(false);
                    setAdmin(false);
                    Cookies.remove("accessToken");
                    Cookies.remove("refreshToken");
                    setToken(null);
                    navigate("/items");
                  }}
                >
                  Выйти
                </button>
              </div>
            ) : null}
          </>
        )}
      </div>
    );
  }
  return <div className="accountPanel">{rendering}</div>;
}
