import Ax from "axios";
import Cookies from "js-cookie";
import { Product } from "../Interfaces/Interfaces";

export const addNew = async (
  Item: Product[],
  soska: (sos: boolean) => void
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
    try {
      const response = await Ax.post("http://localhost:3001/api/new", {
        element: {
          name: Item[0].name,
          price: Item[0].price,
          sale: Item[0].sale,
          availability: Item[0].availability,
          kategory: Item[0].kategory,
          description: Item[0].description,
          photo: Item[0].photo,
        },
      });
      await Ax.post("http://localhost:3001/api/AddCharacteristics", {
        characteristics: Item[0].characteristics,
        kategory: Item[0].kategory,
        id: response.data.id,
      });
      soska(false);
    } catch (error) {
      error;
    }
  }
};

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
