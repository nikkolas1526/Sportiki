import { handleChangeCharact } from "../../Functions/Functions";
import { Product } from "../../Interfaces/Interfaces";

interface props {
  Item: Product[];
  setItem: (olo: Product[]) => void;
}

export default function BallsCharacteristics({ Item, setItem }: props) {
  return (
    <>
      {" "}
      <p>
        <strong>Тип мяча:</strong>
        <select
          name="balls_type"
          value={Item[0].characteristics?.balls_type}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            handleChangeCharact(e, Item, setItem);
          }}
        >
          <option value="Футбольный">Футбольный</option>
          <option value="Воллейбольный">Воллейбольный</option>
          <option value="Баскетбольный">Баскетбольный</option>
        </select>
      </p>
      <p>
        <>
          {" "}
          <strong>Размер мяча:</strong>{" "}
          <input
            style={{ border: "2px solid white", padding: "1vh" }}
            name="balls_size"
            value={Item[0].characteristics?.balls_size}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              handleChangeCharact(e, Item, setItem);
            }}
          ></input>{" "}
        </>
      </p>
      <p>
        <>
          {" "}
          <strong>Бренд:</strong>
          <input
            name="balls_brand"
            value={Item[0].characteristics?.balls_brand}
            style={{ border: "2px solid white", padding: "1vh" }}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              handleChangeCharact(e, Item, setItem);
            }}
          ></input>{" "}
        </>
      </p>
      <p>
        {" "}
        <>
          {" "}
          <strong>Страна производства:</strong>{" "}
          <input
            name="balls_country"
            style={{ border: "2px solid white", padding: "1vh" }}
            value={Item[0].characteristics?.balls_country}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              handleChangeCharact(e, Item, setItem);
            }}
          ></input>{" "}
        </>
      </p>
    </>
  );
}
