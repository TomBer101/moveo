import  {useState} from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { updateTaskStatus } from '../../features/calls/callsSlice';
import type { ITask, ITaskStatus, ISuggestedTask } from '../../types';
import { selectCurrentCallId } from '../../features/calls/callsSelector';
import { selectTaskById } from '../../features/tasks/tasksSelector';
import { selectAllTags } from '../../features/tags/tagsSelector';

const Task = ({task, showTags = false}: {task: ITask | ISuggestedTask, showTags?: boolean}) => {
    const callId = useAppSelector(selectCurrentCallId);
    const suggestedTask = useAppSelector(selectTaskById(task.suggestedTaskId || '')) || null;
    const tags = useAppSelector(selectAllTags);
    const dispatch = useAppDispatch();
    const [localStatus, setLocalStatus] = useState<ITaskStatus>(task.status || 'open');

    const handleStatusChange = async (newStatus: ITaskStatus) => {
        if (newStatus === localStatus) return;

        setLocalStatus(newStatus);

        try {
         await dispatch(updateTaskStatus({callId, taskId: task._id, status: newStatus})).unwrap();
        } catch (error) {
            setLocalStatus(task.status || 'open');
            console.error('Failed to update task status:', error);
        }
    };


    // Determine the task name and tags to display
    const taskName = suggestedTask ? suggestedTask.name : task.name;
    const taskTags = suggestedTask ? suggestedTask.tags : (('tags' in task) ? task.tags : []);
    const tagNames = taskTags.map((tagId) => tags.find((tag) => tag._id === tagId)?.name || '');

    return (
        <div style={{ 
            border: `1px solid ${
                'status' in task 
                    ? task.status === 'open' 
                        ? 'red'
                        : task.status === 'in progress'
                            ? 'yellow'
                            : 'green'
                    : '#ddd'
            }`,
            padding: '1rem',
            margin: '0.5rem 0', 
            borderRadius: '4px'
        }}>
            <h3>{taskName}</h3>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                {/* Show tags if available */}
                {taskTags && taskTags.length > 0 && showTags && (
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        {tagNames.map((tag) => (
                            <span key={tag} className='tag'>
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
                
                {/* Show status selector for call tasks (not suggested tasks) */}
                {!('tags' in task) && (
                    <>
                        <span>Status:</span>                
                        <select 
                            value={localStatus} 
                            onChange={(e) => handleStatusChange(e.target.value as ITaskStatus)}
                            style={{ padding: '0.25rem' }}
                        >
                            <option value="open">Open</option>
                            <option value="in progress">In Progress</option>
                            <option value="completed">Completed</option>
                        </select>
                    </>
                )}
                
                {/* Show indicator if this is a suggested task */}
                {task.suggestedTask && (
                    <span style={{ 
                        backgroundColor: '#007bff', 
                        color: 'white', 
                        padding: '0.25rem 0.5rem', 
                        borderRadius: '4px',
                        fontSize: '0.75rem'
                    }}>
                        Suggested Task
                    </span>
                )}
            </div>
        </div>
    );  
};

export default Task;