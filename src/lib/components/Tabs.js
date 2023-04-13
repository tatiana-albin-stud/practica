import { Box, Typography, Divider } from "@mui/material";

const Tabs = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <>
      <Box
        sx={{
          color: "rgba(66, 82, 110, 0.86)",
          marginTop: "4rem",
          display: "flex",
        }}
      >
        {tabs.map((tab) => (
          <Typography
            variant="tabs"
            sx={{
              padding: "1rem",
              cursor: "pointer",
              color: tab.toLowerCase() === activeTab && "#5664D2",
              borderBottom:
                tab.toLowerCase() === activeTab && "2px solid #5664D2",
            }}
            onClick={() => {
              setActiveTab(tab.toLowerCase());
            }}
          >
            {tab}
          </Typography>
        ))}
      </Box>
      <Divider />
    </>
  );
};

export default Tabs;
