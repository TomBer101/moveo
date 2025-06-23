import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import Modal from '@mui/material/Modal';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectAllTags } from '../../features/tags/tagsSelector';
import { selectCurrentCallId } from '../../features/calls/callsSelector';
import { addTagToCall } from '../../features/calls/callsSlice';


interface TagsSectionProps {
    tagsId: string[];
    userRole?: 'admin' | 'user';
    onSelectTag?: (tagId: string) => void;
}


const TagsSection = ({tagsId, userRole, onSelectTag}: TagsSectionProps) => {
    const tags = useAppSelector(selectAllTags);
    const callId = useAppSelector(selectCurrentCallId);
    const relevantTags = tags.filter((tag) => tagsId.includes(tag._id));
    const [showTags, setShowTags] = useState<boolean>(false)
    const dispatch = useAppDispatch();

    const handleTagClick = (event: React.MouseEvent<HTMLUListElement>) => {
        event.preventDefault();
        const target = event.target as HTMLElement;

        const listItem = target.closest('li');
        if (listItem) {
            const tagId = listItem.getAttribute('data-tag-id');
            if (tagId) {
                if (userRole === 'admin') {
                    onSelectTag?.(tagId);
                } else {
                    dispatch(addTagToCall({callId, tagIds: [tagId]}));
                }
            }

            setShowTags(false);
        }
    }

    const handleAddTagClick = (event: React.MouseEvent) => {
        event.stopPropagation();
        setShowTags(true);
    }

    const handleCloseTags = (event: React.MouseEvent) => {
        event.stopPropagation();
        setShowTags(false);
    }

    return (
        <div style={{display: 'flex', gap: '10px', flexWrap: 'wrap', border: '1px solid #ccc', padding: '5px', borderRadius: '5px'}}>
            <p>Tags:</p>
            {relevantTags.map((tag) => (
                <p className='tag' key={tag._id}>{tag.name}</p>
            ))}
            <IconButton onClick={handleAddTagClick}>
                <AddIcon />
            </IconButton>
            <Modal open={showTags} onClose={handleCloseTags}>
                <div
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        backgroundColor: 'azure',
                        padding: '20px',
                        borderRadius: '10px',
                        overflow: 'hidden',
                        height: '20vh',
                        width: '12vw'
                    }}
                >
                    <ul onClick={handleTagClick}>
                        {tags.map((tag) => (
                            <li key={tag._id} data-tag-id={tag._id}>{tag.name}</li>
                        ))}
                    </ul>
                </div>
            </Modal>
        </div>
    );
};

export default TagsSection;