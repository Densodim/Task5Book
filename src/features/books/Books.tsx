import BookTable from "./BookTable.tsx";
import type { Language } from "./booksSlice.ts";
import {
  choosingLanguage,
  filterValue,
  setSeed,
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

type FilterType = "likes" | "review";

const parseInputValue = (value: string): number => {
  return value === "" ? 0 : Number(value);
};

export default function Books() {
  const dispatch = useAppDispatch();
  const selectedLanguage = useAppSelector(selectLanguage);
  const seedValue = useAppSelector(selectSeed);
  const likes = useAppSelector(selectLikes);
  const review = useAppSelector(selectReview);

  const handleFilterChange = (type: FilterType) => (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    dispatch(filterValue({ type, value: parseInputValue(event.target.value) }));
  };

  const handleSeedChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSeed(parseInputValue(event.target.value)));
  };

  const handleLanguageChange = (event: ChangeEvent<HTMLSelectElement>) => {
    dispatch(choosingLanguage(event.target.value as Language));
  };

  return (
    <div className="container-fluid">
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
          onChange={handleFilterChange("likes")}
          type={"range"}
          className={"form-range"}
          text={`likes ${likes.toFixed(1)}`}
          props={{ step: "0.1", min: "0", max: "10" }}
        />
        <BookInput
          value={review}
          onChange={handleFilterChange("review")}
          type={"number"}
          className={"form-control"}
          text={"Review"}
          props={{ step: "0.1", min: "0", max: "5" }}
        />
      </div>

      <div className="row mb-4 gx-0">
        <div className="col-12 px-0">
          <h3>Book Table</h3>
          <BookTable language={selectedLanguage} />
        </div>
      </div>
    </div>
  );
}
