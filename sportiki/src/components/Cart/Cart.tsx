import ItemPage from "../ItemPage/ItemPage.tsx";
import Ax from "axios";
import { useEffect, useState } from "react";
import star from "../../Images/star.png";
import star2 from "../../Images/starGray.png";
import { Product } from "../ItemPage/Interfaces/Interfaces.ts";
import "./Cart.css";
interface propsType {
  element: Product;
  setItems: (olo: Product[]) => void;
  admin: boolean;
  likedPanel: boolean;
  bin: boolean;
  items: Product[];
  setRenderValue: (value: string | null) => void;
  id: number;
}

function Cart(props: propsType) {
  const [pageOn, setPageOn] = useState(false);
  const [element, setElement] = useState(props.element);
  useEffect(() => {
    setElement(props.element);
  }, [props.items]);

  useEffect(() => {
    props.setItems(
      props.items.map((item) => {
        if (item.id === element.id) {
          return { ...item, number: element.number };
        }
        return item;
      })
    );
  }, [element.number]);

  const [style, setStyle] = useState({
    transform: "rotateX(0deg) rotateY(0deg)",
    transition: "transform 0.1s",
  });
  const [dotPosition, setDotPosition] = useState<{ top: number; left: number }>(
    { top: 0, left: 0 }
  );
  const [showDot, setShowDot] = useState(false);
  useEffect(() => {
    console.log("ELA = " + element.number);
  }, [element]);
  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY, currentTarget } = e;
    const { offsetWidth, offsetHeight } = currentTarget;

    const x =
      (clientX - currentTarget.getBoundingClientRect().left - offsetWidth / 2) /
      (offsetWidth / 2);
    const y =
      (clientY - currentTarget.getBoundingClientRect().top - offsetHeight / 2) /
      (offsetHeight / 2);

    setStyle({
      transform: `rotateX(${-y * 20}deg) rotateY(${-x * 20}deg)`,
      transition: "transform 0.1s",
    });

    setDotPosition({
      top: clientY - currentTarget.getBoundingClientRect().top,
      left: clientX - currentTarget.getBoundingClientRect().left,
    });
    setShowDot(true);
  };

  const handleMouseLeave = () => {
    setStyle({
      transform: "rotateX(0deg) rotateY(0deg)",
      transition: "transform 0.1s",
    });
    setShowDot(false);
  };

  const rendering = (
    <>
      {pageOn ? (
        <ItemPage
          account_id={props.id}
          soska={setPageOn}
          likedPanel={props.likedPanel}
          bin={props.bin}
          id={props.element.id}
          admin={props.admin}
          setItems={props.setItems}
          items={props.items}
          setElement={setElement}
          element={element}
        />
      ) : null}

      <div
        className="Cart"
        style={style}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className="Photo"
          onClick={() => {
            setPageOn(true);
          }}
        >
          {element.photo ? (
            <img
              src={`data:image/jpg;base64,${element.photo}`}
              alt={element.name}
            />
          ) : null}
        </div>
        <div
          className="Sale"
          onClick={() => {
            setPageOn(true);
          }}
        >
          <div>{element.sale !== 0 ? "-" + element.sale + "%" : null}</div>
        </div>
        <div
          className="Price"
          onClick={() => {
            setPageOn(true);
          }}
        >
          {element.sale > 0 ? (
            <div className="PriceActual">
              <del className="CartDel">
                {Math.round(
                  element.price + (element.price * element.sale) / 100
                )}{" "}
              </del>
            </div>
          ) : null}
          <div className="PriceWithSale">{element.price} руб.</div>
        </div>
        <div
          className="NameIt"
          onClick={() => {
            setPageOn(true);
          }}
        >
          {element.name}
        </div>
        <div
          className="Scale"
          onClick={() => {
            setPageOn(true);
          }}
        >
          <div>
            {Array.from({ length: element.rate }, (_, i) => (
              <img key={i} src={star} className="starKa" alt="star" />
            ))}
            {Array.from({ length: 5 - element.rate }, (_, i) => (
              <img key={i} src={star2} className="starKa2" alt="star2" />
            ))}
          </div>
        </div>
        {showDot && (
          <div
            className="Dot"
            onClick={() => {
              setPageOn(true);
            }}
            style={{ top: dotPosition.top, left: dotPosition.left }}
          />
        )}
        {props.likedPanel ? (
          <button
            className="delete"
            onClick={async () => {
              if (props.likedPanel) {
                await Ax.post("http://localhost:3001/api/LikeDeleteItem", {
                  id: props.id,
                  item_id: element.id,
                });
                props.setItems(
                  props.items.filter((item) => item.id != element.id)
                );
              }
            }}
          >
            Удалить
          </button>
        ) : null}
        {props.bin ? (
          <div className="buttonsCart">
            <button
              className="changeNumber"
              onClick={async () => {
                if (element.number == 1) {
                  await Ax.post("http://localhost:3001/api/BinDeleteItem", {
                    id: props.id,
                    item_id: element.id,
                  });
                  props.setItems(
                    [...props.items].filter((item) => item.id != element.id)
                  );
                }
                await Ax.post(
                  "http://localhost:3001/api/BinChangeNumberOfItem",
                  {
                    id: props.id,
                    item_id: element.id,
                    number: element.number - 1,
                  }
                );
                setElement({ ...element, number: element.number - 1 });
              }}
            >
              -
            </button>
            <input className="numberOfItem" value={element.number}></input>
            <button
              className="changeNumber"
              onClick={async () => {
                await Ax.post(
                  "http://localhost:3001/api/BinChangeNumberOfItem",
                  {
                    id: props.id,
                    item_id: element.id,
                    number: element.number + 1,
                  }
                );
                setElement({ ...element, number: element.number + 1 });
              }}
            >
              +
            </button>
          </div>
        ) : null}
      </div>
    </>
  );

  return rendering;
}

export default Cart;
