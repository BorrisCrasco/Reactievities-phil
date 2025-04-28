import { useParams } from "react-router";
import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import { useState } from "react";
import ProfileEdit from "./ProfileEditForm";
import { useProfile } from "../../../lib/hooks/useProfile";

export default function ProfileAbout() {
    const { id } = useParams();
    const { profile, isCurrentUser } = useProfile(id);
    const [editMode, setEditMode] = useState(false);

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems="center">
                    <Typography variant="h5" gutterBottom>
                        About {profile?.displayName}
                    </Typography>

                    {isCurrentUser && (
                        <Button variant="outlined" size="small" onClick={() => setEditMode(!editMode)}>
                            {editMode ? 'Cancel' : 'Edit profile'}
                        </Button>
                    )}
                </Box>

                <Divider sx={{ my: 2 }} />

                <Box sx={{ overflow: 'auto', maxHeight: 350 }}>
                    {editMode ? (
                        <ProfileEdit setEditMode={setEditMode} />
                    ) : (
                        <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                            {profile?.bio || 'No description added yet'}
                        </Typography>
                    )}
                </Box>
            </Grid>
        </Grid>
    );
}
