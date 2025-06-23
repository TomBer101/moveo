import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectAllCalls, selectCurrentCallId } from '../../features/calls/callsSelector';
import { setCurrentCallId } from '../../features/calls/callsSlice';

interface CallsListProps {
    onClick: () => void;
}

const CallsList = ({onClick}: CallsListProps) => {
    const calls = useAppSelector(selectAllCalls);
    const currentCallId = useAppSelector(selectCurrentCallId);
    const dispatch = useAppDispatch();


    const handleCallClick = (callId: string) => {
        dispatch(setCurrentCallId(callId));
    }


    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant='h6'>Calls</Typography>
                <Button onClick={onClick}>Submit</Button>
            </Box>
            <List>
                {calls.map((call) => (
                    <ListItem key={call._id} onClick={() => handleCallClick(call._id)} 
                        sx={{cursor: 'pointer'  , backgroundColor: currentCallId === call._id ? 'lightgray' : 'transparent'}}>
                        <ListItemText primary={call.name} />
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default CallsList;