import { Person } from "@mui/icons-material";
import { Box, Card, CardContent, CardMedia, Chip, Divider, Typography } from "@mui/material";
import { Link } from "react-router";


type Props = {
    profile: Profile;
};

export default function ProfileCard({ profile }: Props) {
    return (
        <Link to={`/profiles/${profile.id}`} style={{ textDecoration: 'none' }}>
            <Card
                sx={{
                    borderRadius: 3,
                    p: 2,
                    width: 250, // 👉 fixed width
                    height: 380, // 👉 fixed height para pantay
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    textDecoration: 'none'
                }}
                elevation={4}
            >
                <CardMedia
                    component="img"
                    src={profile?.imageUrl || '/images/user.png'}
                    alt={profile.displayName + ' image'}
                    sx={{
                        width: '100%',
                        height: 140,
                        objectFit: 'cover',
                        borderRadius: 2,
                    }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" noWrap>
                        {profile.displayName}
                    </Typography>

                    {profile.bio && (
                        <Typography
                            variant="body2"
                            sx={{
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                color: 'text.secondary',
                            }}
                        >
                            {profile.bio}
                        </Typography>
                    )}

                    {profile.following && (
                        <Chip
                            size="small"
                            label="Following"
                            color="secondary"
                            variant="outlined"
                            sx={{ mt: 1 }}
                        />
                    )}
                </CardContent>

                <Divider sx={{ my: 1 }} />

                <Box display="flex" alignItems="center" gap={1} px={2} pb={2}>
                    <Person fontSize="small" />
                    <Typography variant="body2" color="text.secondary">
                        {profile.followersCount} Followers
                    </Typography>
                </Box>
            </Card>
        </Link>
    );
}
