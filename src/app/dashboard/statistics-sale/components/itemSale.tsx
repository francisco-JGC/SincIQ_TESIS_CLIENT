import { formatPrice } from '@/utils/formatPrice'
import type { ISale } from './listSales'
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Accordion,
} from '@radix-ui/react-accordion'
import { formatDate } from '@/utils/formatDate'
import Image from 'next/image'

interface IProps {
  sale: ISale
}

export const SaleItem = ({ sale }: IProps) => {
  return (
    <div>
      <Accordion type="single" collapsible className="w-full py-2">
        <AccordionItem value={sale.id.toString()}>
          <AccordionTrigger className="w-full grid grid-cols-6 gap-4 p-2 text-start bg-[#191a3b]">
            <span>{sale.id}</span>
            <span>{sale.products.length}</span>
            <span>{formatPrice(sale.total_price)}</span>
            <span>{sale.state}</span>
            <span>{formatDate(sale.createdAt)}</span>
            <span>
              <button className="btn btn-primary">Ver detalles</button>
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col">
              <div className="flex flex-col gap-4 bg-[#27193b] p-4">
                {sale.products.map((product) => (
                  <div key={product.id} className="flex gap-4 items-center ">
                    <Image
                      src={product.images_url[0]}
                      alt={product.name}
                      width={50}
                      height={30}
                      objectFit="contain"
                      className="bg-white"
                      style={{ borderRadius: '8px' }}
                    />
                    <span>{product.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
