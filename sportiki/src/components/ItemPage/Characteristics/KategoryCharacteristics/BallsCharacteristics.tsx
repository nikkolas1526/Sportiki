import { handleChangeCharact } from "../../Functions/Functions";
import { Product } from "../../Interfaces/Interfaces";

interface props {
  Item: Product[];
  changePanel: boolean;
  setItem: (olo: Product[]) => void;
}

export default function BallsCharacteristics({
  Item,
  changePanel,
  setItem,
}: props) {
  return (
    <>
      {" "}
      <p>
        <strong>Тип мяча:</strong>

        {changePanel ? (
          <select
            name="balls_type"
            value={Item[0].characteristics?.balls_type}
            onChange={
              changePanel
                ? (e: React.ChangeEvent<HTMLInputElement>) => {
                    handleChangeCharact(e, Item, setItem);
                  }
                : undefined
            }
          >
            <option value="Футбольный">Футбольный</option>
            <option value="Воллейбольный">Воллейбольный</option>
            <option value="Баскетбольный">Баскетбольный</option>
          </select>
        ) : (
          <input
            readOnly={!changePanel}
            name="balls_type"
            value={Item[0].characteristics?.balls_type}
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
      {!changePanel && Item[0].characteristics?.balls_size == 0 ? null : (
        <p>
          {" "}
          <strong>Размер мяча:</strong>{" "}
          <input
            readOnly={!changePanel}
            style={
              !changePanel
                ? { border: "0px solid white" }
                : { border: "2px solid white", padding: "1vh" }
            }
            name="balls_size"
            value={Item[0].characteristics?.balls_size}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              handleChangeCharact(e, Item, setItem);
            }}
          ></input>{" "}
        </p>
      )}
      {!changePanel && Item[0].characteristics?.balls_brand == "" ? null : (
        <p>
          {" "}
          <strong>Бренд:</strong>
          <input
            readOnly={!changePanel}
            name="balls_brand"
            value={Item[0].characteristics?.balls_brand}
            style={
              !changePanel
                ? { border: "0px solid white" }
                : { border: "2px solid white", padding: "1vh" }
            }
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              handleChangeCharact(e, Item, setItem);
            }}
          ></input>{" "}
        </p>
      )}{" "}
      {!changePanel && Item[0].characteristics?.balls_country == "" ? null : (
        <p>
          {" "}
          <strong>Страна производства:</strong>{" "}
          <input
            readOnly={!changePanel}
            name="balls_country"
            style={
              !changePanel
                ? { border: "0px solid white" }
                : { border: "2px solid white", padding: "1vh" }
            }
            value={Item[0].characteristics?.balls_country}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              handleChangeCharact(e, Item, setItem);
            }}
          ></input>{" "}
        </p>
      )}
    </>
  );
}
