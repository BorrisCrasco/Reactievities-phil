
import ActivityList from "./ActivityList";
import ActivityFilters from "./ActivityFilters";
import { Grid2, useMediaQuery, useTheme } from "@mui/material";

export default function ActivityDashboard() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Grid2 container spacing={3}>
      {isMobile && (
        <Grid2 size={12}>
          <ActivityFilters />
        </Grid2>
      )}
      <Grid2 size={isMobile ? 12 : 8}>
        <ActivityList />
      </Grid2>
      {!isMobile && (
        <Grid2
          size={4}
          sx={{
            position: "sticky",
            top: 112,
            alignSelf: "flex-start",
          }}
        >
          <ActivityFilters />
        </Grid2>
      )}
    </Grid2>
  );
}
