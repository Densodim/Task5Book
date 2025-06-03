import { useEffect, useState } from "react";
import type { Language } from "./booksSlice.ts";
import {
  initialBooks,
  pageView,
  selectBooks,
  selectIsLoading,
  selectHasMore,
} from "./booksSlice.ts";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import ExpandedBook from "./ExpandedBook.tsx";
import InfiniteScroll from "react-infinite-scroll-component";
import React from "react";

const TITLE = ["#", "ISBN", "Title", "Author(s)", "Publisher"];

export default function BookTable({ language }: BookTableProps) {
  const dispatch = useAppDispatch();
  const books = useAppSelector(selectBooks);
  const isLoading = useAppSelector(selectIsLoading);
  const hasMore = useAppSelector(selectHasMore);
  const [expandedBookId, setExpandedBookId] = useState<number | null>(null);

  useEffect(() => {
    dispatch(initialBooks());
  }, [language, dispatch]);

  const handleRowClick = (bookId: number) => {
    setExpandedBookId(expandedBookId === bookId ? null : bookId);
  };

  const handleLoadMoreData = () => {
    dispatch(pageView());
  };

  return (
    <InfiniteScroll
      next={handleLoadMoreData}
      hasMore={hasMore && !isLoading}
      loader={<p>Loading...</p>}
      dataLength={books.length}
      scrollThreshold="100%"
    >
      <table className="table table-hover">
        <thead>
          <tr>
            {TITLE.map((el, index) => (
              <th key={index}>{el}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <React.Fragment key={book.id}>
              <tr
                onClick={() => {
                  handleRowClick(book.id);
                }}
                className={expandedBookId === book.id ? "table-active" : ""}
                style={{ cursor: "pointer" }}
              >
                <td>{book.id}</td>
                <td>{book.isbn}</td>
                <td>{book.title}</td>
                <td>{book.authors}</td>
                <td>{book.publisher}</td>
              </tr>
              {expandedBookId === book.id && <ExpandedBook book={book} />}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </InfiniteScroll>
  );
}

//types

type BookTableProps = {
  language: Language;
};
