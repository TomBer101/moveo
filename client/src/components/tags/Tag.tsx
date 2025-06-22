import React, { useState } from 'react';
import { useTag } from '../../hooks/useTag';
import type { ITag } from '../../types';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import CloseIcon from '@mui/icons-material/Close';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { updateTag } from '../../services/tagsService';
import { TextField } from '@mui/material';

interface TagProps {
    _id: string;
}

const Tag = ({_id} : TagProps) => {
    const tag : ITag | undefined = useTag(_id);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [newName, setNewName] = useState<string>(tag?.name || '');
    const queryClient = useQueryClient();

    const {mutate: updateTagMutation} = useMutation({
        mutationFn: (name: string) => updateTag(_id, name),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tags'] });
            setIsEditing(false);
        },
        onError: (error) => {
            console.error('Error updating tag:', error);
        },
    })

    if (!tag) {
        return null;
    }
    return (
        <Box sx={{
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
                onBlur={() => setIsEditing(false)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        setIsEditing(false);
                    }
                }}
            />
            {isEditing ? (
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
                <IconButton color='success' onClick={() => updateTagMutation(newName)}>
                    <DoneOutlineIcon />
                </IconButton>
                </Box>
            ) : (
                <IconButton onClick={() => setIsEditing(true)}>
                    <EditIcon />
                </IconButton>
            )}
        </Box>
    );
};

export default Tag;