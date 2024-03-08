import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

type Props = {
  children: React.ReactNode
  title: string
  description?: string
  Component?: React.ReactNode
  position?: 'left' | 'right' | 'top' | 'bottom'
  styles?: React.CSSProperties
  className?: string
}
export function CSheet({
  children,
  title,
  description,
  position = 'right',
  Component,
  styles,
  className,
}: Props) {
  return (
    <Sheet>
      <SheetTrigger asChild className={className}>
        {children}
      </SheetTrigger>
      <SheetContent
        className="bg-[#100e17] border-none"
        side={position}
        style={{
          boxShadow: '0px 4px 20px rgba(105, 46, 227, 0.2)',
          ...styles,
        }}
      >
        <SheetHeader className="mb-4">
          <SheetTitle>{title}</SheetTitle>
          {description && <SheetDescription>{description}</SheetDescription>}
        </SheetHeader>
        {Component}
      </SheetContent>
    </Sheet>
  )
}
