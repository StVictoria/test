import { TextField } from "@mui/material";
import { FC, useState } from "react";

interface ISearch {
  onSearch: (queryStr: string) => void;
}

const Search: FC<ISearch> = ({ onSearch }) => {
  const [searchText, setSearchText] = useState("");

  const handleChange = (value: string) => {
    setSearchText(value);
    onSearch(value);
  };

  return (
    <TextField
      fullWidth
      value={searchText}
      id="outlined-basic"
      label="Search"
      variant="outlined"
      sx={{ marginBottom: "40px" }}
      onChange={(e) => handleChange(e.target.value)}
    />
  );
};

export default Search;
