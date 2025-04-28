import { Card, CardMedia, Box, Typography, Chip, useMediaQuery, useTheme, Stack } from "@mui/material";
import { Link } from "react-router";
import { formatDate } from "../../../lib/util/util";
import { useActivities } from "../../../lib/hooks/useActivities";
import StyledButton from "../../../app/shared/components/StyledButton";

type Props = {
    activity: Activity
}

export default function ActivityDetailsHeader({ activity }: Props) {
    const { updateAttendance } = useActivities(activity.id);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // 📱 Check if mobile

    return (
        <Card 
            sx={{ 
                position: 'relative', 
                mb: 2, 
                backgroundColor: 'transparent', 
                overflow: 'hidden',
                borderRadius: 3,
            }}
        >
            {/* Cancelled badge */}
            {activity.isCancelled && (
                <Chip
                    sx={{
                        position: 'absolute',
                        left: 40,
                        top: 20,
                        zIndex: 1000
                    }}
                    color="error"
                    label="Cancelled"
                />
            )}

            {/* Banner Image */}
            <CardMedia
                component="img"
                height="300"
                image={`/images/categoryImages/${activity.category}.jpg`}
                alt={`${activity.category} image`}
            />

            {/* Gradient Overlay with Text and Buttons */}
            <Box
                sx={{
                    position: 'absolute',
                    bottom: 0,
                    width: '100%',
                    color: 'white',
                    p: 2,
                    background: 'linear-gradient(to top, rgba(0, 0, 0, 1.0), transparent)',
                    boxSizing: 'border-box',
                }}
            >
                <Stack
                    direction={isMobile ? 'column' : 'row'} // 🔥 Mobile: Column, Desktop: Row
                    spacing={2}
                    alignItems={isMobile ? 'flex-start' : 'flex-end'}
                    justifyContent="space-between"
                >
                    {/* Text Section */}
                    <Box>
                        <Typography variant="h4" fontWeight="bold">{activity.title}</Typography>
                        <Typography variant="subtitle1">{formatDate(activity.date)}</Typography>
                        <Typography variant="subtitle2">
                            Hosted by{' '}
                            <Link to={`/profiles/${activity.hostId}`} style={{ color: 'white', fontWeight: 'bold' }}>
                                {activity.hostDisplayName}
                            </Link>
                        </Typography>
                    </Box>

                    {/* Button Section */}
                    <Stack 
                        direction={isMobile ? 'column' : 'row'} 
                        spacing={2}
                        width={isMobile ? '100%' : 'auto'}
                    >
                        {activity.isHost ? (
                            <>
                                <StyledButton
                                    variant='contained'
                                    color={activity.isCancelled ? 'success' : 'error'}
                                    onClick={() => updateAttendance.mutate(activity.id)}
                                    disabled={updateAttendance.isPending}
                                    fullWidth={isMobile}
                                >
                                    {activity.isCancelled ? 'Re-activate Activity' : 'Cancel Activity'}
                                </StyledButton>
                                <StyledButton
                                    variant="contained"
                                    color="primary"
                                    component={Link}
                                    to={`/manage/${activity.id}`}
                                    disabled={activity.isCancelled}
                                    fullWidth={isMobile}
                                >
                                    Manage Event
                                </StyledButton>
                            </>
                        ) : (
                            <StyledButton
                                variant="contained"
                                color={activity.isGoing ? 'primary' : 'info'}
                                onClick={() => updateAttendance.mutate(activity.id)}
                                disabled={updateAttendance.isPending || activity.isCancelled}
                                fullWidth={isMobile}
                            >
                                {activity.isGoing ? 'Cancel Attendance' : 'Join Activity'}
                            </StyledButton>
                        )}
                    </Stack>
                </Stack>
            </Box>
        </Card>
    );
}
