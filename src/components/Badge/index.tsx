import { BadgeDelta, Card } from '@tremor/react'
interface IProps {
  value: string | number
  title: string
  delta?: string
}

export function Badge({ value, title, delta }: IProps) {
  return (
    <Card className="mx-auto max-w-sm bg-white text-black rounded">
      <div className="flex items-center justify-between">
        <h4 className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
          {title}
        </h4>
        <BadgeDelta
          deltaType="moderateIncrease"
          isIncreasePositive={true}
          size="xs"
          className="bg-green-100 dark:bg-green-800 text-green-500 dark:text-green-300"
        >
          {delta}
        </BadgeDelta>
      </div>
      <p className="text-tremor-metric text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold  text-xl">
        {value}
      </p>
    </Card>
  )
}
