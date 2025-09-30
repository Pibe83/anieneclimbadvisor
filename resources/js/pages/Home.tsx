import EventCardViewer from '@/components/common/EventCardViewer';
import FullScreenDialog from '@/components/common/FullScreenDialog';
import PositionedSnackbar from '@/components/common/Snackbar';
import EventForm from '@/components/layout/EventForm';
import { useToggle } from '@/customHooks/useToggle';
import { Box, Button } from '@mui/material';

export default function Home() {
    const [value, setToggle] = useToggle(false);

    return (
        <Box
            sx={{
                'max-width': '1280px',
                margin: ' 0 auto',
                minHeight: '84.3vh',
            }}
        >
            <Button
                variant="contained"
                size="large"
                onClick={() => {
                    setToggle(true);
                }}
                sx={{ marginBottom: '2rem' }}
            >
                Aggiungi Evento
            </Button>
            <EventCardViewer />
            <FullScreenDialog
                setIsOpen={setToggle}
                isOpen={value}
                titleText="Evento Editor - Inserisci Evento"
            >
                <EventForm setToggle={setToggle} />
            </FullScreenDialog>
            <PositionedSnackbar />
        </Box>
    );
}
