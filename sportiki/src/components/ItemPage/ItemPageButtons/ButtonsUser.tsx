import { useEffect, useState } from "react";
import { handleSave, deleteItemById } from "../Functions/Functions";
import { Product } from "../Interfaces/Interfaces";
import Cookies from "js-cookie";
import Ax from "axios";

interface ButtonsProps {
  Item: Product[];
  changePanel: boolean;
  setChangePanel: (changePanel: boolean) => void;
  soska: (prop: boolean) => void;
  id: number;
  setItems: (olo: Product[]) => void;
  items: Product[];
  likedPanel: boolean;
  bin: boolean;
  setElement: (olo: Product) => void;
  element: Product;
  setItem: (olo: Product[]) => void;
  liked: boolean;
  setLiked: (prop: boolean) => void;
  binned: boolean;
  setBinned: (prop: boolean) => void;
}

export default function Buttons({
  Item,
  changePanel,
  setChangePanel,
  soska,
  setElement,
  setItems,
  binned,
  setBinned,
  liked,
  setLiked,
  bin,
  likedPanel,
  setItem,
  element,
  id,
  items,
}: ButtonsProps) {
  const [showMessage, setShowMessage] = useState(false);
  const [acc, setAcc] = useState({ id: null });

  useEffect(() => {
    console.log(Item);
  }, [Item]);

  useEffect(() => {
    console.log("БИНЕД");
    console.log(Item[0].id);
    if (Item[0].id !== 0) {
      const getNumber = async () => {
        const GotNumber = await Ax.post(
          "http://localhost:3001/api/BinGetNumber",
          {
            id: acc.id,
            item_id: Item[0].id,
          }
        );
        console.log(GotNumber.data.number);
        setItem([{ ...Item[0], number: GotNumber.data.number }]);
      };
      getNumber();
    } else {
      console.log("НУЛЕВКА");
    }
  }, [Item[0].id]);
  async function getAccountInfo() {
    const token = Cookies.get("accessToken");
    if (token) {
      try {
        const response = await Ax.post(
          "http://localhost:3001/api/getInfoAccount",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          setShowMessage(false);
          setAcc(response.data);
          return response.data;
        } else {
          setShowMessage(true);
          throw new Error(
            `Ошибка при получении данных: Статус ${response.status}`
          );
        }
      } catch (error) {
        console.error("Ошибка Axios при получении данных аккаунта:", error);
        throw error;
      }
    } else {
      setAcc({ id: null });
      setShowMessage(false);
    }
  }

  useEffect(() => {
    const gettingInfo = async () => {
      await getAccountInfo();
    };
    gettingInfo();
  }, []);
  useEffect(() => {
    const gettingInfo = async () => {
      if (acc.id) {
        await getBinInfo();
        await getLikeInfo();
      }
    };
    gettingInfo();
  }, [acc]);

  async function getBinInfo() {
    const token = Cookies.get("accessToken");
    if (token) {
      try {
        const response = await Ax.post(
          "http://localhost:3001/api/BinGetItemInfo",
          { item_id: id, id: acc.id }
        );

        if (response.status === 200) {
          if (response.data == "Yes") {
            setBinned(true);
            console.log("YES");
          } else {
            setBinned(false);
            console.log("No");
          }
          return;
        } else {
          setShowMessage(true);
          throw new Error(
            `Ошибка при получении данных: Статус ${response.status}`
          );
        }
      } catch (error) {
        console.error("Ошибка Axios при получении данных аккаунта:", error);
        throw error;
      }
    }
  }

  async function getLikeInfo() {
    const token = Cookies.get("accessToken");
    if (token) {
      try {
        const response = await Ax.post(
          "http://localhost:3001/api/LikeGetItemInfo",
          { item_id: id, id: acc.id }
        );

        if (response.status === 200) {
          if (response.data == "Yes") {
            setLiked(true);
            console.log("YES");
          } else {
            setLiked(false);
          }
          return;
        } else {
          setShowMessage(true);
          throw new Error(
            `Ошибка при получении данных: Статус ${response.status}`
          );
        }
      } catch (error) {
        console.error("Ошибка Axios при получении данных аккаунта:", error);
        throw error;
      }
    }
  }

  const handleBinChange = async () => {
    if (acc.id) {
      console.log("id " + id);
      console.log("acc " + acc.id);
      await Ax.post("http://localhost:3001/api/BinSet", {
        item_id: id,
        id: acc.id,
      });
      setElement({ ...element, number: 1 });
      setBinned(true);
      setShowMessage(false);
    } else setShowMessage(true);
  };
  const handleBinDelete = async () => {
    if (acc.id) {
      setBinned(false);
      const response = await Ax.post(
        "http://localhost:3001/api/BinDeleteItem",
        {
          item_id: id,
          id: acc.id,
        }
      );
      console.log(response.data);
    } else setShowMessage(true);
  };

  const handleLikeChange = async () => {
    if (acc.id) {
      await Ax.post("http://localhost:3001/api/LikeSet", {
        item_id: id,
        id: acc.id,
      });
      setLiked(true);

      setShowMessage(false);
    } else setShowMessage(true);
  };

  const handleLikeDelete = async () => {
    if (acc.id) {
      setLiked(false);
      await Ax.post("http://localhost:3001/api/LikeDeleteItem", {
        item_id: id,
        id: acc.id,
      });
    } else setShowMessage(true);
  };

  return (
    <>
      {" "}
      <div className="buttons">
        {binned ? (
          <div className="buttonsItemPage">
            <button
              className="changeNumber2"
              onClick={async () => {
                if (Item[0].number == 1) {
                  handleBinDelete();
                }
                await Ax.post(
                  "http://localhost:3001/api/BinChangeNumberOfItem",
                  {
                    id: acc.id,
                    item_id: id,
                    number: Item[0].number - 1,
                  }
                );
                setItem([{ ...Item[0], number: Item[0].number - 1 }]);
              }}
            >
              -
            </button>
            <input className="numberOfItem2" value={Item[0].number}></input>
            <button
              className="changeNumber2"
              onClick={async () => {
                await Ax.post(
                  "http://localhost:3001/api/BinChangeNumberOfItem",
                  {
                    id: acc.id,
                    item_id: id,
                    number: Item[0].number + 1,
                  }
                );
                setItem([{ ...Item[0], number: Item[0].number + 1 }]);
              }}
            >
              +
            </button>
          </div>
        ) : (
          <button
            className="DownButtons"
            onClick={async () => {
              await handleBinChange();
              setItem([{ ...Item[0], number: 1 }]);
            }}
          >
            В корзину
          </button>
        )}
        {liked ? (
          <button className="DownButtons" onClick={handleLikeDelete}>
            Убрать из любимых
          </button>
        ) : (
          <button
            className="DownButtons"
            onClick={async () => {
              await handleLikeChange();
            }}
          >
            В любимые
          </button>
        )}
      </div>
      {showMessage && (
        <div className="auth-message">Необходимо авторизоваться</div>
      )}
    </>
  );
}
