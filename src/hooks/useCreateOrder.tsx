import { useMutation } from '@tanstack/react-query'
import axios from '@/lib/axios'

async function createOrder(data:any){
    return await axios.post("/order/create",data).then((res)=> res.data)
}

function useCreateOrder() {
    return useMutation({
        mutationKey:["order","create"],
        mutationFn:async (data) =>  await createOrder(data)
    })
}

export default useCreateOrder 
