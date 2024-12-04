// pages/locations.js
import Link from 'next/link';

const locations = [
    { id: 1, name: 'Seoul Tower', description: 'Famous tower in Seoul.' },
    { id: 2, name: 'Gyeongbokgung', description: 'Historic palace in Korea.' },
    { id: 3, name: 'Busan Beach', description: 'Beautiful beach in Busan.' },
];

export default function Locations() {
    return (
        <div style={{ padding: '20px' }}>
            <h1>Locations to Visit</h1>
            <ul>
                {locations.map((location) => (
                    <li key={location.id}>
                        <h2>{location.name}</h2>
                        <p>{location.description}</p>
                        <Link href={`/location/${location.id}`}>
                            View Details
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
