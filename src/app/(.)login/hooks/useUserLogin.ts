import { useQuery } from "@tanstack/react-query"
export function useUserLogin(){
    return useQuery({
        queryKey:['user','login'],
    })
}