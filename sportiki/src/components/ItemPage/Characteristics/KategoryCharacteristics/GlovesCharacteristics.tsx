import { handleChangeCharact } from "../../Functions/Functions";
import { Product } from "../../Interfaces/Interfaces";

interface props {
  Item: Product[];
  changePanel: boolean;
  setItem: (olo: Product[]) => void;
}

export default function GlovesCharacteristics({
  Item,
  changePanel,
  setItem,
}: props) {
  return (
    <>
      {" "}
      <p>
        <strong>Тип перчаток:</strong>

        {changePanel ? (
          <select
            name="gloves_type"
            value={Item[0].characteristics?.gloves_type}
            onChange={
              changePanel
                ? (e: React.ChangeEvent<HTMLInputElement>) => {
                    handleChangeCharact(e, Item, setItem);
                  }
                : undefined
            }
          >
            <option value="Боксёрские">Боксёрские</option>
            <option value="ММА">ММА</option>
            <option value="Для рукопашного боя">Для рукопашного боя</option>
            <option value="Снарядные">Снарядные</option>
          </select>
        ) : (
          <input
            readOnly={!changePanel}
            name="gloves_type"
            style={
              !changePanel
                ? { border: "0px solid white" }
                : { border: "2px solid white", padding: "1vh" }
            }
            value={Item[0].characteristics?.gloves_type}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              handleChangeCharact(e, Item, setItem);
            }}
          />
        )}
      </p>
      {!changePanel && Item[0].characteristics?.gloves_size == 0 ? null : (
        <p>
          <strong>Размер перчаток (Oz):</strong>
          <input
            readOnly={!changePanel}
            style={
              !changePanel
                ? { border: "0px solid white" }
                : { border: "2px solid white", padding: "1vh" }
            }
            name="gloves_size"
            value={Item[0].characteristics?.gloves_size}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              handleChangeCharact(e, Item, setItem);
            }}
          />
        </p>
      )}{" "}
      {!changePanel && Item[0].characteristics?.gloves_material == "" ? null : (
        <p>
          {" "}
          <strong>Материал перчаток:</strong>{" "}
          <input
            readOnly={!changePanel}
            name="gloves_material"
            style={
              !changePanel
                ? { border: "0px solid white" }
                : { border: "2px solid white", padding: "1vh" }
            }
            value={Item[0].characteristics?.gloves_material}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              handleChangeCharact(e, Item, setItem);
            }}
          ></input>{" "}
        </p>
      )}
      {!changePanel && Item[0].characteristics?.gloves_brand == "" ? null : (
        <p>
          {" "}
          <strong>Бренд:</strong>
          <input
            readOnly={!changePanel}
            name="gloves_brand"
            style={
              !changePanel
                ? { border: "0px solid white" }
                : { border: "2px solid white", padding: "1vh" }
            }
            value={Item[0].characteristics?.gloves_brand}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              handleChangeCharact(e, Item, setItem);
            }}
          ></input>{" "}
        </p>
      )}
      {!changePanel && Item[0].characteristics?.gloves_country == "" ? null : (
        <p>
          {" "}
          <strong>Страна производства:</strong>{" "}
          <input
            readOnly={!changePanel}
            style={
              !changePanel
                ? { border: "0px solid white" }
                : { border: "2px solid white", padding: "1vh" }
            }
            name="gloves_country"
            value={Item[0].characteristics?.gloves_country}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              handleChangeCharact(e, Item, setItem);
            }}
          ></input>{" "}
        </p>
      )}
    </>
  );
}
