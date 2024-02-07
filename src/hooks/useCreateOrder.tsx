import { useMutation } from '@tanstack/react-query'
import api from '@/lib/axios'

async function createOrder(data:any){
    return await api.post("/order/create",data).then((res)=> res.data)
}

function useCreateOrder() {
    return useMutation({
        mutationKey:["order","create"],
        mutationFn:async (data) =>  await createOrder(data)
    })
}

export default useCreateOrder 
