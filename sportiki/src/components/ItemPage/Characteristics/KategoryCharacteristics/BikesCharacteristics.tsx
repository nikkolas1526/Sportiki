import { handleChangeCharact } from "../../Functions/Functions";
import { Product } from "../../Interfaces/Interfaces";

interface props {
  Item: Product[];
  changePanel: boolean;
  setItem: (olo: Product[]) => void;
}

export default function BikesCharacteristics({
  Item,
  changePanel,
  setItem,
}: props) {
  return (
    <>
      {" "}
      <p>
        <strong>Тип велосипеда: </strong>

        {changePanel ? (
          <select
            name="bikes_type"
            value={Item[0].characteristics?.bikes_type || ""}
            onChange={
              changePanel
                ? (e: React.ChangeEvent<HTMLSelectElement>) => {
                    handleChangeCharact(e, Item, setItem);
                  }
                : undefined
            }
          >
            <option value="Электровелосипед">Электровелосипед</option>
            <option value="Трюковой">Трюковой</option>
            <option value="Горный">Горный</option>
            <option value="Городской">Городской</option>
          </select>
        ) : (
          <input
            name="bikes_type"
            readOnly={true}
            value={Item[0].characteristics?.bikes_type}
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
      {Item[0].characteristics?.bikes_type == "Электровелосипед" ? (
        <>
          {" "}
          {changePanel || Item[0].characteristics?.bikes_power == 0 ? (
            <p>
              {" "}
              <strong>Мощность (Вт):</strong>{" "}
              <input
                readOnly={!changePanel}
                style={
                  !changePanel
                    ? { border: "0px solid white" }
                    : { border: "2px solid white", padding: "1vh" }
                }
                name="bikes_power"
                value={Item[0].characteristics?.bikes_power}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  handleChangeCharact(e, Item, setItem);
                }}
              />
            </p>
          ) : null}
          {changePanel || Item[0].characteristics?.bikes_battery == 0 ? (
            <p>
              {" "}
              <strong>Емкость аккумулятора (Ah):</strong>{" "}
              <input
                readOnly={!changePanel}
                style={
                  !changePanel
                    ? { border: "0px solid white" }
                    : { border: "2px solid white", padding: "1vh" }
                }
                name="bikes_battery"
                value={Item[0].characteristics?.bikes_battery}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  handleChangeCharact(e, Item, setItem);
                }}
              />
            </p>
          ) : null}
        </>
      ) : null}
      {changePanel || Item[0].characteristics?.bikes_weight == 0 ? (
        <p>
          <strong>Вес (Кг):</strong>
          <input
            name="bikes_weight"
            style={
              !changePanel
                ? { border: "0px solid white" }
                : { border: "2px solid white", padding: "1vh" }
            }
            readOnly={!changePanel}
            value={Item[0].characteristics?.bikes_weight}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              handleChangeCharact(e, Item, setItem);
            }}
          />
        </p>
      ) : null}
      {!changePanel && Item[0].characteristics?.bikes_wheel_size == 0 ? null : (
        <p>
          {" "}
          <strong>Размер колес:</strong>{" "}
          <input
            name="bikes_wheel_size"
            readOnly={!changePanel}
            style={
              !changePanel
                ? { border: "0px solid white" }
                : { border: "2px solid white", padding: "1vh" }
            }
            value={Item[0].characteristics?.bikes_wheel_size}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              handleChangeCharact(e, Item, setItem);
            }}
          ></input>
        </p>
      )}
      {!changePanel && Item[0].characteristics?.bikes_material == "" ? null : (
        <p>
          <strong>Материал рамы:</strong>{" "}
          <input
            name="bikes_material"
            style={
              !changePanel
                ? { border: "0px solid white" }
                : { border: "2px solid white", padding: "1vh" }
            }
            readOnly={!changePanel}
            value={Item[0].characteristics?.bikes_material}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              handleChangeCharact(e, Item, setItem);
            }}
          ></input>{" "}
        </p>
      )}
      {!changePanel && Item[0].characteristics?.bikes_brand == "" ? null : (
        <p>
          {" "}
          <strong>Бренд:</strong>
          <input
            name="bikes_brand"
            readOnly={!changePanel}
            style={
              !changePanel
                ? { border: "0px solid white" }
                : { border: "2px solid white", padding: "1vh" }
            }
            value={Item[0].characteristics?.bikes_brand}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              handleChangeCharact(e, Item, setItem);
            }}
          ></input>{" "}
        </p>
      )}{" "}
      {!changePanel && Item[0].characteristics?.bikes_country == "" ? null : (
        <p>
          {" "}
          <strong>Страна производства:</strong>{" "}
          <input
            name="bikes_country"
            style={
              !changePanel
                ? { border: "0px solid white" }
                : { border: "2px solid white", padding: "1vh" }
            }
            readOnly={!changePanel}
            value={Item[0].characteristics?.bikes_country || ""}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              handleChangeCharact(e, Item, setItem);
            }}
          ></input>{" "}
        </p>
      )}
    </>
  );
}
