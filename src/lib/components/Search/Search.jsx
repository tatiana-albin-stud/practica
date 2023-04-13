import React, { useEffect } from "react";
import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import PropTypes from "prop-types";
import styles from "./Search.module.scss";

/**
 * Search component
 * @param {*} search - state for the search input
 * @param {*} setSearch - set the state function
 * @param {*} nameToFind - placeholder value
 * @param {object} style - object to override styles
 */
const Search = ({
  isSearch,
  setIsSearch = () => {},
  search,
  setSearch = () => {},
  nameToFind,
  style,
  triggerSearch,
  setTriggerSearch = () => {},
  triggerRefetch,
  setTriggerRefetch = () => {},
  setLoading = () => {},
  setterFunction = () => {},
  resetFilter = () => {},
  defaultGet = () => {},
  searchGet = () => {},
}) => {
  const handleRemoveSearch = () => {
    setIsSearch(false);
    setLoading(true);
    setterFunction([]);
    setTriggerRefetch(!triggerRefetch);
    defaultGet();
  };

  useEffect(() => {
    if (search === "" && isSearch) {
      handleRemoveSearch();
    }
  }, [search]);

  const handleSearch = () => {
    if (search !== "") {
      resetFilter();
      setLoading(true);
      setterFunction([]);
      setIsSearch(true);
      setTriggerSearch(!triggerSearch);
      searchGet(search);
    }
  };

  const keyDownHandler = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSearch();
    }
  };

  return (
    <TextField
      id="search-input"
      placeholder={nameToFind}
      className={styles.searchComponent}
      style={{ ...style }}
      variant="standard"
      value={search}
      onChange={(e) => {
        setSearch(e.target.value);
      }}
      autoComplete="off"
      onKeyDown={keyDownHandler}
      InputProps={{
        endAdornment: (
          <InputAdornment className={styles.adornment} position="start">
            {!isSearch ? (
              <SearchIcon
                className={`${search !== "" && styles.isSearch}`}
                onClick={search !== "" ? () => handleSearch() : undefined}
              />
            ) : (
              <ClearIcon
                className={styles.clear}
                onClick={() => {
                  setSearch("");
                  handleRemoveSearch();
                }}
              />
            )}
          </InputAdornment>
        ),
        disableUnderline: true,
      }}
    />
  );
};

Search.propTypes = {
  search: PropTypes.string,
  setSearch: PropTypes.func,
  nameToFind: PropTypes.string,
  style: PropTypes.object,
};

Search.defaultProps = {
  search: "",
  setSearch: () => {},
  nameToFind: "Default placeholder",
  style: {},
};

export default Search;
