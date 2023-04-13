// react imports
import React, { useState, useRef, useEffect } from "react";
import { useUser } from "hooks/useUser";

import { Formik, Form } from "formik";

import { ThemeProvider } from "@mui/material/styles";
import { Typography, Box, Divider, MenuItem, Avatar } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import { TextField, PasswordField, Select, FileUploadWrapper } from "lib";
import { uploadSingleFile } from "utils/functions";

import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import customTheme from "lib/theme";
import {
  UtilityButton,
  NavigationButton,
} from "lib/components/Buttons/buttons.jsx";

import { toast } from "react-toastify";
import * as yup from "yup";
import { emailRegex, phoneRegex } from "utils/regex";

// import loginImage from "resources/LoginFormImage.png";
import loginImage from "resources/img/InBusiness/logo.png";
import logoRaisis from "resources/LogoRaisisCRM.png";
import DefaultUserPicture from "resources/img/InBusiness/defaultUser.png";
import DefaultCompanyPicture from "resources/img/InBusiness/defaultImage.png";

import styles from "./Login.module.scss";

import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
// import { UsersAPI } from "api_darex";
import { CountiesAPI, UsersAPI } from "api_inbusiness";

function Login() {
  const { t } = useTranslation();

  const formRef = useRef();
  const recoverFormRef = useRef();
  const signUpFormRef = useRef();

  const [recoverPassword, setRecoverPassword] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  const [userFileBlob, setUserFileBlob] = useState(null);
  const [companyFileBlob, setCompanyFileBlob] = useState(null);

  const statusList = [
    {
      id: "guest",
      name: "Invitat",
    },
    {
      id: "activeMember",
      name: "Membru",
    },
    {
      id: "leader",
      name: "Lider Club",
    },
    {
      id: "manager",
      name: "Manager",
    },
  ];

  //TO DO: change this to an empty array
  const [locations, setLocations] = useState([]);

  const { setAccessToken } = useUser();

  /**
   * Login form
   */
  const INITIAL_FORM_STATE = {
    email: "",
    password: "",
  };

  const FORM_VALIDATION = yup.object().shape({
    email: yup
      .string()
      .trim()
      // .matches(emailRegex, t("You must enter a valid email address!"))
      // .required(t("Email address is mandatory!")),
      .matches(emailRegex, "Trebuie să introduceți un format de email valid!")
      .required("Adresa de email este obligatorie!"),
    password: yup
      .string()
      .trim()
      // .typeError(t("You must enter a valid password format!"))
      // .required(t("Password is required!")),
      .typeError("Trebuie să introduceți un format de parolă valid!")
      .required("Parola este obligatorie!"),
  });

  const handleSubmitFormik = () => {
    if (formRef.current) {
      formRef.current.handleSubmit();
    }
  };

  /**
   * Recover password form
   */
  const INITIAL_FORM_STATE_RECOVER = {
    email: "",
  };

  const FORM_VALIDATION_RECOVER = yup.object().shape({
    email: yup
      .string()
      .trim()
      // .matches(emailRegex, t("You must enter a valid email address!"))
      // .required(t("Email address is mandatory!")),
      .matches(emailRegex, "Trebuie să introduceți un format de email valid!")
      .required("Adresa de email este obligatorie!"),
  });

  const handleSubmitRecoverForm = () => {
    if (recoverFormRef.current) {
      recoverFormRef.current.handleSubmit();
    }
  };

  const handleRecoverPassword = async (values) => {
    UsersAPI.recoverPassword(values.email).then((res) => {
      if (res.ok) {
        setRecoverPassword(false);
        // toast.success(t("You have successfully sent the reset link!"));
        toast.success("Ați trimis cu succes linkul de resetare!");
      } else {
        toast.error(t(res.error.response.data.message));
      }
    });
  };

  /**
   * Sign Up form
   */

  const INITIAL_FORM_STATE_SIGNUP = {
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    idCounties: "",
    companyName: "",
    companyDetails: "",
    type: "",
    password: "",
  };

  const FORM_VALIDATION_SIGNUP = yup.object().shape({
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
    email: yup
      .string()
      .trim()
      // .matches(emailRegex, t("You must enter a valid email address!"))
      // .required(t("Email address is mandatory!")),
      .matches(emailRegex, "Trebuie să introduceți un format de email valid!")
      .required("Adresa de email este obligatorie!"),
    idCounties: yup
      .string()
      .trim()
      // .required(t("The club location is mandatory!")),
      .required("Locația clubului este obligatorie!"),
    companyName: yup
      .string()
      // .typeError(t("This company name is not valid!"))
      .typeError("Acest nume de companie nu este valid!")
      .trim()
      // .min(3, t("The company name must contain at least 3 characters!"))
      // .required(t("The company name is mandatory!")),
      .min(3, "Numele companiei trebuie să conțină cel puțin 3 caractere!")
      .required("Numele companiei este obligatoriu!"),
    companyDetails: yup
      .string()
      // .typeError(t("This site name is not valid!"))
      .typeError("Numele acestui site nu este valid!")
      .trim()
      // .min(3, t("The site name must contain at least 3 characters!"))
      // .required(t("The site name is mandatory!")),
      .min(3, "Numele site-ului trebuie să conțină cel puțin 3 caractere!")
      .required("Numele site-ului este obligatoriu!"),
    type: yup.string().trim().required("Statusul este obligatoriu!"),
    password: yup
      .string()
      .typeError("Prenumele nu este valid!")
      .trim()
      .min(1, "Parola trebuie să conțină cel puțin un caracter!")
      .required("Parola este obligatorie!"),
  });

  const handleSubmitSignUpForm = () => {
    if (signUpFormRef.current) {
      signUpFormRef.current.handleSubmit();
    }
  };

  const handleSignUp = (values) => {
    console.log(values);
    //TO DO: sign up request
    // setLoading(true);

    UsersAPI.create(values).then((res) => {
      if (res.ok === true) {
        if (userFileBlob) {
          UsersAPI.addPicture(res.data.id, userFileBlob).then((res) => {
            if (res.ok === true) {
              toast.success(t("Poza de profil a fost adăugată cu succes"));
            } else {
              toast.error(
                t(
                  "A intervenit o eroare! Poza de profil nu a putut fi încărcată!"
                )
              );
            }
          });
        }

        // setTriggerRefetch(!triggerRefetch);
        // setOpen(false);
        // setLoading(false);
        setUserFileBlob(null);
        setShowSignUp(false);
        toast.success(t("Utilizator creat cu succes!"));
      } else {
        if (
          res.error.response.data.errors.message ===
          "Acest email este deja existent!"
        ) {
          // setLoading(false);
          toast.error(
            t("Emailul este folosit! Utilizatorul nu a putut fi creat!")
          );
        } else {
          // setLoading(false);
          toast.error(
            t("A intervenit o eraore. Utilizatorul nu a putut fi creat!")
          );
        }
      }
    });
  };

  /**
   * Upload File Functions
   */

  const handleUserFileUpload = async (e) => {
    await uploadSingleFile(
      e,
      ({ message, blob }) => {
        if (message) {
          toast.error(t(message));
          return;
        }
        setUserFileBlob(blob);
      },
      "image"
    );
  };

  const handleCompanyFileUpload = async (e) => {
    await uploadSingleFile(
      e,
      ({ message, blob }) => {
        if (message) {
          toast.error(t(message));
          return;
        }
        setCompanyFileBlob(blob);
      },
      "image"
    );
  };

  /**
   * UseEffects
   */
  useEffect(() => {
    const keyDownHandler = (event) => {
      if (event.key === "Enter") {
        event.preventDefault();

        if (recoverPassword === true) {
          handleSubmitRecoverForm();
        } else if (showSignUp === true) {
          handleSubmitSignUpForm();
        } else {
          handleSubmitFormik();
        }
      }
    };

    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, [recoverPassword, showSignUp]);

  const getLocations = async () => {
    CountiesAPI.get()
      .then((res) => {
        if (res.ok) {
          setLocations(res.data.content);
        } else {
          throw new Error("Request failed");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getLocations();
  }, []);

  return (
    <>
      <Helmet>
        {/* <title>InBusiness Club Suceava :: {t("Login")}</title> */}
        <title>InBusiness Club Suceava :: Autentificare</title>
      </Helmet>
      <ThemeProvider theme={customTheme}>
        <Box
          sx={{
            width: "100vw",
            minHeight: "100vh",
            backgroundColor: "#FFFFFF",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              position: "relative",
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              paddingTop: "2.5rem",
            }}
          >
            <Box
              sx={{
                maxWidth: showSignUp ? "100%" : "500px",
                flexShrink: 0,
                borderRadius: "15px",
                padding: "25px 32px",
                boxShadow: "#eaeef4 0px 7px 29px 0px;",
              }}
              className={`${styles.boxWidth} ${
                showSignUp && styles.boxSignUpWidth
              }`}
            >
              <div className={styles.imageWrapper}>
                <img
                  style={{
                    width: "100%",
                    maxWidth: "400px",
                  }}
                  src={loginImage}
                  alt="InBusiness Logo"
                />
              </div>
              {!recoverPassword && !showSignUp ? (
                <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                  <Formik
                    innerRef={formRef}
                    initialValues={{
                      ...INITIAL_FORM_STATE,
                    }}
                    validationSchema={FORM_VALIDATION}
                  >
                    <Form>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "25px",
                        }}
                      >
                        <TextField name="email" label="Email" />
                        {/* <PasswordField name="password" label={t("Password")} /> */}
                        <PasswordField name="password" label={"Parola"} />
                      </div>
                    </Form>
                  </Formik>

                  <UtilityButton
                    onClick={handleSubmitFormik}
                    color="blue"
                    variant="contained"
                    style={{
                      padding: "12px 14px",
                    }}
                  >
                    {/* {t("Login")} */}
                    Autentifică-te
                  </UtilityButton>
                  <Divider />

                  <div
                    className={`${
                      styles.buttonsWrapper + " " + styles.buttonsWidthFull
                    }`}
                  >
                    <UtilityButton
                      onClick={() => setShowSignUp(true)}
                      color="blue"
                      style={{
                        padding: "12px 14px;",
                      }}
                    >
                      {/* {t("Sign Up")} */}
                      Înregistreză-te
                    </UtilityButton>

                    <UtilityButton
                      onClick={() => setRecoverPassword(true)}
                      color="blue"
                      style={{
                        padding: "12px 14px;",
                      }}
                    >
                      {/* {t("Recover password")} */}
                      Recuperează parola
                    </UtilityButton>
                  </div>
                </Box>
              ) : recoverPassword ? (
                <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  <div>
                    <NavigationButton
                      onClick={() => setRecoverPassword(false)}
                      startIcon={<NavigateBeforeIcon />}
                    >
                      <Typography
                        sx={{ fontSize: "12px", color: "rgba(0, 0, 0, 0.62)" }}
                      >
                        {/* <div>{t("Back")}</div> */}
                        <div>Înapoi</div>
                      </Typography>
                    </NavigationButton>
                  </div>
                  <Typography variant="loginForm">
                    {/* {t(
                      "Enter the email address you created your account with. You will receive a password reset link at this address."
                    )} */}
                    Introduceți adresa de email pe care are ați creat contul
                    dumneavoastră. Pe această adresa veți primi un link de
                    resetare a parolei.
                  </Typography>

                  <Formik
                    innerRef={recoverFormRef}
                    initialValues={{
                      ...INITIAL_FORM_STATE_RECOVER,
                    }}
                    validationSchema={FORM_VALIDATION_RECOVER}
                    onSubmit={(values) => {
                      handleRecoverPassword(values);
                    }}
                  >
                    <Form>
                      <TextField name="email" label="Email" />
                    </Form>
                  </Formik>

                  <UtilityButton
                    onClick={handleSubmitRecoverForm}
                    color="blue"
                    variant="contained"
                    style={{
                      padding: "12px 14px",
                    }}
                  >
                    {/* {t("Send reset link")} */}
                    Trimitere link de resetare
                  </UtilityButton>
                </Box>
              ) : showSignUp ? (
                <React.Fragment>
                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 4 }}
                  >
                    <Formik
                      innerRef={signUpFormRef}
                      initialValues={{ ...INITIAL_FORM_STATE_SIGNUP }}
                      validationSchema={FORM_VALIDATION_SIGNUP}
                      onSubmit={(values) => {
                        handleSignUp(values);
                      }}
                    >
                      <Form className={styles.formComponent}>
                        <div className={styles.formWrapper}>
                          <div className={styles.formContainer}>
                            <div className={styles.formColumn}>
                              <div className={styles.columnContainer}>
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

                                <PasswordField
                                  name="password"
                                  label={"Parola"}
                                />
                                <TextField
                                  name="phone"
                                  // label={`${t("Phone")}*`}
                                  label="Telefon*"
                                  size="medium"
                                  type="tel"
                                />
                                <TextField
                                  name="email"
                                  // label={`${t("Email")}*`}
                                  label="Email*"
                                  size="medium"
                                  type="email"
                                />
                                <Select
                                  name="idCounties"
                                  size="medium"
                                  // label={`${t("Club location")}*`}
                                  label="Locația clubului*"
                                >
                                  {locations.map((location) => {
                                    return (
                                      <MenuItem
                                        key={location.id}
                                        value={location.id}
                                      >
                                        {location.name}
                                      </MenuItem>
                                    );
                                  })}
                                </Select>
                                <TextField
                                  name="companyName"
                                  // label={`${t("Company")}*`}
                                  label="Companie*"
                                  size="medium"
                                />
                                <TextField
                                  name="companyDetails"
                                  // label={`${t("Site")}*`}
                                  label="Site*"
                                  size="medium"
                                />
                                <Select
                                  name="type"
                                  label={"Status*"}
                                  size="medium"
                                >
                                  {statusList.map((status) => {
                                    return (
                                      <MenuItem
                                        key={status.id}
                                        value={status.id}
                                        sx
                                      >
                                        {status.name}
                                      </MenuItem>
                                    );
                                  })}
                                </Select>
                              </div>
                            </div>

                            <div className={styles.formColumn}>
                              <div className={styles.columnContainer}>
                                <div className={styles.imageWrapper}>
                                  <Typography className={styles.text}>
                                    {/* {t("Add profile picture")} */}
                                    Adaugă imagine de profil
                                  </Typography>
                                  <div className={styles.imageWrapperContainer}>
                                    <Avatar
                                      src={
                                        userFileBlob
                                          ? URL.createObjectURL(userFileBlob)
                                          : DefaultUserPicture
                                      }
                                      className={styles.avatar}
                                    />
                                    <FileUploadWrapper
                                      onUpload={handleUserFileUpload}
                                    >
                                      <UtilityButton
                                        variant="contained"
                                        type="button"
                                        height="41px"
                                      >
                                        {/* {userFileBlob
                                          ? t("CHANGE PHOTO")
                                          : t("UPLOAD")} */}
                                        {userFileBlob
                                          ? "SCHIMBĂ FOTOGRAFIA"
                                          : "ÎNCARCĂ"}
                                      </UtilityButton>
                                    </FileUploadWrapper>
                                  </div>
                                </div>
                                <div className={styles.imageWrapper}>
                                  <Typography className={styles.text}>
                                    {/* {t("Add company logo")} */}
                                    Adaugă logo-ul companiei
                                  </Typography>
                                  <div className={styles.imageWrapperContainer}>
                                    <Avatar
                                      src={
                                        companyFileBlob
                                          ? URL.createObjectURL(companyFileBlob)
                                          : DefaultCompanyPicture
                                      }
                                      className={styles.avatar}
                                      variant="rounded"
                                    />
                                    <FileUploadWrapper
                                      onUpload={handleCompanyFileUpload}
                                    >
                                      <UtilityButton
                                        variant="contained"
                                        type="button"
                                        height="41px"
                                      >
                                        {/* {companyFileBlob
                                          ? t("CHANGE PHOTO")
                                          : t("UPLOAD")} */}
                                        {companyFileBlob
                                          ? "SCHIMBĂ FOTOGRAFIA"
                                          : "ÎNCARCĂ"}
                                      </UtilityButton>
                                    </FileUploadWrapper>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Form>
                    </Formik>
                    <Divider />
                    <div
                      className={`${styles.buttonsWrapper} ${styles.buttonsWidth40}`}
                    >
                      <UtilityButton
                        onClick={() => setShowSignUp(false)}
                        color="blue"
                        style={{
                          padding: "12px 14px;",
                        }}
                      >
                        {/* {t("Back to Login")} */}
                        Înapoi la autentificare
                      </UtilityButton>

                      <UtilityButton
                        onClick={handleSubmitSignUpForm}
                        color="blue"
                        variant="contained"
                        type="submit"
                        style={{
                          padding: "12px 14px",
                        }}
                      >
                        {/* {t("Sign Up")} */}
                        Înregistreză-te
                      </UtilityButton>
                    </div>
                  </Box>
                </React.Fragment>
              ) : (
                <React.Fragment>&nbsp;</React.Fragment>
              )}
              {/* <div className={styles.allRights}>
                <p>
                  &copy; <span>INBUSINESS CLUB. </span>
                  {t("All rights reserved")}
                </p>
              </div> */}
            </Box>
          </Box>

          <img
            src={logoRaisis}
            alt="logo raisis"
            style={{
              flexShrink: 0,
              width: "35%",
              maxWidth: "256px",
              paddingBlock: "2.5rem",
            }}
          ></img>
        </Box>
      </ThemeProvider>
    </>
  );
}

export default Login;
