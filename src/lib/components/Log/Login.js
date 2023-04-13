// mui imports
import {
  Typography,
  Stack,
  Button,
  TextField,
  Container,
  Box,
} from "@mui/material";
import LogoDevIcon from "@mui/icons-material/LogoDev";
import { ThemeProvider } from "@mui/material/styles";
import customTheme from "../../theme";

function Login({
  email,
  onEmailChange,
  password,
  onPasswordChange,
  onSubmit,
  handleKeyPress,
}) {
  return (
      <ThemeProvider theme={customTheme}>
          <Box
              sx={{
                  backgroundColor: '#ffffff',
                  width: '34.5rem',
                  borderRadius: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'column',
                  padding: '2.5rem',
                  backgroundColor: 'red',
              }}
          >
              <Stack
                  sx={{
                      display: 'flex',
                      width: '100%',
                      height: '100%',
                  }}
              >
                  <Container
                      disableGutters
                      direction="row"
                      sx={{
                          width: '100%',
                          display: 'flex',
                      }}
                  >
                      <Container disableGutters>
                          <Typography
                              variant="h3"
                              sx={{
                                  fontWeight: 900,
                                  color: '#253858',
                                  mb: '1rem',
                              }}
                          >
                              Sign in
                          </Typography>
                          <Typography sx={{ marginBottom: '3rem' }}>Sign out on the internal platform</Typography>
                      </Container>
                      <LogoDevIcon
                          sx={{
                              fontSize: '5rem',
                              color: 'orange',
                          }}
                      />
                  </Container>
                  <Stack spacing={4}>
                      <TextField
                          value={email}
                          onChange={onEmailChange}
                          required
                          id="outlined-required"
                          label="Email"
                          sx={{
                              // boxShadow: "4px 4px 4px rgba(0, 0, 0, 0.25)",
                              fieldset: { borderRadius: '1rem' },
                          }}
                      />
                      <TextField
                          value={password}
                          onChange={onPasswordChange}
                          required
                          id="outlined-adornment-password"
                          label="Password"
                          sx={{
                              fieldset: { borderRadius: '1rem' },
                          }}
                      />
                      <Button
                          onClick={onSubmit}
                          onKeyDown={handleKeyPress}
                          sx={{
                              width: 'fit-content',
                              textAlign: 'center',
                              fontWeight: '900',
                              color: '#253858',
                          }}
                      >
                          Log out
                      </Button>
                  </Stack>
              </Stack>
          </Box>
      </ThemeProvider>
  );
}

export default Login;

// proptypes
