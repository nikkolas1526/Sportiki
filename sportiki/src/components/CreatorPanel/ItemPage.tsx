import { useEffect, useState, useRef } from "react";
import Buttons from "./ItemPageButtons/Buttons";
import { Product } from "./Interfaces/Interfaces";
import HightItem from "./HighItem/HightItem";
import Characteristics from "./Characteristics/Characteristics";

interface props {
  soska: (prop: boolean) => void;
  admin: boolean;
}

export default function ItemPage({ soska, admin }: props) {
  const [Item, setItem] = useState<Product[]>([
    {
      id: 0,
      name: "",
      photo: null,
      price: 0,
      sale: 0,
      availability: false,
      kategory: "Ролики",
      description: "",
      characteristics: {
        item_id: null,
        roliks_size: 0,
        roliks_type: "Мужские",
        roliks_wheels: 0,
        roliks_brand: "",
        roliks_country: "",
      },
    },
  ]);
  useEffect(() => {
    const setNewDemo: Product[] = [
      {
        id: 0,
        name: "",
        photo: null,
        price: 0,
        sale: 0,
        availability: false,
        kategory: Item[0].kategory,
        description: "",
        characteristics: null,
      },
    ];

    if (Item[0].kategory == "Ролики") {
      setNewDemo[0].characteristics = {
        item_id: null,
        roliks_size: 0,
        roliks_type: "Мужские",
        roliks_wheels: 0,
        roliks_brand: "",
        roliks_country: "",
      };
      setItem(setNewDemo);
    }
    if (Item[0].kategory == "Велосипеды") {
      setNewDemo[0].characteristics = {
        bikes_type: "Горный",
        item_id: null,
        bikes_power: 0,
        bikes_battery: 0,
        bikes_weight: 0,
        bikes_wheel_size: 0,
        bikes_material: "",
        bikes_brand: "",
        bikes_country: "",
      };
      setItem(setNewDemo);
    }
    if (Item[0].kategory == "Самокаты") {
      setNewDemo[0].characteristics = {
        scooters_type: "Городской",
        scooters_weight: 0,
        scooters_wheel_size: 0,
        scooters_brand: "",
        item_id: null,
        scooters_country: "",
      };
      setItem(setNewDemo);
    }
    if (Item[0].kategory == "Мячи") {
      setNewDemo[0].characteristics = {
        balls_type: "Футбольный",
        balls_size: 0,
        item_id: null,
        balls_brand: "",
        balls_country: "",
      };
      setItem(setNewDemo);
    }
    if (Item[0].kategory == "Перчатки для единоборств") {
      setNewDemo[0].characteristics = {
        gloves_type: "Боксёрские",
        gloves_size: 0,
        gloves_material: "",
        gloves_brand: "",
        gloves_country: "",
        item_id: null,
      };
      setItem(setNewDemo);
    }
    if (Item[0].kategory == "Защитная экипировка") {
      setNewDemo[0].characteristics = {
        protective_equipment_sport: "Велоспорт",
        protective_equipment_type: "Шлем",
        protective_equipment_size: "M",
        protective_equipment_brand: "",
        protective_equipment_country: "",
        item_id: null,
      };
      setItem(setNewDemo);
    }
  }, [Item[0].kategory]);

  useEffect(() => {
    Item;
  }, [Item]);
  const textareaSize = useRef<HTMLTextAreaElement>(null);
  const textareaNameSize = useRef<HTMLTextAreaElement>(null);

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

  return (
    <div className="gigaBoy">
      <div className="BIGguy">
        <button
          className="ClosingButtonItemPage"
          onClick={() => {
            soska(false);
          }}
        >
          X
        </button>
        <HightItem
          Item={Item}
          setItem={setItem}
          textareaNameSize={textareaNameSize}
          textareaSize={textareaSize}
          admin={admin}
        ></HightItem>
        <Characteristics Item={Item} setItem={setItem} />
        {admin ? <Buttons Item={Item} soska={soska} /> : null}
      </div>
    </div>
  );
}
