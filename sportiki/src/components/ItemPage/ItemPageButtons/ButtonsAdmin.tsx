import { handleSave, deleteItemById } from "../Functions/Functions";
import { Product } from "../Interfaces/Interfaces";

interface ButtonsProps {
  Item: Product[];
  changePanel: boolean;

  setChangePanel: (changePanel: boolean) => void;

  soska: (prop: boolean) => void;
  id: number;
  setItems: (olo: Product[]) => void;
  items: Product[];
  setElement: (olo: Product) => void;
  element: Product;
}

export default function Buttons({
  Item,
  changePanel,

  setChangePanel,

  soska,
  setElement,
  setItems,
  element,
  id,
  items,
}: ButtonsProps) {
  return (
    <div className="buttons">
      {" "}
      {changePanel ? (
        <button
          className="DownButtons"
          onClick={() => {
            setChangePanel(false);
          }}
        >
          Отменить
        </button>
      ) : (
        <button
          className="DownButtons"
          onClick={() => {
            const test = async () => {
              await deleteItemById(soska, id, setItems, items);
            };
            test();
          }}
        >
          Удалить
        </button>
      )}
      {changePanel ? (
        <button
          className="DownButtons"
          onClick={() => {
            handleSave(
              setChangePanel,
              Item,
              setItems,
              items,
              setElement,
              element
            );
          }}
        >
          Сохранить
        </button>
      ) : (
        <button
          className="DownButtons"
          onClick={() => {
            setChangePanel(true);
          }}
        >
          Изменить
        </button>
      )}{" "}
    </div>
  );
}
