import { Avatar, Box, Button, Chip, Divider, Paper, Stack, Typography, Grid } from "@mui/material";
import { useParams } from "react-router";
import { useProfile } from "../../../lib/hooks/useProfile";

export default function ProfileHeader() {
    const { id } = useParams();
    const { isCurrentUser, profile, updateFollowing } = useProfile(id);

    if (!profile) return null;

    return (
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
            <Grid container spacing={4} alignItems="center">
                {/* Avatar and name */}
                <Grid item xs={12} md={8}>
                    <Stack
                        direction={{ xs: 'column', md: 'row' }}
                        spacing={3}
                        alignItems="center"
                        justifyContent={{ xs: 'center', md: 'flex-start' }}
                        textAlign={{ xs: 'center', md: 'left' }}
                    >
                        <Avatar
                            src={profile.imageUrl}
                            alt={profile.displayName + ' image'}
                            sx={{ width: 120, height: 120 }}
                        />
                        <Box>
                            <Typography variant="h5">{profile.displayName}</Typography>
                            {profile.following && (
                                <Chip
                                    variant="outlined"
                                    color="secondary"
                                    label="Following"
                                    sx={{ mt: 1 }}
                                />
                            )}
                        </Box>
                    </Stack>
                </Grid>

                {/* Followers, Following, and Button */}
                <Grid item xs={12} md={4}>
                    <Stack spacing={2} alignItems="center">
                        <Box display="flex" justifyContent="space-around" width="100%">
                            <Box textAlign="center">
                                <Typography variant="subtitle2">Followers</Typography>
                                <Typography variant="h6">{profile.followersCount}</Typography>
                            </Box>
                            <Box textAlign="center">
                                <Typography variant="subtitle2">Following</Typography>
                                <Typography variant="h6">{profile.followingCount}</Typography>
                            </Box>
                        </Box>

                        {/* Follow/Unfollow Button */}
                        {!isCurrentUser && (
                            <>
                                <Divider sx={{ width: '100%' }} />
                                <Button
                                    onClick={() => updateFollowing.mutate()}
                                    disabled={updateFollowing.isPending}
                                    fullWidth
                                    variant="outlined"
                                    color={profile.following ? 'error' : 'success'}
                                >
                                    {profile.following ? 'Unfollow' : 'Follow'}
                                </Button>
                            </>
                        )}
                    </Stack>
                </Grid>
            </Grid>
        </Paper>
    );
}
