import { Typography } from "@mui/material";
import styles from "./pageLayout.module.scss";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { Tooltip } from "lib";
import InfoIcon from "@mui/icons-material/Info";

const PageLayout = ({
  children,
  title,
  subTitle,
  backArrow,
  actionArea,
  withTooltip = false,
}) => {
  const { t } = useTranslation();
  const history = useHistory();

  return (
    <div className={styles.pageContainer}>
      <div className={styles.componentWrapper}>
        <div className={styles.headerContainer}>
          <div className={styles.titleContainer}>
            {backArrow && (
              <Typography
                onClick={() => history.goBack()}
                variant="pageBack"
                className={styles.backTypography}
              >
                <ArrowBackIosNewIcon className={styles.backSvg} />
                {t("Back")}
              </Typography>
            )}

            <div className={styles.titleWrapper}>
              <Typography variant="pageTitle">{title}</Typography>
              {withTooltip && (
                <Tooltip
                  position="right"
                  textTip={t(
                    "* Here are displayed only the objectives on the current month!"
                  )}
                  style={{
                    border: "1px solid",
                    borderColor: "#ff4b55",
                    color: "#ff4b55",
                    fontSize: "13px",
                  }}
                >
                  <div className={styles.toolTipIconWrapper}>
                    <InfoIcon className={styles.toolTipSvg} />
                  </div>
                </Tooltip>
              )}
            </div>

            {subTitle && <Typography variant="pageInfo">{subTitle}</Typography>}
          </div>

          <div style={{ width: "100%" }}>
            <div className={styles.actionAreaContainer}>{actionArea}</div>
          </div>
        </div>

        <div>{children}</div>
      </div>
    </div>
  );
};

PageLayout.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string,
  backArrow: PropTypes.bool,
  actionArea: PropTypes.element,
};

PageLayout.defaultProps = {
  title: "",
  subTitle: null,
  backArrow: false,
  actionArea: <></>,
};

export default PageLayout;
