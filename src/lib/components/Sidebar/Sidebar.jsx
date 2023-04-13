import PropTypes from "prop-types";
import { useHistory, useLocation } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { useUser } from "hooks/useUser";
import ConfirmModal from "../Modals/ConfirmModal";

// mui
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  Collapse,
} from "@mui/material";

import ChatIcon from "@mui/icons-material/Chat";
import { TechnicalSupportButton } from "../Buttons/buttons";
import LogoDevIcon from "@mui/icons-material/LogoDev";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

import TechnicalSupport from "../Modals/Support/Support";
import logoRaisis from "resources/LogoRaisisCRM.png";
import styles from "./sidebar.module.scss";

const Sidebar = ({ navMain }) => {
  let history = useHistory();
  const { t } = useTranslation();

  const [supportOpen, setSupportOpen] = useState(false);

  return (
    <div className={styles.sidebar_container}>
      <div className={styles.logoRaisisOnMobile}>
        <img
          // className={styles.app_bar_raisis_logo}
          onClick={() => history.push("/")}
          src={logoRaisis}
          alt="logo"
          style={{
            width: "200px",
            height: "auto",
          }}
        />
      </div>
      <List className={styles.sidebar_list_container}>
        {navMain.map(
          (navGroup, idx) =>
            navGroup.render && (
              <nav
                aria-label="Aria Label Text"
                key={idx}
                className={styles.nav_class}
              >
                <Divider
                  className={styles.sidebar_list_divider}
                  textAlign="left"
                >
                  {navGroup.label}
                </Divider>
                {navGroup.navItems.map(
                  (item, idx) =>
                    item.render && (
                      <div key={idx}>
                        <SidebarItem
                          content={item.content}
                          icon={item.icon}
                          path={item.path}
                          render={item.render}
                          nested={item.nested}
                          nestedItems={item.nestedItems}
                          onClick={item.onClick}
                          withNoIconColor={item.withNoIconColor}
                          popover={item.popover}
                        />
                      </div>
                    )
                )}
              </nav>
            )
        )}

        <TechnicalSupportButton
          startIcon={<ChatIcon />}
          onClick={() => setSupportOpen(true)}
        >
          {t("Technical support")}
        </TechnicalSupportButton>

        <p className={styles.sidebar_list_version}>
          <a
            href="https://raisissoftware.com/"
            target={"_blank"}
            rel="noopener noreferrer"
          >
            RaisisCRM v 2.0.0
          </a>
        </p>
      </List>
      <TechnicalSupport open={supportOpen} setOpen={setSupportOpen} />
    </div>
  );
};

const SidebarItem = ({
  icon,
  content,
  path,
  onClick,
  nested,
  nestedItems,
  withNoIconColor,
  popover,
}) => {
  const history = useHistory();
  const location = useLocation();
  const { t } = useTranslation();
  const { setAccessToken } = useUser();
  const [open, setOpen] = useState(false);

  return (
    <>
      <ListItemButton
        className={styles.sidebar_list_item}
        sx={{
          boxShadow:
            "/" + location.pathname.split("/")[1] === path
              ? "inset 12px 12px 20px #e6e9ed, inset -12px -12px 20px #FAFBFC"
              : null,
          backgroundColor:
            "/" + location.pathname.split("/")[1] === path ? "#EFF1F" : null,
          "&:hover": {
            "#list_item_icon": {
              "& svg path": { fill: withNoIconColor ? null : "#5B80BA" },
            },
          },
        }}
        onClick={() =>
          nested || popover
            ? setOpen(!open)
            : onClick
            ? onClick()
            : history.push(`${path}`)
        }
      >
        <ListItemIcon
          id="list_item_icon"
          className={styles.sidebar_list_item_icon}
          sx={{
            "& svg path": {
              fill: withNoIconColor
                ? null
                : "/" + location.pathname.split("/")[1] === path
                ? "#5B80BA"
                : "#8E99A7",
            },
          }}
        >
          {icon}
        </ListItemIcon>
        <ListItemText>
          <Typography
            className={styles.sidebar_list_item_text}
            variant="sidebarItem"
            sx={{
              color:
                "/" + location.pathname.split("/")[1] === path
                  ? "#5B80BA"
                  : "#8E99A7",
            }}
          >
            {content}
          </Typography>
        </ListItemText>
        {nested && (open ? <ExpandLess /> : <ExpandMore />)}
      </ListItemButton>

      {popover && (
        <ConfirmModal
          text={t("Are you sure you want to log out?")}
          open={open}
          onClickButtonYes={() => {
            setAccessToken(undefined);
            history.push("/login");
          }}
          setOpen={setOpen}
        />
      )}
      {nested &&
        nestedItems.map((item, idx) => (
          <div key={idx}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List disablePadding>
                {item.render && (
                  <ListItemButton
                    className={styles.list_item_nested}
                    onClick={() => {
                      item.onClick();
                      setOpen(!open);
                    }}
                  >
                    <ListItemIcon className={styles.list_item_icon_nested}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText>
                      <Typography
                        variant="sidebarItem"
                        color="textCustom.secondary"
                        className={styles.list_item_text_nested}
                      >
                        {item.content}
                      </Typography>
                    </ListItemText>
                  </ListItemButton>
                )}
              </List>
            </Collapse>
          </div>
        ))}
    </>
  );
};

Sidebar.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  position: PropTypes.string,
  margin: PropTypes.string,
  bgcolor: PropTypes.string,
  user: PropTypes.string,
  tier: PropTypes.string,
  navMain: PropTypes.arrayOf(
    PropTypes.shape({
      render: PropTypes.bool,
      label: PropTypes.string,
      navItems: PropTypes.arrayOf(
        PropTypes.shape({
          content: PropTypes.string,
          icon: PropTypes.node,
          render: PropTypes.bool,
          path: PropTypes.string,
          nested: PropTypes.bool,
          nestedItems: PropTypes.arrayOf(
            PropTypes.shape({
              content: PropTypes.string,
              render: PropTypes.bool,
              path: PropTypes.string,
              onClick: PropTypes.func,
            })
          ),
        })
      ),
    })
  ),
};

Sidebar.defaultProps = {
  bgcolor: "#ffffff",
  user: "Raisis Software",
  tier: "Premium",
  navMain: [
    {
      render: true,
      label: "Label 1",
      navItems: [
        {
          content: "Content",
          icon: <LogoDevIcon />,
          render: true,
          path: "/",
          nested: false,
        },
        {
          content: "Content",
          icon: <LogoDevIcon />,
          render: true,
          path: "/test-route-1",
          nested: false,
        },
      ],
    },
    {
      render: true,
      label: "Label",
      navItems: [
        {
          content: "Content",
          icon: <LogoDevIcon />,
          render: true,
          path: "/test-route-2",
          nested: false,
        },
        {
          content: "Content",
          icon: <LogoDevIcon />,
          render: true,
          path: "/test-route-3",
          nested: false,
        },
        {
          content: "Content",
          icon: <LogoDevIcon />,
          render: true,
          nested: true,
          nestedItems: [
            {
              content: "Inner Content",
              render: true,
              path: "/test-route-4",
            },
            {
              content: "Inner Content",
              render: true,
              path: "/test-route-5",
            },
          ],
        },
        {
          content: "Content",
          icon: <LogoDevIcon />,
          render: true,
          nested: true,
          nestedItems: [
            {
              content: "Inner Content",
              render: true,
              path: "test-route-6",
            },
          ],
        },
      ],
    },
    {
      render: true,
      label: "Label",
      navItems: [
        {
          content: "Content",
          icon: <LogoDevIcon />,
          render: true,
          path: "test-route-7",
          nested: false,
          onClick: () => null,
        },
      ],
    },
  ],
};

export default Sidebar;
