import React from "react";
import { useRef, useState } from "react";

import * as yup from "yup";
import { Formik, Form } from "formik";
import { CustomDialog, TextField, FileUploadWrapper } from "lib";
import { toast } from "react-toastify";

import styles from "./Profile.module.scss";

import { Avatar, Typography } from "@mui/material";
import DefaultCompanyPicture from "resources/img/InBusiness/defaultImage.png";
import { uploadSingleFile } from "utils/functions";
import { UtilityButton } from "lib/components/Buttons/buttons";
import { CompaniesAPI } from "api_inbusiness";
import { RemoveButton, ConfirmButton } from "lib/components/Buttons/buttons";

const AddCompanyModal = ({
  open,
  setOpen,
  dataForEdit,
  userId,
  getUpdatedUser,
}) => {
  const [blobCompanyImage, setBlobCompanyImage] = useState(null);

  const formRef = useRef();

  const INITIAL_FORM_STATE = {
    name: dataForEdit?.name ? dataForEdit.name : "",
    site: dataForEdit?.site ? dataForEdit.site : "",
    description: dataForEdit?.description ? dataForEdit.description : "",
    phone: dataForEdit?.phone ? dataForEdit.phone : "",
  };

  const FORM_VALIDATION = yup.object().shape({
    name: yup.string().trim().required("Numele companiei este obligatoriu"),
    site: yup.string().trim().required("Numele site-ului este obligatoriu"),
  });

  const handleAddCompany = (values) => {
    CompaniesAPI.create({ userId, ...values }).then((res) => {
      if (res.ok) {
        if (blobCompanyImage) {
          CompaniesAPI.addPicture(res.data.id, blobCompanyImage).then(
            (resImg) => {
              if (resImg.ok) {
                toast.success("Logo-ul companiei a fost incarcat cu succes!");
                toast.success("Compania a fost creată!");
                getUpdatedUser();
                setBlobCompanyImage(null);
                // setOpen(false);
              } else {
                toast.success("Compania a fost creată!");
                toast.error("Logo-ul companiei nu a putut fi încarcat!");
              }
            }
          );
        } else {
          toast.success("Compania a fost creată!");
          getUpdatedUser();
          setBlobCompanyImage(null);
          setOpen(false);
        }
      } else {
        toast.error("Compania nu a putut fi creată!");
        setBlobCompanyImage(null);
        setOpen(false);
      }
    });
  };

  const handleFileUpload = async (e) => {
    await uploadSingleFile(
      e,
      ({ message, blob }) => {
        if (message) {
          toast.error(message);
          return;
        }
        setBlobCompanyImage(blob);
      },
      "image"
    );
  };

  const handleSubmit = () => {
    if (formRef.current) {
      formRef.current.handleSubmit();
    }
  };

  const handleEditCompany = (values) => {
    CompaniesAPI.update(dataForEdit.id, { ...values }).then((res) => {
      if (res.ok) {
        if (blobCompanyImage) {
          CompaniesAPI.addPicture(res.data.id, blobCompanyImage).then(
            (resImg) => {
              if (resImg.ok) {
                toast.success("Logo-ul companiei a fost incarcat cu succes!");
                toast.success("Compania a fost editată!");
                getUpdatedUser();
                setBlobCompanyImage(null);
                setOpen(false);
              } else {
                toast.success("Compania a fost editată!");
                toast.error("Logo-ul companiei nu a putut fi încarcat!");
              }
            }
          );
        } else {
          toast.success("Compania a fost editată!");
          getUpdatedUser();
          setBlobCompanyImage(null);
          setOpen(false);
        }
      } else {
        toast.error("Compania nu a putut fi editată!");
        setBlobCompanyImage(null);
        setOpen(false);
      }
    });
  };

  return (
    <CustomDialog
      open={open}
      setOpen={setOpen}
      //   title={t("Edit profile information")}
      title={dataForEdit ? "Editează companie noua" : "Adaugă companie noua"}
      //   buttonClose={t("BACK")}
      buttonClose={"ÎNAPOI"}
      //   buttonFinish={t("COMPLETE")}
      buttonFinish={"FINALIZEAZĂ"}
      onClickButtonFinish={handleSubmit}
      maxWidth="650px"
      width="100%"
      handleClose={() => {
        setBlobCompanyImage(null);
        setOpen(false);
      }}
    >
      <Formik
        innerRef={formRef}
        initialValues={{
          ...INITIAL_FORM_STATE,
        }}
        validationSchema={FORM_VALIDATION}
        onSubmit={(values) => {
          if (dataForEdit) {
            handleEditCompany(values);
          } else {
            handleAddCompany(values);
          }
        }}
      >
        <Form className={styles.formWrapper}>
          <div className={styles.textFieldsWrapper}>
            <TextField name="name" label="Nume*" size="medium" />
            <TextField name="phone" label="Număr de telefon*" size="medium" />
            <TextField name="site" label="Site*" size="medium" />
            <TextField
              name="description"
              label="Descrierea firmei"
              size="medium"
              multiline
              rows={6}
            />
          </div>

          <div className={styles.imageWrapper}>
            <Avatar
              src={
                dataForEdit?.companyImage && !blobCompanyImage
                  ? dataForEdit?.companyImage
                  : blobCompanyImage
                  ? URL.createObjectURL(blobCompanyImage)
                  : DefaultCompanyPicture
              }
              alt={
                dataForEdit?.name
                  ? dataForEdit.name
                  : blobCompanyImage?.name
                  ? blobCompanyImage.name
                  : "Company Image"
              }
              className={styles.avatar}
              variant="rounded"
            />
            <FileUploadWrapper onUpload={handleFileUpload}>
              <UtilityButton variant="contained" type="button" height="41px">
                {/* {userFileBlob
                                          ? t("CHANGE PHOTO")
                                          : t("UPLOAD")} */}
                {blobCompanyImage || dataForEdit?.companyImage
                  ? "SCHIMBĂ FOTOGRAFIA"
                  : "ÎNCARCĂ"}
              </UtilityButton>
            </FileUploadWrapper>
          </div>
        </Form>
      </Formik>
    </CustomDialog>
  );
};

export default AddCompanyModal;
