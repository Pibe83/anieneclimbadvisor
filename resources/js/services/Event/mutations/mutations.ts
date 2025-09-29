import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addEvent } from '../eventApi';

export const useAddEvent = () => {
    //const { showSnackbar } = useSnackbar();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: any) => addEvent(data),
        // intercept mutation at each stage of its lifecycle

        // onMutate --> start mutation
        onMutate: () => {
            console.log('mutate');
        },
        onSuccess: () => {
            console.log('success');
            //showSnackbar("Evento creato con successo");
        },
        onError: () => {
            console.log('error');
            //showSnackbar("Errore nella creazione dell evento");
        },
        // on Settled --> end  mutation
        onSettled: async (_, error) => {
            if (error) console.log(error);
            else await queryClient.invalidateQueries({ queryKey: ['events'] });
        },
    });
};
