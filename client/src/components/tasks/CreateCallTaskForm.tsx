import  { useState }  from 'react';
import { useForm } from 'react-hook-form';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import FormInputText from '../form/FormInputText';
import { addTaskToCall } from '../../features/calls/callsSlice';
import { selectAddTaskToCallLoading, selectCallsError, selectCurrentCallId } from '../../features/calls/callsSelector';
import { selectTasksError } from '../../features/tasks/tasksSelector';
import { Box } from '@mui/material';
import { Typography } from '@mui/material';
import TagsSection from '../tags/TagsSection';
import { createTask } from '../../features/tasks/tasksSlice';


type FormData = {
    name: string;
    tags?: string[];
}

interface CreateCallTaskFormProps {
    userRole?: 'admin' | 'user';
    showTags?: boolean;
    handleTaskCreation?: (task: {name: string, tags: string[]}) => void;
}

const CreateCallTaskForm = ({ userRole, showTags }: CreateCallTaskFormProps) => {
    const dispatch = useAppDispatch();
    const isLoading = useAppSelector(selectAddTaskToCallLoading);
    const error = useAppSelector(selectCallsError);
    const createTaskError = useAppSelector(selectTasksError);
    const callId = useAppSelector(selectCurrentCallId);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const {control, handleSubmit, formState: {errors}, getValues, setValue, reset} = useForm<FormData>({
        defaultValues: {
            name: '',
            tags: []
        }
    })

    const handleTaskCreation = (data: FormData) => {
        console.log(data);
        const task = {name: data.name, tags: data.tags || []}
        if (userRole === 'admin') {
            dispatch(createTask(task)); // create suggested task
        } else {
            dispatch(addTaskToCall({callId, name: task.name})); // createTaskToCall
        }

        reset();
    }




    // const onSubmit = async (data: FormData) => {
    //     await dispatch(addTaskToCall({callId, name: data.name}));
    //     handleTaskCreation?.({name: data.name, tags: data.tags || []})
    // }

    const handleTagSelection = (tagId: string) => {
        const currentTags = getValues('tags') || [];
        const newTags = [...currentTags, tagId];
        setValue('tags', newTags);
        setSelectedTags(newTags);
    }

    return (
        <div>
            <h4>Create Task</h4>
            {isLoading && <h4>Loading...</h4>}
            {error && <Typography color="error">{error || 'Something went wrong.'}</Typography>}
            {createTaskError && <Typography color="error">{createTaskError || 'Something went wrong.'}</Typography>}
            <Box component="form" onSubmit={handleSubmit(handleTaskCreation)} noValidate sx={{ mt: 1 }}>
                <div
                style={{
                    display: 'flex',
                    gap: '10px'
                }}
                >
                                  <FormInputText
                    control={control}
                    name="name"
                    label="Name"
                    error={!!errors.name}
                    helperText={errors.name?.message}
                />
                <button type="submit" >
                    Create Task
                </button>  
                </div>

                {
                    userRole === 'admin' && showTags  && (
                        <TagsSection
                            tagsId={selectedTags}
                            userRole={userRole}
                            onSelectTag={handleTagSelection}
                        />
                    )
                }
            </Box>
        </div>
    )
    
}

export default CreateCallTaskForm;
