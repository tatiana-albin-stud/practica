import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

// mui
import { Avatar, Box, Button, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

// import raisisLogo from './raisis.svg';
import darexLogo from "resources/svg/app-bar/darex-logo.svg";
import logo from "resources/img/InBusiness/logo.png";
import raisisLogo from "resources/svg/app-bar/raisis-logo.svg";
import useWindowDimensions from "../../../hooks/useWindowDimensions";
import DefaultUserPicture from "resources/img/user/DefaultUserPicture.png";
import { useUser } from "hooks/useUser";
import { UsersAPI } from "api_inbusiness";
import styles from "./appbar.module.scss";

function Appbar({ logoRaisis, onMenuClick }) {
  const { user } = useUser();
  const { t } = useTranslation();

  const [profilePic, setProfilePic] = useState("");
  const history = useHistory();

  useEffect(() => {
    (async () => {
      if (user.img) {
        const { data: imgUrl } = await UsersAPI.getUserPicture(user.img);
        setProfilePic(imgUrl);
      }
    })();
  }, [user]);

  return (
    <div className={styles.app_bar_container}>
      <img
        className={styles.app_bar_raisis_logo}
        onClick={() => history.push("/")}
        src={logoRaisis}
        alt="logo"
      />
      <img
        className={styles.app_bar_darex_logo}
        src={logo}
        alt="logo InBusiness"
      />
      {/* <h1 className={styles.company_logo}>{t("Company LOGO")}</h1> */}
      {/* actions */}
      <div className={styles.app_bar_info_container}>
        {/* user */}

        <div
          className={styles.app_bar_user_container}
          onClick={() => history.push("/profile/?tab=1")}
        >
          {/* <Avatar
            className={styles.app_bar_user_image}
            src={profilePic ? profilePic : DefaultUserPicture}
          /> */}

          {/* <p className={styles.app_bar_user_name}>
            {user.firstName + " " + user.lastName}
          </p> */}
        </div>

        <Button
          className={styles.app_bar_hamburger_menu}
          onClick={onMenuClick}
          sx={{ color: "#929BAA" }}
        >
          <MenuIcon className={styles.app_bar_menu_icon} />
        </Button>
      </div>
    </div>
  );
}

Appbar.propTypes = {
  bgcolor: PropTypes.string,
  logoRaisis: PropTypes.node,
  logoDarex: PropTypes.node,
  onMenuClick: PropTypes.func,
};

Appbar.defaultProps = {
  bgcolor: "primaryCustom",
  logoRaisis: raisisLogo,
  logoDarex: darexLogo,
  onMenuClick: () => {},
};

export default Appbar;
