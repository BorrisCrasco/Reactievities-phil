import { Box, Paper, Tab, Tabs, useMediaQuery, useTheme } from "@mui/material";
import { SyntheticEvent, useState } from "react";
import ProfilePhotos from "./ProfilePhotos";
import ProfileAbout from "./ProfileAbout";
import ProfileFollowings from "./ProfileFollowings";
import ProfileActivities from "./ProfileActivities";

export default function ProfileContent() {
  const [value, setValue] = useState(0);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleChange = (_: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const tabContent = [
    { label: 'About', content: <ProfileAbout /> },
    { label: 'Photos', content: <ProfilePhotos /> },
    { label: 'Events', content: <ProfileActivities /> },
    { label: 'Followers', content: <ProfileFollowings activeTab={value} /> },
    { label: 'Following', content: <ProfileFollowings activeTab={value} /> },
  ];

  return (
    <Box
      component={Paper}
      mt={2}
      p={3}
      elevation={3}
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        alignItems: 'flex-start',
        borderRadius: 3,
        minHeight: 500,
      }}
    >
      <Tabs
        orientation={isMobile ? 'horizontal' : 'vertical'}
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        allowScrollButtonsMobile
        sx={{
          borderRight: { sm: 1, xs: 0 },
          borderBottom: { xs: 1, sm: 0 },
          borderColor: 'divider',
          mb: { xs: 2, sm: 0 },
          overflowX: isMobile ? 'auto' : 'visible',
          width: { xs: '100%', sm: 'auto' },
        }}
      >
        {tabContent.map((tab, index) => (
          <Tab
            key={index}
            label={tab.label}
            sx={{ flexShrink: 0 }}
          />
        ))}
      </Tabs>

      <Box
        sx={{
          flexGrow: 1,
          p: 3,
          pt: 0,
          width: '100%',
        }}
      >
        {tabContent[value].content}
      </Box>
    </Box>
  );
}
