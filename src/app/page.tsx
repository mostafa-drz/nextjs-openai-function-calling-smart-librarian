"use client";
import { formSubmitAction } from "./actions";
import { useState } from "react";

export default function Home() {  
  const [suggestions, setSuggestions] = useState<string | null | undefined>();
  async function handleUserRequestFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const response = await formSubmitAction(formData);
    setSuggestions(response);
  }
  return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-blue-300 w-screen h-screen">
      <form
        className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg"
        onSubmit={handleUserRequestFormSubmit}
      >
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Smart Librarian</h1>
        <div className="mb-4">
          <label htmlFor="userInput" className="block text-gray-600 mb-2">
            I am a smart librarian. Tell me more about your interests and what are you looking for, I'll try to find something from our available books collection.
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
          className="w-full px-4 py-2 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 transition duration-300 disabled:opacity-50"
        >
          Submit
        </button>
        <div>{suggestions}</div>
      </form>
    </div>
  );
}
