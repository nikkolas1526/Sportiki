import "./Sorty.css";
import Ax from "axios";
import { useState, useEffect, useRef } from "react";
import LLoad from "../../../Images/load.gif";
import "../../Load.css";

interface Sort {
  setItems: (Sort: Product[]) => void;
  renderValue: string | null;
  Items: Product[];
}

interface Product {
  id: number;
  name: string;
  photo: string;
  price: number;
  sale: number;
  availability: boolean;
  rate: number | null;
}
export default function Sorty({ setItems, renderValue, Items }: Sort) {
  const [Value, setValue] = useState<string | undefined>();
  const [loading, setLoading] = useState<boolean>(false);
  const Reference = useRef<HTMLSelectElement>(null);

  const fetchData = async () => {
    setLoading(true);

    const bomba = [...Items];

    if (Value == "None") {
      const newdata = bomba.sort((a, b) => a.id - b.id);
      setItems(newdata);
    }

    if (Value == "Uprice") {
      const newdata = bomba.sort((a, b) => a.price - b.price);
      setItems(newdata);
    }
    if (Value == "Dprice") {
      const newdata = bomba.sort((a, b) => b.price - a.price);
      setItems(newdata);
    }
    if (Value == "Urate") {
      const newdata = bomba.sort((a, b) => a.rate - b.rate);
      setItems(newdata);
    }
    if (Value == "Drate") {
      const newdata = bomba.sort((a, b) => b.rate - a.rate);
      setItems(newdata);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (Value !== undefined) {
      fetchData();
    }
  }, [Value]);

  useEffect(() => {
    const selectElement = Reference;

    if (selectElement) {
      selectElement.value = "None";
    }
  }, [renderValue]);

  const change = () => {
    const element = document.getElementById("Sorti") as HTMLInputElement;
    const value = element?.value;
    setValue(value);
  };

  return (
    <div className="Sorty" ref={Reference}>
      <div>Сортировка</div>
      <select id="Sorti" onChange={change}>
        <option className="Opt" value="None">
          Нет
        </option>
        <option className="Opt" value="Uprice">
          По возрастанию цены
        </option>
        <option className="Opt" value="Dprice">
          По убыванию цены
        </option>
        <option className="Opt" value="Urate">
          По возрастанию рейтинга
        </option>
        <option className="Opt" value="Drate">
          По убыванию рейтинга
        </option>
      </select>
      {loading && (
        <div className="modal-overlay">
          <div className="modal-content">
            <img src={LLoad} />
          </div>
        </div>
      )}
    </div>
  );
}
