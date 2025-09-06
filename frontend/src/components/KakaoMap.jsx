import { useEffect, useRef } from 'react';

function KakaoMap({ lat, lng }) {
    const mapRef = useRef(null);
    const x = Number(lng) / 1e7;
    const y = Number(lat) / 1e7;

    useEffect(() => {
        if (!mapRef.current) return;

        if (window.kakao?.maps) {
            window.kakao.maps.load(() => {
                const map = new window.kakao.maps.Map(mapRef.current, {
                    center: new window.kakao.maps.LatLng(x, y),
                    level: 3,
                });

                new window.kakao.maps.Marker({
                    map,
                    position: new window.kakao.maps.LatLng(x, y),
                });
            });
        }
    }, [x, y]);

    console.log('lat', x, 'lng', y);

    return <div ref={mapRef} style={{ width: '100%', height: '400px' }} />;
}

export default KakaoMap;
