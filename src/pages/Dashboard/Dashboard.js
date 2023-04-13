import React, { useState, useEffect } from "react";
import styles from "./Dashboard.module.scss";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

import { Typography, Box } from "@mui/material";
import { UtilityButton } from "lib/components/Buttons/buttons.jsx";

import GroupIcon from "@mui/icons-material/Group";
import { GeneralAdministrationButton } from "lib/components/Buttons/buttons.jsx";
import TableLayout from "lib/components/Tables/TabsLayout";
import { CustomTable } from "lib";
import { Helmet } from "react-helmet";
import { useUser } from "hooks/useUser";

import { Tooltip } from "lib";
import InfoIcon from "@mui/icons-material/Info";

import dayjs from "dayjs";

import ManagerDashboard from "./ManagerDashboard/ManagerDashboard";
import MemberDashboard from "./MemberDashboard/MemberDashboard";

function Dashboard() {
  const { t } = useTranslation();
  let history = useHistory();
  const { user, can } = useUser();

  return (
    <>
      <Helmet>
        <title>InBUSINESS CRM :: {t("Dashboard")}</title>
      </Helmet>
      <div className={styles.header}>
        <Typography variant="firstPageTitle" className={styles.text}>
          {t("Salut")}, {user.firstName + " " + user.lastName}!{" "}
          {t("Bine ai venit pe platformă!")}!
        </Typography>
      </div>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <Box className={styles.generalText}>
            <MemberDashboard />
          </Box>

          {/* <ManagerDashboard /> */}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
