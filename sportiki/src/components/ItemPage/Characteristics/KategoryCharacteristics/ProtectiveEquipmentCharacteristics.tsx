import { handleChangeCharact } from "../../Functions/Functions";
import { Product } from "../../Interfaces/Interfaces";

interface props {
  Item: Product[];
  changePanel: boolean;
  setItem: (olo: Product[]) => void;
}

export default function ProtectiveEquipmentCharacteristics({
  Item,
  changePanel,
  setItem,
}: props) {
  return (
    <>
      {" "}
      <p>
        <strong>Вид спорта:</strong>{" "}
        {changePanel ? (
          <select
            name="protective_equipment_sport"
            value={Item[0].characteristics?.protective_equipment_sport}
            onChange={
              changePanel
                ? (e: React.ChangeEvent<HTMLInputElement>) => {
                    handleChangeCharact(e, Item, setItem);
                  }
                : undefined
            }
          >
            <option value="Единоборства">Единоборства</option>
            <option value="Волейбол">Волейбол</option>
            <option value="Велоспорт">Велоспорт</option>
          </select>
        ) : (
          <input
            readOnly={!changePanel}
            name="protective_equipment_sport"
            value={Item[0].characteristics?.protective_equipment_sport}
            style={
              !changePanel
                ? { border: "0px solid white" }
                : { border: "2px solid white", padding: "1vh" }
            }
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              handleChangeCharact(e, Item, setItem);
            }}
          />
        )}
      </p>
      <p>
        <strong>Тип защиты:</strong>{" "}
        {changePanel ? (
          <select
            name="protective_equipment_type"
            value={Item[0].characteristics?.protective_equipment_type}
            onChange={
              changePanel
                ? (e: React.ChangeEvent<HTMLInputElement>) => {
                    handleChangeCharact(e, Item, setItem);
                  }
                : undefined
            }
          >
            <option value="Шлем">Шлем</option>
            <option value="Наколенники">Наколенники</option>
            <option value="Налокотники">Налокотники</option>
            <option value="Защита голени">Защита голени</option>
            <option value="Перчатки">Перчатки</option>
          </select>
        ) : (
          <input
            readOnly={!changePanel}
            name="protective_equipment_type"
            style={
              !changePanel
                ? { border: "0px solid white" }
                : { border: "2px solid white", padding: "1vh" }
            }
            value={Item[0].characteristics?.protective_equipment_type}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              handleChangeCharact(e, Item, setItem);
            }}
          />
        )}
      </p>
      <p>
        <strong>Размер:</strong>{" "}
        {changePanel ? (
          <select
            name="protective_equipment_size"
            value={Item[0].characteristics?.protective_equipment_size}
            onChange={
              changePanel
                ? (e: React.ChangeEvent<HTMLInputElement>) => {
                    handleChangeCharact(e, Item, setItem);
                  }
                : undefined
            }
          >
            <option value="XXS">XXS</option>
            <option value="XS">XS</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
            <option value="XXL">XXL</option>
          </select>
        ) : (
          <input
            readOnly={!changePanel}
            name="protective_equipment_size"
            style={
              !changePanel
                ? { border: "0px solid white" }
                : { border: "2px solid white", padding: "1vh" }
            }
            value={Item[0].characteristics?.protective_equipment_size}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              handleChangeCharact(e, Item, setItem);
            }}
          />
        )}
      </p>{" "}
      {!changePanel &&
      Item[0].characteristics?.protective_equipment_brand == "" ? null : (
        <p>
          <strong>Бренд:</strong>{" "}
          <input
            readOnly={!changePanel}
            name="protective_equipment_brand"
            style={
              !changePanel
                ? { border: "0px solid white" }
                : { border: "2px solid white", padding: "1vh" }
            }
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
      )}{" "}
      {!changePanel &&
      Item[0].characteristics?.protective_equipment_country == "" ? null : (
        <p>
          {" "}
          <strong>Страна производства:</strong>{" "}
          <input
            readOnly={!changePanel}
            name="protective_equipment_country"
            style={
              !changePanel
                ? { border: "0px solid white" }
                : { border: "2px solid white", padding: "1vh" }
            }
            value={Item[0].characteristics?.protective_equipment_country}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              handleChangeCharact(e, Item, setItem);
            }}
          ></input>{" "}
        </p>
      )}
    </>
  );
}
