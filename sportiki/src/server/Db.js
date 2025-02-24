import Pg from "pg";

const { Pool } = Pg;
const sportik = new Pool({
  host: "localhost",
  port: 5432,
  password: "1",
  database: "sportiki",
  user: "postgres",
});

sportik
  .connect()
  .then(() => {
    console.log("Подключено");
  })
  .catch((err) => {
    console.log("Ошибка подключения к БД", err);
  });

export default sportik;
