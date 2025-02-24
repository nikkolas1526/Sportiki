import "./MainContent.css";
import "../Load.css";
import Cart from "../Cart/Cart.tsx";
import OrderingPan from "./orderingPan/OrderingPanel.tsx";
import LLoad from "../../Images/load.gif";
import Left from "./Left/Left.tsx";
import Sorty from "./Sorty/Sorty.tsx";
import Paginazi from "./Paginazi/Paginazi.tsx";
import MainItemsRender from "./MainItemsRender.tsx";
import { useState, useEffect } from "react";
import Ax from "axios";
import { Product } from "../ItemPage/Interfaces/Interfaces.ts";

interface Props {
  renderValue: string | null;
  setRenderValue: (value: string | null) => void;
  search: string | null | undefined;
  likedPanel: boolean;
  orderingPanel: boolean;
  setLoad: (orderingPanel: boolean) => void;
  token: string | null;
  setOrderingPanel: (orderingPanel: boolean) => void;
  bin: boolean;
  admin: boolean;
  load: boolean;
}

export default function MainContent({
  renderValue,
  search,
  admin,
  likedPanel,
  setLoad,
  token,
  orderingPanel,
  setOrderingPanel,
  load,
  bin,
  setRenderValue,
}: Props) {
  const [items, setItems] = useState<Product[]>([]);
  const [sum, setSum] = useState(0.0);

  const [paginaci, pagiChanged] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [numberOfItems, numberOfItemsChanged] = useState<number>(0);
  const [id, setId] = useState(0);
  useEffect(() => {
    let sumDemo = 0;
    items.forEach((item) => (sumDemo += item.price * item.number));
    setSum(sumDemo);
  }, [items]);

  useEffect(() => {
    if (token != null) {
      const fetchData = async () => {
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

        setId(data.id);
      };
      fetchData();
    }
  }, [token]);

  useEffect(() => {
    console.log("idddd" + id);
  }, [id]);
  const updateItems = async () => {
    if (search !== null && search !== "") {
      let url = "";
      if (bin) {
        url = "http://localhost:3001/api/binItems";
      } else if (likedPanel) {
        url = "http://localhost:3001/api/likedItems";
      } else if (renderValue === null) {
        url = "http://localhost:3001/api/items";
      } else if (renderValue === "Перчатки для единоборств") {
        url = "http://localhost:3001/api/gloves";
      } else if (renderValue === "Ролики") {
        url = "http://localhost:3001/api/roliks";
      } else if (renderValue === "Самокаты") {
        url = "http://localhost:3001/api/skates";
      } else if (renderValue === "Велосипеды") {
        url = "http://localhost:3001/api/bikes";
      } else if (renderValue === "Защитная экипировка") {
        url = "http://localhost:3001/api/defence";
      } else if (renderValue === "Мячи") {
        url = "http://localhost:3001/api/balls";
      }
      async function fetchData() {
        try {
          let response;
          if (bin || likedPanel) {
            response = await Ax.get(url, { params: { id: id } });
          } else {
            response = await Ax.get(url);
          }

          console.log(response);
          let data = await response.data;
          data = data.filter((item) =>
            item.name.toLowerCase().includes(search.toLowerCase())
          );
          await Promise.all(
            data.map(async (item) => {
              const rateResponse = await Ax.get(
                "http://localhost:3001/api/AVGrate",
                {
                  params: {
                    item_id: item.id,
                  },
                }
              );
              const finalRATE = await rateResponse.data.average_rate;
              if (typeof finalRATE == "number") {
                item.rate = finalRATE;
              } else {
                item.rate = 0;
              }
            })
          );

          pagiChanged(1);
          setItems(
            data.filter((item) =>
              item.name.toLowerCase().includes(search.toLowerCase())
            )
          );
        } catch (error) {
          console.error("Ошибка при загрузке данных:", error);
        }
      }

      await fetchData();
    } else {
      await MainItemsRender({
        setItems,
        renderValue,
        bin,
        likedPanel,
        pagiChanged,
        id,
      });
    }
  };
  useEffect(() => {}, [paginaci]);
  useEffect(() => {
    setLoad(true);

    updateItems().finally(() => {
      setLoad(false);
    });
  }, [renderValue, search, bin, likedPanel, id]);

  useEffect(() => {
    numberOfItemsChanged(items.length);
  }, [items]);

  return (
    <div className="MainContent">
      {bin || likedPanel ? null : (
        <Left
          items={items}
          setItems={setItems}
          renderValue={renderValue}
          Setpaga={pagiChanged}
          search={search}
          setLoading={setLoad}
        />
      )}

      <div className="Right">
        <Sorty
          Items={items}
          setItems={setItems}
          renderValue={renderValue}
        ></Sorty>

        <div className="Items">
          {numberOfItems > 0 &&
            items
              .slice(paginaci * 20 - 20, paginaci * 20)
              .map((item) => (
                <Cart
                  key={item.id}
                  id={id}
                  bin={bin}
                  likedPanel={likedPanel}
                  element={item}
                  admin={admin}
                  setItems={setItems}
                  items={items}
                  setRenderValue={setRenderValue}
                />
              ))}
        </div>

        {numberOfItems == 0 ? (
          <div className="NoItems">Ничего не найдено</div>
        ) : null}
      </div>
      {bin ? (
        <div className="cart-footer">
          {orderingPanel ? (
            <OrderingPan
              setOrderingPanel={setOrderingPanel}
              items={items}
              setItems={setItems}
              sum={sum}
              id={id}
            />
          ) : null}
          <div className="cart-summary">
            Всего {items.length} товаров общей суммой {sum} р.
          </div>
          <button
            className="checkout-button"
            onClick={() => {
              setOrderingPanel(true);
            }}
          >
            Оформить заказ
          </button>
        </div>
      ) : (
        <Paginazi
          Paga={paginaci}
          Setpaga={pagiChanged}
          numberOfItems={numberOfItems}
        />
      )}
    </div>
  );
}
