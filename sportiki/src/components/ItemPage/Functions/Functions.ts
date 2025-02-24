import Ax from "axios";
import Cookies from "js-cookie";
import { Product, Views } from "../Interfaces/Interfaces";

export const handleChange = (
  e:
    | React.ChangeEvent<HTMLInputElement>
    | React.ChangeEvent<HTMLSelectElement>
    | React.ChangeEvent<HTMLTextAreaElement>,
  Item: Product[],
  setItem: (Item: Product[]) => void
) => {
  const { name, value } = e.target;
  const charact = name;
  const ChangedItemMass = [...Item];
  const ChangedItem = ChangedItemMass[0];
  if (charact == "sale" || charact == "price") {
    ChangedItem[charact] = Number(value.replace(/[^0-9]/g, ""));
  } else {
    ChangedItem[charact] = value;
  }
  setItem([ChangedItem]);
};

export const handleChangeCharact = (
  e:
    | React.ChangeEvent<HTMLInputElement>
    | React.ChangeEvent<HTMLSelectElement>
    | React.ChangeEvent<HTMLTextAreaElement>,
  Item: Product[],
  setItem: (Item: Product[]) => void
) => {
  const { name, value } = e.target;
  const charact = name;
  const ChangedItemMass = [...Item];
  const ChangedItem = { ...ChangedItemMass[0] };

  const newCharacteristics = { ...(ChangedItem.characteristics || null) };
  Number(value.replace(/[^0-9]/g, ""));

  if (typeof newCharacteristics[charact] == "number") {
    newCharacteristics[charact] = Number(value.replace(/[^0-9]/g, ""));
  } else {
    newCharacteristics[charact] = value;
  }
  ChangedItem.characteristics = newCharacteristics;
  ChangedItemMass[0] = ChangedItem;
  typeof newCharacteristics[charact];
  setItem(ChangedItemMass);
};

export const GetData = async (
  id: number,
  setItem: (Item: Product[]) => void,
  setViews: (views: Views[]) => void
) => {
  const parametr = id;
  const ItemToShow = await Ax.get("http://localhost:3001/api/itemById", {
    params: { id: parametr },
  });
  const ViewsToShow = await Ax.get("http://localhost:3001/api/Views", {
    params: { id: parametr },
  });
  let type = "Roliks";
  ItemToShow.data.kategory;
  ItemToShow.data;
  if (ItemToShow.data[0].kategory == "Велосипеды") {
    type = "Bikes";
  }

  if (ItemToShow.data[0].kategory == "Мячи") {
    type = "Balls";
  }
  if (ItemToShow.data[0].kategory == "Перчатки для единоборств") {
    type = "Gloves";
  }
  if (ItemToShow.data[0].kategory == "Защитная экипировка") {
    type = "Protective_equipment";
  }
  if (ItemToShow.data[0].kategory == "Самокаты") {
    type = "Scooters";
  }

  const CharacteristicsToShow = await Ax.get(
    "http://localhost:3001/api//GetCharacteristics",
    {
      params: { id: parametr, typei: type },
    }
  );
  const setItemDemo = {
    ...ItemToShow.data[0],
    characteristics: CharacteristicsToShow.data,
  };

  const viewsDemo = ViewsToShow.data;
  const ViewsFull = await Promise.all(
    viewsDemo.map(async (item) => {
      const nameResponse = await Ax.get("http://localhost:3001/api/getName", {
        params: { id: item.viewed_account_id },
      });
      return {
        ...item,
        namee: nameResponse.data[0].name,
        key: nameResponse.data[0].name,
      };
    })
  );
  setItem([setItemDemo]);
  setViews(ViewsFull);
};

export const handleDelete = async (
  viewed_account_id: number,
  views: Views[],
  Item: Product[],
  setViews: (views: Views[]) => void
) => {
  const token = Cookies.get("accessToken");
  if (token == undefined) {
    return;
  }
  const response = await fetch("http://localhost:3001/api/isAdmin", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  if (data.message == "Администратор") {
    const newViews = views.filter(
      (view) => view.viewed_account_id !== viewed_account_id
    );
    setViews(newViews);
    await Ax.post("http://localhost:3001/api/deleteView", {
      viewed_account_id: viewed_account_id,
      item_id: Item[0].id,
    });
  }
};

export const handleBan = async (
  viewed_account_id: number,
  views: Views[],
  Item: Product[],
  setViews: (views: Views[]) => void
) => {
  const token = Cookies.get("accessToken");
  if (token == undefined) {
    return;
  }
  const response = await fetch("http://localhost:3001/api/isAdmin", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  if (data.message == "Администратор") {
    const newViews = views.filter(
      (view) => view.viewed_account_id !== viewed_account_id
    );
    setViews(newViews);
    await Ax.post("http://localhost:3001/api/BanAndDeleteView", {
      viewed_account_id: viewed_account_id,
      item_id: Item[0].id,
    });
  }
};

export const handleSave = async (
  setChangePanel: (changePanel: boolean) => void,
  Item: Product[],
  setItems: (items: Product[]) => void,
  items: Product[],
  setElement: (product: Product) => void,
  element: Product
) => {
  if (Item[0].name.trim() == "") {
    alert("Имя товара не может быть пустым");
    return;
  }
  const token = Cookies.get("accessToken");
  if (token == undefined) {
    return;
  }
  const response = await fetch("http://localhost:3001/api/isAdmin", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  if (data.message == "Администратор") {
    await Promise.all([
      Ax.post("http://localhost:3001/api/ChangeItemById", {
        element: {
          name: Item[0].name,
          price: Item[0].price,
          sale: Item[0].sale,
          availability: Item[0].availability,
          kategory: Item[0].kategory,
          description: Item[0].description,
          id: Item[0].id,
          photo: Item[0].photo,
        },
      }),
      Ax.post("http://localhost:3001/api/SetCharacteristics", {
        characteristics: Item[0].characteristics,
        kategory: Item[0].kategory,
        id: Item[0].id,
      }),
    ]);

    const newItems = [...items].map((item) => {
      if (item.id === Item[0]?.id) {
        return { ...Item[0], rate: element.rate };
      }
      return { ...item };
    });
    console.log({ ...Item[0], rate: element.rate });
    setElement({ ...Item[0], rate: element.rate });
    setItems(newItems);
    setChangePanel(false);
  }
};

export const deleteItemById = async (
  soska: (sos: boolean) => void,
  id: number,
  setItems: (Item: Product[]) => void,
  items: Product[]
) => {
  const parametr = id;

  const token = Cookies.get("accessToken");
  if (token == undefined) {
    return;
  }
  const response = await fetch("http://localhost:3001/api/isAdmin", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();

  if (data.message == "Администратор") {
    ("Админ");
    items;
    setItems(items.filter((item) => item.id != parametr));

    const info = await Ax.post("http://localhost:3001/api/delete", {
      id: parametr,
    });
    soska(false);
  }
};

export const handleFileChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  setItem: (item: Product[]) => void,
  Item: Product[]
) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result.split(",")[1];
      const charact = "photo";
      const ChangedItemMass = [...Item];
      const ChangedItem = ChangedItemMass[0];
      ChangedItem[charact] = base64String;
      setItem([ChangedItem]);
    };
    reader.readAsDataURL(file);
  }
};
