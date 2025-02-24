import { handleChangeCharact } from "../../Functions/Functions";
import { Product } from "../../Interfaces/Interfaces";

interface props {
  Item: Product[];
  changePanel: boolean;
  setItem: (olo: Product[]) => void;
}

export default function ScootersCharacteristics({
  Item,
  changePanel,
  setItem,
}: props) {
  return (
    <>
      {" "}
      <p>
        <strong>Тип самоката:</strong>{" "}
        {changePanel ? (
          <select
            name="scooters_type"
            value={Item[0].characteristics?.scooters_type}
            onChange={
              changePanel
                ? (e: React.ChangeEvent<HTMLInputElement>) => {
                    handleChangeCharact(e, Item, setItem);
                  }
                : undefined
            }
          >
            <option value="Электросамокат">Электросамокат</option>
            <option value="Трюковой">Трюковой</option>
            <option value="Городской">Городской</option>
          </select>
        ) : (
          <input
            readOnly={!changePanel}
            style={
              !changePanel
                ? { border: "0px solid white" }
                : { border: "2px solid white", padding: "1vh" }
            }
            name="scooters_type"
            value={Item[0].characteristics?.scooters_type}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              handleChangeCharact(e, Item, setItem);
            }}
          />
        )}
      </p>{" "}
      {!changePanel && Item[0].characteristics?.scooters_weight == "" ? null : (
        <p>
          <strong>Вес (Кг):</strong>
          <input
            readOnly={!changePanel}
            name="scooters_weight"
            style={
              !changePanel
                ? { border: "0px solid white" }
                : { border: "2px solid white", padding: "1vh" }
            }
            value={Item[0].characteristics?.scooters_weight}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              handleChangeCharact(e, Item, setItem);
            }}
          ></input>{" "}
        </p>
      )}
      {!changePanel &&
      Item[0].characteristics?.scooters_wheel_size == 0 ? null : (
        <p>
          <strong>Размер колес:</strong>{" "}
          <input
            readOnly={!changePanel}
            name="scooters_wheel_size"
            style={
              !changePanel
                ? { border: "0px solid white" }
                : { border: "2px solid white", padding: "1vh" }
            }
            value={Item[0].characteristics?.scooters_wheel_size}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              handleChangeCharact(e, Item, setItem);
            }}
          ></input>{" "}
        </p>
      )}
      {!changePanel && Item[0].characteristics?.scooters_brand == "" ? null : (
        <p>
          <strong>Бренд:</strong>{" "}
          <input
            readOnly={!changePanel}
            name="scooters_brand"
            style={
              !changePanel
                ? { border: "0px solid white" }
                : { border: "2px solid white", padding: "1vh" }
            }
            value={Item[0].characteristics?.scooters_brand}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              handleChangeCharact(e, Item, setItem);
            }}
          ></input>{" "}
        </p>
      )}
      {!changePanel &&
      Item[0].characteristics?.scooters_country == "" ? null : (
        <p>
          <strong>Страна производства:</strong>{" "}
          <input
            readOnly={!changePanel}
            name="scooters_country"
            style={
              !changePanel
                ? { border: "0px solid white" }
                : { border: "2px solid white", padding: "1vh" }
            }
            value={Item[0].characteristics?.scooters_country}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              handleChangeCharact(e, Item, setItem);
            }}
          ></input>{" "}
        </p>
      )}
    </>
  );
}
