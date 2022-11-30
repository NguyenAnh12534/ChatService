import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { TextField, Button } from '@mui/material';
import Stack from '@mui/system/Stack';
import ExamCard from '~/pages/Home/Components/ExamCard';
import NewQuizModal from '~/Components/Assets/NewQuizModal';
import ExamService from '~/Services/ExamService';
import { Link } from 'react-router-dom';
import UserContext from '~/Context/UserContext';
import { useNavigate } from 'react-router-dom';


const Home = () => {
    const [openNewQuizModal, setOpenNewQuizModal] = React.useState(false);
    const [exams, setExams] = React.useState([]);
    const [roomId, setRoomId] = React.useState('');
    const navigate = useNavigate();

    const handleCreateQuiz = () => {
        setOpenNewQuizModal(true);
    };

    const handleChangeRoomId = (e) => {
        setRoomId(e.target.value);
    };

    const handleJoinRoom = (e) => {
        if(roomId) {
            let roomIdValidation = roomId.trim()
            roomIdValidation = roomIdValidation.split(" ").join("_");
            navigate(`/quiz/wait-room/guest/${roomIdValidation}`, {state: {mode: ""}});
        }
    }

    React.useEffect(() => {
        ExamService.getAll(
            (response) => {
                setExams(response.data.data);
            },
            (error) => {},
        );
    }, []);

    return (
        <Container maxWidth="xl">
            <Box marginX={5}>
                <Grid spacing={2} container justifyContent="space-between" alignItems="center">
                    <Grid item xs={8}>
                        <Box sx={cardStyle}>
                            <Box sx={wrapperStyle}>
                                <Stack direction="row" spacing={1}>
                                    <TextField
                                        value={roomId}
                                        onChange={handleChangeRoomId}
                                        variant="standard"
                                        placeholder="Enter a join code"
                                        fullWidth={true}
                                        sx={{
                                            borderRadius: 3,
                                            backgroundColor: 'white',
                                            px: 2,
                                            py: 1,
                                        }}
                                        InputProps={{ disableUnderline: true }}
                                    ></TextField>
                                    <Button
                                        onClick={handleJoinRoom}
                                        variant="contained"
                                        color="primary"
                                        size="small"
                                        sx={{ py: 1, px: 3, borderRadius: 3, boxShadow: '0 4px 0 #0c4689' }}
                                    >
                                        Join
                                    </Button>
                                </Stack>
                            </Box>
                        </Box>
                    </Grid>

                    <Grid item xs={4}>
                        <Box sx={{ ...cardStyle, height: 216, background: 'linear-gradient(45deg, #3c3c8a, #2c6cd1)' }}>
                            <Stack spacing={1}>
                                <Button
                                    variant="outlined"
                                    onClick={handleCreateQuiz}
                                    sx={{
                                        color: 'white',
                                        borderColor: 'white',
                                        textTransform: 'none',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    Create quiz
                                </Button>

                                <Button
                                    component={Link}
                                    to="/quiz/owning/"
                                    sx={{ color: 'white', opacity: 0.9, textTransform: 'none', fontSize: 14 }}
                                >
                                    &gt; Show all my exam &lt;
                                </Button>
                            </Stack>
                        </Box>
                    </Grid>
                </Grid>

                <Grid container rowSpacing={2} columnSpacing={2} sx={{ mt: 2 }}>
                    {exams.map((exam) => (
                        <Grid item md={12 / 5} sm={3}>
                            <ExamCard exam={exam} />
                        </Grid>
                    ))}
                </Grid>

                <Box mt={5}></Box>
            </Box>

            <NewQuizModal open={openNewQuizModal} setOpen={setOpenNewQuizModal} />
        </Container>
    );
};

const cardStyle = {
    height: '216px',
    padding: 2,
    backgroundColor: 'white',
    borderRadius: 3,
    boxShadow: '0 2px 4px 0 rgb(0 0 0 / 10%)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
};

const wrapperStyle = {
    border: '2px solid rgba(0,0,0,.33)',
    backgroundColor: '#f4f4f5',
    borderRadius: 3,
    padding: 0.8,
    width: '60%',
};

export default Home;
