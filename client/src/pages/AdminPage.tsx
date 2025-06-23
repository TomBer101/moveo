import  {  useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import { useForm } from 'react-hook-form';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import FormInputText from '../components/form/FormInputText';
import Tag from '../components/tags/Tag';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectAllTags, selectTagsLoading, selectTagsError } from '../features/tags/tagsSelector';
import {  createTag } from '../features/tags/tagsSlice';
import CreateCallTaskForm from '../components/tasks/CreateCallTaskForm';
import { selectAllTasks } from '../features/tasks/tasksSelector';
import Task from '../components/tasks/Task';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
interface FormValues {
    tagName: string;
}

const AdminPage = () => {
    const dispatch = useAppDispatch();
    const tags = useAppSelector(selectAllTags);
    const tasks = useAppSelector(selectAllTasks);
    const isLoading = useAppSelector(selectTagsLoading);
    const error = useAppSelector(selectTagsError);
    const {setUser} = useAuth();
    const navigate = useNavigate();
    const [isCreatingTag, setIsCreatingTag] = useState<boolean>(false);

    useEffect(() => {
        console.log('admin page');
        setUser({
            _id: '1',
            name: 'admin',
            role: 'admin'
        })
    }, [])

    const { control, handleSubmit, reset } = useForm<FormValues>({
        defaultValues: {
            tagName: ''
        }
    });

    const onSubmit = async (data: FormValues) => {
        setIsCreatingTag(true);
        try {
            await dispatch(createTag(data.tagName)).unwrap();
            reset();
        } catch (error) {
            console.error('Error creating tag:', error);
        } finally {
            setIsCreatingTag(false);
        }
    }


    return (
        <Box 
            sx={{
            height: '100vh',
            width: '100vw',
            display: 'flex',
            flexDirection: 'column',
            padding: 2,
            boxSizing: 'border-box',
            margin: 0
        }}>
            <Typography variant='h4' sx={{ mb: 2, width: 'fit-content' }}>Admin Page</Typography>
            <button style={{marginBottom: '10px', display: 'inline', width: 'fit-content'}} onClick={() => {
                navigate('/user');
            }}>Switch To User</button>
            <div
                style={{
                    display: 'flex',
                    gap: '10px'
                }}
            >
                <div
                    style={{
                        opacity: isLoading ? 0.5 : 1,
                    }}
                >
                <Box component='form' onSubmit={handleSubmit(onSubmit)} sx={{ mb: 3 }}>
                <FormInputText control={control} name='tagName' label='Tag Name' />
                <Button 
                variant='contained' 
                color='primary' 
                type='submit' 
                disabled={isCreatingTag}
                sx={{ ml: 1 }}
                >
                    {isCreatingTag ? 'Creating...' : 'Create Tag'}
                </Button>
            </Box>
            <Typography variant='h5' sx={{ mb: 2 }}>Tags</Typography>
            {error && <Typography color='error'>{error}</Typography>}
            <Box sx={{
                flex: 1,
                overflow: 'auto',
                border: '1px solid #e0e0e0',
                borderRadius: 1,
                padding: 1
            }}>
                {
                    tags && tags.map((tag) => (
                        <Tag key={tag._id} _id={tag._id} />
                    ))
                }
            </Box> 
                </div>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px',
                        flex: 1
                    }}
                >
                    <CreateCallTaskForm userRole='admin' showTags={true} />
                    {/* <TasksSection tasks={tasks} /> */}
                    <ul>
                        {tasks.map((task) => (
                            <Task key={task._id} task={task} showTags={true}/>
                        ))}
                    </ul>
                </div>
            </div>

        </Box>
    );
};

export default AdminPage;