import { Product, Views } from "../Interfaces/Interfaces";
import star from "../../../Images/star.png";
import star2 from "../../../Images/starGray.png";

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
  const [Acc, setAcc] = useState<number | null>(null);
  const [isViewed, setIsViewed] = useState(false);
  const [myView, setMyView] = useState<Views>({
    viewed_account_id: 0,
    item_id: 0,
    rate: 1,
    viewtext: "",
    namee: "",
    answer: null,
  });

  const [viewingPanel, setViewingPanel] = useState(false);
  const [changingViewPanel, setChangingViewPanel] = useState(false);

  useEffect(() => {
    const gettingInfo = async () => {
      await getAccountInfo();
    };

    console.log(views);
    gettingInfo();
    if (views.filter((view) => view.viewed_account_id == Acc).length > 0) {
      setIsViewed(true);
      console.log(
        "YES " +
          JSON.stringify(views.filter((view) => view.viewed_account_id == Acc))
      );
      const viewMine = views.filter((view) => view.viewed_account_id == Acc);
      setMyView(viewMine[0]);
    } else {
      console.log(
        "NO " +
          JSON.stringify(views.filter((view) => view.viewed_account_id == Acc))
      );
      setIsViewed(false);
    }
  }, [views]);

  useEffect(() => {
    setMyView((prevMyView) => ({
      ...prevMyView,
      item_id: Item[0].id,
    }));
  }, [Item]);
  async function getAccountInfo() {
    const token = Cookies.get("accessToken");
    if (token) {
      try {
        const response = await Ax.post(
          "http://localhost:3001/api/getInfoAccount",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          setAcc(response.data.id);

          setMyView((prevMyView) => ({
            ...prevMyView,
            viewed_account_id: response.data.id,
          }));
          return response.data.id;
        } else {
          throw new Error(
            `Ошибка при получении данных: Статус ${response.status}`
          );
        }
      } catch (error) {
        console.error("Ошибка Axios при получении данных аккаунта:", error);
        throw error;
      }
    } else {
      setAcc(null);
    }
  }
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMyView((prevMyView) => ({
      ...prevMyView,
      viewtext: e.target.value,
    }));
  };

  const handleStarClick = (rating: number) => {
    setMyView((prevMyView) => ({
      ...prevMyView,
      rate: rating,
    }));
  };

  return (
    <div className="DownViews">
      {isViewed || viewingPanel ? (
        <>
          {" "}
          <div className="myView" key={myView?.viewed_account_id}>
            <div className="namePLUSrate">
              <div className="NameView"> Мой отзыв</div>
              <div className="stars">
                {" "}
                {!viewingPanel && !changingViewPanel
                  ? Array.from({ length: 5 }, (_, index) => (
                      <img
                        key={index}
                        src={index < myView.rate ? star : star2}
                        className="star3"
                      />
                    ))
                  : Array.from({ length: 5 }, (_, index) => (
                      <img
                        key={index}
                        src={index < myView.rate ? star : star2}
                        className="star3"
                        onClick={() => handleStarClick(index + 1)}
                        style={{ cursor: "pointer" }}
                      />
                    ))}
              </div>
            </div>
            <div>
              {changingViewPanel || viewingPanel ? (
                <textarea
                  className="Redacting"
                  value={myView.viewtext}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                ></textarea>
              ) : (
                myView?.viewtext
              )}
            </div>
            {myView?.answer != null && !viewingPanel ? (
              <div className="answer">
                <div className="NameAdmin">Ответ от администрации Sportiki</div>
                <textarea value={myView.answer} />
              </div>
            ) : null}

            <div className="ViewsButtons">
              {!viewingPanel && isViewed && !changingViewPanel ? (
                <button
                  className="Green"
                  onClick={() => {
                    setChangingViewPanel(true);
                  }}
                >
                  Изменить
                </button>
              ) : null}
              {viewingPanel || changingViewPanel ? (
                <button
                  className="Green"
                  onClick={async () => {
                    setIsViewed(true);

                    if (changingViewPanel) {
                      setChangingViewPanel(false);
                      await Ax.post("http://localhost:3001/api/EditView", {
                        rate: myView.rate,
                        viewtext: myView.viewtext,
                        item_id: myView.item_id,
                        viewed_account_id: myView.viewed_account_id,
                      });
                    }
                    if (viewingPanel) {
                      setViewingPanel(false);
                      await Ax.post("http://localhost:3001/api/AddView", {
                        rate: myView.rate,
                        viewtext: myView.viewtext,
                        item_id: myView.item_id,
                        viewed_account_id: myView.viewed_account_id,
                      });
                    }
                  }}
                >
                  Сохранить
                </button>
              ) : null}
              {!viewingPanel && !changingViewPanel ? (
                <button
                  className="Red"
                  onClick={async () => {
                    setIsViewed(false);
                    setMyView((prevMyView) => ({
                      ...prevMyView,
                      rate: 1,
                      viewtext: "",
                    }));
                    await Ax.post("http://localhost:3001/api/DeleteView", {
                      item_id: myView.item_id,
                      viewed_account_id: myView.viewed_account_id,
                    });
                  }}
                >
                  Удалить
                </button>
              ) : null}
              {viewingPanel || changingViewPanel ? (
                <button
                  className="Red"
                  onClick={() => {
                    setViewingPanel(false);
                    setChangingViewPanel(false);
                  }}
                >
                  Отменить
                </button>
              ) : null}
            </div>
          </div>{" "}
        </>
      ) : !viewingPanel && Acc != null ? (
        <div className="ViewsButtons">
          {" "}
          <button
            className="Blue"
            onClick={() => {
              setViewingPanel(true);
            }}
          >
            Оставить отзыв
          </button>{" "}
        </div>
      ) : null}{" "}
      {views.filter((item) => item.viewed_account_id != Acc).length > 0
        ? views
            ?.filter((item) => item.viewed_account_id != Acc)
            .slice(Paga * 10 - 10, 10 * Paga)
            .map((view) => (
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
                      <textarea value={view.answer} />
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
