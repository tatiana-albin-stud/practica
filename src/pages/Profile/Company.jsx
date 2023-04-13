import React, { useEffect, useState } from "react";
import styles from "./Company.module.scss";
import { Typography, Avatar } from "@mui/material";
import { CompaniesAPI } from "api_inbusiness";
import DefaultCompanyPicture from "resources/img/InBusiness/defaultImage.png";
import { EditButton, RemoveButton } from "lib/components/Buttons/buttons";
import ConfirmModal from "lib/components/Modals/ConfirmModal";

const Company = ({
  company = null,
  setOpenAddCompany = () => {},
  setDataForEdit = () => {},
  withButtons = true,
}) => {
  const [companyImage, setCompanyImage] = useState(null);
  const [open, setOpen] = useState(false);

  const getCompanyImage = () => {
    CompaniesAPI.getCompaniesLogos(company.logo).then((res) => {
      if (res.ok) {
        setCompanyImage(res.data);
      }
    });
  };

  useEffect(() => {
    getCompanyImage();
  }, []);

  const handleDelete = () => {
    setOpen(false);
  };

  return (
    <>
      <div className={styles.companyWrapper}>
        <div className={styles.imageBox}>
          <img
            className={styles.imageContent}
            src={companyImage ? companyImage : DefaultCompanyPicture}
            alt="Company"
          />
        </div>

        <Typography variant="profileLabel" className={styles.name}>
          {company.name}
        </Typography>
        {company.phone && (
          <Typography variant="profileLabel" className={styles.name}>
            {company.phone}
          </Typography>
        )}

        <a href={company.site} target="_black">
          <Typography variant="offerDataText" className={styles.site}>
            {company.site}
          </Typography>
        </a>

        {withButtons ? (
          <div className={styles.buttonsWrapper}>
            <EditButton
              color="blue"
              onClick={() => {
                setDataForEdit({ ...company, companyImage });
                setOpenAddCompany(true);
              }}
            />
            <RemoveButton color="red" onClick={() => setOpen(true)} />
          </div>
        ) : (
          <div></div>
        )}
      </div>

      <ConfirmModal
        text={"Sunteți sigur că doriți să ștergeți acesta companie?"}
        buttonYes={"DA"}
        buttonNo={"NU"}
        onClickButtonYes={handleDelete}
        open={open}
        setOpen={setOpen}
      />
    </>
  );
};

export default Company;
