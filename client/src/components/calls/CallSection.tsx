import TagsSection from '../tags/TagsSection';
import TasksSection from '../tasks/TasksSection';
import type { ICall } from '../../types/index';
import SuggestedTasks from '../tasks/SuggestedTaks';

interface CallSectionProps {
    onClick: () => void;
    call?: ICall;
}

const CallSection = ({onClick, call}: CallSectionProps) => {


    if ( !call) return <div onClick={onClick}>Create new Call</div>;

    const tasksIds = call?.tasks
        .map((task) => task.suggestedTaskId)
        .filter((id): id is string => id !== undefined) || [];

    
    return (
        <div
            style={{
                height: '100%',
                textAlign: 'start',
                padding: '2em',
                boxSizing: 'border-box',
            }}
        >
            <h4>{call?.name}</h4>
            <div>
                <TagsSection tagsId={call?.tags}/>

            </div>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                }}
            >
                <TasksSection tasks={call?.tasks} />
                <SuggestedTasks tasksIds={tasksIds}/> 
            </div>
            
        </div>
    );
};


export default CallSection;