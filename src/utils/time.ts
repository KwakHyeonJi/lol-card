export const getTimeStamp = () => {
    const startTime = new Date().setHours(0, 0, 0, 0)
    const endTime = new Date().setHours(23, 59, 59, 999)
    return [startTime, endTime]
}

export const secToTime = (duration: number) => {
    const minutes = Math.floor(duration / 60)
    const seconds = Math.floor(duration % 60)
    return [minutes, seconds]
}
