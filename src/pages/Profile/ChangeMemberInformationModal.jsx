import React from "react";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import * as yup from "yup";
import { Formik, Form } from "formik";
import { CustomDialog, TextField } from "lib";
import { toast } from "react-toastify";
import { phoneRegex } from "utils/regex";
import styles from "./Profile.module.scss";
import { UsersAPI } from "api_inbusiness";

const ChangeMemberInformationModal = ({
  open,
  setOpen,
  userData,
  getUserById,
}) => {
  /**
   * Edit profile form
   */
  const formRef = useRef();

  const INITIAL_FORM_STATE = {
    firstName: userData.firstName,
    lastName: userData.lastName,
    phone: userData.phone,
    companyDetails: userData.companyDetails,
    description: userData.description,
  };

  const FORM_VALIDATION = yup.object().shape({
    firstName: yup
      .string()
      // .typeError(t("The first name is not valid!"))
      .typeError("Prenumele nu este valid!")
      .trim()
      // .min(1, t("The first name must contain at least 1 characters!"))
      // .required(t("The first name is mandatory!")),
      .min(1, "Prenumele trebuie să conțină cel puțin un caracter!")
      .required("Prenumele este obligatoriu!"),
    lastName: yup
      .string()
      // .typeError(t("This last name is not valid!"))
      .typeError("Acest nume de familie nu este valabil!")
      .trim()
      // .min(1, t("The last name must contain at least 1 characters!"))
      // .required(t("The last name is mandatory!")),
      .min(1, "Numele de familie trebuie să conțină cel puțin un caracter!")
      .required("Numele de familie este obligatoriu!"),
    phone: yup
      .string()
      .trim()
      // .matches(phoneRegex, t("The phone number you introduced is not a valid one!"))
      // .required(t("Phone number is mandatory!")),
      .matches(phoneRegex, "Trebuie sa introduceti un numar de telefon valid!")
      .required("Numărul de telefon este obligatoriu!"),
    companyDetails: yup.string().trim(),
    description: yup.string().trim(),
  });

  const handleSubmit = () => {
    if (formRef.current) {
      formRef.current.handleSubmit();
    }
  };

  const handleEditProfile = (values) => {
    UsersAPI.update(userData.id, values).then((res) => {
      if (res.ok) {
        getUserById();
        setOpen(false);
        toast.success("Profilul a fost actualizata cu succes");
      } else {
        toast.error("Profilul nu a putut fi actualizat");
      }
    });
  };

  return (
    <CustomDialog
      open={open}
      setOpen={setOpen}
      //   title={t("Edit profile information")}
      title={"Editează informațiile profilului"}
      //   buttonClose={t("BACK")}
      buttonClose={"ÎNAPOI"}
      //   buttonFinish={t("COMPLETE")}
      buttonFinish={"FINALIZEAZĂ"}
      onClickButtonFinish={handleSubmit}
      width="580px"
    >
      <Formik
        innerRef={formRef}
        initialValues={{
          ...INITIAL_FORM_STATE,
        }}
        validationSchema={FORM_VALIDATION}
        onSubmit={(values) => {
          handleEditProfile(values);
        }}
      >
        <Form className={styles.formWrapperChangeMemberInformation}>
          <TextField
            name="lastName"
            // label={`${t("Last Name")}*`}
            label="Nume*"
            size="medium"
          />
          <TextField
            name="firstName"
            // label={`${t("First Name")}*`}
            label="Prenume*"
            size="medium"
          />
          <TextField
            name="phone"
            // label={`${t("Phone")}*`}
            label="Telefon*"
            size="medium"
            type="tel"
          />
          <TextField
            name="companyDetails"
            label="Detalii Companie/Companii"
            size="medium"
            multiline
            rows={6}
          />
          <TextField
            name="description"
            label="Scurta descriere (va aparea pe agenda tiparita)"
            size="medium"
            multiline
            rows={6}
          />
        </Form>
      </Formik>
    </CustomDialog>
  );
};

export default ChangeMemberInformationModal;
