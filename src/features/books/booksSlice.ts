import { createAppSlice } from "../../app/createAppSlice.ts";
import type { Book } from "../../utils/fakeData.ts";
import { generateBooks } from "../../utils/fakeData.ts";
import type { PayloadAction } from "@reduxjs/toolkit";

const MAX_BOOKS = 5000;
const BOOKS_PER_PAGE = 20;

const initialState: BooksSliceState = {
  language: "en",
  status: "idle",
  seed: 0,
  likes: 0,
  review: 0,
  books: [],
  allBooks: [],
  page: BOOKS_PER_PAGE,
  isLoading: false,
  hasMore: true,
};

type FilterFunction = (book: Book) => boolean;

const createFilter = (
  type: keyof BooksSliceState,
  value: number
): FilterFunction | null => {
  switch (type) {
    case "seed":
      return value !== 0
        ? (book) => String(book.seed).includes(String(value))
        : null;
    case "likes":
      if (value === 0) return null;
      return (book) => book.likes > 0 && Math.random() < value / 10;
    case "review":
      if (value === 0) return null;
      return (book) => book.review > 0 && Math.random() < value;
    default:
      return null;
  }
};

const createFilters = (filters: Partial<BooksSliceState>): FilterFunction[] => {
  return Object.entries(filters)
    .map(([key, value]) =>
      createFilter(key as keyof BooksSliceState, value as number)
    )
    .filter((filter): filter is FilterFunction => filter !== null);
};

const applyFilters = (
  books: Book[],
  filters: Partial<BooksSliceState>
): Book[] => {
  const filterFunctions = createFilters(filters);
  return books.filter((book) =>
    filterFunctions.every((filter) => filter(book))
  );
};

const applyFiltersToState = (state: BooksSliceState) => {
  state.books = applyFilters(state.allBooks, {
    seed: state.seed,
    likes: state.likes,
    review: state.review,
  });
};

export const booksSlice = createAppSlice({
  name: "books",
  initialState,
  reducers: (create) => ({
    pageView: create.reducer((state) => {
      if (!state.isLoading && state.hasMore) {
        state.isLoading = true;
        state.page += BOOKS_PER_PAGE;
        const newBooks = generateBooks(state.page, state.language);
        state.allBooks = newBooks;
        applyFiltersToState(state);
        state.hasMore = state.books.length < MAX_BOOKS;
        state.isLoading = false;
      }
    }),
    initialBooks: create.reducer((state) => {
      state.page = BOOKS_PER_PAGE;
      state.isLoading = false;
      state.hasMore = true;
      const books = generateBooks(state.page, state.language);
      state.allBooks = books;
      state.books = books;
    }),
    choosingLanguage: create.reducer(
      (state, action: PayloadAction<Language>) => {
        state.language = action.payload;
        state.page = BOOKS_PER_PAGE;
        state.isLoading = false;
        state.hasMore = true;
        const books = generateBooks(state.page, action.payload);
        state.allBooks = books;
        state.books = applyFilters(books, { seed: state.seed });
        state.seed = 0;
        state.likes = 0;
        state.review = 0;
      }
    ),
    filterSeed: create.reducer((state, action: PayloadAction<number>) => {
      state.seed = action.payload;
      applyFiltersToState(state);
    }),
    filterLikes: create.reducer((state, action: PayloadAction<number>) => {
      state.likes = Number(action.payload);
      applyFiltersToState(state);
    }),
    filterReview: create.reducer((state, action: PayloadAction<number>) => {
      state.review = action.payload;
      applyFiltersToState(state);
    }),
  }),
  selectors: {
    selectLanguage: (books) => books.language,
    selectSeed: (books) => books.seed,
    selectStatus: (books) => books.status,
    selectLikes: (books) => books.likes,
    selectReview: (books) => books.review,
    selectBooks: (books) => books.books,
    selectPage: (books) => books.page,
    selectIsLoading: (books) => books.isLoading,
    selectHasMore: (books) => books.hasMore,
  },
});

export const {
  selectLanguage,
  selectBooks,
  selectReview,
  selectLikes,
  selectSeed,
  selectStatus,
  selectPage,
  selectIsLoading,
  selectHasMore,
} = booksSlice.selectors;

export const {
  choosingLanguage,
  initialBooks,
  filterSeed,
  filterLikes,
  filterReview,
  pageView,
} = booksSlice.actions;

//types
export type BooksSliceState = {
  language: Language;
  seed: number;
  likes: number;
  review: number;
  status: "idle" | "loading" | "failed";
  books: Book[];
  allBooks: Book[];
  page: number;
  isLoading: boolean;
  hasMore: boolean;
};

export type Language = "en" | "de" | "ja";
