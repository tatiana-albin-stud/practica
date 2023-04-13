import React from "react";
import { Box, Typography, Divider, Button } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import customTheme from "../../theme";
import AddIcon from "@mui/icons-material/Add";
import { useTranslation } from "react-i18next";

const DetailsWrapper = ({
  title,
  children,
  showAdd,
  onAdd,
  padding = true,
}) => {
  const { t } = useTranslation();
  return (
    <ThemeProvider theme={customTheme}>
      <Box
        sx={{
          width: "100%",
          background: "#FFFFFF",
          borderRadius: "1rem",
          minWidth: "25.31rem",
          boxShadow:
            "0px 1px 2px rgba(0, 0, 0, 0.12), 0px 0px 0px 1px rgba(0, 0, 0, 0.05)",
        }}
      >
        <Typography
          variant="h6"
          gutterBottom
          component="div"
          sx={{ paddingTop: "1rem", marginBottom: "1rem", marginLeft: "1rem" }}
        >
          {title}
        </Typography>
        <Divider />

        <Box
          sx={{
            padding: padding ? "1rem" : 0,
          }}
        >
          {children}
        </Box>

        <Divider sx={{ marginBottom: "1rem" }} />

        {showAdd && (
          <Button
            startIcon={<AddIcon />}
            onClick={onAdd}
            sx={{
              height: "2.25rem",
              color: "#5664D2",
              border: "1px solid rgba(86, 100, 210, 0.5)",
              borderRadius: "4rem",
              marginBottom: "0.8rem",
              marginLeft: "0.5rem",
            }}
          >
            {t("Add")}
          </Button>
        )}
      </Box>
    </ThemeProvider>
  );
};

export default DetailsWrapper;
