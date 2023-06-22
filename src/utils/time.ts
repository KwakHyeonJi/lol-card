export const getTimeStamp = () => {
    const startTime = new Date().setHours(0, 0, 0, 0)
    const endTime = new Date().setHours(23, 59, 59, 999)
    return [startTime, endTime]
}

export const secToTime = (duration: number) => {
    const minutes = String(Math.floor(duration / 60)).padStart(2, '0')
    const seconds = String(Math.floor(duration % 60)).padStart(2, '0')
    return [minutes, seconds]
}
