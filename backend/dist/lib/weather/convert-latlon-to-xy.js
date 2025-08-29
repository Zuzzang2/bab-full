"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dfs_xy_conv = dfs_xy_conv;
function dfs_xy_conv(lat, lon) {
    const RE = 6371.00877;
    const GRID = 5.0;
    const SLAT1 = 30.0;
    const SLAT2 = 60.0;
    const OLON = 126.0;
    const OLAT = 38.0;
    const XO = 43;
    const YO = 136;
    const DEGRAD = Math.PI / 180.0;
    const re = RE / GRID;
    const slat1 = SLAT1 * DEGRAD;
    const slat2 = SLAT2 * DEGRAD;
    const olon = OLON * DEGRAD;
    const olat = OLAT * DEGRAD;
    const sn = Math.tan(Math.PI * 0.25 + slat2 * 0.5) /
        Math.tan(Math.PI * 0.25 + slat1 * 0.5);
    const snLog = Math.log(Math.cos(slat1) / Math.cos(slat2)) / Math.log(sn);
    const sf = Math.tan(Math.PI * 0.25 + slat1 * 0.5);
    const ro = (re * Math.cos(slat1)) / sf ** snLog;
    const ra = Math.tan(Math.PI * 0.25 + lat * DEGRAD * 0.5);
    const theta = lon * DEGRAD - olon;
    const nx = Math.floor(XO + ra ** -snLog * Math.sin(theta * snLog) + 0.5);
    const ny = Math.floor(YO + ro - ra ** -snLog * Math.cos(theta * snLog) + 0.5);
    return { nx, ny };
}
//# sourceMappingURL=convert-latlon-to-xy.js.map