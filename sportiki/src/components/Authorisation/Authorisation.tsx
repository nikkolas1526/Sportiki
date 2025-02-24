import "./Authorisation.css";
import { useRef, useState, useEffect } from "react";
import Cookies from "js-cookie";

interface Type {
  setActive: (ono: boolean) => void;
  setToken: (token: string) => void;
  setAdmin: (accountPanel: boolean) => void;
}

const Authorisation: React.FC<Type> = ({ setActive, setToken, setAdmin }) => {
  const Window = useRef<HTMLDivElement>(null);

  // Состояния для полей ввода и переключения панелей
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [REGnickname, setREGNickname] = useState("");
  const [REGpassword, setREGPassword] = useState("");
  const [REGname, setREGname] = useState("");
  const [REGsurname, setREGsurname] = useState("");
  const [REGemail, setREGemail] = useState("");
  const [registerPanel, setRegisterPanel] = useState(false);
  const [emailConfirmationSent, setEmailConfirmationSent] = useState(false);
  const [tokenFromCookies, setTokenFromCookies] = useState<string | null>(null);

  // Состояние для ошибок
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const refreshAccessToken = async () => {
      const accessToken = Cookies.get("accessToken");
      const refreshToken = Cookies.get("refreshToken");
      if (accessToken && refreshToken) {
        setTokenFromCookies(accessToken);
        setActive(false);
        fetch("http://localhost:3001/api/isAdmin", {
          method: "GET",
          headers: {
            Authorization: "Bearer " + accessToken,
            "Content-Type": "application/json",
          },
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.message === "Администратор") {
              setAdmin(true);
            }
          });
      }
    };
    refreshAccessToken();
    const intervalId = setInterval(refreshAccessToken, 1 * 5);

    return () => clearInterval(intervalId);
  }, []);

  const handleLogin = async () => {
    setError(null); // Очищаем старую ошибку
    try {
      const response = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nickname,
          password,
        }),
      });

      if (response.ok) {
        const data = await response.json();

        if (data.error === "Email not confirmed") {
          setError("Пожалуйста, подтвердите свой адрес электронной почты.");
          return;
        }

        if (data.accessToken && data.refreshToken) {
          Cookies.set("accessToken", data.accessToken, {
            secure: false,
            sameSite: "Strict",
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
            path: "/",
          });
          Cookies.set("refreshToken", data.refreshToken, {
            secure: false,
            sameSite: "Strict",
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
            path: "/",
          });
          setActive(false);
          setToken(data.accessToken);
        }
        const token = data.accessToken;
        const response2 = await fetch("http://localhost:3001/api/isAdmin", {
          method: "GET",
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        });
        const data2 = await response2.json();
        if (data2.message == "Администратор") {
          setAdmin(true);
        }
      } else {
        const errorData = await response.json();
        setError(errorData.error);
      }
    } catch (error) {
      console.error("Ошибка при входе:", error);
      setError("Ошибка при входе: " + error);
    }
  };

  const handleRegistration = async () => {
    setError(null); // Очищаем старую ошибку
    try {
      const response = await fetch("http://localhost:3001/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nickname: REGnickname,
          password: REGpassword,
          name: REGname,
          surname: REGsurname,
          email: REGemail,
        }),
      });
      if (response.ok) {
        setEmailConfirmationSent(true);
        setError(
          "Регистрация почти завершена. Пожалуйста, проверьте свою электронную почту."
        );
      } else {
        const errorData = await response.json();
        setError(errorData.error);
      }
    } catch (error) {
      console.error("Ошибка при регистрации:", error);
      setError("Ошибка при регистрации");
    }
  };

  let rendering = <></>;

  if (emailConfirmationSent) {
    rendering = (
      <div className="big">
        <div className="Window" ref={Window}>
          <div className="Close">
            <button
              onClick={() => {
                setActive(false);
                setEmailConfirmationSent(false);
              }}
            >
              X
            </button>
          </div>
          <div
            style={{
              textAlign: "center",
              backgroundColor: "#ffffff",
              color: "black",
            }}
          >
            {error && <p style={{ color: "tomato" }}>{error}</p>}
          </div>
        </div>
      </div>
    );
  } else if (!registerPanel) {
    rendering = (
      <div className="big">
        <div className="Window" id="Window" ref={Window}>
          <div className="Close">
            <button onClick={() => setActive(false)}>X</button>
          </div>
          {error && (
            <p style={{ color: "tomato", textAlign: "center", margin: "2vh" }}>
              {error}
            </p>
          )}
          <div className="Nicky">
            <div className="textik">Логин</div>
            <div className="Inputik">
              <input
                type="text"
                id="nicknameInput"
                placeholder="Введите логин"
                onChange={(e) => setNickname(e.target.value)}
              />
            </div>
          </div>

          <div className="Pass">
            <div className="textik">Пароль</div>
            <div className="Inputik">
              <input
                type="password"
                id="passwordInput"
                placeholder="Введите пароль"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="Entering">
            <button
              onClick={() => {
                handleLogin();
              }}
            >
              Войти
            </button>
          </div>
          <div className="panelChanging">
            <button
              onClick={() => {
                setRegisterPanel(true);
                setError(null); // Очищаем ошибку при переключении
              }}
            >
              Нет аккаунта? Регистрация...
            </button>
          </div>
        </div>
      </div>
    );
  } else {
    rendering = (
      <div className="big">
        <div className="Window" id="Window" ref={Window}>
          <div className="Close">
            <button onClick={() => setActive(false)}>X</button>
          </div>
          {error && (
            <p style={{ color: "tomato", textAlign: "center", margin: "2vh" }}>
              {error}
            </p>
          )}
          <div className="Nicky">
            <div className="textik">Логин</div>
            <div className="Inputik">
              <input
                type="text"
                id="nicknameInput"
                placeholder="Введите логин"
                onChange={(e) => setREGNickname(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="Email">
            <div className="textik">Почта</div>
            <div className="Inputik">
              <input
                type="email"
                id="emailInput"
                placeholder="Введите почту"
                onChange={(e) => setREGemail(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="Pass">
            <div className="textik">Пароль</div>
            <div className="Inputik">
              <input
                type="password"
                id="passwordInput"
                placeholder="Введите пароль"
                onChange={(e) => setREGPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="RegisterName">
            <div className="textik">Имя</div>
            <div className="Inputik">
              <input
                type="text"
                id="registerNameInput"
                placeholder="Введите имя"
                onChange={(e) => setREGname(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="RegisterSurname">
            <div className="textik">Фамилия</div>
            <div className="Inputik">
              <input
                type="text"
                id="registerSurnameInput"
                placeholder="Введите фамилию"
                onChange={(e) => setREGsurname(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="Registering">
            <button
              onClick={() => {
                handleRegistration();
              }}
            >
              Регистрация
            </button>
          </div>
          <div className="panelChanging">
            <button
              onClick={() => {
                setRegisterPanel(false);
                setError(null); // Очищаем ошибку при переключении
              }}
            >
              Уже есть аккаунт? Вход...
            </button>
          </div>
        </div>
      </div>
    );
  }
  if (tokenFromCookies) {
    setToken(tokenFromCookies);
    return null;
  }
  return rendering;
};
export default Authorisation;
