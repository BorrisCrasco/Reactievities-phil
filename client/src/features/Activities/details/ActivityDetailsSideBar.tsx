import { Paper, Typography, List, ListItem, Chip, ListItemAvatar, Avatar, ListItemText, Grid } from "@mui/material";
import { Link } from "react-router";

type Props = {
    activity: Activity
}

export default function ActivityDetailsSidebar({ activity }: Props) {
    return (
        <>
            <Paper
                sx={{
                    textAlign: 'center',
                    backgroundColor: 'primary.main',
                    color: 'white',
                    p: 2,
                }}
            >
                <Typography variant="h6">
                    {activity.attendees.length} people are going
                </Typography>
            </Paper>

            <Paper sx={{ padding: 2 }}>
                {activity.attendees.map(attendee => (
                    <Grid container alignItems="center" key={attendee.id} sx={{ mb: 1 }}>
                        <Grid item xs={8}>
                            <List>
                                <ListItem 
                                    component={Link} 
                                    to={`/profiles/${attendee.id}`}
                                    sx={{ pl: 0 }}
                                >
                                    <ListItemAvatar>
                                        <Avatar
                                            variant="rounded"
                                            alt={attendee.displayName + ' image'}
                                            src={attendee.imageUrl}
                                            sx={{ width: 75, height: 75, mr: 2 }}
                                        />
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={
                                            <Typography variant="h6">
                                                {attendee.displayName}
                                            </Typography>
                                        }
                                        secondary={
                                            attendee.following && (
                                                <Typography variant="body2" color="orange">
                                                    Following
                                                </Typography>
                                            )
                                        }
                                    />
                                </ListItem>
                            </List>
                        </Grid>

                        <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                            {activity.hostId === attendee.id && (
                                <Chip
                                    label="Host"
                                    color="warning"
                                    variant="filled"
                                    sx={{ borderRadius: 2 }}
                                />
                            )}
                        </Grid>
                    </Grid>
                ))}
            </Paper>
        </>
    );
}
