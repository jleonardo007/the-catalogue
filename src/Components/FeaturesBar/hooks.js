import { useState } from "react";
import { inputChange, search } from "./handlers";

export default function useSearch() {
  const [input, setInput] = useState("");

  return {
    searchInput: input,
    inputChange: (inputValue) => inputChange(inputValue, setInput),
    search: (setQuery) => search(setQuery, input, setInput),
  };
}
