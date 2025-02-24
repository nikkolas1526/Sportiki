import Left from "../../MainContent/Left/Left";
import { handleFileChange, handleChange } from "../Functions/Functions";
import { Product } from "../Interfaces/Interfaces";

interface HightItemProps {
  Item: Product[];
  setItem: (item: Product[]) => void;
  changePanel: boolean;

  textareaNameSize: React.RefObject<HTMLTextAreaElement>;
  textareaSize: React.RefObject<HTMLTextAreaElement>;
  admin: boolean;
}

export default function HightItem({
  Item,
  setItem,
  changePanel,

  textareaNameSize,
  textareaSize,
  admin,
}: HightItemProps) {
  return (
    <>
      {" "}
      <div className="HighItem">
        {" "}
        <div className="itemName">
          {" "}
          <textarea
            readOnly={!changePanel}
            style={
              !changePanel
                ? { border: "0px solid white" }
                : { border: "2px solid white", padding: "1vh" }
            }
            ref={textareaNameSize}
            value={Item[0]?.name}
            name="name"
            onChange={
              changePanel
                ? (e: React.ChangeEvent<HTMLTextAreaElement>) => {
                    handleChange(e, Item, setItem);
                  }
                : undefined
            }
          />
        </div>
        <div className="rightDescription">
          <div className="hightPrice">
            <span> Цена (р.): </span>{" "}
            <input
              readOnly={!changePanel}
              value={Item[0]?.price}
              style={
                !changePanel
                  ? { border: "0px solid white" }
                  : { border: "2px solid white", padding: "1vh" }
              }
              name="price"
              onChange={
                changePanel
                  ? (e: React.ChangeEvent<HTMLInputElement>) => {
                      handleChange(e, Item, setItem);
                    }
                  : undefined
              }
            />
          </div>
          <div className="hightSale">
            <span> Скидка (%): </span>{" "}
            <input
              readOnly={!changePanel}
              name="sale"
              style={
                !changePanel
                  ? { border: "0px solid white" }
                  : { border: "2px solid white", padding: "1vh" }
              }
              value={
                Item[0]?.sale > 0 ? Item[0].sale : admin ? Item[0].sale : "Нет"
              }
              onChange={
                changePanel
                  ? (e: React.ChangeEvent<HTMLInputElement>) => {
                      handleChange(e, Item, setItem);
                    }
                  : undefined
              }
            />
          </div>
          <div className="hightAvailability">
            <span> Наличие: </span>{" "}
            {changePanel ? (
              <select
                name="availability"
                value={Item[0]?.availability}
                onChange={
                  changePanel
                    ? (e: React.ChangeEvent<HTMLSelectElement>) => {
                        handleChange(e, Item, setItem);
                      }
                    : undefined
                }
              >
                <option className="Opt" value={true}>
                  Да
                </option>
                <option className="Opt" value={false}>
                  Нет
                </option>
              </select>
            ) : (
              <input
                readOnly={!changePanel}
                value={Item[0]?.availability ? "Да" : "Нет"}
                name="availability"
                onChange={
                  changePanel
                    ? (e: React.ChangeEvent<HTMLInputElement>) => {
                        handleChange(e, Item, setItem);
                      }
                    : undefined
                }
              />
            )}
          </div>
        </div>{" "}
        <div className="LeftBomb">
          {" "}
          <div className="leftPhoto">
            {Item[0]?.photo !== null ? (
              <img src={`data:image/jpg;base64,${Item[0].photo}`} />
            ) : null}
          </div>{" "}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              handleFileChange(e, setItem, Item);
            }}
            style={{ display: "none" }}
            id="fileInput"
          />{" "}
          <div className="leftButtons">
            {" "}
            {changePanel ? (
              <label htmlFor="fileInput" className="upload-button">
                Загрузить фото
              </label>
            ) : null}
            {changePanel && Item[0].photo !== null ? (
              <button
                className="DeletePhotoButton"
                onClick={() => {
                  const charact = "photo";
                  const value = null;
                  const ChangedItemMass = [...Item];
                  const ChangedItem = ChangedItemMass[0];
                  ChangedItem[charact] = value;
                  setItem([ChangedItem]);
                }}
              >
                Удалить фото
              </button>
            ) : null}
          </div>
        </div>
      </div>{" "}
      <div className="About">
        {!changePanel && Item[0]?.description == "" ? null : (
          <textarea
            ref={textareaSize}
            readOnly={!changePanel}
            name="description"
            value={Item[0]?.description}
            onChange={
              changePanel
                ? (e: React.ChangeEvent<HTMLInputElement>) => {
                    handleChange(e, Item, setItem);
                  }
                : undefined
            }
          />
        )}
      </div>
    </>
  );
}
