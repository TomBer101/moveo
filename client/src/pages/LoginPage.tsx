import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, type SubmitHandler } from 'react-hook-form';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import { getRoleBasedRedirect } from '../utils/navigationUtils';
import { useAuth } from '../contexts/AuthContext';
import FormInputText from '../components/form/FormInputText';


interface LoginFormData {
    name: string;
    password: string;
}


export default function LoginPage() {
    const { login, user } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState<string>('');
    const { control, handleSubmit} = useForm<LoginFormData>({
        defaultValues: {
            name: '',
            password: ''
        }
    });

    useEffect(() => {
        if (user) {
            const redirectPath = getRoleBasedRedirect(user.role);
            navigate(redirectPath);
        }
    }, [user, navigate]);

    const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
        console.log(data);
        try {
            await login(data.name, data.password);
        } catch (err) {
            console.error('Login failed:', err);
            setError('Login failed. Please check your credentials.');
        }
    };

    return (
        <Box sx={{
            width: '40%',
            margin: 'auto',

        }}>
            <Typography variant="h4">Login</Typography>
            {error && <Typography color="error">{error}</Typography>}
            <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1,            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 4 }}>
                <FormInputText
                    name="name"
                    control={control}
                    label="Name"
                    rules={{ required: 'Name is required' }}

                />
                <FormInputText
                    name="password"
                    control={control}
                    label="Password"
                    rules={{required: 'Password is required'}}                    
                />
                <Button type="submit" variant="contained" sx={{ mt: 2 }}>
                    Login
                </Button>
            </Box>
        </Box>
    )


}
