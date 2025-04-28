import { Box, Container, CssBaseline } from "@mui/material";
import NavBar from "./NavBar";
import { Outlet, ScrollRestoration, useLocation } from "react-router";
import HomePage from "../../features/home/HomePage";
import { useTheme, useMediaQuery } from "@mui/material";

function App() {
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box sx={{ bgcolor: "#eeeeee", minHeight: "100vh" }}>
      <ScrollRestoration />
      <CssBaseline />

      {/* Home page */}
      {location.pathname === "/" ? (
        <HomePage />
      ) : (
        <>
          {/* NavBar stays fixed at the top */}
          <NavBar />

          {/* Content area */}
          <Container
            maxWidth="xl"
            sx={{
              pt: isMobile ? 8 : 10, // Adjust padding based on screen size
              pb: 4, // Add bottom padding for better spacing
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center", // Ensures centered layout
              minHeight: isMobile ? '100vh' : 'auto', // Full screen on mobile
            }}
          >
            <Outlet />
          </Container>
        </>
      )}
    </Box>
  );
}

export default App;
