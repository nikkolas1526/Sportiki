import "./Paginazi.css";
import { useState, useEffect, useRef } from "react";

interface Props {
  Setpaga: (Page: number) => void;
  Paga: number;
  numberOfItems: number;
  scrollableContainerRef: React.RefObject<HTMLDivElement>;
}

export default function Paginazi({
  Setpaga,
  Paga,
  numberOfItems,
  scrollableContainerRef,
}: Props) {
  const [numberOfPages, setNumberOfPages] = useState(
    Math.ceil(numberOfItems / 10)
  );
  const [pagaPages, setPagaPages] = useState(Math.ceil(numberOfPages / 10));
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
    setPagaPages(Math.ceil(numberOfPages / 5));
  }, [numberOfItems]);

  useEffect(() => {
    setPagaPage(Math.ceil(Paga / 5));
  }, [Paga]);

  const scrollToTop = () => {
    if (scrollableContainerRef.current) {
      scrollableContainerRef.current.scrollTo({
        top: 750,
        behavior: "smooth",
      });
    }
  };

  if (numberOfPages < 5) {
    return (
      <div className="Paginazi2">
        {numberOfPagesArray.slice(0, 10).map((PageNumber) => (
          <div
            id="${PageNumber}"
            key={PageNumber}
            className={Paga === PageNumber ? "PagaActive2" : "Paga2"}
            onClick={() => {
              Setpaga(PageNumber);
              scrollToTop();
            }}
          >
            {PageNumber}
          </div>
        ))}
      </div>
    );
  } else {
    return (
      <div className="Paginazi2">
        {pagaPage !== 1 && (
          <div
            className="Strelas2"
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
              className={Paga === PageNumber ? "PagaActive2" : "Paga2"}
              onClick={() => {
                Setpaga(PageNumber);
                scrollToTop();
              }}
            >
              {PageNumber}
            </div>
          ))}

        {pagaPage < pagaPages && (
          <div
            className="Strelae2"
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
