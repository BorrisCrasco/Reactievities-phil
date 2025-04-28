import { CalendarToday, Info, Place } from "@mui/icons-material";
import { Box, Button, Divider, Grid, Paper, Typography, useMediaQuery, useTheme, Stack } from "@mui/material";
import { formatDate } from "../../../lib/util/util";
import { useState } from "react";
import MapComponents from "../../../app/shared/components/MapComponents";

type Props = {
    activity: Activity
}

export default function ActivityDetailsInfo({ activity }: Props) {
    const [mapOpen, setMapOpen] = useState(false);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // 📱 detect mobile

    return (
        <Paper sx={{ mb: 2, p: 2, borderRadius: 3 }}>
            {/* Description */}
            <Grid container alignItems="center" spacing={2}>
                <Grid item xs={12} sm={1}>
                    <Info color="info" fontSize="large" />
                </Grid>
                <Grid item xs={12} sm={11}>
                    <Typography>{activity.description}</Typography>
                </Grid>
            </Grid>

            <Divider sx={{ my: 2 }} />

            {/* Date */}
            <Grid container alignItems="center" spacing={2}>
                <Grid item xs={12} sm={1}>
                    <CalendarToday color="info" fontSize="large" />
                </Grid>
                <Grid item xs={12} sm={11}>
                    <Typography>{formatDate(activity.date)}</Typography>
                </Grid>
            </Grid>

            <Divider sx={{ my: 2 }} />

            {/* Venue + Map Toggle */}
            <Grid container alignItems="center" spacing={2}>
                <Grid item xs={12} sm={1}>
                    <Place color="info" fontSize="large" />
                </Grid>
                <Grid item xs={12} sm={11}>
                    <Stack
                        direction={isMobile ? 'column' : 'row'}
                        spacing={2}
                        justifyContent="space-between"
                        alignItems={isMobile ? 'flex-start' : 'center'}
                        width="100%"
                    >
                        <Typography>
                            {activity.venue}, {activity.city}
                        </Typography>
                        <Button
                            variant="outlined"
                            onClick={() => setMapOpen(!mapOpen)}
                            sx={{ whiteSpace: 'nowrap' }}
                        >
                            {mapOpen ? 'Hide map' : 'Show map'}
                        </Button>
                    </Stack>
                </Grid>
            </Grid>

            {/* Map */}
            {mapOpen && (
                <Box
                    sx={{
                        height: 400,
                        width: '100%',
                        mt: 2,
                        zIndex: 10,
                    }}
                >
                    <MapComponents
                        position={[activity.latitude, activity.longitude]}
                        venue={activity.venue}
                    />
                </Box>
            )}
        </Paper>
    );
}
