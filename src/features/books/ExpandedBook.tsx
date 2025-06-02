import type { Book } from "../../utils/fakeData.ts";

export default function ExpandedBook({ book }: Props) {
  return (
    <>
      <tr key={`details-${String(book.id)}`}>
        <td colSpan={5}>
          <div className="d-flex">
            <div className="me-3">
              <img
                src={book.img}
                alt={book.title}
                style={{
                  width: "150px",
                  height: "150px",
                  objectFit: "cover",
                }}
              />
            </div>
            <div>
              <h4>Details for {book.title}</h4>
              <p>{book.details}</p>
              <div className="d-flex gap-3">
                <p>Seed:{book.seed}</p>
                <p>
                  <strong>Language:</strong> {book.language.toUpperCase()}
                </p>
                <p>
                  <strong>Review:</strong> {book.review.toFixed(1)}{" "}
                  {"★".repeat(Math.round(book.review))}
                </p>
                <p>
                  <strong>Likes:</strong> ❤️ {book.likes}
                </p>
              </div>
            </div>
          </div>
        </td>
      </tr>
    </>
  );
}

//types
type Props = {
  book: Book;
};
