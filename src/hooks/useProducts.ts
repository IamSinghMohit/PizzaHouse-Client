import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";

function getProducts(){
   const result = api.get('/products')
}

export function useProducts(){
    return useQuery({
        queryKey:['products'],
        queryFn:
    })
}