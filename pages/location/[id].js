// pages/location/[id].js
import { useRouter } from 'next/router';

const locations = {
    1: { name: 'Seoul Tower', description: 'Famous tower in Seoul.' },
    2: { name: 'Gyeongbokgung', description: 'Historic palace in Korea.' },
    3: { name: 'Busan Beach', description: 'Beautiful beach in Busan.' },
};

export default function LocationDetails() {
    const router = useRouter();
    const { id } = router.query;

    const location = locations[id];

    if (!location) {
        return <p>Loading...</p>;
    }

    return (
        <div style={{ padding: '20px' }}>
            <h1>{location.name}</h1>
            <p>{location.description}</p>
        </div>
    );
}
