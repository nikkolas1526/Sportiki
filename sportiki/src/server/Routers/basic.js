import { Router } from "express";
import sportik from "../Db.js";
import jwt from "jsonwebtoken";

const router = Router();

router.get("/items", async (requ, resp) => {
  const result = await sportik.query(
    "SELECT Id, Name, Price, Sale, Availability, encode(Photo, 'base64') as Photo FROM Items WHERE is_active=false;"
  );

  resp.json(result.rows);
});
router.get("/likedItems", async (requ, resp) => {
  const ids = await sportik.query(
    "SELECT liked_item_id FROM liked_Items WHERE liked_account_id=$1;",
    [requ.query.id]
  );

  if (ids.rows.length > 0) {
    const uniqueArray = [
      ...new Set(ids.rows.map((item) => item.liked_item_id)),
    ];

    const finalItems = await Promise.all(
      uniqueArray.map(async (id) => {
        return await sportik.query(
          "SELECT Id, Name, Price, Sale, Availability, encode(Photo, 'base64') as Photo FROM Items WHERE is_active=false and id=$1;",
          [id]
        );
      })
    );

    resp.json(finalItems.map((item) => item.rows).flat());
  } else {
    resp.json([]); // Вернуть пустой массив, если нет идентификаторов
  }
});

router.get("/binItems", async (req, resp) => {
  try {
    const ids = await sportik.query(
      "SELECT bin_item_id, number FROM bin_Items WHERE binned_account_id=$1;",
      [req.query.id]
    );
    console.log(ids);

    if (ids.rows.length > 0) {
      const uniqueArray = [
        ...new Set(ids.rows.map((item) => item.bin_item_id)),
      ];

      const finalItems = await Promise.all(
        uniqueArray.map(async (id) => {
          const itemData = await sportik.query(
            "SELECT Id, Name, Price, Sale, Availability, encode(Photo, 'base64') as Photo FROM Items WHERE is_active=false and id=$1;", // Изменил is_active на true
            [id]
          );

          const number = ids.rows.find(
            (item) => item.bin_item_id === id
          ).number;

          return {
            ...itemData.rows[0],
            number: number,
          };
        })
      );

      resp.json(finalItems);
    } else {
      resp.json([]);
    }
  } catch (error) {
    console.error("Ошибка при получении предметов из корзины:", error);
    resp.status(500).json({ error: "Ошибка при получении данных" });
  }
});

router.get("/gloves", async (req, res) => {
  const result = await sportik.query(
    "SELECT Id, Name, Price, Sale, Availability, encode(Photo, 'base64') as Photo FROM Items WHERE is_active=false AND kategory='Перчатки для единоборств';"
  );
  res.json(result.rows);
});
router.get("/roliks", async (req, res) => {
  const result = await sportik.query(
    "SELECT Id, Name, Price, Sale, Availability, encode(Photo, 'base64') as Photo FROM Items WHERE is_active=false AND kategory='Ролики';"
  );
  res.json(result.rows);
});
router.get("/skates", async (req, res) => {
  const result = await sportik.query(
    "SELECT Id, Name, Price, Sale, Availability, encode(Photo, 'base64') as Photo FROM Items WHERE is_active=false AND kategory='Самокаты';"
  );
  res.json(result.rows);
});

router.get("/bikes", async (req, res) => {
  const result = await sportik.query(
    "SELECT Id, Name, Price, Sale, Availability, encode(Photo, 'base64') as Photo FROM Items WHERE is_active=false AND kategory='Велосипеды';"
  );
  res.json(result.rows);
});

router.get("/defence", async (req, res) => {
  const result = await sportik.query(
    "SELECT Id, Name, Price, Sale, Availability, encode(Photo, 'base64') as Photo FROM Items WHERE is_active=false AND kategory='Защитная экипировка';"
  );
  res.json(result.rows);
});
router.get("/balls", async (req, res) => {
  const result = await sportik.query(
    "SELECT Id, Name, Price, Sale, Availability, encode(Photo, 'base64') as Photo FROM Items WHERE is_active=false AND kategory='Мячи';"
  );
  res.json(result.rows);
});

router.get("/itemById", async (req, res) => {
  let ion = req.query.id;
  const result = await sportik.query(
    "SELECT Id, Name, Price, Sale, Availability, encode(Photo, 'base64') as Photo, Kategory, Description FROM Items  WHERE id=$1 ORDER BY Price DESC;",
    [ion]
  );
  const base64Photo = result.rows[0].photo;

  res.json(result.rows);
});

router.post("/BinSet", async (req, res) => {
  const id = req.body.id;
  const item_id = req.body.item_id;
  console.log(id, item_id);
  const result = await sportik.query(
    "INSERT INTO bin_items (bin_item_id, binned_account_id,number) VALUES ($1, $2, 1);",
    [item_id, id]
  );
  return res.json("Item binned");
});
router.post("/BinDeleteItem", async (req, res) => {
  const id = req.body.id;
  const item_id = req.body.item_id;

  const result = await sportik.query(
    "DELETE FROM bin_items where bin_item_id=$1 and binned_account_id=$2;",
    [item_id, id]
  );
  return res.json("Item binned");
});
router.post("/BinChangeNumberOfItem", async (req, res) => {
  const id = req.body.id;
  const item_id = req.body.item_id;
  const number = req.body.number;
  const result = await sportik.query(
    "Update bin_items set number =$3 where bin_item_id=$1 and binned_account_id=$2;",
    [item_id, id, number]
  );
  return res.json("Item binned");
});

router.post("/BinGetItemInfo", async (req, res) => {
  const id = req.body.id;
  const item_id = req.body.item_id;
  const result = await sportik.query(
    "select * from bin_items where bin_item_id=$1 and binned_account_id=$2",
    [item_id, id]
  );

  if (result.rows.length > 0) return res.json("Yes");
  else return res.json("No");
});

router.post("/BinGetNumber", async (req, res) => {
  const id = req.body.id;
  const item_id = req.body.item_id;
  const result = await sportik.query(
    "select number from bin_items where bin_item_id=$1 and binned_account_id=$2",
    [item_id, id]
  );
  console.log(result.rows[0]);
  return res.json(result.rows[0]);
});

router.post("/LikeSet", async (req, res) => {
  const id = req.body.id;
  const item_id = req.body.item_id;
  console.log(id, item_id);
  try {
    await sportik.query(
      "INSERT INTO Liked_Items (Liked_Item_Id, Liked_Account_Id) VALUES ($1, $2);",
      [item_id, id]
    );
    return res.json("Item liked");
  } catch (error) {
    return res.status(500).json({ error: "Ошибка добавления в избранное" });
  }
});

router.post("/LikeDeleteItem", async (req, res) => {
  const id = req.body.id;
  const item_id = req.body.item_id;

  try {
    await sportik.query(
      "DELETE FROM Liked_Items WHERE Liked_Item_Id = $1 AND Liked_Account_Id = $2;",
      [item_id, id]
    );
    return res.json("Item unliked");
  } catch (error) {
    return res.status(500).json({ error: "Ошибка удаления из избранного" });
  }
});

router.post("/LikeGetItemInfo", async (req, res) => {
  const id = req.body.id;
  const item_id = req.body.item_id;
  try {
    const result = await sportik.query(
      "SELECT * FROM Liked_Items WHERE Liked_Item_Id = $1 AND Liked_Account_Id = $2",
      [item_id, id]
    );
    if (result.rows.length > 0) return res.json("Yes");
    else return res.json("No");
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Ошибка получения данных об избранном" });
  }
});
router.post("/getCurrentOrder", async (req, res) => {
  let Token = req.headers.authorization;
  const accessToken = Token.substring(7);
  if (!accessToken) {
    return res.status(400).json({ error: "Нет токена" });
  }
  try {
    const userToken = jwt.verify(accessToken, "secretKey");
    const userId = userToken.userId;

    const order = await sportik.query(
      "SELECT * FROM Orders WHERE Account_id = $1 AND (Status = $2 OR Status = $3) ORDER BY Time DESC LIMIT 1",
      [userId, "Комплектуется", "Готов к выдаче"]
    );

    if (order.rows.length === 0) {
      return res.status(404).json({ message: "Нет активных заказов" });
    }

    const items = await sportik.query(
      "SELECT oi.Ordered_Item_Id, oi.Order_Id, oi.Number, oi.Price, i.Name as item_name FROM Ordered_Items oi JOIN Items i ON oi.Ordered_Item_Id = i.Id WHERE Order_Id = $1",
      [order.rows[0].id]
    );
    res.status(200).json({ ...order.rows[0], items: items.rows });
  } catch (Error) {
    console.error(Error);
    res.status(500).json({ error: "Ошибка получения данных о заказе" });
  }
});
router.post("/getPastOrders", async (req, res) => {
  let Token = req.headers.authorization;
  const accessToken = Token.substring(7);
  if (!accessToken) {
    return res.status(400).json({ error: "Нет токена" });
  }
  try {
    const userToken = jwt.verify(accessToken, "secretKey");
    const userId = userToken.userId;

    const orders = await sportik.query(
      "SELECT * FROM Orders WHERE Account_id = $1 AND (Status = $2 OR Status = $3) ORDER BY Time DESC",
      [userId, "Отменён из-за технических проблем", "Оплачен"]
    );
    if (orders.rows.length === 0) {
      return res.status(404).json({ message: "Нет прошлых заказов" });
    }

    const ordersWithItems = await Promise.all(
      orders.rows.map(async (order) => {
        const items = await sportik.query(
          "SELECT oi.Ordered_Item_Id, oi.Order_Id, oi.Number, oi.Price, i.Name as item_name FROM Ordered_Items oi JOIN Items i ON oi.Ordered_Item_Id = i.Id WHERE Order_Id = $1",
          [order.id]
        );

        return { ...order, items: items.rows };
      })
    );

    res.status(200).json(ordersWithItems);
  } catch (Error) {
    console.error(Error);
    res
      .status(500)
      .json({ error: "Ошибка получения данных о прошлых заказах" });
  }
});

router.post("/AddOrder", async (req, res) => {
  const { items, accountId, totalPrice } = req.body;

  if (!items || !accountId || totalPrice === undefined) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    // 1. Check for existing active orders for the user
    const existingOrder = await sportik.query(
      "SELECT id FROM Orders WHERE Account_id = $1 AND (Status = $2 OR Status = $3)",
      [accountId, "Комплектуется", "Готов к выдаче"]
    );

    if (existingOrder.rows.length > 0) {
      return res.status(409).json({ message: "У вас уже есть активный заказ" });
    }

    // 2. Create the new order
    const newOrder = await sportik.query(
      "INSERT INTO Orders (Account_id, Total_Price, Time, Status) VALUES ($1, $2, NOW(), $3) RETURNING id",
      [accountId, totalPrice, "Комплектуется"]
    );
    const orderId = newOrder.rows[0].id;

    // 3. Add items to Ordered_Items
    for (const item of items) {
      await sportik.query(
        "INSERT INTO Ordered_Items (Ordered_Item_Id, Order_Id, Number, Price) VALUES ($1, $2, $3, $4)",
        [item.id, orderId, item.number, item.price]
      );
    }
    res.status(201).json({ message: "Заказ успешно создан" });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Не удалось создать заказ" });
  }
});

router.get("/AVGrate", async (req, res) => {
  const id = req.query.item_id;
  const rate = await sportik.query(
    "SELECT CAST(AVG(rate) AS integer) AS average_rate FROM views WHERE item_id = $1;",
    [id]
  );

  return res.status(200).json(rate.rows[0]);
});

router.get("/GetCharacteristics", async (req, res) => {
  const typei = req.query.typei;
  const id = req.query.id;
  let rate;
  switch (typei) {
    case "Roliks":
      rate = await sportik.query("SELECT * FROM Roliks WHERE item_id = $1;", [
        id,
      ]);

      break;
    case "Bikes":
      rate = await sportik.query("SELECT * FROM Bikes WHERE item_id = $1;", [
        id,
      ]);
      break;
    case "Gloves":
      rate = await sportik.query("SELECT * FROM Gloves WHERE item_id = $1;", [
        id,
      ]);
      break;
    case "Balls":
      rate = await sportik.query("SELECT * FROM Balls WHERE item_id = $1;", [
        id,
      ]);
      break;
    case "Scooters":
      rate = await sportik.query("SELECT * FROM Scooters WHERE item_id = $1;", [
        id,
      ]);
      break;
    case "Protective_equipment":
      rate = await sportik.query(
        "SELECT * FROM Protective_equipment WHERE item_id = $1;",
        [id]
      );
      break;
  }

  return res.json(rate.rows[0]);
});

export default router;
