import { handleChangeCharact } from "../../Functions/Functions";
import { Product } from "../../Interfaces/Interfaces";

interface props {
  Item: Product[];
  setItem: (olo: Product[]) => void;
}

export default function ScootersCharacteristics({ Item, setItem }: props) {
  return (
    <>
      {" "}
      <p>
        <strong>Тип самоката:</strong>{" "}
        <select
          name="scooters_type"
          value={Item[0].characteristics?.scooters_type}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            handleChangeCharact(e, Item, setItem);
          }}
        >
          <option value="Электросамокат">Электросамокат</option>
          <option value="Трюковой">Трюковой</option>
          <option value="Городской">Городской</option>
        </select>
      </p>
      <p>
        {" "}
        <>
          <strong>Вес (Кг):</strong>
          <input
            name="scooters_weight"
            style={{ border: "2px solid white", padding: "1vh" }}
            value={Item[0].characteristics?.scooters_weight}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              handleChangeCharact(e, Item, setItem);
            }}
          ></input>{" "}
        </>
      </p>
      <p>
        <>
          <strong>Размер колес:</strong>{" "}
          <input
            name="scooters_wheel_size"
            style={{ border: "2px solid white", padding: "1vh" }}
            value={Item[0].characteristics?.scooters_wheel_size}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              handleChangeCharact(e, Item, setItem);
            }}
          ></input>{" "}
        </>
      </p>
      <p>
        <>
          <strong>Бренд:</strong>{" "}
          <input
            name="scooters_brand"
            style={{ border: "2px solid white", padding: "1vh" }}
            value={Item[0].characteristics?.scooters_brand}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              handleChangeCharact(e, Item, setItem);
            }}
          ></input>{" "}
        </>
      </p>
      <p>
        <>
          <strong>Страна производства:</strong>{" "}
          <input
            name="scooters_country"
            style={{ border: "2px solid white", padding: "1vh" }}
            value={Item[0].characteristics?.scooters_country}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              handleChangeCharact(e, Item, setItem);
            }}
          ></input>{" "}
        </>
      </p>
    </>
  );
}
