"use client";
import { formSubmitAction } from "./actions";
import { useState } from "react";
import ReactMarkdown from 'react-markdown'

export default function Home() {  
  const [suggestions, setSuggestions] = useState<string | null | undefined>();
  const [isPending, setIsPending] = useState<boolean>(false);

  async function handleUserRequestFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsPending(true);
    const formData = new FormData(event.currentTarget);
    const response = await formSubmitAction(formData);
    setSuggestions(response);
    setIsPending(false);
  }
  return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-blue-300 w-screen px-10">
      <form
        className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg"
        onSubmit={handleUserRequestFormSubmit}
      >
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Smart Librarian</h1>
        <div className="mb-4">
          <label htmlFor="userInput" className="block text-gray-600 mb-2">
            I am a smart librarian. Tell me more about your interests and what are you looking for, I try to find something from our available books collection.
          </label>
          <textarea
            id="userInput"
            name="userInput"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
            placeholder="Type something..."
            required
          />
        </div>

         <button
          type="submit"
          className={`w-full px-4 py-2 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 transition duration-300 disabled:opacity-50 flex justify-center ${isPending ? 'animate-pulse' : ''}`}
          disabled={isPending}
        >
          Submit
        </button>
        <ReactMarkdown className="text-black mt-4">{suggestions}</ReactMarkdown>
      </form>
    </div>
  );
}
