import { Button, Collapse, Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useParams } from "react-router";
import { useActivities } from "../../../lib/hooks/useActivities";
import ActivityDetailsHeader from "./ActivityDetailsHeader";
import ActivityDetailsInfo from "./ActivityDetailsInfo";
import ActivityDetailsChat from "./ActivityDetailsChat";
import ActivityDetailsSidebar from "./ActivityDetailsSideBar";
import { useState } from "react";

export default function ActivityDetailPage() {
    const { id } = useParams();
    const { activity, isLoadingActivity } = useActivities(id);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    if (isLoadingActivity) return <Typography>Loading...</Typography>;
    if (!activity) return <Typography>Activity not found</Typography>;

    return (
        <Grid container spacing={3}>
            {isMobile && (
                <Grid item xs={12}>
                    <Button 
                        fullWidth 
                        variant="outlined" 
                        onClick={() => setSidebarOpen(prev => !prev)}
                        sx={{ mb: 2 }}
                    >
                        {sidebarOpen ? "Hide Attendees" : "Show Attendees"}
                    </Button>
                    <Collapse in={sidebarOpen}>
                        <ActivityDetailsSidebar activity={activity} />
                    </Collapse>
                </Grid>
            )}
            
            <Grid item xs={12} md={8}>
                <ActivityDetailsHeader activity={activity} />
                <ActivityDetailsInfo activity={activity} />
                <ActivityDetailsChat />
            </Grid>
            
            {!isMobile && (
                <Grid item xs={12} md={4}>
                    <ActivityDetailsSidebar activity={activity} />
                </Grid>
            )}
        </Grid>
    );
}
