"use client"

import { Card, CardContent } from "@/components/ui/card"
import CountUp from "react-countup"

const StatsCard = ({ title, count, icon: Icon, iconColor, iconBgColor }) => {
  return (
    <Card className="overflow-hidden border shadow-sm">
      <CardContent className="">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground mb-0.5">{title}</p>
            <p className="text-lg font-semibold md:text-xl">
              <CountUp
                start={0}
                end={count || 0}
                duration={2}
                separator=","
                useEasing={true}
              />
            </p>
          </div>
          <div className={`rounded-full p-1.5 }`}>
            <Icon className={`h-4 w-4 md:h-5 md:w-5 ${iconColor}`} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default StatsCard
