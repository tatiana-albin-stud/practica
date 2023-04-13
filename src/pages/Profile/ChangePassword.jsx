import React from "react";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import * as yup from "yup";
import { Formik, Form } from "formik";
import { PasswordField } from "lib";
import { CustomDialog } from "lib";
import { passwordRegex } from "utils/regex";
import { toast } from "react-toastify";
import { UsersAPI } from "api_inbusiness";
import styles from "./Profile.module.scss";

const ChangePassword = ({ open, setOpen, userData }) => {
  const { t } = useTranslation();
  const formRef = useRef();
  const [loading, setLoading] = useState(false);

  const INITIAL_FORM_STATE = {
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  };

  const FORM_VALIDATION = yup.object().shape({
    currentPassword: yup
      .string()
      .trim()
      .when("newPassword", {
        is: (val) => (val && val.length > 0 ? true : false),
        then: yup
          .string()
          .notOneOf(
            [yup.ref("newPassword")],
            t("The new password must be different from the old password!")
          ),
      })
      .required(t("The current password is mandatory!")),
    newPassword: yup
      .string()
      .trim()
      .matches(
        passwordRegex,
        t(
          "You have entered an invalid password! Password must contain at least 8 characters, one capital letter and one number!"
        )
      )
      .required(t("The new password is mandatory!")),
    confirmNewPassword: yup
      .string()
      .trim()
      .when("newPassword", {
        is: (val) => (val && val.length > 0 ? true : false),
        then: yup
          .string()
          .oneOf(
            [yup.ref("newPassword")],
            t("Both passwords need to be the same!")
          ),
      })
      .required(t("The confirm password is mandatory!")),
  });

  const handleSubmit = () => {
    if (formRef.current) {
      formRef.current.handleSubmit();
    }
  };

  const handleChangePassword = ({ values }) => {
    setLoading(true);
    UsersAPI.changeUserPassword(
      userData.email,
      values.currentPassword,
      values.newPassword
    ).then((res) => {
      if (res.ok) {
        setOpen(false);
        setLoading(false);
        toast.success(t("You have successfully reset your password!"));
      } else if (res.error === "Old password doesn't match") {
        setLoading(false);
        toast.error(t("Current password doesn't match!"));
      } else {
        setLoading(false);
        toast.error(t("Something went wrong!"));
      }
    });
  };

  return (
    <CustomDialog
      open={open}
      setOpen={setOpen}
      title={t("Change the password")}
      buttonClose={t("BACK")}
      buttonFinish={t("COMPLETE")}
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
          handleChangePassword({ values });
        }}
        onClickButtonClose={() => {
          setOpen(false);
          setLoading(false);
        }}
        buttonFinishLoading={loading}
        buttonCloseDisabled={loading}
      >
        <Form>
          <div className={styles.changeWrapper}>
            <PasswordField
              name="currentPassword"
              type="password"
              label={`${t("Current password")}`}
              size="medium"
            />
            <PasswordField
              name="newPassword"
              type="password"
              label={`${t("New password")}`}
              size="medium"
            />
            <PasswordField
              name="confirmNewPassword"
              type="password"
              label={`${t("Confirm password")}`}
              size="medium"
            />
          </div>
        </Form>
      </Formik>
    </CustomDialog>
  );
};

export default ChangePassword;
