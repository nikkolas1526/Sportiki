import { handleChange } from "../Functions/Functions";
import { Product } from "../Interfaces/Interfaces";
import BallsCharacteristics from "./KategoryCharacteristics/BallsCharacteristics";
import BikesCharacteristics from "./KategoryCharacteristics/BikesCharacteristics";
import ScootersCharacteristics from "./KategoryCharacteristics/ScootersCharacteristics";
import ProtectiveEquipmentCharacteristics from "./KategoryCharacteristics/ProtectiveEquipmentCharacteristics";
import RoliksCharacteristics from "./KategoryCharacteristics/RoliksCharacteristics";
import GlovesCharacteristics from "./KategoryCharacteristics/GlovesCharacteristics";

interface props {
  Item: Product[];
  setItem: (olo: Product[]) => void;
}

export default function Characteristics({ Item, setItem }: props) {
  return (
    <div className="itemCharacteristics">
      <p>
        <strong> Категория товаров: </strong>{" "}
        <select
          name="kategory"
          value={Item[0]?.kategory}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            handleChange(e, Item, setItem);
          }}
        >
          <option className="Opt" value="Ролики">
            Ролики
          </option>
          <option className="Opt" value="Велосипеды">
            Велосипеды
          </option>{" "}
          <option className="Opt" value="Самокаты">
            Самокаты
          </option>
          <option className="Opt" value="Защитная экипировка">
            Защитная экипировка
          </option>{" "}
          <option className="Opt" value="Перчатки для единоборств">
            Перчатки для единоборств
          </option>
          <option className="Opt" value="Мячи">
            Мячи
          </option>
        </select>
      </p>

      {Item[0].kategory === "Велосипеды" ? (
        <BikesCharacteristics Item={Item} setItem={setItem} />
      ) : null}
      {Item[0].kategory === "Ролики" ? (
        <RoliksCharacteristics Item={Item} setItem={setItem} />
      ) : null}

      {Item[0].kategory === "Самокаты" ? (
        <ScootersCharacteristics Item={Item} setItem={setItem} />
      ) : null}

      {Item[0].kategory === "Мячи" ? (
        <BallsCharacteristics Item={Item} setItem={setItem} />
      ) : null}

      {Item[0].kategory === "Перчатки для единоборств" ? (
        <GlovesCharacteristics Item={Item} setItem={setItem} />
      ) : null}

      {Item[0].kategory === "Защитная экипировка" ? (
        <ProtectiveEquipmentCharacteristics Item={Item} setItem={setItem} />
      ) : null}
    </div>
  );
}
