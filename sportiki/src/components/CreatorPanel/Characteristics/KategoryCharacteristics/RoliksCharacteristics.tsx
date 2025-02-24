import { handleChangeCharact } from "../../Functions/Functions";
import { Product } from "../../Interfaces/Interfaces";

interface props {
  Item: Product[];
  setItem: (olo: Product[]) => void;
}

export default function RoliksCharacteristics({ Item, setItem }: props) {
  return (
    <>
      <p>
        <strong>Тип роликов:</strong>{" "}
        <select
          name="roliks_type"
          value={Item[0].characteristics?.roliks_type}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            handleChangeCharact(e, Item, setItem);
          }}
        >
          <option className="Opt" value="Мужские">
            Мужские
          </option>
          <option className="Opt" value="Женские">
            Женские
          </option>{" "}
          <option className="Opt" value="Детские">
            Детские
          </option>
        </select>
      </p>
      <p>
        <>
          {" "}
          <strong>Размер роликов:</strong>{" "}
          <input
            name="roliks_size"
            style={{ border: "2px solid white", padding: "1vh" }}
            value={Item[0].characteristics?.roliks_size}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              handleChangeCharact(e, Item, setItem);
            }}
          />
        </>
      </p>

      <p>
        <>
          {" "}
          <strong>Количество колес:</strong>{" "}
          <input
            name="roliks_wheels"
            style={{ border: "2px solid white", padding: "1vh" }}
            value={Item[0].characteristics?.roliks_wheels}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              handleChangeCharact(e, Item, setItem);
            }}
          />
        </>
      </p>
      <p>
        <>
          {" "}
          <strong>Бренд:</strong>{" "}
          <input
            name="roliks_brand"
            style={{ border: "2px solid white", padding: "1vh" }}
            value={Item[0].characteristics?.roliks_brand}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              handleChangeCharact(e, Item, setItem);
            }}
          />
        </>
      </p>
      <p>
        <>
          {" "}
          <strong>Страна производства:</strong>{" "}
          <input
            name="roliks_country"
            style={{ border: "2px solid white", padding: "1vh" }}
            value={Item[0].characteristics?.roliks_country}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              handleChangeCharact(e, Item, setItem);
            }}
          />
        </>
      </p>
    </>
  );
}
