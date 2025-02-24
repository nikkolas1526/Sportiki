import "./Paginazi.css";
import { useState, useEffect } from "react";

interface Props {
  Setpaga: (Page: number) => void;
  Paga: number;
  numberOfItems: number;
}

export default function Paginazi({ Setpaga, Paga, numberOfItems }: Props) {
  const [numberOfPages, setNumberOfPages] = useState(
    Math.ceil(numberOfItems / 10)
  );
  const [pagaPages, setPagaPages] = useState(0);
  const [pagaPage, setPagaPage] = useState(1);
  const [numberOfPagesArray, seNumberOfPagesArray] = useState([]);

  useEffect(() => {
    const numberOfPagesArray2 = new Array(numberOfPages);
    for (let i = 0; i < numberOfPages; i++) {
      numberOfPagesArray2[i] = i + 1;
    }
    setPagaPages(Math.ceil(numberOfPages / 5));
    seNumberOfPagesArray(numberOfPagesArray2);
  }, [numberOfPages]);

  useEffect(() => {
    setNumberOfPages(Math.ceil(numberOfItems / 10));
    Setpaga(1);
  }, [numberOfItems]);

  useEffect(() => {
    setPagaPage(Math.ceil(Paga / 5));
  }, [Paga]);

  if (numberOfPages < 5) {
    return (
      <div className="Paginazi3">
        {numberOfPagesArray.slice(0, 10).map((PageNumber) => (
          <div
            id="${PageNumber}"
            key={PageNumber}
            className={Paga === PageNumber ? "PagaActive3" : "Paga3"}
            onClick={() => {
              Setpaga(PageNumber);
              window.scroll({ top: 0, behavior: "smooth" });
            }}
          >
            {PageNumber}
          </div>
        ))}
      </div>
    );
  } else {
    return (
      <div className="Paginazi3">
        {pagaPage !== 1 && (
          <div
            className="Strelas3"
            onClick={() => {
              setPagaPage(pagaPage - 1);
            }}
          >
            {"<"}
          </div>
        )}

        {numberOfPagesArray
          .slice((pagaPage - 1) * 5, pagaPage * 5)
          .map((PageNumber) => (
            <div
              id="${PageNumber}"
              key={PageNumber}
              className={Paga === PageNumber ? "PagaActive3" : "Paga3"}
              onClick={() => {
                Setpaga(PageNumber);
                window.scroll({ top: 0, behavior: "smooth" });
              }}
            >
              {PageNumber}
            </div>
          ))}

        {pagaPage < pagaPages && (
          <div
            className="Strelae3"
            onClick={() => {
              setPagaPage(pagaPage + 1);
            }}
          >
            {">"}
          </div>
        )}
      </div>
    );
  }
}
