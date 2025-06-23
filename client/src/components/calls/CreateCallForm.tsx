import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useForm } from 'react-hook-form';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import FormInputText from '../form/FormInputText';
import { createCall } from '../../features/calls/callsSlice';
import { selectCreateCallLoading, selectCallsError } from '../../features/calls/callsSelector';

type FormData ={ 
    name: string;
}

const CreateCallForm = () => {
    const dispatch = useAppDispatch();
    const isLoading = useAppSelector(selectCreateCallLoading);
    const error = useAppSelector(selectCallsError);
    const {control, handleSubmit, formState: {errors}} = useForm<FormData>({
        defaultValues: {
            name: ''
        }
    })

    const onSubmit = async (data: FormData) => {
        dispatch(createCall(data.name));
    }


    //if (!isCreateCallOpen) return null;

    return (
            <Box sx={{ 
                position: 'absolute', 
                top: '50%', 
                left: '50%', 
                transform: 'translate(-50%, -50%)', 
                width: 400, 
                bgcolor: 'background.paper', 
                boxShadow: 24, p: 4 
            }}>
                <Typography variant="h6" component="h2">
                    Create New Call
                </Typography>
                {isLoading && <Typography>Loading...</Typography>}
                {error && <Typography color="error">{error || 'Something went wrong.'}</Typography>}
                <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
                    <FormInputText
                        control={control}
                        name="name"
                        label="Name"
                        error={!!errors.name}
                        helperText={errors.name?.message}
                    />
                    <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
                        Create Call
                    </Button>
                    {errors.name && <Typography color="error">{(errors.name)?.message || 'Something went wrong.'}</Typography>}
                </Box>
            </Box>
    );
};

export default CreateCallForm;