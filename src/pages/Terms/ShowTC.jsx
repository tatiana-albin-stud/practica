import { CustomTable } from "lib";
import { PageLayout } from "lib";
import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { PrimaryButton } from "lib/components/Buttons/buttons";
import { EditButton } from "lib/components/Buttons/buttons";
import { RemoveButton } from "lib/components/Buttons/buttons";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Tooltip } from "lib";
import styles from "./Stilizare.module.scss";
import { PoliticsAPI } from "api_inbusiness";
import { useHistory } from "react-router-dom";

const ShowTC = () => {
  const [triggerRefetch, setTriggerRefetch] = useState(false);
  const navigate = useHistory();

  const [politics, setPolitics] = useState([]);

  const [loading, setLoading] = useState(false);

  const labels = [
    { id: "title", label: "Titlu", minWidth: 100 },
    { id: "actions", label: "", minWidth: 100 },
  ];
  const cellModifier = (row, column, value) => {
    if (column.id === "actions") {
      return (
        <div className={styles.actionAreaIndividualEducation}>
          <EditButton
            position="left"
            color="#1860D2"
            // onClick={() => {
            //   setRowState(row);
            //   setOpen(true);
            // }}
          />
          <RemoveButton
            position="left"
            textTip={"Vezi mai mult"}
            //   setRowState(row);
            //   setOpenDelete(true);
            // }}
          />
          <Tooltip position="left" textTip={"Vezi mai mult"} followCursor>
            <ArrowForwardIosIcon
              sx={{ color: "#808080", cursor: "pointer" }}
              onClick={() =>
                navigate.push({
                  pathname: `/terms/${row.id}`,
                  state: row,
                })
                
              }
            />
          </Tooltip>
        </div>
      );
    }
    return <Typography variant="tableContent">{value}</Typography>;
  };
  console.log(politics);
  return (
    <CustomTable
      labels={labels}
      tableData={politics}
      cellModifier={cellModifier}
      loading={loading}
      setLoading={setLoading}
      getterFunction={PoliticsAPI.get}
      withPagination={true}
      setterFunction={setPolitics}
      triggerRefetch={triggerRefetch}
    />
  );
};

export default ShowTC;
