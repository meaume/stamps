// pages/scan.js
import dynamic from 'next/dynamic';
import { useState } from 'react';

// Dynamically import the QR reader to avoid SSR issues
const QrReader = dynamic(() => import('react-qr-reader').then((mod) => mod.default), {
    ssr: false,
    loading: () => <div>Loading...</div>,  // 로딩 컴포넌트 추가
});

export default function QRScanner() {
    const [scanResult, setScanResult] = useState(null);

    // QR 코드 매핑 (테스트용 URL)
    const qrCodeMap = {
        'https://stamp-tour.com/location/1': { id: 1, name: 'Seoul Tower' },
        'https://stamp-tour.com/location/2': { id: 2, name: 'Gyeongbokgung' },
        'https://stamp-tour.com/location/3': { id: 3, name: 'Busan Beach' },
    };

    const handleScan = async (data) => {
        if (data) {
            setScanResult(data); // 스캔된 QR 코드 내용 저장

            // QR 코드 맵에서 위치 확인
            const location = qrCodeMap[data];
            if (location) {
                try {
                    // 방문 데이터를 백엔드에 저장
                    const response = await fetch('/api/saveVisit', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            locationId: location.id,
                            locationName: location.name,
                        }),
                    });

                    const result = await response.json();
                    if (response.ok) {
                        alert(`Visit saved: ${location.name}`);
                    } else {
                        console.error(result.error);
                        alert('Failed to save visit');
                    }
                } catch (error) {
                    console.error('Error saving visit:', error);
                    alert('Error saving visit');
                }
            } else {
                alert('Invalid QR Code');
            }
        }
    };

    const handleError = (err) => {
        console.error(err); // QR 리더 오류 처리
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Scan QR Code</h1>
            <QrReader
                delay={300}
                onError={handleError}
                onScan={handleScan}
                style={{ width: '100%' }}
            />
            <div style={{ marginTop: '20px' }}>
                {scanResult ? (
                    <div>
                        <h2>Scan Successful!</h2>
                        <p>QR Code Data: {scanResult}</p>
                    </div>
                ) : (
                    <p>Scanning...</p>
                )}
            </div>
        </div>
    );
}
