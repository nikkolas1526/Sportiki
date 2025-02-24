import "./Paginazi.css";
import { useState, useEffect } from "react";

interface Props {
  Setpaga: (Page: number) => void;
  Paga: number;
  numberOfItems: number;
}

export default function Paginazi({ Setpaga, Paga, numberOfItems }: Props) {
  const numberOfPages = Math.ceil(numberOfItems / 20);

  const [pagaPage, setPagaPage] = useState(1);
  const pagaPages = Math.ceil(numberOfPages / 5);
  const numberOfPagesArray = new Array(numberOfPages);
  for (let i = 0; i < numberOfPages; i++) {
    numberOfPagesArray[i] = i + 1;
  }
  useEffect(() => {
    setPagaPage(Math.ceil(Paga / 5));
  }, [Paga]);

  if (numberOfPages < 5) {
    return (
      <div className="Paginazi">
        {numberOfPagesArray.slice(0, 5).map((PageNumber) => (
          <div
            id="${PageNumber}"
            key={PageNumber}
            className={Paga === PageNumber ? "PagaActive" : "Paga"}
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
      <div className="Paginazi">
        {pagaPage !== 1 && (
          <div
            className="Strelas"
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
              className={Paga === PageNumber ? "PagaActive" : "Paga"}
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
            className="Strelae"
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
