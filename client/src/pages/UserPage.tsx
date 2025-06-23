import  { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import CallsList from '../components/calls/CallsList';
import CallSection from '../components/calls/CallSection';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchCalls } from '../features/calls/callsSlice';
import { selectFetchCallsLoading, selectCallsError, selectCurrentCallId, selectCallById } from '../features/calls/callsSelector';
import CreateCallForm from '../components/calls/CreateCallForm';
import Modal from '@mui/material/Modal';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
const UserPage = () => {
    const dispatch = useAppDispatch();
    const isLoading = useAppSelector(selectFetchCallsLoading);
    const error = useAppSelector(selectCallsError);
    const callId = useAppSelector(selectCurrentCallId);
    const call = useAppSelector(selectCallById(callId));
    const {setUser} = useAuth();
    const [isCreatingCall, setIsCreatingCall] = useState<boolean>(false);
    const handleOpenForm = () => setIsCreatingCall(true);
    const handleCloseForm = () => setIsCreatingCall(false);
    const navigate = useNavigate();

    useEffect(() => {
        console.log('user page');
        setUser({
            _id: '1',
            name: 'user',
            role: 'user'
        })
    }, [])

    useEffect(() => {
        dispatch(fetchCalls());
    }, [dispatch]);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
            <Box sx={{ height: '100%', padding: 2, boxSizing: 'border-box', display: 'flex', flexDirection: 'column' }}>
                <Typography variant='h4' sx={{ mb: 2, width: 'fit-content' }}>User Page</Typography>
                <button style={{marginBottom: '10px', display: 'inline', width: 'fit-content'}} onClick={() => {
                navigate('/admin');
            }}>Switch To Admin</button>
                <Box sx={{ display: 'flex', gap: 2, height: '100%', flex: 1 }}>
                    <Box sx={{ flex: 1 }}>
                        <CallsList onClick={handleOpenForm} />
                    </Box>
                <Box sx={{ flex: 4, alignContent: 'center' }}>
                        <CallSection onClick={handleOpenForm} call={call}/>
                    </Box>
                </Box>
                <div>
                    <Modal open={isCreatingCall} onClose={handleCloseForm}>
                        <Box>
                            <CreateCallForm />
                        </Box>
                    </Modal>
                </div>
            </Box>
    );
};

export default UserPage;