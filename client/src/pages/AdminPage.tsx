import React from 'react';
import Typography from '@mui/material/Typography';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import Box from '@mui/material/Box';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';

import FormInputText from '../components/form/FormInputText';
import { getTags, createTag } from '../services/tagsService';
import type { ITag } from '../types';


interface FormValues {
    tagName: string;
}

const AdminPage = () => {
const queryClient = useQueryClient();

        const { control, handleSubmit, reset } = useForm<FormValues>({
            defaultValues: {
                tagName: ''
            }
        });

        const { data: tags, isLoading } = useQuery<ITag[]>({
            queryKey: ['tags'],
            queryFn: getTags
        });

        const { mutate: createTagMutation, isLoading: isCreatingTag, error: createTagError } = useMutation({
            mutationFn: (name: string) => createTag(name),
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['tags'] });
                reset();
            },
            onError: (error) => {
                console.error('Error creating tag:', error);
            }
        });

        const onSubmit = (data: FormValues) => {
            createTagMutation(data.tagName);
        }

        if (isLoading) {
            return <Typography>Loading...</Typography>;
        }
    return (
        <Box>
            <Typography variant='h2'>Admin Page</Typography>
            <Box component='form' onSubmit={handleSubmit(onSubmit)}>
                <FormInputText control={control} name='tagName' label='Tag Name' />
                <Button 
                variant='contained' 
                color='primary' 
                type='submit' 
                disabled={isCreatingTag}
                >
                    {isCreatingTag ? 'Creating...' : 'Create Tag'}
                </Button>
            </Box>
            <Typography variant='h3'>Tags</Typography>
            {
                tags && tags.map((tag) => (
                    <Typography key={tag._id}>{tag.name}</Typography>
                ))
            }
        </Box>
    );
};

export default AdminPage;