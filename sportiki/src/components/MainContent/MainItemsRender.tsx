import Ax from "axios";
interface Props {
  setItems: (Sort: Product[]) => void;
  renderValue: string | null;
  pagiChanged: (Page: number) => void;
  bin: boolean;
  likedPanel: boolean;
  id: number;
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
export default async function MainItemsRender({
  setItems,
  renderValue,
  bin,
  likedPanel,
  pagiChanged,
  id,
}: Props) {
  let url = "";
  if (bin) {
    url = "http://localhost:3001/api/binItems";
  } else if (likedPanel) {
    url = "http://localhost:3001/api/likedItems";
  } else if (renderValue === null) {
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
    try {
      let response;
      if (bin || likedPanel) {
        response = await Ax.get(url, { params: { id: id } });
      } else {
        response = await Ax.get(url);
      }

      const data = await response.data;

      await Promise.all(
        data.map(async (item) => {
          const rateResponse = await Ax.get(
            "http://localhost:3001/api/AVGrate",
            {
              params: {
                item_id: item.id,
              },
            }
          );
          const finalRATE = await rateResponse.data.average_rate;
          if (typeof finalRATE == "number") {
            item.rate = finalRATE;
          } else {
            item.rate = 0;
          }
        })
      );

      setItems(data);
      pagiChanged(1);
    } catch (error) {
      console.error("Ошибка при загрузке данных:", error);
    }
  }

  await fetchData();
}
