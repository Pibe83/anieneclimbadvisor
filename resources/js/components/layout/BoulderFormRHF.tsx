import { zodResolver } from '@hookform/resolvers/zod';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import PublishIcon from '@mui/icons-material/Publish';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router';
import * as z from 'zod';
import { useGeolocation } from '../../customHooks/useLocalization';
import { useAddBoulder, useUpdateBoulder } from '../../services';
import {
    DIFFICULTY_SELECT_MENU_ITEMS,
    type Difficulty,
    type IBoulder,
} from '../../utilities';
import { BoulderSchema } from '../../zodSchemas/BoulderSchema';
import LeafletMapViewer from '../common/LeafletMapViewer';
import { NumberInputRHF } from '../form/NumberInputRHF';
import SelectForm from '../form/SelectForm';

// Boulder schema - zod
export type BoulderSchemaValues = z.infer<typeof BoulderSchema>;

export default function BoulderFormRHF({ boulder }: { boulder?: IBoulder }) {
    // params
    const { eventId } = useParams<{ eventId: string }>();
    // mutation
    const createBoulderMutation = useAddBoulder();
    const updateBoulderMutation = useUpdateBoulder();
    // form setup
    const {
        register,
        handleSubmit,
        setValue,
        reset,
        watch,
        control,
        formState: { errors },
    } = useForm<BoulderSchemaValues>({
        resolver: zodResolver(BoulderSchema),
        defaultValues: {
            name: '',
            description: '',
            difficulty: 'facile',
            latitude: 41.9028,
            longitude: 12.4964,
        },
    });

    // Geolocation
    const {
        geolocation,
        errorGeolocation,
        loadingGeolocation,
        refreshGeolocation,
    } = useGeolocation();

    const handleClickLocation = () => {
        refreshGeolocation();
    };

    useEffect(() => {
        if (geolocation) {
            setValue('latitude', geolocation.latitude);
            setValue('longitude', geolocation.longitude);
        }
    }, [geolocation]);

    useEffect(() => {
        if (boulder) {
            const boulderData = {
                name: boulder.name,
                description: boulder.description,
                difficulty: boulder.difficulty,
                latitude: boulder.latitude,
                longitude: boulder.longitude,
            };
            reset(boulderData);
        }
    }, [boulder]);

    // submit
    const onSubmit = (data: BoulderSchemaValues) => {
        if (boulder) {
            const formattedData: IBoulder = {
                ...data,
                difficulty: data.difficulty as Difficulty,
                eventId: parseFloat(eventId!),
            };
            updateBoulderMutation.mutate({
                id: boulder.id!,
                data: formattedData,
            });
        } else {
            createBoulderMutation.mutate({
                ...data,
                difficulty: data.difficulty as Difficulty,
                eventId: parseFloat(eventId!),
                createdAt: new Date().toISOString(),
            });
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
                fullWidth
                label="nome boulder"
                margin="normal"
                {...register('name')}
                error={!!errors.name}
                helperText={
                    typeof errors.name?.message === 'string'
                        ? errors.name.message
                        : ''
                }
            />
            <TextField
                fullWidth
                label="descrizione boulder"
                margin="normal"
                {...register('description')}
                error={!!errors.description}
                helperText={
                    typeof errors.description?.message === 'string'
                        ? errors.description.message
                        : ''
                }
            />
            <SelectForm
                name={'difficulty'}
                control={control}
                menuItems={DIFFICULTY_SELECT_MENU_ITEMS}
            />
            {/** Latitudine e longitudine in numbers */}
            <Box sx={{ display: 'flex', gap: 2, paddingTop: 1 }}>
                <NumberInputRHF
                    name={'latitude'}
                    control={control}
                    label={'latitudine'}
                    dataTestId={'latitude-input'}
                />
                <NumberInputRHF
                    name={'longitude'}
                    control={control}
                    label={'longitudine'}
                    dataTestId={'longitude-input'}
                />
            </Box>
            <Button
                sx={{
                    mt: 4,
                    p: {
                        xs: '2rem 2rem 2rem 2rem',
                        md: '1rem 1rem 1rem 1rem',
                    },
                }}
                variant="outlined"
                endIcon={<MyLocationIcon />}
                loading={loadingGeolocation}
                size="large"
                onClick={handleClickLocation}
            >
                Localizzati
            </Button>
            <LeafletMapViewer
                latLong={[watch('latitude'), watch('longitude')]}
                setValue={setValue}
                name={watch('name')}
            />
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    paddingTop: 2,
                }}
            >
                <Button
                    variant="contained"
                    endIcon={<PublishIcon />}
                    type="submit"
                    size="large"
                    sx={{
                        p: {
                            xs: '2rem 2rem 2rem 2rem',
                            md: '1rem 1rem 1rem 1rem',
                        },
                    }}
                >
                    {boulder ? 'Aggiorna Boulder' : 'Inserisci Boulder'}
                </Button>
            </Box>
            {errorGeolocation && (
                <Typography>Impossibile ottenere la localizzazione</Typography>
            )}
        </form>
    );
}
