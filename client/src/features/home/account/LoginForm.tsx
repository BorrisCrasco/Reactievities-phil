import { zodResolver } from "@hookform/resolvers/zod";
import { useAccount } from "../../../lib/hooks/useAccount";
import { loginSchema, LoginSchema } from "../../../lib/schemas/loginSchema";
import { Box, Button, Paper, Typography, useTheme, useMediaQuery } from "@mui/material";
import TextInput from "../../../app/shared/components/TextInput";
import { LockOpen } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";

export default function LoginForm() {
    const { loginUser } = useAccount();
    const navigate = useNavigate();
    const location = useLocation();
    
    const { control, handleSubmit, formState: { isValid, isSubmitting } } = useForm<LoginSchema>({
        mode: 'onTouched',
        resolver: zodResolver(loginSchema)
    });

    const onSubmit = async (data: LoginSchema) => {
        await loginUser.mutateAsync(data, {
            onSuccess: () => {
                navigate(location.state?.from || '/activities');
            }
        });
    }

    // Detect if the device is mobile
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Paper
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                p: 3,
                gap: 3,
                maxWidth: isMobile ? '90%' : 'md', // Adjust form width for mobile
                mx: 'auto',
                borderRadius: 3,
                boxShadow: 3,
                paddingTop: 2,
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)', // Centering the form vertically and horizontally
                height: isMobile ? 'auto' : '500px', // Ensure the form is not too tall on mobile
                width: '100%'
            }}
        >
            <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                gap={2}
                color="secondary.main"
                sx={{ marginBottom: isMobile ? 2 : 3 }} // Spacing for mobile
            >
                <LockOpen fontSize="large" />
                <Typography variant={isMobile ? "h5" : "h4"} sx={{ fontWeight: 600 }}>
                    Sign in
                </Typography>
            </Box>

            <TextInput label="Email" control={control} name="email" fullWidth />
            <TextInput label="Password" type="password" control={control} name="password" fullWidth />

            <Button
                type="submit"
                disabled={!isValid || isSubmitting}
                variant="contained"
                size="large"
                sx={{
                    width: '100%',  // Full width button for mobile devices
                    padding: isMobile ? '12px' : '16px', // Adjust padding for mobile
                    fontSize: isMobile ? '0.875rem' : '1rem', // Adjust button font size
                }}
            >
                Login
            </Button>

            <Typography sx={{ textAlign: 'center', marginTop: 2 }}>
                Don't have an account?{' '}
                <Typography sx={{ ml: 2 }} component={Link} to="/register" color="primary">
                    Sign up
                </Typography>
            </Typography>
        </Paper>
    );
}
