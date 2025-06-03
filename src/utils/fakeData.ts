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

const languageMap = {
  en,
  de,
  ja,
} as const;

const getFaker = (language: Language) => {
  const baseLocale = languageMap[language];
  return new Faker({
    locale: [baseLocale, base],
  });
};

export const generateBooks = (
  count: number,
  language: Language,
  seedValue?: number
): Book[] => {
  const faker = getFaker(language);
  const seed = seedValue ?? Math.floor(Math.random() * 10000);
  faker.seed(seed);

  return Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    isbn: faker.commerce.isbn(),
    title: faker.helpers.arrayElement([
      faker.lorem.words({ min: 2, max: 5 }),
      faker.lorem.words({ min: 3, max: 6 }),
      faker.helpers.fake("{{lorem.words(2,4)}} - {{lorem.word}}"),
    ]),
    authors: faker.person.fullName(),
    publisher: faker.company.name(),
    details: faker.lorem.paragraphs(2),
    img: faker.image.avatar(),
    language: language,
    review: Number(faker.number.float({ min: 0, max: 5, fractionDigits: 1 })),
    likes: faker.number.int({ max: 10 }),
    seed,
  }));
};
