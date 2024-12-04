import Link from 'next/link';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const QrReader = dynamic(() => import('react-qr-reader'), { ssr: false });

const locations = [
    { id: 1, name: 'Seoul Tower', description: 'Famous tower in Seoul.' },
    { id: 2, name: 'Gyeongbokgung', description: 'Historic palace in Korea.' },
    { id: 3, name: 'Busan Beach', description: 'Beautiful beach in Busan.' },
];

export default function Home() {
    const [stamps, setStamps] = useState([]);
    const [showScanner, setShowScanner] = useState(false);
    const [scannedId, setScannedId] = useState(null);

    // 서버에서 스탬프 데이터를 가져오기
    useEffect(() => {
        async function fetchStamps() {
            const res = await fetch('/api/saveVisit');
            const data = await res.json();
            setStamps(data.data.map((visit) => visit.locationId)); // MongoDB에서 locationId 추출
        }

        fetchStamps();
    }, []);

    // QR 코드 스캔 처리
    const handleScan = async (data) => {
        if (data) {
            setScannedId(data); // QR 코드 데이터에서 locationId 추출
            setShowScanner(false); // QR 스캐너 닫기
            await handleCollectStamp(parseInt(data)); // 스탬프 수집 로직 호출
        }
    };

    const handleError = (err) => {
        console.error('QR Scanner Error:', err);
    };

    // 스탬프 수집 처리
    const handleCollectStamp = async (id) => {
        if (stamps.includes(id)) return; // 이미 수집한 경우 무시

        try {
            const res = await fetch('/api/saveVisit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ locationId: id }),
            });

            if (res.ok) {
                setStamps((prev) => [...prev, id]); // 상태 업데이트
            } else {
                console.error('Failed to save stamp');
            }
        } catch (error) {
            console.error('Error collecting stamp:', error);
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Welcome to the Stamp Tour</h1>
            <p>Visit the following locations and collect stamps!</p>

            {showScanner && (
                <div>
                    <h2>Scan QR Code</h2>
                    <QrReader
                        delay={300}
                        onError={handleError}
                        onScan={handleScan}
                        style={{ width: '100%' }}
                        constraints={{ facingMode: 'environment' }} // 후면 카메라 설정
                    />
                </div>
            )}

            <ul>
                {locations.map((location) => (
                    <li key={location.id}>
                        <h2>{location.name}</h2>
                        <p>{location.description}</p>
                        <button onClick={() => setShowScanner(true)}>
                            {stamps.includes(location.id) ? 'Stamp Collected ✅' : 'Collect Stamp'}
                        </button>
                        <Link href={`/location/${location.id}`}>
                            <a>View Details</a>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
