import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import store from "@/store/store";

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export { default as useDebounce } from "./useDebounce";
export { useFormatedProducts } from "./useFormatedProducts";
export { useGetUser } from "./useGetUser";
export { default as useIntersectionObserver } from "./useIntersectionObserver";