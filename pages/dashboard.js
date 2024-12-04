// pages/dashboard.js
const stamps = [
    { id: 1, name: 'Seoul Tower', collected: true },
    { id: 2, name: 'Gyeongbokgung', collected: false },
    { id: 3, name: 'Busan Beach', collected: true },
];

export default function Dashboard() {
    return (
        <div style={{ padding: '20px' }}>
            <h1>Your Stamp Collection</h1>
            <ul>
                {stamps.map((stamp) => (
                    <li key={stamp.id}>
                        {stamp.name} - {stamp.collected ? '✅ Collected' : '❌ Not Collected'}
                    </li>
                ))}
            </ul>
        </div>
    );
}
