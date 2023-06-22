const rgbValidate = (rgb: string) => {
    if (rgb.startsWith('#')) {
        rgb = rgb.slice(1)
    }

    if (rgb.length !== 6) {
        throw new Error('6자리의 RGB 값을 입력해주세요.')
    }

    return rgb
}

export const hexToRgb = (hex: string) => {
    const rgb = rgbValidate(hex)
    return `${parseInt(rgb.slice(0, 2), 16)}, ${parseInt(rgb.slice(2, 4), 16)}, ${parseInt(rgb.slice(4, 6), 16)}`
}
