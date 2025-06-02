import BookTable from "./BookTable.tsx";
import type { Language } from "./booksSlice.ts";
import {
  choosingLanguage,
  filterLikes,
  filterReview,
  filterSeed,
  selectLanguage,
  selectLikes,
  selectReview,
  selectSeed,
} from "./booksSlice.ts";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import BookInput from "./BookInput.tsx";
import type { ChangeEvent } from "react";

const LANGUAGES: { value: Language; label: string }[] = [
  { value: "en", label: "English (US)" },
  { value: "de", label: "German (DE)" },
  { value: "ja", label: "Japanese (JP)" },
];

export default function Books() {
  const dispatch = useAppDispatch();
  const selectedLanguage = useAppSelector(selectLanguage);
  const seedValue = useAppSelector(selectSeed);
  const likes = useAppSelector(selectLikes);
  const review = useAppSelector(selectReview);

  const handleSeedChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value === "" ? 0 : Number(event.target.value);
    dispatch(filterSeed(value));
  };

  const handleLanguageChange = (event: ChangeEvent<HTMLSelectElement>) => {
    dispatch(choosingLanguage(event.target.value as Language));
  };

  const handleLikesChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(filterLikes(Number(event.target.value)));
  };

  const handleReviewChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(filterReview(Number(event.target.value)));
  };

  return (
    <div className="container">
      <div className="row mb-4 align-items-center">
        <div className="col">
          <label htmlFor="selectedLanguage">Language</label>
          <select
            id="selectedLanguage"
            className="form-select"
            value={selectedLanguage}
            onChange={handleLanguageChange}
          >
            {LANGUAGES.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
        <BookInput
          value={seedValue}
          onChange={handleSeedChange}
          type={"number"}
          className={"form-control"}
          text={"Seed"}
        />
        <BookInput
          value={likes}
          onChange={handleLikesChange}
          type={"range"}
          className={"form-range"}
          text={`likes ${likes.toFixed(1)}`}
          props={{ step: "0.1", min: "0", max: "10" }}
        />
        <BookInput
          value={review}
          onChange={handleReviewChange}
          type={"number"}
          className={"form-control"}
          text={"Review"}
          props={{ step: "0.1", min: "0", max: "5" }}
        />
      </div>

      <div className="row mb-4">
        <div className="col-12">
          <h3>Book Table</h3>
          <BookTable language={selectedLanguage} />
        </div>
      </div>
    </div>
  );
}
