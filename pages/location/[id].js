// pages/location/[id].js
export async function getStaticPaths() {
    return {
        paths: [
            { params: { id: '1' } },
            { params: { id: '2' } },
            { params: { id: '3' } },
        ],
        fallback: 'blocking', // 잘못된 경로는 서버에서 처리
    };
}

export async function getStaticProps({ params }) {
    const id = params.id;
    const locations = {
        1: { name: 'Seoul Tower', description: 'Famous tower in Seoul.' },
        2: { name: 'Gyeongbokgung', description: 'Historic palace in Korea.' },
        3: { name: 'Busan Beach', description: 'Beautiful beach in Busan.' },
    };

    const location = locations[id];

    if (!location) {
        return {
            notFound: true,
        };
    }

    return {
        props: { location },
    };
}

export default function LocationDetails({ location }) {
    return (
        <div>
            <h1>{location.name}</h1>
            <p>{location.description}</p>
        </div>
    );
}
