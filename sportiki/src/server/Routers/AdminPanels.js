import { Router } from "express";
import sportik from "../Db.js";

const router = Router();
router.post("/ChangeOrderById", async (req, res) => {
  let ion = req.body.element;

  const result = await sportik.query(
    "UPDATE Orders SET status = $1 WHERE Id = $2;",
    [ion.status, ion.id]
  );
  res.status(200);
});

router.post("/ChangeItemById", async (req, res) => {
  let ion = req.body.element;
  let base64Photo = ion.photo;
  if (!base64Photo) {
    base64Photo = null;
  } else {
    const imageBuffer = Buffer.from(base64Photo, "base64");

    const result = await sportik.query(
      "UPDATE Items SET Name = $1, Price = $2, Sale = $3, Availability = $4, Kategory = $5, Description = $6, photo=$8 WHERE Id = $7;",
      [
        ion.name,
        ion.price,
        ion.sale,
        ion.availability,
        ion.kategory,
        ion.description,
        ion.id,
        imageBuffer,
      ]
    );
    return res.status(200).json({ message: "Да" });
  }
  const result = await sportik.query(
    "UPDATE Items SET Name = $1, Price = $2, Sale = $3, Availability = $4, Kategory = $5, Description = $6,photo=null WHERE Id = $7;",
    [
      ion.name,
      ion.price,
      ion.sale,
      ion.availability,
      ion.kategory,
      ion.description,
      ion.id,
    ]
  );
  return res.status(200);
});
router.post("/delete", async (req, res) => {
  console.log("Привет");
  let ion = req.body.id;

  const result = await sportik.query(
    "UPDATE Items SET is_active = true WHERE Id = $1 RETURNING *;",
    [ion]
  );
  console.log(result);
  res.status(200).json(result.rows);
});
router.post("/new", async (req, res) => {
  try {
    const { name, price, sale, availability, kategory, description, photo } =
      req.body.element;
    let result;
    let base64Photo = photo;

    if (!base64Photo) {
      base64Photo = null;
      result = await sportik.query(
        "INSERT INTO Items (name, price, sale, availability, kategory, description, photo) VALUES ($1, $2, $3, $4, $5, $6, $7) returning *;",
        [name, price, sale, availability, kategory, description, base64Photo]
      );
      const id = result.rows[0].id;
      res.status(200).json({ id: id });
    } else {
      const imageBuffer = Buffer.from(base64Photo, "base64");
      result = await sportik.query(
        "INSERT INTO Items (name, price, sale, availability, kategory, description, photo) VALUES ($1, $2, $3, $4, $5, $6, $7) returning *;",
        [name, price, sale, availability, kategory, description, imageBuffer]
      );
      const id = result.rows[0].id;
      res.status(200).json({ id: id });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
});
router.get("/OrdersAdmin", async (req, res) => {
  const result = await sportik.query("SELECT * FROM Orders order by id asc;");
  res.json(result.rows);
});
router.get("/AccountsAdmin", async (req, res) => {
  const result = await sportik.query(
    "SELECT id,nickname,name,surname,ban FROM ACCOUNTS order by id asc;"
  );
  res.json(result.rows);
});
router.post("/BanAccountAdmin", async (req, res) => {
  const id = req.body.id;
  const ban = req.body.ban;
  const result = await sportik.query(
    "UPDATE ACCOUNTS SET BAN=$2 WHERE ID=$1;",
    [id, ban]
  );
  console.log(id);
  console.log(ban);
  return res.status(200);
});
router.get("/Order", async (req, res) => {
  const id = req.query.id;

  const result = await sportik.query(
    "SELECT * FROM ordered_items where order_id=$1;",
    [id]
  );

  res.json(result.rows);
});

router.post("/SetCharacteristics", async (req, res) => {
  const kategory = req.body.kategory;
  const id = req.body.id;
  const element = req.body.characteristics;

  try {
    let query = "";
    let params = [];

    switch (kategory) {
      case "Ролики":
        query = `UPDATE Roliks SET 
                  Roliks_Size = $1, 
                  Roliks_Type = $2,
                  Roliks_Wheels = $3,
                  Roliks_Brand = $4,
                  Roliks_Country = $5
                  WHERE item_id = $6;`;
        params = [
          element.roliks_size,
          element.roliks_type,
          element.roliks_wheels,
          element.roliks_brand,
          element.roliks_country,
          id,
        ];
        break;

      case "Велосипеды":
        query = `UPDATE Bikes SET 
                    Bikes_Type = $1,
                    Bikes_Power = $2,
                    Bikes_Battery = $3,
                    Bikes_Weight = $4,
                    Bikes_Wheel_Size = $5,
                    Bikes_Material = $6,
                    Bikes_Brand = $7,
                    Bikes_Country = $8
                    WHERE item_id = $9;`;
        params = [
          element.bikes_type,
          element.bikes_power,
          element.bikes_battery,
          element.bikes_weight,
          element.bikes_wheel_size,
          element.bikes_material,
          element.bikes_brand,
          element.bikes_country,
          id,
        ];
        break;

      case "Перчатки для единоборств":
        query = `UPDATE Gloves SET
                  Gloves_Type = $1,
                  Gloves_Size = $2,
                  Gloves_Material = $3,
                  Gloves_Brand = $4,
                  Gloves_Country = $5
                  WHERE item_id = $6;`;
        params = [
          element.gloves_type,
          element.gloves_size,
          element.gloves_material,
          element.gloves_brand,
          element.gloves_country,
          id,
        ];
        break;

      case "Мячи":
        query = `UPDATE Balls SET
                  Balls_Type = $1,
                  Balls_Size = $2,
                  Balls_Brand = $3,
                  Balls_Country = $4
                  WHERE item_id = $5;`;

        params = [
          element.balls_type,
          Number(element.balls_size),
          element.balls_brand,
          element.balls_country,
          id,
        ];
        break;

      case "Самокаты":
        query = `UPDATE Scooters SET
                  Scooters_Type = $1,
                  Scooters_Weight = $2,
                  Scooters_Wheel_Size = $3,
                  Scooters_Brand = $4,
                  Scooters_Country = $5
                  WHERE item_id = $6;`;
        params = [
          element.scooters_type,
          element.scooters_weight,
          element.scooters_wheel_Size,
          element.scooters_brand,
          element.scooters_country,
          id,
        ];
        break;

      case "Защитная экипировка":
        query = `UPDATE Protective_Equipment SET
                  Protective_Equipment_Sport = $1,
                  Protective_Equipment_Type = $2,
                  Protective_Equipment_Size = $3,
                  Protective_Equipment_Brand = $4,
                  Protective_Equipment_Country = $5
                   WHERE item_id = $6;`;
        params = [
          element.protective_equipment_sport,
          element.protective_equipment_type,
          element.protective_equipment_size,
          element.protective_equipment_brand,
          element.protective_equipment_country,
          id,
        ];
        break;

      default:
        console.log("Invalid category");
        return res.status(400).json({ message: "Invalid category" });
    }

    await sportik.query(query, params);
    console.log(params);
    return res
      .status(200)
      .json({ message: "Characteristics updated successfully" });
  } catch (error) {
    console.error("Error updating characteristics:", error);
    return res.status(500).json({ message: "Error updating characteristics" });
  }
});
router.post("/AddCharacteristics", async (req, res) => {
  const kategory = req.body.kategory;
  const id = req.body.id;
  const element = req.body.characteristics;

  try {
    let query = "";
    let params = [];

    switch (kategory) {
      case "Ролики":
        query =
          "INSERT INTO Roliks ( Roliks_Size, Roliks_Type,Roliks_Wheels,Roliks_Brand,Roliks_Country,item_id) VALUES ($1, $2, $3, $4, $5, $6);";
        params = [
          element.roliks_size,
          element.roliks_type,
          element.roliks_wheels,
          element.roliks_brand,
          element.roliks_country,
          id,
        ];
        break;

      case "Велосипеды":
        query =
          "INSERT INTO Bikes (Bikes_Type,Bikes_Power,Bikes_Battery,Bikes_Weight, Bikes_Wheel_Size,Bikes_Material,Bikes_Brand,Bikes_Country,item_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);";
        params = [
          element.bikes_type,
          element.bikes_power,
          element.bikes_battery,
          element.bikes_weight,
          element.bikes_wheel_size,
          element.bikes_material,
          element.bikes_brand,
          element.bikes_country,
          id,
        ];
        break;

      case "Перчатки для единоборств":
        query =
          "INSERT INTO Gloves (Gloves_Type,Gloves_Size,Gloves_Material,Gloves_Brand,Gloves_Country,item_id) VALUES ($1, $2, $3, $4, $5, $6);";
        params = [
          element.gloves_type,
          element.gloves_size,
          element.gloves_material,
          element.gloves_brand,
          element.gloves_country,
          id,
        ];
        break;

      case "Мячи":
        query =
          "INSERT INTO Balls (Balls_Type,Balls_Size,Balls_Brand,Balls_Country,item_id) VALUES ($1, $2, $3, $4, $5);";

        params = [
          element.balls_type,
          Number(element.balls_size),
          element.balls_brand,
          element.balls_country,
          id,
        ];
        break;

      case "Самокаты":
        query =
          "INSERT INTO Scooters (Scooters_Type,Scooters_Weight,Scooters_Wheel_Size,Scooters_Brand,Scooters_Country,item_id) VALUES ($1, $2, $3, $4, $5, $6);";
        params = [
          element.scooters_type,
          element.scooters_weight,
          element.scooters_wheel_Size,
          element.scooters_brand,
          element.scooters_country,
          id,
        ];
        break;

      case "Защитная экипировка":
        query =
          "INSERT INTO Protective_Equipment (Protective_Equipment_Sport,Protective_Equipment_Type,Protective_Equipment_Size,Protective_Equipment_Brand,Protective_Equipment_Country,item_id) VALUES ($1, $2, $3, $4, $5, $6);";
        params = [
          element.protective_equipment_sport,
          element.protective_equipment_type,
          element.protective_equipment_size,
          element.protective_equipment_brand,
          element.protective_equipment_country,
          id,
        ];
        break;

      default:
        return res.status(400).json({ message: "Invalid category" });
    }

    await sportik.query(query, params);
    return res
      .status(200)
      .json({ message: "Characteristics added successfully" });
  } catch (error) {
    console.error("Error adding characteristics:", error);
    return res.status(500).json({ message: "Error adding characteristics" });
  }
});

export default router;
