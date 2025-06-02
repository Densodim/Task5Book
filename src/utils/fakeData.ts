import { base, de, en, Faker, ja } from "@faker-js/faker";
import type { Language } from "../features/books/booksSlice.ts";

export type Book = {
  id: number;
  isbn: string;
  title: string;
  authors: string;
  publisher: string;
  details: string;
  img: string;
  language: Language;
  review: number;
  likes: number;
  seed: number;
};

const bookTitlesLocale = {
  en: {
    book: {
      title: [
        "The Silent Echo",
        "Beyond the Horizon",
        "Whispers of Time",
        "Eternal Dreams",
        "The Last Chapter",
      ],
    },
  },
  de: {
    book: {
      title: [
        "Das stille Echo",
        "Jenseits des Horizonts",
        "Flüstern der Zeit",
        "Ewige Träume",
        "Das letzte Kapitel",
      ],
    },
  },
  ja: {
    book: {
      title: [
        "静かな反響",
        "地平線の向こう",
        "時のささやき",
        "永遠の夢",
        "最後の章",
      ],
    },
  },
};

const languageMap = {
  en,
  de,
  ja,
} as const;

const getFaker = (language: Language) => {
  const baseLocale = languageMap[language];
  const customLocale = bookTitlesLocale[language];

  return new Faker({
    locale: [customLocale, baseLocale, base],
  });
};

export const generateBooks = (count: number, language: Language): Book[] => {
  const faker = getFaker(language);

  return Array.from({ length: count }, () => ({
    id: Number(faker.string.numeric(2)),
    isbn: faker.commerce.isbn(),
    title: faker.book.title(),
    authors: faker.person.fullName(),
    publisher: faker.company.name(),
    details: faker.lorem.paragraphs(2),
    img: faker.image.avatar(),
    language: language,
    review: Number(faker.number.float({ min: 0, max: 5, fractionDigits: 1 })),
    likes: faker.number.int({ max: 10 }),
    seed: faker.seed(Math.floor(Math.random() * 10000)),
  }));
};
