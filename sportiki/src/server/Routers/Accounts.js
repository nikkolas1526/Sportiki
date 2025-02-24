import { Router } from "express";
import sportik from "../Db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "sportiki.official@gmail.com",
    pass: "muep qitv hkpg aacu",
  },
});
const router = Router();

router.post("/updateAccount", async (req, res) => {
  const Token = req.headers.authorization;
  const accessToken = Token.substring(7);
  const { nickname, password, name, surname, email } = req.body;
  if (!accessToken) {
    return res.status(400).json({ error: "Нет токена" });
  }
  try {
    const userToken = jwt.verify(accessToken, "secretKey");
    const user = await sportik.query("SELECT * FROM ACCOUNTS WHERE id = $1", [
      userToken.userId,
    ]);
    if (nickname) {
      const existingUser = await sportik.query(
        "SELECT * FROM Accounts WHERE Nickname = $1",
        [nickname]
      );

      if (
        existingUser.rows.length > 0 &&
        existingUser.rows[0].id != user.rows[0].id
      ) {
        return res
          .status(400)
          .json({ error: "Пользователь с таким ником уже существует." });
      } else {
        await sportik.query("UPDATE Accounts SET Nickname = $1 WHERE id = $2", [
          nickname,
          userToken.userId,
        ]);
      }
    }
    if (password) {
      if (password.length < 4) {
        return res
          .status(400)
          .json({ error: "Пароль должен быть не меньше 4 символов." });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      await sportik.query("UPDATE Accounts SET Password = $1 WHERE id = $2", [
        hashedPassword,
        userToken.userId,
      ]);
    }
    if (name) {
      await sportik.query("UPDATE Accounts SET Name = $1 WHERE id = $2", [
        name,
        userToken.userId,
      ]);
    }
    if (surname) {
      await sportik.query("UPDATE Accounts SET Surname = $1 WHERE id = $2", [
        surname,
        userToken.userId,
      ]);
    }
    if (email && email !== user.rows[0].email) {
      const existingEmail = await sportik.query(
        "SELECT * FROM Accounts WHERE email = $1",
        [email]
      );

      if (existingEmail.rows.length > 0) {
        return res
          .status(400)
          .json({ error: "Пользователь с такой почтой уже существует." });
      }
      const confirmationToken = uuidv4();
      await sportik.query(
        "UPDATE Accounts SET newEmail = $1, ConfirmationToken = $2 WHERE id = $3",
        [email, confirmationToken, userToken.userId]
      );
      await sendConfirmationEmail(email, confirmationToken);
    }
    res.status(200).json({ message: "ok" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Ошибка при обновлении данных" });
  }
});

const sendConfirmationEmail = async (email, confirmationToken) => {
  const confirmationUrl = `http://localhost:3001/api/confirm-email/${confirmationToken}`;

  const mailOptions = {
    from: "sportiki.official@gmail.com",
    to: email,
    subject: "Подтверждение электронной почты",
    html: `
          <p>Пожалуйста, перейдите по следующей ссылке, чтобы подтвердить свой адрес электронной почты:</p>
          <a href="${confirmationUrl}">http://localhost:3001/api/confirm-email</a>
          `,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Ошибка при отправке письма:", error);
    throw new Error("Не удалось отправить письмо для подтверждения.");
  }
};

// Маршрут регистрации
router.post("/register", async (req, res) => {
  const { nickname, password, name, surname, email } = req.body;

  if (!nickname || !password || !name || !surname || !email) {
    return res
      .status(400)
      .json({ error: "Необходимо заполнить все обязательные поля." });
  }

  if (password.length < 4) {
    return res
      .status(400)
      .json({ error: "Пароль должен быть не меньше 4 символов." });
  }
  const existingUser = await sportik.query(
    "SELECT * FROM Accounts WHERE Nickname = $1",
    [nickname]
  );

  if (existingUser.rows.length > 0) {
    return res
      .status(400)
      .json({ error: "Пользователь с таким ником уже существует." });
  }
  const existingEmail = await sportik.query(
    "SELECT * FROM Accounts WHERE email = $1",
    [email]
  );

  if (existingEmail.rows.length > 0) {
    return res
      .status(400)
      .json({ error: "Пользователь с такой почтой уже существует." });
  }
  try {
    const confirmationToken = uuidv4();
    const hashedPassword = await bcrypt.hash(password, 10);

    await sportik.query(
      "INSERT INTO Accounts (Nickname, Password, Name, Surname, Administrator, Email, ConfirmationToken, IsConfirmed) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
      [
        nickname,
        hashedPassword,
        name,
        surname,
        false,
        email,
        confirmationToken,
        false,
      ]
    );
    await sendConfirmationEmail(email, confirmationToken);
    res.status(200).json({ message: "ok" });
  } catch (error) {
    console.error("Ошибка при регистрации:", error);
    res.status(500).json({ error: "Ошибка при регистрации." });
  }
});
// Маршрут подтверждения почты
router.get("/confirm-email/:token", async (req, res) => {
  const { token } = req.params;

  try {
    const user = await sportik.query(
      "SELECT * FROM Accounts WHERE ConfirmationToken = $1",
      [token]
    );
    if (user.rows.length === 0) {
      return res.status(400).json({ error: "Неверный токен подтверждения." });
    }

    console.log(user.rows[0].newemail);
    console.log(user.rows[0].newemail);
    console.log(user.rows[0].newemail);
    if (user.rows[0].newemail == null) {
      await sportik.query(
        "UPDATE Accounts SET IsConfirmed = $1, ConfirmationToken = $2 WHERE ConfirmationToken = $3",
        [true, null, token]
      );
    }
    if (user.rows[0].newemail !== null) {
      await sportik.query(
        "UPDATE Accounts SET IsConfirmed = $1, ConfirmationToken = $2, newemail=null ,email=$4 WHERE ConfirmationToken = $3",
        [true, null, token, user.rows[0].newemail]
      );
    }

    // Генерируем токен авторизации
    const accessToken = jwt.sign(
      {
        userId: user.rows[0].id,
        nickname: user.rows[0].nickname,
        admin: user.rows[0].administrator,
      },
      "secretKey",
      { expiresIn: "1d" }
    );

    const refreshToken = jwt.sign({ userId: user.rows[0].id }, "refreshKey", {
      expiresIn: "1d",
    });

    res.cookie("accessToken", accessToken, {
      secure: false,
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      sameSite: "Strict",

      path: "/",
    });

    res.cookie("refreshToken", refreshToken, {
      secure: false,
      sameSite: "Strict",
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      path: "/",
    });

    res.sendFile(path.join(__dirname, "../confirmation.html"));
  } catch (error) {
    console.error("Ошибка при подтверждении почты:", error);
    res.status(500).json({ error: "Ошибка при подтверждении почты." });
  }
});

// Маршрут входа
router.post("/login", async (req, res) => {
  const { nickname, password } = req.body;

  if (!nickname || !password) {
    return res.status(400).json({ error: "Необходимо ввести логин и пароль." });
  }

  try {
    const user = await sportik.query(
      "SELECT * FROM Accounts WHERE Nickname = $1",
      [nickname]
    );

    if (user.rows.length === 0) {
      return res.status(400).json({ error: "Неверный логин или пароль." });
    }

    const passwordMatch = await bcrypt.compare(password, user.rows[0].password);
    if (!passwordMatch) {
      return res.status(400).json({ error: "Неверный логин или пароль." });
    }
    if (user.rows[0].ban == true) {
      return res.status(400).json({ error: "Ваш аккаунт был заблокирован" });
    }
    if (!user.rows[0].isconfirmed) {
      return res.status(400).json({ error: "Email not confirmed" });
    }
    const accessToken = jwt.sign(
      {
        userId: user.rows[0].id,
        nickname: user.rows[0].nickname,
        admin: user.rows[0].administrator,
      },
      "secretKey",
      { expiresIn: "1d" }
    );

    const refreshToken = jwt.sign({ userId: user.rows[0].id }, "refreshKey", {
      expiresIn: "1d",
    });

    res.status(200).json({ accessToken, refreshToken });
  } catch (error) {
    console.error("Ошибка при входе:", error);
    res.status(500).json({ error: "Ошибка при входе." });
  }
});

router.get("/isAdmin", async (req, res) => {
  try {
    const accToken = req.headers.authorization;
    const Token = accToken.substring(7);

    const verified = jwt.verify(Token, "secretKey");
    const Admin = verified.admin;
    if (Admin) {
      console.log("Администратор");
      return res.status(200).json({ message: "Администратор" });
    } else {
      console.log("Не Администратор");
      return res.status(200).json({ message: "Не администратор" });
    }
  } catch (error) {
    console.log("Ошибка");
    return res.status(400).json(error);
  }
});

router.post("/token", async (req, res) => {
  let { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(400).json({ error: "Требуется refresh token" });
  }
  try {
    const decoded = jwt.verify(refreshToken, "refreshKey");
    const userId = decoded.userId;
    const user = await sportik.query("SELECT * FROM Accounts WHERE Id = $1", [
      userId,
    ]);
    if (user.rows.length === 0) {
      return res.status(400).json({ error: "Пользователь не найден" });
    }
    console.log(user.rows[0].ban);
    if (user.rows[0].ban == true) {
      return res.status(400).json("Тебя забанили");
    }
    const accessToken = jwt.sign(
      {
        userId: user.rows[0].id,
        nickname: user.rows[0].nickname,
        admin: user.rows[0].administrator,
      },
      "secretKey",
      { expiresIn: "1d" }
    );
    refreshToken = jwt.sign({ userId: user.rows[0].id }, "refreshKey", {
      expiresIn: "1d",
    });
    const administrator = user.rows[0].administrator;
    console.log(accessToken);
    res.status(200).json({ accessToken, refreshToken, administrator });
  } catch (error) {
    console.error("Ошибка обновления токена", error);
    return res.status(403).json({ error: "Неверный токен" });
  }
});

router.post("/getInfoAccount", async (req, res) => {
  let Token = req.headers.authorization;
  const accessToken = Token.substring(7);
  if (!accessToken) {
    return res.status(400).json({ error: "Нет токена" });
  }
  try {
    const userToken = jwt.verify(accessToken, "secretKey");
    const user = await sportik.query("SELECT * FROM ACCOUNTS WHERE id = $1", [
      userToken.userId,
    ]);
    res.status(200).json(user.rows[0]);
  } catch (Error) {
    console.log(Error);
  }
});

export default router;
