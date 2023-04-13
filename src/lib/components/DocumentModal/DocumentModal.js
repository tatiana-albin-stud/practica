import React, { useEffect, useRef, useState } from "react";
import { Typography, Box, Grid, TextField, Stack } from "@mui/material";
import { CustomDialog } from "lib";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const DocumentModal = (props) => {
  const { open, setOpen, handleSubmit } = props;
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState("");
  const [type, setType] = useState("OTHER");
  const [file, setFile] = useState(null);
  const fileRef = useRef(null);
  const { t } = useTranslation();

  useEffect(() => {
    if (!open) {
      setEdit(false);
      return;
    }

    if (open === true) {
      setName("");
      setFile(null);
      setType("OTHER");
      return;
    }

    setEdit(true);
    setName(Boolean(open.docs) ? open.docs.name : open.type);
    setType(open.type);
    setFile(null);
  }, [open]);

  const handleChange = (e) => {
    setFile(e.target.files[0]);
    e.target.value = "";
  };

  const prepareFormData = () => {
    if (!file) {
      toast.error(t("You didn't upload any file!"));
      return;
    }
    const formData = new FormData();
    formData.set("name", name);
    formData.set("type", type);
    formData.set("file", file, file.name);
    handleSubmit(formData);
  };

  return (
    <CustomDialog
      handleClose={() => setOpen(false)}
      open={Boolean(open)}
      title={t("Add document")}
      button1={t("Finalize")}
      button2={t("Quit")}
      onClickButton1={() => prepareFormData()}
    >
      <Box
        sx={{
          p: 2,
          backgroundColor: "white",
          borderRadius: "1.5rem",
          height: "100%",
        }}
      >
        <Grid container justifyContent={"space-between"} spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              autoComplete={"off"}
              sx={{
                width: "33.87rem",
                fieldset: {
                  borderRadius: "1.5rem",
                },
              }}
              required
              id="outlined-required"
              label={t("Name")}
              value={name}
              onChange={(e) => (!edit ? setName(e.target.value) : {})}
            />
          </Grid>
          <Grid item xs={12}>
            <Box
              sx={{
                borderRadius: "1.5rem",
                border: 1,
                padding: "20px",
              }}
            >
              <Stack direction="row">
                <NoteAddIcon
                  style={{
                    color: "turquoise",
                    width: "79px",
                    height: "87px",
                  }}
                />
                <Stack
                  direction="column"
                  display="flex"
                  justifyContent={"center"}
                >
                  <Typography variant="h5">{t("Select the file")}</Typography>
                  <Typography>
                    Drag and drop or
                    <button
                      style={{
                        background: "none",
                        border: "none",
                        fontFamily: ["Montserrat", "sans-serif"],
                        fontSize: "16px",
                        borderBottom: "1px solid black",
                      }}
                      onClick={() => fileRef.current.click()}
                    >
                      search
                    </button>
                    in your computer
                    <input
                      ref={fileRef}
                      onChange={handleChange}
                      multiple={false}
                      type="file"
                      hidden
                    />
                    {file ? (
                      <>
                        <Typography
                          sx={{
                            fontSize: "0.8rem",
                            fontStyle: "italic",
                            marginRight: "0.4rem",
                          }}
                        >
                          {file.name}
                        </Typography>
                      </>
                    ) : (
                      <label htmlFor="zip"></label>
                    )}
                  </Typography>
                </Stack>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </CustomDialog>
  );
};

export default DocumentModal;
