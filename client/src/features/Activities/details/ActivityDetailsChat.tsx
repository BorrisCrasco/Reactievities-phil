import { Box, Typography, Card, CardContent, TextField, Avatar, CircularProgress, Button, Stack, IconButton, Popover, InputAdornment } from "@mui/material";
import { Link, useParams } from "react-router";
import { useComments } from "../../../lib/hooks/useComments";
import { timeAgo } from "../../../lib/util/util";
import { FieldValues, useForm } from "react-hook-form";
import { observer } from "mobx-react-lite";
import { EmojiEmotions } from "@mui/icons-material";
import { useEffect, useRef, useState } from "react";
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';

const ActivityDetailsChat = observer(function ActivityDetailsChat() {
    const { id } = useParams();
    const { commentStore } = useComments(id);
    const { register, handleSubmit, reset, setValue, watch, formState: { isSubmitting } } = useForm();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    const addComment = async (data: FieldValues) => {
        try {
            await commentStore.hubConnection?.invoke('SendComment', {
                activityId: id,
                body: data.body
            });
            reset();
        } catch (error) {
            console.log(error);
        }
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            handleSubmit(addComment)();
        }
    };

    const handleEmojiClick = (emojiData: EmojiClickData) => {
        const current = watch('body') || '';
        setValue('body', current + emojiData.emoji);
        setAnchorEl(null);
    };

    const handleOpenEmoji = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseEmoji = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [commentStore.comments.length]);

    return (
        <>
            <Box
                sx={{
                    textAlign: 'center',
                    bgcolor: 'primary.main',
                    color: 'white',
                    padding: 2,
                    borderTopLeftRadius: 8,
                    borderTopRightRadius: 8
                }}
            >
                <Typography variant="h6">Chat about this event</Typography>
            </Box>

            <Card>
                <CardContent>
                    <form onSubmit={handleSubmit(addComment)}>
                        <Stack direction="row" spacing={1} alignItems="flex-start">
                            <TextField
                                {...register('body', { required: true })}
                                variant="outlined"
                                fullWidth
                                multiline
                                minRows={2}
                                placeholder="Enter your comment (Enter to submit, SHIFT + Enter for new line)"
                                onKeyDown={handleKeyPress}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={handleOpenEmoji}>
                                                <EmojiEmotions color="primary" />
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                disabled={isSubmitting}
                                sx={{ height: '56px', mt: 0 }}
                            >
                                {isSubmitting ? <CircularProgress size={24} color="inherit" /> : "Send"}
                            </Button>
                        </Stack>
                    </form>

                    {/* EMOJI PICKER */}
                    <Popover
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleCloseEmoji}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                    >
                        <EmojiPicker onEmojiClick={handleEmojiClick} height={350} width={300} />
                    </Popover>

                    {/* COMMENTS */}
                    <Box sx={{ height: 400, overflowY: 'auto', mt: 3 }}>
                        {commentStore.comments.map(comment => (
                            <Box key={comment.id} sx={{ display: 'flex', my: 2 }}>
                                <Avatar src={comment.imageUrl} alt="user image" sx={{ mr: 2 }} />
                                <Box display="flex" flexDirection="column">
                                    <Box display="flex" alignItems="center" gap={2}>
                                        <Typography
                                            component={Link}
                                            to={`/profiles/${comment.userId}`}
                                            variant="subtitle1"
                                            sx={{ fontWeight: 'bold', textDecoration: 'none' }}
                                        >
                                            {comment.displayName}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            {timeAgo(comment.createdAt)}
                                        </Typography>
                                    </Box>
                                    <Typography sx={{ whiteSpace: 'pre-wrap' }}>
                                        {comment.body}
                                    </Typography>
                                </Box>
                            </Box>
                        ))}
                        <div ref={messagesEndRef} />
                    </Box>
                </CardContent>
            </Card>
        </>
    );
});

export default ActivityDetailsChat;
