import { useContext } from "react"
import { LanguageContext } from "./Provider"
export default ()=>{
  const languageContext = useContext(LanguageContext)
  if(languageContext === undefined){
    throw new Error('Language context is undefined')
  }
  return languageContext
}