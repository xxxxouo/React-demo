import { ZHCN } from "./languages"
const publicUrl = import.meta.env.BASE_URL
export const LS_KEY = 'language'

// 调用本地 翻译json
export const fetchLocale = async(locale) =>{
  const res = await fetch(`/locales/${locale}.json`)
  const data = await res.json()
  return data
}


// 获取本地 语言代码
export const getLanguageCodeFromLS = () =>{
  try {
    const codeFromStorage = localStorage.getItem(LS_KEY)
    return codeFromStorage || ZHCN.locale
  } catch (error) {
    return  ZHCN.locale
  }
}