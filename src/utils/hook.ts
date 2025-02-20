import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../services/type/data"

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()