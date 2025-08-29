import dayjs from 'dayjs';

export function getBaseDateTime() {
    const now = dayjs();

    // 발표 시각 목록 (늦은 시각이 먼저 오도록 정렬)
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

        // 지금보다 이 발표시각이 과거거나 같다면 사용
        if (now.isAfter(baseMoment)) {
            return {
                baseDate: baseMoment.format('YYYYMMDD'),
                baseTime: time,
            };
        }
    }

    // 모두 해당 안 되면 → 어제 2300 기준 사용
    const yesterday = now.subtract(1, 'day').format('YYYYMMDD');
    return {
        baseDate: yesterday,
        baseTime: '2300',
    };
}
