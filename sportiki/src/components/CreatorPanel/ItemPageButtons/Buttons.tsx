import { addNew } from "../Functions/Functions";
import { Product } from "../Interfaces/Interfaces";

interface ButtonsProps {
  Item: Product[];
  soska: (setClose: boolean) => void;
}

export default function Buttons({ Item, soska }: ButtonsProps) {
  return (
    <div className="buttons">
      <button
        className="DownButtons"
        onClick={() => {
          addNew(Item, soska);
        }}
      >
        Сохранить
      </button>
    </div>
  );
}
