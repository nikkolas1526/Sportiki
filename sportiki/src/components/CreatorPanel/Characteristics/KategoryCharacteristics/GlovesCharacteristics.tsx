import { handleChangeCharact } from "../../Functions/Functions";
import { Product } from "../../Interfaces/Interfaces";

interface props {
  Item: Product[];
  setItem: (olo: Product[]) => void;
}

export default function GlovesCharacteristics({ Item, setItem }: props) {
  return (
    <>
      {" "}
      <p>
        <strong>Тип перчаток:</strong>

        <select
          name="gloves_type"
          value={Item[0].characteristics?.gloves_type}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            handleChangeCharact(e, Item, setItem);
          }}
        >
          <option value="Боксёрские">Боксёрские</option>
          <option value="ММА">ММА</option>
          <option value="Для рукопашного боя">Для рукопашного боя</option>
          <option value="Снарядные">Снарядные</option>
        </select>
      </p>
      <p>
        <strong>Размер перчаток (Oz):</strong>
        <input
          style={{ border: "2px solid white", padding: "1vh" }}
          name="gloves_size"
          value={Item[0].characteristics?.gloves_size}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            handleChangeCharact(e, Item, setItem);
          }}
        />
      </p>
      <p>
        <strong>Материал перчаток:</strong>{" "}
        <input
          name="gloves_material"
          style={{ border: "2px solid white", padding: "1vh" }}
          value={Item[0].characteristics?.gloves_material}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            handleChangeCharact(e, Item, setItem);
          }}
        ></input>{" "}
      </p>
      <p>
        <strong>Бренд:</strong>
        <input
          name="gloves_brand"
          style={{ border: "2px solid white", padding: "1vh" }}
          value={Item[0].characteristics?.gloves_brand}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            handleChangeCharact(e, Item, setItem);
          }}
        ></input>{" "}
      </p>
      <p>
        <strong>Страна производства:</strong>{" "}
        <input
          style={{ border: "2px solid white", padding: "1vh" }}
          name="gloves_country"
          value={Item[0].characteristics?.gloves_country}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            handleChangeCharact(e, Item, setItem);
          }}
        ></input>{" "}
      </p>
    </>
  );
}
