import * as React from 'react'

import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

export const Slider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Carousel>
      <CarouselContent>{children}</CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
