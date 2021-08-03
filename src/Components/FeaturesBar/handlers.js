export const toggleSideBar = (setToggleSideBar) => {
  setToggleSideBar((prevState) => !prevState);
};

export const inputChange = (inputValue, setInput) => {
  setInput(inputValue);
};

export const search = (setQuery, input, setInput) => {
  if (input.trim()) {
    setQuery(input);
    setInput("");
  } else alert("Invalid Search");
};
