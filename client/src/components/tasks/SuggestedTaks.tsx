import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectAllTasks } from '../../features/tasks/tasksSelector';
import { selectCurrentCallId } from '../../features/calls/callsSelector';
import { addSuggestedTaskToCall } from '../../features/calls/callsSlice';

const SuggestedTaks = ({tasksIds}: {tasksIds: string[]}) => {
    const dispatch = useAppDispatch();
    const tasks = useAppSelector(selectAllTasks);
    const callId = useAppSelector(selectCurrentCallId);

    const handleAddSuggestedTask = (event: React.MouseEvent<HTMLUListElement>) => {
        event.preventDefault()
        const target = event.target as HTMLElement;

        const addBtn = target.closest('button[data-action="add-task"]');
        if (addBtn) {
            const listItem = addBtn.closest('li');
            const taskId = listItem?.getAttribute('data-task-id');
            if (taskId && callId) {
                dispatch(addSuggestedTaskToCall({callId, suggestedTaskId: taskId}));
            }
        }
        
    }

    return (
        <div>
            <h2>Suggested Tasks</h2>
            <ul onClick={handleAddSuggestedTask}>
                {
                    tasks.map((task) => (
                        <li key={task._id} data-task-id={task._id}
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                width: '100%'
                            }}
                        >
                            {task.name}
                            {
                                tasksIds.includes(task._id)? <span>Assigned</span> : <button data-action="add-task">+</button>
                            }
                        </li>
                    ))
                }
            </ul>
        </div>
    );
};

export default SuggestedTaks;