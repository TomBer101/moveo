import  { useState } from 'react';
import type { ITag } from '../../types';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import CloseIcon from '@mui/icons-material/Close';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectTagById } from '../../features/tags/tagsSelector';
import { updateTag } from '../../features/tags/tagsSlice';
import { TextField } from '@mui/material';

interface TagProps {
    _id: string;
    allowEdit?: boolean;
}

const Tag = ({_id, allowEdit = true} : TagProps) => {
    const tag : ITag | undefined = useAppSelector(selectTagById(_id));
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [newName, setNewName] = useState<string>(tag?.name || '');

    const dispatch = useAppDispatch();

    if (!tag) {
        return null;
    }

    const updateTagMutation = async () => {
        setIsEditing(true);

        try {
            await dispatch(updateTag({id: _id, name: newName})).unwrap();
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating tag:', error);
        }
    }

    return (
        <Box 
        sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 2,
            padding: 2,
            border: '1px solid #ccc',}
        }>
            <TextField
                value={newName}
                disabled={!isEditing}
                onChange={(e) => setNewName(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        setIsEditing(false);
                    }
                }}
            />
            {isEditing && allowEdit ? (
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 2,
                }}>
                <IconButton color='error' onClick={() => setIsEditing(false)}>
                    <CloseIcon />
                </IconButton>
                <IconButton color='success' onClick={() => updateTagMutation()}>
                    <DoneOutlineIcon />
                </IconButton>
                </Box>
            ) : allowEdit && (
                <IconButton onClick={() => setIsEditing(true)}>
                    <EditIcon />
                </IconButton>
            )}
        </Box>
    );
};

export default Tag;