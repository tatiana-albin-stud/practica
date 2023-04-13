import React from "react";
import PropTypes from "prop-types";

// mui
import {
  Stack,
  Typography,
  Box,
  Divider,
  IconButton,
  Tooltip,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { ThemeProvider } from "@mui/material/styles";
import customTheme from "../../theme";

function OccupationOverview({ title, tooltip, data }) {
  return (
    <ThemeProvider theme={customTheme}>
      <Box
        sx={{
          backgroundColor: "white",
          pt: "1rem",
          borderRadius: "1rem",
        }}
      >
        <Typography
          variant="cardHeader"
          sx={{
            padding: "1rem",
          }}
        >
          {title}
          <Tooltip title={tooltip}>
            <IconButton>
              <InfoIcon />
            </IconButton>
          </Tooltip>
        </Typography>
        <Stack>
          {data.map((d, index) => (
            <div key={index}>
              <Divider />
              <Stack
                direction="row"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "2rem 1rem",
                }}
              >
                <Typography
                  variant="tableContent"
                  sx={{
                    color: "primaryCustom.main",
                  }}
                >
                  {d.label}
                </Typography>
                <Typography>{d.number}</Typography>
              </Stack>
            </div>
          ))}
        </Stack>
      </Box>
    </ThemeProvider>
  );
}

OccupationOverview.propTypes = {
  title: PropTypes.string,
  tooltip: PropTypes.string,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      number: PropTypes.number,
    })
  ),
};

OccupationOverview.defaultProps = {
  title: "Occupation Overview",
  tooltip: "Lorem ipsum dolor sit amet con",
  data: [
    {
      label: "Ceapa",
      number: 122,
    },
    {
      label: "Ceapa",
      number: 122,
    },
    {
      label: "Ceapa",
      number: 122,
    },
    {
      label: "Ceapa",
      number: 122,
    },
    {
      label: "Ceapa",
      number: 122,
    },
    {
      label: "Ceapa",
      number: 122,
    },
    {
      label: "Ceapa",
      number: 122,
    },
    {
      label: "Ceapa",
      number: 122,
    },
  ],
};

export default OccupationOverview;
