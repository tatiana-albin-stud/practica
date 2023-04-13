import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import LoadingSpinner from "../Spinners/LoadingSpinner";
import styles from "./CustomTable.module.scss";

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Container,
  Typography,
  Divider,
} from "@mui/material";
import { useTranslation } from "react-i18next";

/**
 * Custom table component
 * @param {string} title - represents the title of the table, if not set the table will not have a header component
 * @param {array} labels - list of the labels, with will represent the columns
 * @param {array} tableData - data to be rendered on the table
 * @param {function} cellModifier - its used to render a column in a specific way. For example its used to insert icons
 * @param {boolean} loading - its used to show the loading view of the table
 * @param {function} setLoading - function used to set loading to false
 * @param {boolean} withPagination - shows or hides the pagination at the bottom of the table
 * @param {boolean} withBoxShadow - adds or removes the box shadow
 * @param {boolean} withRowColors - adds or removes row colors
 * @param {array} bottomInfo - object to be displayed on last row
 * @param {function} getterFunction - function with call the api end point
 * @param {function} setterFunction - sets the state with the data in parent component
 * @param {function} triggerRefetch - boolean used to trigger a refetch of the data
 * @param {any} additionalId - entity that represents the params of the getterFunction
 * @param {boolean} withNoCellPadding - removes the cell padding in the table
 * @returns a table
 */

// const tableHeadCellStyle = {
//     color: 'rgba(0, 0, 0, 0.62) !important',
//     fontSize: 15,
//     fontWeight: 700,
//     border: 'none',
// };
function CustomTable({
  title,
  labels,
  tableData,
  cellModifier,
  loading,
  setLoading = () => null,
  withPagination = false,
  withBoxShadow = true,
  withRowColors = true,
  bottomInfo,
  getterFunction = () => null,
  setterFunction,
  triggerRefetch,
  additionalId = null,
  withNoCellPadding = false,
  labelsPadding = null,
  triggerSearch = null,
  search = "",
  isSearch = false,
  searchFunction = () => null,
  setState = null,
  filterSearch = null,
  triggerFilter = null,
  filterData = null,
  filterFunction = () => null,
  isFilter = null,
  filterFilter = null,
  customKey = null,
}) {
  const { t } = useTranslation();

  // page state
  const [currentPage, setCurrentPage] = useState(0);
  const pagesToLoad = 1;
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [count, setCount] = useState(0);

  // page change handler
  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  // rows per page change handler
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value));
    setCurrentPage(0);
  };

  useEffect(() => {
    if (withPagination && isSearch) {
      searchFunction(search).then((res) => {
        if (res.ok) {
          if (filterSearch) {
            const filteredRes = filterSearch(res.data);
            if (setState) {
              setterFunction(setState(filteredRes));
            } else {
              setterFunction(filteredRes);
            }
            setCount(filteredRes.length);
          } else {
            if (setState) {
              setterFunction(setState(res.data));
            } else {
              setterFunction(res.data);
            }
            setCount(res.data.length);
          }
          setLoading(false);
        }
      });
    } else if (withPagination && isFilter) {
      filterFunction(filterData).then((res) => {
        if (res.ok) {
          if (filterFilter) {
            const filteredRes = filterFilter(res.data);

            if (setState) {
              setterFunction(setState(filteredRes));
            } else {
              setterFunction(filteredRes);
            }
            setCount(filteredRes.length);
          } else {
            if (setState) {
              setterFunction(setState(res.data));
            } else {
              setterFunction(res.data);
            }
            setCount(res.data.length);
          }
          setLoading(false);
        }
      });
    } else if (!withPagination && isFilter) {
      filterFunction(filterData).then((res) => {
        if (res.ok) {
          if (filterFilter) {
            const filteredRes = filterFilter(res.data);
            if (setState) {
              setterFunction(setState(filteredRes));
            } else {
              setterFunction(filteredRes);
            }
            setCount(filteredRes.length);
          } else {
            if (setState) {
              setterFunction(setState(res.data));
            } else {
              setterFunction(res.data);
            }
            setCount(res.data.length);
          }
          setLoading(false);
        }
      });
    } else if (withPagination && additionalId) {
      getterFunction(additionalId, rowsPerPage, currentPage, pagesToLoad).then(
        (res) => {
          if (res.ok) {
            if (setState) {
              const newData = setState(res.data.content);
              setterFunction(newData);
              setCount(res.data.count);
            } else {
              setCount(res.data.count);
              setterFunction(res.data.content);
            }
            setLoading(false);
          }
        }
      );
    } else if (withPagination) {
      getterFunction(rowsPerPage, currentPage, pagesToLoad).then((res) => {
        if (res.ok) {
          console.log(res.data, "Data");
          if (setState) {
            const newData = setState(res.data.content);
            setterFunction(newData);
            setCount(res.data.count);
          } else {
            setCount(res.data.count);
            setterFunction(res.data.content);
          }
          setLoading(false);
        }
      });
    }
  }, [
    withPagination,
    triggerSearch,
    triggerRefetch,
    triggerFilter,
    rowsPerPage,
    currentPage,
    pagesToLoad,
  ]);

  return (
    <Paper
      className={`${styles.tableWrapper} ${
        withBoxShadow ? styles.boxShadow : styles.noBoxShadow
      }`}
    >
      {/*If title is present, the container for the title will render*/}
      {title && (
        <Container className={styles.titleWrapper}>
          <Typography className={styles.titleTypography}>{title}</Typography>
        </Container>
      )}

      {/*If title is present, the divider will be rendered*/}
      {title && <Divider light />}

      <TableContainer
        className={`${styles.tableContainer} ${
          withNoCellPadding && styles.bottomPaddingForTable
        }`}
      >
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {labels.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  onClick={column.onClick}
                  sx={{ padding: labelsPadding }}
                  className={styles.headCell}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell
                  colSpan={labels.length}
                  padding={withNoCellPadding ? "none" : ""}
                  className={styles.cell}
                >
                  <div className={styles.loadingDiv}>
                    <LoadingSpinner loading={loading} margin="0 auto" />
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              <>
                {!tableData.length ? (
                  <TableRow>
                    <TableCell
                      colSpan={labels.length}
                      padding={withNoCellPadding ? "none" : ""}
                      className={styles.cell}
                    >
                      <Typography className={styles.cellNoDataText}>
                        {t("No data")}.
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : !isSearch && !isFilter ? (
                  tableData.map((row) => {
                    return (
                      <TableRow
                        role="checkbox"
                        tabIndex={-1}
                        key={customKey ? row[customKey] : row.id}
                        className={`${
                          withRowColors ? styles.rowWithColors : styles.row
                        }`}
                      >
                        {labels.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell
                              key={column.id}
                              align={column.align}
                              padding={withNoCellPadding ? "none" : ""}
                              className={styles.cell}
                            >
                              {cellModifier
                                ? cellModifier(row, column, value)
                                : value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })
                ) : (
                  tableData
                    .slice(
                      currentPage * rowsPerPage,
                      currentPage * rowsPerPage + rowsPerPage
                    )
                    .map((row) => {
                      return (
                        <TableRow
                          role="checkbox"
                          tabIndex={-1}
                          key={customKey ? row[customKey] : row.id}
                          className={`${
                            withRowColors ? styles.rowWithColors : styles.row
                          }`}
                        >
                          {labels.map((column) => {
                            const value = row[column.id];
                            return (
                              <TableCell
                                key={column.id}
                                align={column.align}
                                padding={withNoCellPadding ? "none" : ""}
                                className={styles.cell}
                              >
                                {cellModifier
                                  ? cellModifier(row, column, value)
                                  : value}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      );
                    })
                )}

                {/* Bottom Row */}
                <TableRow
                  role="checkbox"
                  tabIndex={-1}
                  className={`${
                    withRowColors ? styles.rowWithColors : styles.row
                  }`}
                >
                  {/* 
                                        Limit number of columns with label's length
                                        Bottom Info length is [0, labels.length]
                                     */}
                  {bottomInfo.slice(0, labels.length).map((column, i) => {
                    return (
                      <TableCell
                        key={column.id}
                        align="left"
                        className={styles.cell}
                      >
                        {bottomInfo[i].value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              </>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {withPagination && (
        <TablePagination
          className={styles.pagination}
          rowsPerPageOptions={[5, 10, 25, 100]}
          component="div"
          count={withPagination ? count : tableData.length}
          rowsPerPage={rowsPerPage}
          labelRowsPerPage={t("Rows per page:")}
          page={currentPage}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
    </Paper>
  );
}

export default CustomTable;

// prop types
CustomTable.propTypes = {
  title: PropTypes.string,
  showSearchbar: PropTypes.bool,
  showFilters: PropTypes.bool,
  showExport: PropTypes.bool,
  showAdd: PropTypes.bool,
  cellModifier: PropTypes.func,
  onAdd: PropTypes.func,
  onFilters: PropTypes.func,
  onExport: PropTypes.func,
  onSearch: PropTypes.func,
  setDropValue: PropTypes.func,
  labels: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      label: PropTypes.string,
      minWidth: PropTypes.number,
      onClick: PropTypes.func,
    })
  ),
  tableData: PropTypes.array,
  loading: PropTypes.bool,
  bottomInfo: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOf([PropTypes.string, PropTypes.element]),
    })
  ),
};

// default props
CustomTable.defaultProps = {
  title: "",
  showSearchbar: false,
  showFilters: false,
  showExport: false,
  showAdd: false,
  cellModifier: () => {},
  onAdd: () => {},
  onExport: () => {},
  onFilters: () => {},
  onSearch: () => {},
  setDropValue: () => {},
  loading: false,
  labels: [
    {
      onClick: () => {},
      id: "id",
      label: "ID",
      minWidth: 100,
    },
  ],
  tableData: [],
  bottomInfo: [],
};
