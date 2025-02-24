import { Product, Views } from "../Interfaces/Interfaces";
import star from "../../../Images/star.png";
import { handleBan, handleDelete } from "../Functions/Functions";
import PaginaziViews from "../Paginazi/Paginazi";
import { useEffect, useState } from "react";
import Ax from "axios";
import Cookies from "js-cookie";
interface DownViewsProps {
  Item: Product[];
  views: Views[];
  admin: boolean;
  Paga: number;
  setViews: (views: Views[]) => void;
  numberOfItems: number;
  Setpaga: (Paga: number) => void;
  scrollableContainerRef: React.RefObject<HTMLDivElement>;
}

export default function DownViews({
  Item,
  views,
  Paga,
  admin,
  setViews,
  numberOfItems,
  Setpaga,
  scrollableContainerRef,
}: DownViewsProps) {
  const [answerAdminPanel, setAnswerAdminPanel] = useState(0);
  const [imputAnswer, setInputAnswer] = useState("");

  const answer = async (view: Views) => {
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
      setViews(
        views.map((item) => {
          if (item.viewed_account_id === view.viewed_account_id) {
            return { ...item, answer: imputAnswer };
          }
          return item;
        })
      );

      await Ax.post("http://localhost:3001/api/answerView", {
        answer: imputAnswer,
        viewed_account_id: view.viewed_account_id,
        item_id: view.item_id,
      });
    }
  };

  useEffect(() => {
    answerAdminPanel;
  }, [answerAdminPanel]);

  const deleteAnswer = async (view: Views) => {
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
      setViews(
        views.map((item) => {
          if (item.viewed_account_id === view.viewed_account_id) {
            return { ...item, answer: null };
          }
          return item;
        })
      );

      await Ax.post("http://localhost:3001/api/deleteAnswerView", {
        viewed_account_id: view.viewed_account_id,
        item_id: view.item_id,
      });
    }
  };
  const handleAnswerChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setInputAnswer(value);
  };

  useEffect(() => {
    views;
  }, [views]);

  return (
    <div className="DownViews">
      {views.length > 0
        ? views?.slice(Paga * 10 - 10, 10 * Paga).map((view) => (
            <>
              {" "}
              <div className="View" key={view.viewed_account_id}>
                <div className="namePLUSrate">
                  <div className="NameView">{view.namee} </div>
                  <div className="stars">
                    {" "}
                    {Array.from({ length: view.rate }, (_, index) => (
                      <img key={index} src={star} className="star3" />
                    ))}
                  </div>
                </div>
                <div>{view.viewtext}</div>
                {view.answer != null ? (
                  <div className="answer">
                    <div className="NameAdmin">
                      Ответ от администрации Sportiki
                    </div>
                    <textarea
                      value={
                        answerAdminPanel == view.viewed_account_id
                          ? imputAnswer
                          : view.answer
                      }
                      onChange={(e) => {
                        handleAnswerChange(e);
                      }}
                    />
                  </div>
                ) : null}

                {answerAdminPanel == view.viewed_account_id &&
                view.answer == null ? (
                  <div className="answer">
                    <div className="NameAdmin">
                      Ответ от администрации Sportiki
                    </div>
                    <textarea
                      value={imputAnswer}
                      onChange={(e) => {
                        handleAnswerChange(e);
                      }}
                    />
                  </div>
                ) : null}
                {admin ? (
                  <div className="ViewsButtons">
                    {answerAdminPanel == view.viewed_account_id ? (
                      <>
                        {" "}
                        <button
                          className="answerAdmin"
                          onClick={() => {
                            answer(view);
                            setAnswerAdminPanel(0);
                            setInputAnswer("");
                          }}
                        >
                          Сохранить
                        </button>{" "}
                        <button
                          className="answerAdminClose"
                          onClick={() => {
                            setAnswerAdminPanel(0);
                            setInputAnswer("");
                          }}
                        >
                          Отменить
                        </button>
                      </>
                    ) : null}
                    {view.answer == null &&
                    answerAdminPanel !== view.viewed_account_id ? (
                      <button
                        className="answerAdmin"
                        onClick={() => {
                          setAnswerAdminPanel(view.viewed_account_id);
                        }}
                      >
                        Ответить
                      </button>
                    ) : null}

                    {view.answer !== null &&
                    answerAdminPanel !== view.viewed_account_id ? (
                      <>
                        {" "}
                        <button
                          className="answerAdmin"
                          onClick={() => {
                            deleteAnswer(view);
                            setInputAnswer("");
                            setAnswerAdminPanel(0);
                          }}
                        >
                          Удалить ответ
                        </button>{" "}
                        <button
                          className="answerAdmin"
                          onClick={() => {
                            setAnswerAdminPanel(view.viewed_account_id);
                            setInputAnswer(view?.answer);
                          }}
                        >
                          Изменить ответ
                        </button>
                      </>
                    ) : null}

                    <button
                      className="deleteViewButton"
                      onClick={() => {
                        handleDelete(
                          view.viewed_account_id,
                          views,
                          Item,
                          setViews
                        );
                      }}
                    >
                      Удалить отзыв
                    </button>
                    <button
                      className="banViewButton"
                      onClick={() => {
                        handleBan(
                          view.viewed_account_id,
                          views,
                          Item,
                          setViews
                        );
                      }}
                    >
                      Забанить
                    </button>
                  </div>
                ) : null}
              </div>{" "}
            </>
          ))
        : "Оценок нет"}{" "}
      {views.length > 0 ? (
        <PaginaziViews
          Paga={Paga}
          scrollableContainerRef={scrollableContainerRef}
          Setpaga={Setpaga}
          numberOfItems={numberOfItems}
        />
      ) : null}
    </div>
  );
}
