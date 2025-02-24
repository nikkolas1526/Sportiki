import "./HighGround.css";
import Simg from "../../Images/Simg.png";
import Acc from "../../Images/Acc.png";
import Heart from "../../Images/Hearth.png";
import Bin from "../../Images/Bin.png";
import Auto from "../Authorisation/Authorisation.tsx";
import Mechanics from "../../Images/Mechanics.png";
import Roliks from "../../Images/Roliks.png";
import Bikes from "../../Images/Bike.png";
import Balls from "../../Images/Ball.png";
import Gloves from "../../Images/Gloves.png";
import Scooters from "../../Images/Scooter.png";
import { useNavigate } from "react-router-dom";
import protective_Equipment from "../../Images/protect.png";
import { useState } from "react";
import ItemPage from "../CreatorPanel/ItemPage.tsx";
interface Props {
  setRenderValue: (value: string | null) => void;
  renderValue: string | null;
  setSearch: (value: string | null | undefined) => void;
  setAdmin: (accountPanel: boolean) => void;
  setToken: (token: string) => void;
  setAccountPanel: (accountPanel: boolean) => void;
  token: string | null;
  accountPanel: boolean;
  setLikedPanel: (accountPanel: boolean) => void;
  likedPanel: boolean;
  setBin: (accountPanel: boolean) => void;
  bin: boolean;
  setLoad: (orderingPanel: boolean) => void;
  admin: boolean;
  setAdminOrdersPanel: (accountPanel: boolean) => void;
  adminOrdersPanel: boolean;
  setAdminAccountsPanel: (accountPanel: boolean) => void;
  adminAccountsPanel: boolean;
  setSearchOrders: (value: string | null | undefined) => void;
  searchOrders: string | null | undefined;
  setSearchAccounts: (value: string | null | undefined) => void;
  searchAccounts: string | null | undefined;
  search: string | null | undefined;
}

export default function HighGround({
  renderValue,
  setRenderValue,
  setToken,
  setSearch,
  setAccountPanel,
  likedPanel,
  bin,
  setBin,
  setLoad,
  setLikedPanel,
  setAdmin,
  token,
  accountPanel,
  searchAccounts,
  setSearchAccounts,
  setAdminOrdersPanel,
  adminOrdersPanel,
  admin,
  setSearchOrders,
  setAdminAccountsPanel,
  adminAccountsPanel,
  searchOrders,
  search,
}: Props) {
  const [active, setActive] = useState(false);
  const [input, setInput] = useState("");
  const [pageOn, setPageOn] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="HighGround">
      {pageOn ? <ItemPage soska={setPageOn} admin={admin} /> : null}
      <div className="FHigh">
        <div
          className="LOGO"
          onClick={() => {
            setLoad(true);
            navigate("/items");
            if (adminOrdersPanel) {
              setAdminOrdersPanel(false);
            }
            if (adminAccountsPanel) {
              setAdminAccountsPanel(false);
            }
            if (accountPanel) {
              setAccountPanel(false);
            }

            setRenderValue(null);
            setSearch(null);
            setLikedPanel(false);
            setBin(false);
            setAccountPanel(false);
            const inputElement = document.getElementById("inputik");
            inputElement.value = "";
          }}
        >
          <h1>
            <i>
              sport<del>|</del>k<del>|</del>
            </i>
          </h1>
        </div>

        <div className="SEARCH">
          <div>
            <form className="Srch">
              <input
                className="searchInput"
                type="text"
                id="inputik"
                placeholder=""
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                }}
              />
            </form>
          </div>
          <img
            src={Simg}
            onClick={() => {
              const inputElement = document.getElementById("inputik");

              if (adminOrdersPanel) {
                setLoad(true);
                setSearchOrders(inputElement?.value);
              }
              if (adminAccountsPanel) {
                setLoad(true);
                setSearchAccounts(inputElement?.value);
              }
              if (!adminOrdersPanel && !adminAccountsPanel && !accountPanel) {
                setLoad(true);
                setSearch(inputElement?.value);
              }
            }}
          />
        </div>

        <></>

        <div className="ACCOUNT">
          {" "}
          {admin ? (
            <div>
              <img
                src={Mechanics}
                className="Mechanics"
                onClick={() => {
                  navigate("/accountPanel");
                  setPageOn(true);
                }}
              ></img>
            </div>
          ) : null}
          <div className={admin ? "AccaAdmin" : "Acca"}>
            <img
              src={Acc}
              onClick={() => {
                setLikedPanel(false);
                setBin(false);
                if (token == null) {
                  setActive(true);
                  if (adminOrdersPanel) {
                    setAdminOrdersPanel(false);
                    setAdminAccountsPanel(false);
                  }
                } else {
                  setLoad(true);
                  setRenderValue(null);
                  setAccountPanel(true);
                  navigate("/accountPanel");
                  if (adminOrdersPanel) {
                    setAdminOrdersPanel(false);
                    setAdminAccountsPanel(false);
                  }
                }
              }}
            />{" "}
            {admin ? <div style={{ marginLeft: "1vh" }}> Admin </div> : null}
          </div>
          {admin ? null : (
            <>
              {" "}
              <div className="Heart">
                <img
                  src={Heart}
                  onClick={() => {
                    if (token != null) {
                      if (bin) {
                        setBin(false);
                      }
                      setLoad(true);
                      setAccountPanel(false);
                      setLikedPanel(true);
                      navigate("/items");
                    } else {
                      setActive(true);
                    }
                  }}
                />
              </div>
              <div className="Bbin">
                <img
                  src={Bin}
                  onClick={() => {
                    setLoad(true);
                    if (token != null) {
                      setLikedPanel(false);
                      setBin(true);
                      navigate("/items");
                    } else {
                      setActive(true);
                    }
                  }}
                />
              </div>
            </>
          )}
        </div>
      </div>
      {active ? (
        <Auto setActive={setActive} setToken={setToken} setAdmin={setAdmin} />
      ) : (
        <div></div>
      )}
      <div className="SHigh">
        {" "}
        {!likedPanel && !bin ? (
          <>
            <div
              className={
                renderValue === "Ролики" ? "KategoryActiveLeft" : "LeftKata"
              }
              onClick={() => {
                setLoad(true);
                navigate("/items");
                if (adminOrdersPanel) {
                  setAdminOrdersPanel(false);
                }
                if (adminAccountsPanel) {
                  setAdminAccountsPanel(false);
                }
                if (accountPanel) {
                  setAccountPanel(false);
                }
                setSearch(null);
                setInput("");
                setRenderValue("Ролики");
                setAccountPanel(false);
              }}
            >
              <img src={Roliks}></img>Ролики
            </div>
            <div
              className={
                renderValue === "Велосипеды" ? "KategoryActive" : "Kategory"
              }
              onClick={() => {
                setLoad(true);
                navigate("/items");
                if (adminOrdersPanel) {
                  setAdminOrdersPanel(false);
                }
                if (adminAccountsPanel) {
                  setAdminAccountsPanel(false);
                }
                if (accountPanel) {
                  setAccountPanel(false);
                }
                setSearch(null);
                setInput("");
                setRenderValue("Велосипеды");
                setAccountPanel(false);
              }}
            >
              <img src={Bikes}></img>Велосипеды
            </div>
            <div
              className={
                renderValue === "Самокаты" ? "KategoryActive" : "Kategory"
              }
              onClick={() => {
                setLoad(true);
                navigate("/items");
                if (adminOrdersPanel) {
                  setAdminOrdersPanel(false);
                }
                if (adminAccountsPanel) {
                  setAdminAccountsPanel(false);
                }
                if (accountPanel) {
                  setAccountPanel(false);
                }
                setSearch(null);
                setInput("");
                setRenderValue("Самокаты");
                setAccountPanel(false);
              }}
            >
              <img src={Scooters}></img>Самокаты
            </div>
            <div
              className={
                renderValue === "Защитная экипировка"
                  ? "KategoryActive"
                  : "Kategory"
              }
              onClick={() => {
                setLoad(true);
                navigate("/items");
                if (adminOrdersPanel) {
                  setAdminOrdersPanel(false);
                }
                if (adminAccountsPanel) {
                  setAdminAccountsPanel(false);
                }
                if (accountPanel) {
                  setAccountPanel(false);
                }
                setSearch(null);
                setInput("");
                setRenderValue("Защитная экипировка");
                setAccountPanel(false);
              }}
            >
              <img src={protective_Equipment}></img>Защита
            </div>
            <div
              className={
                renderValue === "Перчатки для единоборств"
                  ? "KategoryActive"
                  : "Kategory"
              }
              onClick={() => {
                setLoad(true);
                navigate("/items");
                if (adminOrdersPanel) {
                  setAdminOrdersPanel(false);
                }
                if (adminAccountsPanel) {
                  setAdminAccountsPanel(false);
                }
                if (accountPanel) {
                  setAccountPanel(false);
                }
                setSearch(null);
                setInput("");
                setRenderValue("Перчатки для единоборств");
                setAccountPanel(false);
              }}
            >
              <img src={Gloves}></img>Перчатки
            </div>
            <div
              className={
                renderValue === "Мячи" ? "KategoryActiveRight" : "RightKata"
              }
              onClick={() => {
                setLoad(true);
                navigate("/items");
                if (adminOrdersPanel) {
                  setAdminOrdersPanel(false);
                }
                if (adminAccountsPanel) {
                  setAdminAccountsPanel(false);
                }
                if (accountPanel) {
                  setAccountPanel(false);
                }
                setSearch(null);
                setInput("");
                setRenderValue("Мячи");
                setAccountPanel(false);
              }}
            >
              <img src={Balls}></img>Мячи
            </div>
          </>
        ) : likedPanel ? (
          <h1 className="titleBinLike">Любимые товары</h1>
        ) : (
          <h1 className="titleBinLike">Корзина</h1>
        )}
      </div>
    </div>
  );
}
