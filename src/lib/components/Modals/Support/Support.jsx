import React, { useRef } from "react";
import { CustomDialog, TextField, Tooltip } from "lib";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import { Formik, Form } from "formik";
import InfoIcon from "@mui/icons-material/Info";
import { useUser } from "hooks/useUser";
import { toast } from "react-toastify";

const TehnicalSupport = ({ open, setOpen }) => {
  const { t } = useTranslation();
  const formRef = useRef();
  const { user } = useUser();

  const INITIAL_FORM_STATE = {
    description: "",
  };

  const FORM_VALIDATION = yup.object().shape({
    description: yup
      .string()
      .typeError(
        t("You must complete the field with a question or a bug description!")
      )
      .trim()
      .required(
        t("You must complete the field with a question or a bug description!")
      ),
  });

  const handleSubmit = () => {
    if (formRef.current) {
      formRef.current.handleSubmit();
    }
  };

  return (
    <CustomDialog
      open={open}
      setOpen={setOpen}
      title={"Primește ajutor"}
      buttonClose={"Înapoi"}
      buttonFinish={"Trimite"}
      onClickButtonFinish={handleSubmit}
      width="580px"
      onClickButtonClose={() => {
        setOpen(false);
      }}
      // buttonFinishLoading={loading}
      // buttonCloseDisabled={loading}
    >
      <Formik
        innerRef={formRef}
        initialValues={{
          ...INITIAL_FORM_STATE,
        }}
        validationSchema={FORM_VALIDATION}
      >
        <Form>
          <TextField
            name="description"
            label={t("Descriere / Întrebare")}
            size="medium"
            multiline
            rows={6}
          />

          <Tooltip
            position="right"
            textTip={t(
              "* When describing a bug, you must present it in as much detail as possible, describe the steps do within the platform until you discover your bug and other relevant details!"
            )}
            style={{
              border: "1px solid",
              borderColor: "#ff4b55",
              color: "#ff4b55",
              fontSize: "13px",
            }}
          >
            <div
              style={{
                display: "inline-flex",
                color: "#ff4b55",
                marginTop: "0.5rem",
              }}
            >
              <InfoIcon
                sx={{
                  fontSize: "22px",
                }}
              />
            </div>
          </Tooltip>
        </Form>
      </Formik>
    </CustomDialog>
  );
};

export default TehnicalSupport;
