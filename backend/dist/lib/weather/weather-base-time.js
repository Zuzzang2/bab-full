"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBaseDateTime = getBaseDateTime;
const dayjs_1 = __importDefault(require("dayjs"));
function getBaseDateTime() {
    const now = (0, dayjs_1.default)();
    const baseTimes = [
        '2300',
        '2000',
        '1700',
        '1400',
        '1100',
        '0800',
        '0500',
        '0200',
    ];
    for (const time of baseTimes) {
        const hour = Number(time.slice(0, 2));
        const minute = Number(time.slice(2));
        const baseMoment = now
            .set('hour', hour)
            .set('minute', minute)
            .set('second', 0);
        if (now.isAfter(baseMoment)) {
            return {
                baseDate: baseMoment.format('YYYYMMDD'),
                baseTime: time,
            };
        }
    }
    const yesterday = now.subtract(1, 'day').format('YYYYMMDD');
    return {
        baseDate: yesterday,
        baseTime: '2300',
    };
}
//# sourceMappingURL=weather-base-time.js.map