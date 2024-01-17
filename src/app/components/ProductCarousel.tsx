import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import React from 'react'
import ProductCard from './ProductCard'
import { TGetFormatedProductsSchema } from '@/schema/get'

type Props = {
    product:TGetFormatedProductsSchema['data'][0]['products']
}

export default function ProductCarousel({product}: Props) {
  return (
                        <Carousel
                            plugins={[plugin.current]}
                            opts={{
                                loop: true,
                            }}
                        >
                            <CarouselContent>
                                {sec.products.map((pro) => (
                                    <CarouselItem key={pro.id}>
                                        {" "}
                                        <ProductCard product={pro} />
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                        </Carousel>
  )
} 
