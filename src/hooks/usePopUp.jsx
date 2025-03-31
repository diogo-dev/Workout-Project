import { PopUpContext } from "../context/PopUpContext"
import { useContext } from "react"

export const usePopUp = () => {
  return useContext(PopUpContext);
};