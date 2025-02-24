import "./App.css";
import HighGround from "./components/HighGround/HighGround.tsx";
import DownLevel from "./components/DownLevel/DownLevel.tsx";
import MainContent from "./components/MainContent/MainContent.tsx";
import AccountPage from "./components/accountPanel/accountPanel.tsx";
import AdminOrders from "./components/accountPanel/AdminOrdersPanel/AdminOrderPanel.tsx";
import AdminAccounts from "./components/accountPanel/AdminAccountsPanel/AdminAccountPanel.tsx";
import { useState, useEffect } from "react";
import LLoad from "../../sportiki/src/Images/load.gif";
import "../src/components/Load.css";
import Cookies from "js-cookie";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  const [token, setToken] = useState<string | null>(null);
  const [renderValue, setRenderValue] = useState<string | null>(null);
  const [search, setSearch] = useState<string | null | undefined>(null);
  const [accountPanel, setAccountPanel] = useState(false);
  const [load, setLoad] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [adminOrdersPan, setAdminOrdersPan] = useState(false);
  const [adminAccountsPan, setAdminAccountsPan] = useState(false);
  const [bin, setBin] = useState(false);
  const [likedPanel, setLikedPanel] = useState(false);
  const [orderingPanel, setOrderingPanel] = useState(false);
  const [searchOrders, setSearchOrders] = useState<string | null | undefined>(
    null
  );
  const [searchAccounts, setSearchAccounts] = useState<
    string | null | undefined
  >(null);

  useEffect(() => {
    const refreshAccessToken = async () => {
      const refreshToken = Cookies.get("refreshToken");
      console.log(refreshToken + "RARARs");
      if (refreshToken) {
        try {
          const response = await fetch("http://localhost:3001/api/token", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ refreshToken }),
          });
          if (response.ok) {
            const data = await response.json();
            console.log("data: ", data); // Вывод всего ответа
            setAdmin(data.administrator);
            Cookies.set("accessToken", data.accessToken, {
              secure: false,
              sameSite: "Strict",
              expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
              path: "/",
            });
            Cookies.set("refreshToken", data.refreshToken, {
              secure: false,
              sameSite: "Strict",
              expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
              path: "/",
            });
            setToken(data.accessToken);
          } else {
            Cookies.remove("accessToken");
            Cookies.remove("refreshToken");
            console.log("Нет");
            const message = await response.json();
            alert(message);
            setToken(null);
            setAdmin(false);
          }
        } catch (error) {
          Cookies.remove("accessToken");
          Cookies.remove("refreshToken");
          console.error("Ошибка при обновлении токена:", error); // Вывод ошибки
          setToken(null);
          setAdmin(false);
        }
      }
    };
    refreshAccessToken();
    const intervalId = setInterval(refreshAccessToken, 1 * 300 * 1000);

    return () => clearInterval(intervalId);
  }, []);
  useEffect(() => {
    const refreshToken = Cookies.get("refreshToken");
    console.log(refreshToken + "RARARs");
    console.log(token);
  }, [renderValue]);

  return (
    <Router>
      <div>
        {load && (
          <div className="modal-overlay">
            <div className="modal-content">
              <img src={LLoad} alt="Loading" />
            </div>
          </div>
        )}
        <Routes>
          <Route
            path="/items"
            element={
              <>
                <HighGround
                  setSearch={setSearch}
                  admin={admin}
                  setAdmin={setAdmin}
                  setRenderValue={setRenderValue}
                  renderValue={renderValue}
                  setToken={setToken}
                  token={token}
                  search={search}
                  setAccountPanel={setAccountPanel}
                  accountPanel={accountPanel}
                  setAdminOrdersPanel={setAdminOrdersPan}
                  adminOrdersPanel={adminOrdersPan}
                  setLoad={setLoad}
                  searchOrders={searchOrders}
                  setSearchOrders={setSearchOrders}
                  searchAccounts={searchAccounts}
                  setSearchAccounts={setSearchAccounts}
                  setAdminAccountsPanel={setAdminAccountsPan}
                  adminAccountsPanel={adminAccountsPan}
                  likedPanel={likedPanel}
                  setLikedPanel={setLikedPanel}
                  bin={bin}
                  setBin={setBin}
                />
                <MainContent
                  search={search}
                  admin={admin}
                  setLoad={setLoad}
                  orderingPanel={orderingPanel}
                  setOrderingPanel={setOrderingPanel}
                  likedPanel={likedPanel}
                  token={token}
                  load={load}
                  bin={bin}
                  renderValue={renderValue}
                  setRenderValue={setRenderValue}
                />
                <DownLevel />
              </>
            }
          />

          <Route
            path="/accountPanel"
            element={
              <>
                <HighGround
                  setSearch={setSearch}
                  admin={admin}
                  setAdmin={setAdmin}
                  setRenderValue={setRenderValue}
                  renderValue={renderValue}
                  setToken={setToken}
                  token={token}
                  search={search}
                  setAccountPanel={setAccountPanel}
                  accountPanel={accountPanel}
                  setAdminOrdersPanel={setAdminOrdersPan}
                  adminOrdersPanel={adminOrdersPan}
                  setLoad={setLoad}
                  searchOrders={searchOrders}
                  setSearchOrders={setSearchOrders}
                  searchAccounts={searchAccounts}
                  setSearchAccounts={setSearchAccounts}
                  setAdminAccountsPanel={setAdminAccountsPan}
                  adminAccountsPanel={adminAccountsPan}
                  likedPanel={likedPanel}
                  setLikedPanel={setLikedPanel}
                  bin={bin}
                  setBin={setBin}
                />
                <AccountPage
                  token={token}
                  setAdmin={setAdmin}
                  setToken={setToken}
                  setAccountPanel={setAccountPanel}
                  setLoad={setLoad}
                  setAdminOrdersPanel={setAdminOrdersPan}
                  setAdminAccountsPanel={setAdminAccountsPan}
                />

                <DownLevel />
              </>
            }
          />
          <Route
            path="/adminOrders"
            element={
              <>
                {" "}
                <HighGround
                  setSearch={setSearch}
                  admin={admin}
                  setAdmin={setAdmin}
                  setRenderValue={setRenderValue}
                  renderValue={renderValue}
                  setToken={setToken}
                  token={token}
                  search={search}
                  setAccountPanel={setAccountPanel}
                  accountPanel={accountPanel}
                  setAdminOrdersPanel={setAdminOrdersPan}
                  adminOrdersPanel={adminOrdersPan}
                  setLoad={setLoad}
                  searchOrders={searchOrders}
                  setSearchOrders={setSearchOrders}
                  searchAccounts={searchAccounts}
                  setSearchAccounts={setSearchAccounts}
                  setAdminAccountsPanel={setAdminAccountsPan}
                  adminAccountsPanel={adminAccountsPan}
                  likedPanel={likedPanel}
                  setLikedPanel={setLikedPanel}
                  bin={bin}
                  setBin={setBin}
                />{" "}
                <AdminOrders searchOrders={searchOrders} />
                <DownLevel />
              </>
            }
          />
          <Route
            path="/adminAccounts"
            element={
              <>
                {" "}
                <HighGround
                  setSearch={setSearch}
                  admin={admin}
                  setAdmin={setAdmin}
                  setRenderValue={setRenderValue}
                  renderValue={renderValue}
                  setToken={setToken}
                  token={token}
                  search={search}
                  setAccountPanel={setAccountPanel}
                  accountPanel={accountPanel}
                  setAdminOrdersPanel={setAdminOrdersPan}
                  adminOrdersPanel={adminOrdersPan}
                  setLoad={setLoad}
                  searchOrders={searchOrders}
                  setSearchOrders={setSearchOrders}
                  searchAccounts={searchAccounts}
                  setSearchAccounts={setSearchAccounts}
                  setAdminAccountsPanel={setAdminAccountsPan}
                  adminAccountsPanel={adminAccountsPan}
                  likedPanel={likedPanel}
                  setLikedPanel={setLikedPanel}
                  bin={bin}
                  setBin={setBin}
                />{" "}
                <AdminAccounts searchAccounts={searchAccounts} />
                <DownLevel />
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
