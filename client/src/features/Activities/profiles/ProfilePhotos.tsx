import { Box, Button, Divider, Grid, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router";
import PhotoUploadWidgets from "../../../app/shared/components/PhotoUploadWidgets";
import StarButton from "../../../app/shared/components/StarButton";
import DeleteButton from "../../../app/shared/components/DeleteButton";
import { useProfile } from "../../../lib/hooks/useProfile";

export default function ProfilePhotos() {
    const { id } = useParams();
    const { photos, loadingPhotos, isCurrentUser, uploadPhoto, profile, setMainPhoto, deletePhoto } = useProfile(id);
    const [editMode, setEditMode] = useState(false);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const handlePhotoUpload = (file: Blob) => {
        uploadPhoto.mutate(file, {
            onSuccess: () => setEditMode(false)
        });
    };

    if (loadingPhotos) return <Typography>Loading photos...</Typography>;
    if (!photos) return <Typography>No photos found for this user</Typography>;

    return (
        <Box>
            {/* Top Section */}
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h5">Photos</Typography>
                {isCurrentUser && (
                    <Button onClick={() => setEditMode(!editMode)}>
                        {editMode ? "Cancel" : "Add Photo"}
                    </Button>
                )}
            </Box>

            <Divider sx={{ my: 2 }} />

            {/* Main Content */}
            {editMode ? (
                <Stack
                    direction={isMobile ? "column" : "row"}
                    spacing={3}
                    alignItems="center"
                    justifyContent="center"
                    width="100%"
                >
                    <PhotoUploadWidgets uploadPhoto={handlePhotoUpload} loading={uploadPhoto.isPending} />
                </Stack>
            ) : (
                <Grid container spacing={2} mt={2}>
                    {photos.map((photo) => (
                        <Grid item xs={6} sm={4} md={3} key={photo.id}>
                            <Box
                                sx={{
                                    position: 'relative',
                                    width: '100%',
                                    paddingTop: '100%', // 1:1 aspect ratio
                                    borderRadius: 2,
                                    overflow: 'hidden',
                                    bgcolor: '#f5f5f5',
                                }}
                            >
                                <img
                                    srcSet={photo.url.replace('/upload/', '/upload/w_300,h_300,c_fill,f_auto,dpr_2,g_face/')}
                                    src={photo.url.replace('/upload/', '/upload/w_300,h_300,c_fill,f_auto,g_face')}
                                    alt="user uploaded"
                                    loading="lazy"
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                    }}
                                />
                                {isCurrentUser && (
                                    <>
                                        {/* Star Button */}
                                        <Box
                                            sx={{
                                                position: 'absolute',
                                                top: 8,
                                                left: 8,
                                                zIndex: 10,
                                            }}
                                            onClick={() => setMainPhoto.mutate(photo)}
                                        >
                                            <StarButton selected={photo.url === profile?.imageUrl} />
                                        </Box>

                                        {/* Delete Button */}
                                        {profile?.imageUrl !== photo.url && (
                                            <Box
                                                sx={{
                                                    position: 'absolute',
                                                    top: 8,
                                                    right: 8,
                                                    zIndex: 10,
                                                }}
                                                onClick={() => deletePhoto.mutate(photo.id)}
                                            >
                                                <DeleteButton />
                                            </Box>
                                        )}
                                    </>
                                )}
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Box>
    );
}
