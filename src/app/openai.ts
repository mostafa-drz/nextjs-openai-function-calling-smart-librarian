import { OpenAI } from "openai";
import { getBooksByInterest } from "./db";
import { Book } from "./types";

const OPEN_AI_API_KEY = process.env.OPEN_AI_API_KEY || undefined;

if (!OPEN_AI_API_KEY) {
  throw new Error("OPEN_AI_API_KEY is not set");
}

const openai = new OpenAI({ apiKey: OPEN_AI_API_KEY });
const MODEL = "gpt-4o";

async function getBookSuggestions(args: {
  interests: string[];
}): Promise<Book[] | undefined> {
  const books = getBooksByInterest(args.interests);
  return books;
}

const tools = [
  {
    type: "function" as unknown as "function",
    function: {
      name: "getBookSuggestions",
      description: "Suggests a list of books based on user interests",
      strict: true,
      parameters: {
        type: "object",
        required: ["interests"],
        properties: {
          interests: {
            type: "array",
            description: "List of user interests",
            items: {
              type: "string",
              description:
                "A specific interest of the user, first letter always capital like Foo and not foo",
            },
          },
        },
        additionalProperties: false,
      },
    },
  },
];

export async function handleUserInput(userInput: string) {
  const completion = await openai.chat.completions.create({
    model: MODEL,
    messages: [
      {
        role: "system",
        content:
          "You are a smart librarian. Based on the user's input, your task is to recommend books from our library collection that align with their interests. Use the 'getBookSuggestions' function to retrieve a list of books matching their preferences.",
      },
      { role: "user", content: userInput },
    ],
    tools,
    tool_choice: "auto",
  });

  const toolsResponse = completion.choices[0].message.tool_calls;
  const bookSuggestionTool = toolsResponse?.find(
    (tool) => tool?.function?.name === "getBookSuggestions",
  );
  let books: Book[] | undefined;
  if (bookSuggestionTool) {
    const args = bookSuggestionTool?.function?.arguments;
    const parsedArgs = JSON.parse(args);
    books = await getBookSuggestions(parsedArgs);
  }

  const finalOutputResponse = await openai.chat.completions.create({
    model: MODEL,
    messages: [
      {
        role: "system",
        content:
          "You are a smart librarian. You have received a list of books from our library. For each book, provide a brief description based on its available details. If the list is empty, politely apologize and inform the user that we will strive to add relevant books to our collection in the future.",
      },
      {
        role: "assistant",
        content: `List of books we found in our library: ${JSON.stringify(books)}`,
      },
    ],
    tools,
    tool_choice: "auto",
  });

  const output = finalOutputResponse.choices[0].message.content;
  return output;
}
