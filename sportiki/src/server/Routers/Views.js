import { Router } from "express";
import sportik from "../Db.js";

const router = Router();
router.get("/Views", async (req, res) => {
  const number = req.query.id;
  const result = await sportik.query("SELECT * from views where item_id =$1;", [
    number,
  ]);

  res.json(result.rows);
});

router.post("/answerView", async (req, res) => {
  let ion = req.body.viewed_account_id;
  let ion2 = req.body.item_id;
  let ion3 = req.body.answer;
  const result = await sportik.query(
    "UPDATE Views set answer =$3 where viewed_account_id=$1 and item_id=$2;",
    [ion, ion2, ion3]
  );
  res.status(200);
});
router.post("/deleteAnswerView", async (req, res) => {
  let ion = req.body.viewed_account_id;
  let ion2 = req.body.item_id;
  const result = await sportik.query(
    "UPDATE Views set answer =null where viewed_account_id=$1 and item_id=$2;",
    [ion, ion2]
  );
  res.status(200);
});
router.post("/deleteView", async (req, res) => {
  let ion = req.body.viewed_account_id;
  let ion2 = req.body.item_id;
  const result = await sportik.query(
    "delete from Views where viewed_account_id=$1 and item_id=$2;",
    [ion, ion2]
  );
  res.status(200);
});
router.post("/BanAndDeleteView", async (req, res) => {
  let ion = req.body.viewed_account_id;
  let ion2 = req.body.item_id;
  await sportik.query(
    "delete from Views where viewed_account_id=$1 and item_id=$2;",
    [ion, ion2]
  );
  await sportik.query("UPDATE ACCOUNTS SET BAN=TRUE WHERE ID=$1", [ion]);
  res.status(200);
});

router.post("/AddView", async (req, res) => {
  const item_id = req.body.item_id;
  const viewed_account_id = req.body.viewed_account_id;
  const rate = req.body.rate;
  const viewtext = req.body.viewtext;

  const result = await sportik.query(
    "INSERT INTO views (item_id, viewed_account_id,rate,viewtext) VALUES ($1, $2,$3,$4);",
    [item_id, viewed_account_id, rate, viewtext]
  );
  return res.json("View added");
});
router.post("/EditView", async (req, res) => {
  const item_id = req.body.item_id;
  const viewed_account_id = req.body.viewed_account_id;
  const rate = req.body.rate;
  const viewtext = req.body.viewtext;

  const result = await sportik.query(
    "UPDATE views SET rate = $3, viewtext = $4 WHERE item_id = $1 and viewed_account_id = $2;",
    [item_id, viewed_account_id, rate, viewtext]
  );
  return res.json("View added");
});
router.post("/DeleteView", async (req, res) => {
  const item_id = req.body.item_id;
  const viewed_account_id = req.body.viewed_account_id;

  const result = await sportik.query(
    "DELETE FROM views WHERE ITEM_ID=$1 AND VIEWED_ACCOUNT_ID= $2);",
    [item_id, viewed_account_id]
  );
  return res.json("View added");
});

router.get("/getName", async (req, res) => {
  let ion = req.query.id;
  const result = await sportik.query("select name from accounts where id=$1;", [
    ion,
  ]);
  res.json(result.rows);
});
export default router;
