import { Group } from '@mui/icons-material'
import { Box, Button, Paper, Typography, useTheme, useMediaQuery } from '@mui/material'
import { Link } from 'react-router'

export default function HomePage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));  // Mobile detection

  return (
    <Paper
      sx={{
        color: 'white',
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'column', // Stack on mobile
        gap: isMobile ? 3 : 6, // Reduce gap for mobile
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundImage: 'linear-gradient(135deg, #182a73 0%, #218aae 69%, #20a7ac 89%)',
        padding: isMobile ? '20px' : '0', // Adjust padding for mobile
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: isMobile ? 2 : 3, // Adjust gap for mobile
        }}
      >
        <Group sx={{ height: isMobile ? 60 : 110, width: isMobile ? 60 : 110 }} />
        <Typography variant={isMobile ? "h4" : "h1"}>Reactivities</Typography> {/* Adjust title size */}
      </Box>
      <Typography variant={isMobile ? "h5" : "h2"} textAlign="center">Welcome To reactivities</Typography>
      <Button
        component={Link}
        to="/activities"
        size="large"
        variant="contained"
        sx={{
          width: isMobile ? '100%' : 'auto',  // Full width on mobile
          padding: isMobile ? '10px 0' : '12px 24px', // Adjust button padding
        }}
      >
        Take me to the activities!
      </Button>
    </Paper>
  );
}
