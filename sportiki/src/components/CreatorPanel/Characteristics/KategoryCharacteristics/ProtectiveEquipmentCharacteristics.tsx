import { handleChangeCharact } from "../../Functions/Functions";
import { Product } from "../../Interfaces/Interfaces";

interface props {
  Item: Product[];
  setItem: (olo: Product[]) => void;
}

export default function ProtectiveEquipmentCharacteristics({
  Item,
  setItem,
}: props) {
  return (
    <>
      {" "}
      <p>
        <strong>Вид спорта:</strong>{" "}
        <select
          name="protective_equipment_sport"
          value={Item[0].characteristics?.protective_equipment_sport}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            handleChangeCharact(e, Item, setItem);
          }}
        >
          <option value="Единоборства">Единоборства</option>
          <option value="Волейбол">Волейбол</option>
          <option value="Велоспорт">Велоспорт</option>
        </select>
      </p>
      <p>
        <strong>Тип защиты:</strong>{" "}
        <select
          name="protective_equipment_type"
          value={Item[0].characteristics?.protective_equipment_type}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            handleChangeCharact(e, Item, setItem);
          }}
        >
          <option value="Шлем">Шлем</option>
          <option value="Наколенники">Наколенники</option>
          <option value="Налокотники">Налокотники</option>
          <option value="Защита голени">Защита голени</option>
          <option value="Перчатки">Перчатки</option>
        </select>
      </p>
      <p>
        <strong>Размер:</strong>{" "}
        <select
          name="protective_equipment_size"
          value={Item[0].characteristics?.protective_equipment_size}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            handleChangeCharact(e, Item, setItem);
          }}
        >
          <option value="XXS">XXS</option>
          <option value="XS">XS</option>
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
          <option value="XL">XL</option>
          <option value="XXL">XXL</option>
        </select>
      </p>
      <p>
        {" "}
        <strong>Бренд:</strong>{" "}
        <input
          name="protective_equipment_brand"
          style={{ border: "2px solid white", padding: "1vh" }}
          value={
            Item[0].characteristics
              ? Item[0].characteristics.protective_equipment_brand
              : null
          }
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            handleChangeCharact(e, Item, setItem);
          }}
        ></input>{" "}
      </p>
      <p>
        {" "}
        <strong>Страна производства:</strong>{" "}
        <input
          name="protective_equipment_country"
          style={{ border: "2px solid white", padding: "1vh" }}
          value={Item[0].characteristics?.protective_equipment_country}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            handleChangeCharact(e, Item, setItem);
          }}
        ></input>{" "}
      </p>
    </>
  );
}
