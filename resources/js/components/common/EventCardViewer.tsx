import { Grid } from '@mui/material';
// import { useNavigate } from 'react-router';
// import { Inertia } from '@inertiajs/core';
import { useGetEvents } from '../../services';
import type { IEventCard, IEventForm } from '../../utilities';
import EventCard from './EventCard';

export default function EventCardViewer() {
    const response = useGetEvents();
    const { data } = response;
    // const navigate = useNavigate();

    const handleClickEvent = (eventId: number) => {
        console.log('ROUTING verso l evento');
        // Inertia.visit(`/event/${eventId}`);
    };

    return (
        <Grid container spacing={2}>
            {data &&
                data.map((event: IEventCard) => (
                    <Grid size={6} key={event.id}>
                        <EventCard
                            key={event.id}
                            {...(event as IEventForm)}
                            handleClickEvent={handleClickEvent}
                        />
                    </Grid>
                ))}
        </Grid>
    );
}
