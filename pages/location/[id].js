// pages/location/[id].js
export async function getStaticPaths() {
    const paths = Object.keys(locations).map((id) => ({
        params: { id },
    }));

    return {
        paths,
        fallback: false, // 존재하지 않는 경로는 404 반환
    };
}

export async function getStaticProps({ params }) {
    const location = locations[params.id];

    if (!location) {
        return {
            notFound: true, // 잘못된 경로일 경우 404
        };
    }

    return {
        props: {
            location,
        },
    };
}

export default function LocationDetails({ location }) {
    return (
        <div style={{ padding: '20px' }}>
            <h1>{location.name}</h1>
            <p>{location.description}</p>
        </div>
    );
}

// 데이터 정의
const locations = {
    1: { name: 'Seoul Tower', description: 'Famous tower in Seoul.' },
    2: { name: 'Gyeongbokgung', description: 'Historic palace in Korea.' },
    3: { name: 'Busan Beach', description: 'Beautiful beach in Busan.' },
};
