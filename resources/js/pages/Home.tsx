import { useGetEvents } from '@/services/Event';

export default function Home() {
    const { data } = useGetEvents();
    console.log(data);
    return <div>Home</div>;
}
