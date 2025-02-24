import "./ItemPage.css";
import { useEffect, useState, useRef } from "react";
import Buttons from "./ItemPageButtons/ButtonsAdmin";
import ButtonsUser from "./ItemPageButtons/ButtonsUser";
import { Product, Views } from "./Interfaces/Interfaces";
import HightItem from "./HighItem/HightItem";
import DownViews from "./DownViews/DownViewsAdmin";
import UserViews from "./DownViews/DownViewsUser";
import Characteristics from "./Characteristics/Characteristics";
import { GetData } from "./Functions/Functions";

interface props {
  soska: (prop: boolean) => void;
  id: number;
  admin: boolean;
  setItems: (olo: Product[]) => void;
  items: Product[];
  likedPanel: boolean;
  bin: boolean;
  setElement: (olo: Product) => void;
  element: Product;
  account_id: number | null;
}

export default function ItemPage({
  soska,
  id,
  admin,
  account_id,
  setItems,
  items,
  element,
  setElement,
  likedPanel,
  bin,
}: props) {
  const [Item, setItem] = useState<Product[]>([
    {
      id: 0,
      name: "",
      photo: null,
      price: 0,
      number: 0,
      sale: 0,
      availability: false,
      kategory: "",
      description: "",
      rate: 0,
      characteristics: null,
    },
  ]);

  const textareaSize = useRef<HTMLTextAreaElement>(null);
  const textareaNameSize = useRef<HTMLTextAreaElement>(null);
  const [changePanel, setChangePanel] = useState(false);
  const [numberOfItems, setNumberOfItems] = useState(0);
  const scrollableContainerRef = useRef<HTMLDivElement>(null);
  const [binned, setBinned] = useState(false);
  const [liked, setLiked] = useState(false);
  const [Paga, Setpaga] = useState(1);
  const [views, setViews] = useState<Views[]>([]);

  useEffect(() => {
    setNumberOfItems(views.length);
  }, [views]);

  useEffect(() => {
    if (textareaSize.current) {
      textareaSize.current.style.height = "auto";
      textareaSize.current.style.height = `${textareaSize.current.scrollHeight}px`;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Item[0].description]);
  useEffect(() => {
    if (textareaNameSize.current) {
      textareaNameSize.current.style.width = "80%";
      textareaNameSize.current.style.height = "auto";
      textareaNameSize.current.style.height = `${textareaNameSize.current.scrollHeight}px`;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Item[0].name]);

  useEffect(() => {
    GetData(id, setItem, setViews);
  }, [changePanel]);

  return (
    <div className="gigaBoy">
      <div className="BIGguy" ref={scrollableContainerRef}>
        <button
          className="ClosingButtonItemPage"
          onClick={() => {
            if (!liked && likedPanel) {
              setItems([...items].filter((item) => item.id != id));
            }
            if (!binned && bin) {
              setItems([...items].filter((item) => item.id != id));
            }
            if (bin && binned) {
              setItems(
                items.map((item) => {
                  if (item.id === Item[0].id) {
                    return { ...item, number: Item[0].number };
                  }
                  return item;
                })
              );
            }
            soska(false);
          }}
        >
          X
        </button>
        <HightItem
          Item={Item}
          setItem={setItem}
          changePanel={changePanel}
          textareaNameSize={textareaNameSize}
          textareaSize={textareaSize}
          admin={admin}
        ></HightItem>
        <Characteristics
          Item={Item}
          changePanel={changePanel}
          setItem={setItem}
        />
        {admin ? (
          <Buttons
            Item={Item}
            changePanel={changePanel}
            setChangePanel={setChangePanel}
            soska={soska}
            setItems={setItems}
            setElement={setElement}
            element={element}
            id={id}
            items={items}
          />
        ) : (
          <ButtonsUser
            Item={Item}
            changePanel={changePanel}
            setChangePanel={setChangePanel}
            soska={soska}
            setItem={setItem}
            setItems={setItems}
            liked={liked}
            binned={binned}
            setBinned={setBinned}
            setLiked={setLiked}
            setElement={setElement}
            likedPanel={likedPanel}
            bin={bin}
            element={element}
            id={id}
            account_id={account_id}
            items={items}
          />
        )}
        {changePanel ? null : admin ? (
          <DownViews
            Item={Item}
            views={views}
            Paga={Paga}
            admin={admin}
            setViews={setViews}
            numberOfItems={numberOfItems}
            Setpaga={Setpaga}
            scrollableContainerRef={scrollableContainerRef}
          />
        ) : (
          <UserViews
            Item={Item}
            views={views}
            Paga={Paga}
            admin={admin}
            setViews={setViews}
            numberOfItems={numberOfItems}
            Setpaga={Setpaga}
            scrollableContainerRef={scrollableContainerRef}
          />
        )}
      </div>
    </div>
  );
}
