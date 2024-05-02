import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

interface AccordionProps {
  type: 'single' | 'multiple'
  collapsible: boolean
  children: React.ReactNode
}

export function CAccordion({ type, collapsible, children }: AccordionProps) {
  return (
    <Accordion type={type} collapsible={collapsible}>
      {children}
    </Accordion>
  )
}
