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
  changePanel: boolean;
  setItem: (olo: Product[]) => void;
}

export default function Characteristics({ Item, changePanel, setItem }: props) {
  return (
    <div className="itemCharacteristics">
      <p>
        <strong> Категория товаров: </strong>{" "}
        {changePanel ? (
          <select
            name="kategory"
            value={Item[0]?.kategory}
            onChange={
              changePanel
                ? (e: React.ChangeEvent<HTMLSelectElement>) => {
                    handleChange(e, Item, setItem);
                  }
                : undefined
            }
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
        ) : (
          <input
            readOnly={!changePanel}
            value={Item[0]?.kategory}
            name="kategory"
            style={
              !changePanel
                ? { border: "0px solid white" }
                : { border: "2px solid white", padding: "1vh" }
            }
            onChange={
              changePanel
                ? (e: React.ChangeEvent<HTMLInputElement>) => {
                    handleChange(e, Item, setItem);
                  }
                : undefined
            }
          />
        )}
      </p>

      {Item[0].kategory === "Велосипеды" ? (
        <BikesCharacteristics
          Item={Item}
          changePanel={changePanel}
          setItem={setItem}
        />
      ) : null}
      {Item[0].kategory === "Ролики" ? (
        <RoliksCharacteristics
          Item={Item}
          changePanel={changePanel}
          setItem={setItem}
        />
      ) : null}

      {Item[0].kategory === "Самокаты" ? (
        <ScootersCharacteristics
          Item={Item}
          changePanel={changePanel}
          setItem={setItem}
        />
      ) : null}

      {Item[0].kategory === "Мячи" ? (
        <BallsCharacteristics
          Item={Item}
          changePanel={changePanel}
          setItem={setItem}
        />
      ) : null}

      {Item[0].kategory === "Перчатки для единоборств" ? (
        <GlovesCharacteristics
          Item={Item}
          changePanel={changePanel}
          setItem={setItem}
        />
      ) : null}

      {Item[0].kategory === "Защитная экипировка" ? (
        <ProtectiveEquipmentCharacteristics
          Item={Item}
          changePanel={changePanel}
          setItem={setItem}
        />
      ) : null}
    </div>
  );
}
