import { useState, useEffect } from "react";
import { useUser } from "hooks/useUser";
import useWindowDimensions from "../hooks/useWindowDimensions";

import { Drawer } from "@mui/material";
import { Appbar, Sidebar } from "../lib";
import { useTranslation } from "react-i18next";
import styles from "./Layout.module.scss";

//svg imports
import { ReactComponent as UsersIcon } from "resources/svg/menu-navbar/UsersIcon.svg";
import { ReactComponent as DashboardIcon } from "resources/svg/menu-navbar/DashboardIcon.svg";

import { ReactComponent as ProfileIcon } from "resources/svg/menu-navbar/ProfileIcon.svg";
import { ReactComponent as LogoutIcon } from "resources/svg/menu-navbar/LogoutIcon.svg";
import { ReactComponent as TermsIcon } from "./Versions/info.svg";

import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SchoolIcon from "@mui/icons-material/School";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import QrCode2Icon from "@mui/icons-material/QrCode2";

function Layout() {
  const { vw } = useWindowDimensions();
  const [open, setOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const [selectedLang, setSelectedLang] = useState(i18n.language);
  const { user, can } = useUser();

  const menuHandler = () => {
    setOpen(!open);
  };

  const handleLangChange = (prop) => {
    const lang = prop;
    localStorage.setItem("preferredLang", lang);
    setSelectedLang(lang);
    i18n.changeLanguage(lang);
  };

  useEffect(() => {
    setSelectedLang(i18n.language);
  }, [i18n.language]);

  return (
    <>
      <div className={styles.wrapper}>
        <Appbar onMenuClick={menuHandler} />

        <Drawer
          open={open}
          onClose={menuHandler}
          variant={vw >= 1080 ? "permanent" : "temporary"}
        >
          <div className={styles.container}>
            <Sidebar
              navMain={[
                {
                  render: true,
                  label: t("Menu"),
                  navItems: [
                    {
                      content: t("Bine ai venit!"),
                      icon: <DashboardIcon />,
                      render: true,
                      path: "/",
                      nested: false,
                    },
                  ],
                },

                {
                  render: true,
                  label: t("Account"),
                  navItems: [
                    {
                      content: t("Profile"),
                      icon: <ProfileIcon />,
                      render: true,
                      path: "/profile",
                      nested: false,
                    },
                    {
                      content: t("Documente importante"),
                      icon: <TermsIcon />,
                      render: true,
                      path: "/terms",
                      nested: false,
                    },
                    {
                      content: t("Logout"),
                      icon: <LogoutIcon />,
                      render: true,
                      nested: false,
                      popover: true,
                    },
                    // {
                    //   withNoIconColor: true,
                    //   content: selectedLang === "ro" ? "Română" : "English",
                    //   icon:
                    //     selectedLang === "ro" ? (
                    //       <RomanaIcon />
                    //     ) : (
                    //       <EnglishIcon />
                    //     ),
                    //   render: true,
                    //   nested: true,
                    //   nestedItems: [
                    //     {
                    //       content: "Română",
                    //       render: true,
                    //       icon: <RomanaIcon />,
                    //       onClick: () => {
                    //         handleLangChange("ro");
                    //       },
                    //     },
                    //     {
                    //       content: "English",
                    //       render: true,
                    //       icon: <EnglishIcon />,
                    //       onClick: () => {
                    //         handleLangChange("en");
                    //       },
                    //     },
                    //   ],
                    // },
                  ],
                },
              ]}
            />
          </div>
        </Drawer>
      </div>
    </>
  );
}

export default Layout;
