// A mocked database with mock user data which provides basic information about user and their preferences
import { User, Book } from "./types";

const books: Book[] = [
  {
    title: "The Sound of Silence",
    author: "Paul Harmony",
    genre: "Music Biography",
    year: 1995,
    topics: ["Music"],
  },
  {
    title: "Wanderlust Diaries",
    author: "Elena Horizon",
    genre: "Travel Memoir",
    year: 2012,
    topics: ["Travel"],
  },
  {
    title: "Culinary Delights",
    author: "Gordon Savoury",
    genre: "Cookbook",
    year: 2020,
    topics: ["Cooking"],
  },
  {
    title: "Dance of Time",
    author: "Sophia Grace",
    genre: "Fiction",
    year: 2018,
    topics: ["Dancing"],
  },
  {
    title: "Through the Lens",
    author: "Cameron Focus",
    genre: "Photography Guide",
    year: 2017,
    topics: ["Photography"],
  },
  {
    title: "Masterpiece Colors",
    author: "Vincent Hues",
    genre: "Art History",
    year: 2008,
    topics: ["Painting"],
  },
  {
    title: "Cinema Chronicles",
    author: "Oscar Reel",
    genre: "Film Studies",
    year: 2015,
    topics: ["Movies"],
  },
  {
    title: "Harmonious Rhapsody",
    author: "Melody Strings",
    genre: "Music Fiction",
    year: 2010,
    topics: ["Music", "Movies"],
  },
  {
    title: "Global Wanderer",
    author: "Marco Globe",
    genre: "Travelogue",
    year: 2021,
    topics: ["Travel", "Photography"],
  },
  {
    title: "Spices of the World",
    author: "Ayesha Spice",
    genre: "Cookbook",
    year: 2019,
    topics: ["Cooking", "Travel"],
  },
  {
    title: "Tango Tango",
    author: "Carlos Step",
    genre: "Dance Memoir",
    year: 2016,
    topics: ["Dancing"],
  },
  {
    title: "Shutter Stories",
    author: "Lucy Frame",
    genre: "Photography Techniques",
    year: 2022,
    topics: ["Photography", "Travel"],
  },
  {
    title: "Canvas Dreams",
    author: "Liam Brush",
    genre: "Fiction",
    year: 2009,
    topics: ["Painting"],
  },
  {
    title: "Silver Screen Secrets",
    author: "Hannah Script",
    genre: "Drama",
    year: 2005,
    topics: ["Movies"],
  },
  {
    title: "Melodies of the Heart",
    author: "Harmony Note",
    genre: "Romance",
    year: 2003,
    topics: ["Music", "Dancing"],
  },
  {
    title: "Journey Beyond Borders",
    author: "Ethan Roam",
    genre: "Non-Fiction",
    year: 2013,
    topics: ["Travel"],
  },
  {
    title: "Kitchen Adventures",
    author: "Jamie Whisk",
    genre: "Cooking Guide",
    year: 2011,
    topics: ["Cooking"],
  },
  {
    title: "Pirouette Perfection",
    author: "Anna Grace",
    genre: "Dance Techniques",
    year: 2021,
    topics: ["Dancing", "Music"],
  },
  {
    title: "Frame by Frame",
    author: "Oliver Click",
    genre: "Photography Journal",
    year: 2014,
    topics: ["Photography", "Movies"],
  },
  {
    title: "Portrait of Passion",
    author: "Emma Canvas",
    genre: "Art Memoir",
    year: 2007,
    topics: ["Painting", "Travel"],
  },
];

export const data: { users: User[]; books: Book[] } = {
  users: [
    {
      id: 1,
      name: "John Doe",
      age: 25,
      interests: ["Music", "Reading", "Sports"],
    },
    {
      id: 2,
      name: "Mary Smith",
      age: 50,
      interests: ["Movies", "Travel", "Cooking"],
    },
    {
      id: 3,
      name: "Michael Johnson",
      age: 22,
      interests: ["Dancing", "Painting", "Photography"],
    },
  ],
  books,
};

export function getUserByID(id: number): User | undefined {
  return data.users.find((user) => user.id === id);
}

export function getBooksByInterest(
  interests: string[],
): Promise<Book[] | undefined> {
  const books = data.books
    .filter((book) =>
      interests.some((interest) => book.topics.includes(interest)),
    )
    .map((book) => book);
  return Promise.resolve(books);
}
