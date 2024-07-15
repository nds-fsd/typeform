import { useQuery } from 'react-query';
import { api } from '../utils/api.js';

export const useForms = () => {
    const { data: forms, isLoading } = useQuery('forms', async () =>
        api()
            .get('/form')
            .then((response) => response.data),
    );

    return { forms, isLoading };
};