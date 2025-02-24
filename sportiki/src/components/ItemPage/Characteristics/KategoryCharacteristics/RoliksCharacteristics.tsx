import { handleChangeCharact } from "../../Functions/Functions";
import { Product } from "../../Interfaces/Interfaces";

interface props {
  Item: Product[];
  changePanel: boolean;
  setItem: (olo: Product[]) => void;
}

export default function RoliksCharacteristics({
  Item,
  changePanel,
  setItem,
}: props) {
  return (
    <>
      {" "}
      <p>
        <strong>Тип роликов:</strong>{" "}
        {changePanel ? (
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
        ) : (
          <input
            name="roliks_type"
            readOnly={!changePanel}
            value={Item[0].characteristics?.roliks_type}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              handleChangeCharact(e, Item, setItem);
            }}
            style={
              !changePanel
                ? { border: "0px solid white" }
                : { border: "2px solid white", padding: "1vh" }
            }
          />
        )}
      </p>
      {!changePanel && Item[0].characteristics?.roliks_size == 0 ? null : (
        <p>
          {" "}
          <strong>Размер роликов:</strong>{" "}
          <input
            name="roliks_size"
            style={
              !changePanel
                ? { border: "0px solid white" }
                : { border: "2px solid white", padding: "1vh" }
            }
            readOnly={!changePanel}
            value={Item[0].characteristics?.roliks_size}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              handleChangeCharact(e, Item, setItem);
            }}
          />
        </p>
      )}
      {!changePanel && Item[0].characteristics?.roliks_wheels == 0 ? null : (
        <p>
          {" "}
          <strong>Количество колес:</strong>{" "}
          <input
            name="roliks_wheels"
            style={
              !changePanel
                ? { border: "0px solid white" }
                : { border: "2px solid white", padding: "1vh" }
            }
            readOnly={!changePanel}
            value={Item[0].characteristics?.roliks_wheels}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              handleChangeCharact(e, Item, setItem);
            }}
          />
        </p>
      )}
      {!changePanel && Item[0].characteristics?.roliks_brand == "" ? null : (
        <p>
          {" "}
          <strong>Бренд:</strong>{" "}
          <input
            name="roliks_brand"
            style={
              !changePanel
                ? { border: "0px solid white" }
                : { border: "2px solid white", padding: "1vh" }
            }
            readOnly={!changePanel}
            value={Item[0].characteristics?.roliks_brand}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              handleChangeCharact(e, Item, setItem);
            }}
          />
        </p>
      )}
      {!changePanel && Item[0].characteristics?.roliks_country == "" ? null : (
        <p>
          {" "}
          <strong>Страна производства:</strong>{" "}
          <input
            name="roliks_country"
            style={
              !changePanel
                ? { border: "0px solid white" }
                : { border: "2px solid white", padding: "1vh" }
            }
            readOnly={!changePanel}
            value={Item[0].characteristics?.roliks_country}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              handleChangeCharact(e, Item, setItem);
            }}
          />
        </p>
      )}
    </>
  );
}
