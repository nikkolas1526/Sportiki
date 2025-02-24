import { handleChangeCharact } from "../../Functions/Functions";
import { Product } from "../../Interfaces/Interfaces";

interface props {
  Item: Product[];
  setItem: (olo: Product[]) => void;
}

export default function BikesCharacteristics({ Item, setItem }: props) {
  return (
    <>
      {" "}
      <p>
        <strong>Тип велосипеда: </strong>
        <select
          name="bikes_type"
          value={Item[0].characteristics?.bikes_type || ""}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            handleChangeCharact(e, Item, setItem);
          }}
        >
          <option value="Электровелосипед">Электровелосипед</option>
          <option value="Трюковой">Трюковой</option>
          <option value="Горный">Горный</option>
          <option value="Городской">Городской</option>
        </select>
      </p>
      {Item[0].characteristics?.bikes_type == "Электровелосипед" ? (
        <>
          {" "}
          <p>
            {" "}
            <strong>Мощность (Вт):</strong>{" "}
            <input
              style={{ border: "2px solid white", padding: "1vh" }}
              name="bikes_power"
              value={Item[0].characteristics?.bikes_power}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                handleChangeCharact(e, Item, setItem);
              }}
            />
          </p>
          <p>
            {" "}
            <strong>Емкость аккумулятора (Ah):</strong>{" "}
            <input
              style={{ border: "2px solid white", padding: "1vh" }}
              name="bikes_battery"
              value={Item[0].characteristics?.bikes_battery}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                handleChangeCharact(e, Item, setItem);
              }}
            />
          </p>
        </>
      ) : null}
      <p>
        <strong>Вес (Кг):</strong>
        <input
          name="bikes_weight"
          style={{ border: "2px solid white", padding: "1vh" }}
          value={Item[0].characteristics?.bikes_weight}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            handleChangeCharact(e, Item, setItem);
          }}
        />
      </p>
      <p>
        <strong>Размер колес:</strong>{" "}
        <input
          name="bikes_wheel_size"
          style={{ border: "2px solid white", padding: "1vh" }}
          value={Item[0].characteristics?.bikes_wheel_size}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            handleChangeCharact(e, Item, setItem);
          }}
        ></input>{" "}
      </p>
      <p>
        <strong>Материал рамы:</strong>{" "}
        <input
          name="bikes_material"
          style={{ border: "2px solid white", padding: "1vh" }}
          value={Item[0].characteristics?.bikes_material}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            handleChangeCharact(e, Item, setItem);
          }}
        ></input>{" "}
      </p>
      <p>
        {" "}
        <strong>Бренд:</strong>
        <input
          name="bikes_brand"
          style={{ border: "2px solid white", padding: "1vh" }}
          value={Item[0].characteristics?.bikes_brand}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            handleChangeCharact(e, Item, setItem);
          }}
        ></input>{" "}
      </p>
      <p>
        {" "}
        <strong>Страна производства:</strong>{" "}
        <input
          name="bikes_country"
          style={{ border: "2px solid white", padding: "1vh" }}
          value={Item[0].characteristics?.bikes_country || ""}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            handleChangeCharact(e, Item, setItem);
          }}
        />
      </p>
    </>
  );
}
