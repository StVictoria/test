import { setSearchText } from "@/store/productsSlice";
import { RootState } from "@/store/store";
import { TextField } from "@mui/material";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";

const Search: FC = () => {
  const dispatch = useDispatch();
  const { searchText } = useSelector((state: RootState) => state.products);

  const handleChange = (value: string) => {
    dispatch(setSearchText(value));
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
