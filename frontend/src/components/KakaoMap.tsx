import { useEffect, useRef, useState } from 'react';

type KakaoMapProps = {
  lat: string;
  lng: string;
};

declare global {
  interface Window {
    kakao: any;
  }
}

function KakaoMap({ lat, lng }: KakaoMapProps) {
  const mapRef = useRef(null);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  const x = Number(lat) / 1e7;
  const y = Number(lng) / 1e7;

  // 1. Kakao Maps 스크립트 로딩
  useEffect(() => {
    if (window.kakao?.maps) {
      setIsScriptLoaded(true);
      return;
    }

    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${
      import.meta.env.VITE_KAKAO_JAVASCRIPT_KEY
    }&autoload=false`;
    script.async = true;
    script.onload = () => setIsScriptLoaded(true);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  // 2. 스크립트가 로드된 이후 지도 표시
  useEffect(() => {
    if (!mapRef.current || !isScriptLoaded) return;

    if (window.kakao?.maps) {
      window.kakao.maps.load(() => {
        const map = new window.kakao.maps.Map(mapRef.current, {
          center: new window.kakao.maps.LatLng(y, x),
          level: 3,
        });

        new window.kakao.maps.Marker({
          map,
          position: new window.kakao.maps.LatLng(y, x),
        });
      });
    }
  }, [x, y, isScriptLoaded]);

  return <div ref={mapRef} style={{ width: '100%', height: '400px' }} />;
}

export default KakaoMap;
