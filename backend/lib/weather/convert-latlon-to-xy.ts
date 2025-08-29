export function dfs_xy_conv(
    lat: number,
    lon: number,
): { nx: number; ny: number } {
    // 위도/경도 -> nx/ny 격자 변환
    const RE = 6371.00877; // 지구 반지름(km)
    const GRID = 5.0; // 격자 간격(km)
    const SLAT1 = 30.0; // 투영 위도1(degree)
    const SLAT2 = 60.0; // 투영 위도2(degree)
    const OLON = 126.0; // 기준점 경도(degree)
    const OLAT = 38.0; // 기준점 위도(degree)
    const XO = 43; // 기준점 X좌표(GRID)
    const YO = 136; // 기준점 Y좌표(GRID)

    const DEGRAD = Math.PI / 180.0;

    const re = RE / GRID;
    const slat1 = SLAT1 * DEGRAD;
    const slat2 = SLAT2 * DEGRAD;
    const olon = OLON * DEGRAD;
    const olat = OLAT * DEGRAD;

    const sn =
        Math.tan(Math.PI * 0.25 + slat2 * 0.5) /
        Math.tan(Math.PI * 0.25 + slat1 * 0.5);
    const snLog = Math.log(Math.cos(slat1) / Math.cos(slat2)) / Math.log(sn);
    const sf = Math.tan(Math.PI * 0.25 + slat1 * 0.5);
    const ro = (re * Math.cos(slat1)) / sf ** snLog;

    const ra = Math.tan(Math.PI * 0.25 + lat * DEGRAD * 0.5);
    const theta = lon * DEGRAD - olon;

    const nx = Math.floor(XO + ra ** -snLog * Math.sin(theta * snLog) + 0.5);
    const ny = Math.floor(
        YO + ro - ra ** -snLog * Math.cos(theta * snLog) + 0.5,
    );

    return { nx, ny };
}
