import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react'
import { languages, ZHCN } from './languages'
import translations from './translations.json'
import { LS_KEY, fetchLocale, getLanguageCodeFromLS } from './help'

// 设置初始化
const init = {
  isFetching: true,
  currentLanguage: ZHCN
}
// 定义一个Map类型 设置初始key 为中国 , value 是对应的初始文本
export const languageMap = new Map()
languageMap.set(ZHCN.locale,translations)
// 创建一个上下文
export const LanguageContext = createContext(undefined)

function LanguageProvider({children}) {
  // 设置初始状态为本地存储的语言
  const [ state, setState ] = useState(()=>{
    const codeFromStorage = getLanguageCodeFromLS()
    return {
      ...init,
      currentLanguage: languages[codeFromStorage]
    }
  })
  // 结构赋值 当前语言
  const { currentLanguage } = state
  useEffect(()=>{
    //  初始语言 渲染到页面
    const fetchInitialLocales = async()=>{
      // 获取 本地存储语言
      const codeFromStorage = getLanguageCodeFromLS()
      // 如果不是中国语言 获取当前语言对应的 JSON 文本, 并在map 中设置对应的key value
      if(codeFromStorage !== ZHCN.locale){
        const cnLocale = languageMap.get(ZHCN.locale)
        const currentLocale = await fetchLocale(codeFromStorage)
        languageMap.set(codeFromStorage,{...currentLocale})
      }
      // 赋值状态
      setState((preV)=>({
        ...preV,
        isFetching: false
      }))
    }
    fetchInitialLocales()
  },[setState])

  const setLanguage = async(language)=>{
    if( !languageMap.has(language.locale)){
      // map中 还没添加选中语言
      setState((preV)=>({
        ...preV,
        isFetching:true
      }))
      // 加载对应语言的json
      const locale = await fetchLocale(language.locale)
      const cnLocale = languageMap.get(ZHCN.locale)
      // 设置 map key vaule  ， 本地也需要保存
      languageMap.set(language.locale, { ...cnLocale, ...locale })
      localStorage.setItem(LS_KEY, language.locale)
      setState((preV)=>({
        ...preV,
        isFetching:false,
        currentLanguage:language
      }))
    } else {
      // 如果map 中有 直接本地保存 并且state状态改变
      localStorage.setItem(LS_KEY, language.locale)
      setState((preV)=>({
        ...preV,
        isFetching:false,
        currentLanguage: language
      }))
    }
  }
  const translate = useCallback((key,data)=>{
    // 检测map 中是否有当前语言这个key , 有的话获取对应的value 没有的话 默认显示中国文字
    const translateSet = languageMap.has(currentLanguage.locale)
    ? languageMap.get(currentLanguage.locale)
    : languageMap.get(ZHCN.locale)
    // 设置翻译文本  
    const translatedText = translateSet[key] || key
    // 检测需要翻译文本是否有变量
    const includesVariable = translatedText.match(/%\S+?%/gm)
    // 如果有变量 ,并且data中有设置变量的值
    if(includesVariable && data){
      let interpolatedText = translatedText
      // 变量data的key 
      Object.keys(data).forEach( dataKey =>{
        const templateKey = new RegExp(`%${dataKey}%`,'g')
        // 将变量替换 成data 里的数据
        interpolatedText = interpolatedText.replace(templateKey, data[dataKey].toString())
      })
      return interpolatedText
    }
    // 没有变量就直接返回翻译的文本
    return translatedText
  },[currentLanguage])
  return <LanguageContext.Provider value={{...state, setLanguage, t: translate}}> {children} </LanguageContext.Provider>
}

export default LanguageProvider