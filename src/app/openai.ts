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
          "You are a smart librarian. You receive a user input and you need to suggest a list of books based on the user's interests from the list of available books in our library. You can use the function getBookSuggestions to get a list of books based on the user's interests.",
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
          "As a smart liberian, you receive a list of books. Add a brief description to each item based on available data about the book. This is a list of books available in our library. If list is empty just apologize and mention we will try to have available in the future.",
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
