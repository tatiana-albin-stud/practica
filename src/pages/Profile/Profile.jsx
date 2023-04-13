import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Box, Tab, Tabs, Avatar } from "@mui/material";
import PropTypes from "prop-types";
import { FileUploadWrapper } from "lib";
import {
  TechnicalSupportButton,
  UtilityButton,
} from "lib/components/Buttons/buttons";
import { uploadSingleFile } from "utils/functions";
import AddIcon from "@mui/icons-material/Add";

import ChangePassword from "./ChangePassword";
import ChangeProfilePicture from "./ChangeProfilePicture";
import ChangeMemberInformationModal from "./ChangeMemberInformationModal";
import Company from "./Company";

import { toast } from "react-toastify";

import { Helmet } from "react-helmet";
import { useUser } from "hooks/useUser";
import { UsersAPI } from "api_inbusiness";
import styles from "./Profile.module.scss";
import DefaultUserPicture from "resources/img/InBusiness/defaultUser.png";
import AddCompanyModal from "./AddCompanyModal";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Profile = () => {
  const { t } = useTranslation();
  const [openChangePassword, setOpenChangePassword] = useState(false);
  const [openChangeImage, setOpenChangeImage] = useState(false);
  const [openChangeMemberInfo, setOpenChangeMemberInfo] = useState(false);
  const [openAddCompany, setOpenAddCompany] = useState(false);
  const [dataForEdit, setDataForEdit] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const [deleteAccountOpen, setDeleteAccountOpen] = useState(false);
  const [value, setValue] = useState(0);
  const { user } = useUser();
  console.log(user, "user");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    (async () => {
      if (user.img) {
        const { data: imgUrl } = await UsersAPI.getUserPicture(user.img);
        setProfilePic(imgUrl);
      }
    })();
  }, [user]);

  console.log(dataForEdit, "data for edit");
  return (
    <>
      <Helmet>
        {/* <title>RaisisAuto CRM :: {t('Profile')}</title> */}
        <title>InBusiness Club Suceava :: Profil</title>
      </Helmet>
      <>
        <div className={styles.profileHeader}>
          {/* <Typography variant="firstPageTitle" className={styles.text}>
            {"Salut"}, {user.lastName} {user.firstName}!{" "}
            {"Bine ai venit pe platformă!"}!
          </Typography> */}
          <Box>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
              sx={{
                ".css-1aquho2-MuiTabs-indicator": {
                  backgroundColor: "rgba(0, 0, 0, 0.62)",
                },
              }}
              className={styles.tabs}
            >
              <Tab
                // label={t("My account")}
                label="Contul meu"
                {...a11yProps(0)}
                className={styles.tab}
              />
              <Tab
                // label={t("My companies")}
                label={"Companiile mele"}
                {...a11yProps(1)}
                className={styles.tab}
              />
            </Tabs>
          </Box>
        </div>
        <div className={styles.settingWrapper}>
          <TabPanel value={value} index={0}>
            <div className={styles.profileWrapper}>
              <Typography variant="profileBigText">
                {/* {t("Member information")} */}
                Informații cont
              </Typography>
              <div className={styles.profileContainer}>
                <div
                  className={styles.profileColumn + " " + styles.columnDetails}
                >
                  <div className={styles.gridContainer}>
                    <div className={styles.gridElement}>
                      <Typography variant="profileLabel">Nume:</Typography>
                    </div>
                    <div className={styles.gridElement}>
                      <Typography variant="profileData">
                        {user.lastName}
                      </Typography>
                      <span className={styles.underline} />
                    </div>
                    <div className={styles.gridElement}>
                      <Typography variant="profileLabel">Prenume:</Typography>
                    </div>
                    <div className={styles.gridElement}>
                      <Typography variant="profileData">
                        {user.firstName}
                      </Typography>
                      <span className={styles.underline} />
                    </div>
                    <div className={styles.gridElement}>
                      <Typography variant="profileLabel">Email:</Typography>
                    </div>
                    <div
                      className={styles.gridElement + " " + styles.breakWord}
                    >
                      <Typography variant="profileData">
                        {user.email}
                      </Typography>
                      <span className={styles.underline} />
                    </div>
                    <div className={styles.gridElement}>
                      <Typography variant="profileLabel">Telefon:</Typography>
                    </div>
                    <div className={styles.gridElement}>
                      <Typography variant="profileData">
                        {user.phone}
                      </Typography>
                      <span className={styles.underline} />
                    </div>

                    <div className={styles.gridElement}>
                      <Typography variant="profileLabel">
                        Detalii Companie / Companii:
                      </Typography>
                    </div>
                    <div className={styles.gridElement}>
                      <Typography variant="profileData">
                        {user.companyDetails}
                      </Typography>
                      <span className={styles.underline} />
                    </div>

                    <div className={styles.gridElement}>
                      <Typography variant="profileLabel">
                        Scurta descriere (va aparea pe agenda tiparita):
                      </Typography>
                    </div>
                    <div className={styles.gridElement}>
                      <Typography variant="profileData">
                        {user.description}
                      </Typography>
                      <span className={styles.underline} />
                    </div>
                  </div>
                  <div className={styles.buttonWrapper}>
                    <UtilityButton
                      variant="contained"
                      type="button"
                      height="41px"
                      onClick={() => setOpenChangeMemberInfo(true)}
                    >
                      Editează datele profilului
                    </UtilityButton>
                  </div>
                </div>
                <div
                  className={styles.profileColumn + " " + styles.columnPicture}
                >
                  <div className={styles.imageWrapper}>
                    <Typography variant="profileLabel">
                      {/* {t("Add profile picture")} */}
                      {profilePic
                        ? "Schimbă imagine de profil"
                        : "Adaugă imagine de profil"}
                    </Typography>
                    <div className={styles.imageWrapperContainer}>
                      <Avatar
                        src={profilePic ? profilePic : DefaultUserPicture}
                        className={styles.avatar}
                      />
                    </div>
                  </div>
                  <div className={styles.buttonWrapper}>
                    <UtilityButton
                      variant="contained"
                      type="button"
                      height="41px"
                      onClick={() => setOpenChangeImage(true)}
                    >
                      {/* {userFileBlob
                                          ? t("CHANGE PHOTO")
                                          : t("UPLOAD")} */}
                      {profilePic ? "SCHIMBĂ FOTOGRAFIA" : "ÎNCARCĂ"}
                    </UtilityButton>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.actionsWrapper}>
              <Typography variant="profileBigText">
                {/* {t("Login data settings")} */}
                Setările datelor de logare
              </Typography>
              <div className={styles.passwordWrapper}>
                <div className={styles.actionInfo}>
                  <Typography variant="profileBigText">
                    {/* {t("Change the password")} */}
                    Schimbă parola
                  </Typography>
                  <Typography variant="profileMediumText">
                    {/* {t(
                      "Update your password as often as possible for better account security"
                    )} */}
                    Actualizează-ți parola cât mai repede pentru o mai bună
                    securizare a contului
                  </Typography>
                </div>
                <Typography
                  variant="profileModifyText"
                  onClick={() => setOpenChangePassword(true)}
                >
                  {/* {t("Modify")} */}
                  Modifică
                </Typography>
              </div>
            </div>

            <ChangePassword
              open={openChangePassword}
              setOpen={setOpenChangePassword}
              userData={user}
            />
            <ChangeProfilePicture
              open={openChangeImage}
              setOpen={setOpenChangeImage}
              userData={user}
            />
            <ChangeMemberInformationModal
              open={openChangeMemberInfo}
              setOpen={setOpenChangeMemberInfo}
              userData={user}
            />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <div className={styles.companiesWrapper}>
              <div className={styles.companiesHeader}>
                <Typography variant="profileBigText">
                  Informații Companie / Companii
                </Typography>
                <UtilityButton
                  startIcon={<AddIcon />}
                  color="primary"
                  onClick={() => {
                    setDataForEdit(null);
                    setOpenAddCompany(true);
                  }}
                  sx={{ width: "100%" }}
                >
                  Adaugă companie
                </UtilityButton>
              </div>

              {user?.Companies?.length > 0 && (
                <div className={styles.companiesContainer}>
                  {user?.Companies?.map((company) => (
                    <React.Fragment key={company.id}>
                      <Company
                        company={company}
                        openAddCompany={openAddCompany}
                        setOpenAddCompany={setOpenAddCompany}
                        setDataForEdit={setDataForEdit}
                      />
                    </React.Fragment>
                  ))}
                </div>
              )}
            </div>

            <AddCompanyModal
              open={openAddCompany}
              setOpen={setOpenAddCompany}
              dataForEdit={dataForEdit}
              userId={user.id}
            />
          </TabPanel>
        </div>
      </>
    </>
  );
};

export default Profile;
