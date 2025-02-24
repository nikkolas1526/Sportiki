import "./Left.css";
import { useState, useEffect } from "react";
import Slider from "react-slider";
import Ax from "axios";
interface props {
  items: Product[];
  setItems: (items: Product[]) => void;
  Setpaga: (ite: number) => void;
  setLoading: (ite: boolean) => void;
  renderValue: string | null;
  search: string | null | undefined;
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

interface Filterss {
  Availability: string;
  Sale: string;
}

export default function Left({
  items,
  setItems,
  renderValue,
  search,
  setLoading,
  Setpaga,
}: props) {
  const [filters, setFilters] = useState<Filterss>({
    Availability: "-",
    Sale: "-",
  });
  const [maxPrice, setMaxPrice] = useState(0);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 4000]);
  const [rateRange, setRateRange] = useState<[number, number]>([0, 5]);

  useEffect(() => {
    let Highter = 0;
    items.forEach((element) => {
      if (element.price > Highter) {
        Highter = element.price;
      }
    });
    setMaxPrice(Highter);
    setPriceRange([0, Highter]);
  }, [items]);

  const FilterItemsFunction = async () => {
    setLoading(true);
    let url = "";
    if (renderValue === null) {
      url = "http://localhost:3001/api/items";
    } else if (renderValue === "Перчатки для единоборств") {
      url = "http://localhost:3001/api/gloves";
    } else if (renderValue === "Ролики") {
      url = "http://localhost:3001/api/roliks";
    } else if (renderValue === "Самокаты") {
      url = "http://localhost:3001/api/skates";
    } else if (renderValue === "Велосипеды") {
      url = "http://localhost:3001/api/bikes";
    } else if (renderValue === "Защитная экипировка") {
      url = "http://localhost:3001/api/defence";
    } else if (renderValue === "Мячи") {
      url = "http://localhost:3001/api/balls";
    }

    const response = await Ax.get(url);
    let data = await response.data;
    if (search) {
      data = data.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    const data2 = await Promise.all(
      data.map(async (item) => {
        const rateResponse = await Ax.get("http://localhost:3001/api/AVGrate", {
          params: {
            item_id: item.id,
          },
        });

        const finalRATE = await rateResponse.data.average_rate;
        return (item = {
          ...item,
          rate: typeof finalRATE === "number" ? finalRATE : 0,
        });
      })
    );

    Setpaga(1);
    window.scroll({ top: 0, behavior: "smooth" });
    let Demo = [...data2];
    if (items.length > 0) {
      if (filters.Availability !== "-") {
        if (filters.Availability == "Да") {
          Demo = Demo.filter((item) => item.availability == true);
        } else {
          Demo = Demo.filter((item) => item.availability == false);
        }
      }
      if (filters.Sale !== "-") {
        if (filters.Sale == "Да") {
          Demo = Demo.filter((item) => item.sale > 0);
        } else {
          Demo = Demo.filter((item) => item.sale == 0);
        }
      }
      Demo = Demo.filter(
        (item) => item.price >= priceRange[0] && item.price <= priceRange[1]
      );

      Demo = Demo.filter(
        (item) => item.rate >= rateRange[0] && item.rate <= rateRange[1]
      );
    }

    setLoading(false);
    setItems(Demo);
  };

  const handleDelete = async () => {
    setLoading(true);
    let url = "";
    if (renderValue === null) {
      url = "http://localhost:3001/api/items";
    } else if (renderValue === "Перчатки для единоборств") {
      url = "http://localhost:3001/api/gloves";
    } else if (renderValue === "Ролики") {
      url = "http://localhost:3001/api/roliks";
    } else if (renderValue === "Самокаты") {
      url = "http://localhost:3001/api/skates";
    } else if (renderValue === "Велосипеды") {
      url = "http://localhost:3001/api/bikes";
    } else if (renderValue === "Защитная экипировка") {
      url = "http://localhost:3001/api/defence";
    } else if (renderValue === "Мячи") {
      url = "http://localhost:3001/api/balls";
    }
    async function fetchData() {
      const response = await Ax.get(url);
      const data = await response.data;
      Setpaga(1);
      window.scroll({ top: 0, behavior: "smooth" });
      if (search !== null && search !== "") {
        setItems(
          data.filter((item) =>
            item.name.toLowerCase().includes(search?.toLowerCase())
          )
        );
      } else {
        setItems(data);
      }
    }

    await fetchData();
    setFilters({
      Availability: "-",
      Sale: "-",
    });
    setRateRange([0, 5]);
    setPriceRange([0, maxPrice]);
    setLoading(false);
  };

  const handlePriceChange = (values: number[]) => {
    setPriceRange(values as [number, number]);
  };
  const handleRateChange = (values: number[]) => {
    setRateRange(values as [number, number]);
  };
  const handleChange = (r) => {
    const name = r.target.className;
    if (name == "FilterSelectAva") {
      setFilters({ Availability: r.target.value, Sale: filters.Sale });
    }
    if (name == "FilterSelectSale") {
      setFilters({ Availability: filters.Availability, Sale: r.target.value });
    }
  };

  return (
    <div className="Left">
      <div className="FilterHeader">Фильтры</div>
      <div className="SaleFilterPanel">
        В наличии:
        <select
          className="FilterSelectAva"
          value={filters.Availability}
          onChange={(e) => {
            handleChange(e);
          }}
        >
          <option value={"-"}>-</option>
          <option value={"Да"}>Да</option>
          <option value={"Нет"}>Нет</option>
        </select>
      </div>

      <div className="SaleFilterPanel">
        <div>Скидка: </div>
        <select
          className="FilterSelectSale"
          value={filters.Sale}
          onChange={(e) => {
            handleChange(e);
          }}
        >
          <option>-</option>
          <option>Да</option>
          <option>Нет</option>
        </select>
      </div>

      <div>Цена:</div>
      <Slider
        min={0}
        max={maxPrice}
        step={10}
        value={priceRange}
        onChange={handlePriceChange}
        className="slider"
        thumbClassName="thumb"
        trackClassName="track"
      />
      <span>
        От {priceRange[0]}р. до {priceRange[1]}р.
      </span>

      <div>Рейтинг:</div>
      <Slider
        min={0}
        max={5}
        step={1}
        value={rateRange}
        onChange={handleRateChange}
        className="slider"
        thumbClassName="thumb"
        trackClassName="track"
      />
      <span>
        От {rateRange[0]} до {rateRange[1]}
      </span>

      <button
        className="FilterButton"
        onClick={() => {
          FilterItemsFunction();
        }}
      >
        Применить фильтры
      </button>
      <button
        className="FilterButton"
        onClick={() => {
          handleDelete();
        }}
      >
        Удалить фильтры
      </button>
    </div>
  );
}
