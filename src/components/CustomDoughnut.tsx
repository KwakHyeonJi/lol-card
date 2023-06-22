import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import styled from 'styled-components'
import { hexToRgb } from '../utils/color'

ChartJS.register(ArcElement, Tooltip, Legend)

interface CustomDoughnutProps {
    children: string
    data: number[]
    colors: string[]
}

const CustomDoughnut = ({ children, data, colors }: CustomDoughnutProps) => {
    return (
        <CustomDoughnutLayout>
            <Doughnut
                data={{
                    datasets: [
                        {
                            data,
                            backgroundColor: colors.map((color) => `rgba(${hexToRgb(color)}, 1`),
                            borderWidth: 0,
                        },
                    ],
                }}
                options={{
                    cutout: '90%',
                    plugins: {
                        legend: {
                            display: false,
                        },
                        tooltip: {
                            enabled: false,
                        },
                    },
                }}
            />
            <CenterText>{children}</CenterText>
        </CustomDoughnutLayout>
    )
}

const CustomDoughnutLayout = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    height: 100%;
`

const CenterText = styled.span`
    position: absolute;
    color: #fff;
    font-size: 1.5rem;
`

export default CustomDoughnut
