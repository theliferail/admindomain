"use client"

import Image, { type StaticImageData } from "next/image"

import { Card, CardContent } from "@shared/components/ui/card"
import { cn } from "@shared/lib/utils"

type CardsProps = {
  title: string
  description: string
  image: string | StaticImageData
  backgroundColor?: string
  iconBackgroundColor?: string
  className?: string
}

export default function Cards({
  title,
  description,
  image,
  backgroundColor,
  iconBackgroundColor,
  className,
}: CardsProps) {
  return (
    <Card
      className={cn(
        "h-[140px] w-full max-w-[340px] cursor-pointer rounded-none border-none shadow-none transition hover:shadow-[0_18px_35px_-28px_rgba(15,23,42,0.45)]",
        className
      )}
      style={{ backgroundColor: backgroundColor ?? "#efe9e5" }}
    >
      <CardContent className="flex justify-between content-center items-center gap-8 px-6 py-2 md:flex-row md:items-start md:justify-between md:gap-6 md:px-7 md:py-1">
        <div className=" flex flex-col  content-center gap-2  md:flex-col md:items-start md:gap-2">
          <span
            className="flex size-11 items-center justify-center rounded-full md:size-12"
            style={{ backgroundColor: iconBackgroundColor ?? "#d6d3d6" }}
          >
            <Image src={image} alt={title} width={20} height={20} />
          </span>
          <p className="text-[13px] text-nowrap leading-[16px] text-[#1E1E1E] md:mt-1">{title}</p>
        </div>
        <div>
         <p className="pb-10 pr-4 text-[16px] font-normal text-[#1E1E1E] md:self-start">{description}</p>
        </div>
      </CardContent>
    </Card>
  )
}