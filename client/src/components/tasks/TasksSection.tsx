import { useState } from 'react';

import type { ITask } from '../../types';
import Task from './Task';
import CreateCallTaskForm from './CreateCallTaskForm';
import Modal from '@mui/material/Modal';
import { useAuth } from '../../contexts/AuthContext';
import Box from '@mui/material/Box';


const TasksSection = ({tasks} : {tasks: ITask[]}) => {
    const {user} = useAuth();
    const [isCreatingTask, setIsCreatingTask] = useState<boolean>(false);
    const handleOpenForm = () => setIsCreatingTask(true);
    const handleCloseForm = () => setIsCreatingTask(false);

    // const handleTaskCreation = (task: {name: string, tags: string[]}) => {

    // }

    return (
        <div>
            <div>
                <h5>Tasks</h5>
                <button onClick={handleOpenForm}>New Task</button>
            </div>
            <ul>
                {tasks.map((task) => (
                    <Task key={task._id} task={task} />
                ))}
            </ul>
            <div>
                <Modal open={isCreatingTask} onClose={handleCloseForm} >
                <Box sx={{ 
                position: 'absolute', 
                top: '50%', 
                left: '50%', 
                transform: 'translate(-50%, -50%)', 
                width: 400, 
                bgcolor: 'background.paper', 
                boxShadow: 24, p: 4 
            }}>
                    <CreateCallTaskForm  userRole={user?.role}/>
                </Box>
                </Modal>
            </div>
        </div>
    );
};

export default TasksSection;