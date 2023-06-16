import useTranslation from '@/contexts/localization/useTranslation'
import { fetchList } from '@/state/user/reducer'
import { useDispatch }  from 'react-redux'
import PageMeta from './PageMeta'
import { useMemo } from 'react'

export default function Home() {
  const { state } = useLocation()
  const params = useParams()
  const [search ,setSearch] = useSearchParams()
  const title = search.get('title')
  const { t } = useTranslation()
  const dispath = useDispatch()
  const [ count, setCount ] = useState(0)

  useEffect(()=>{
    let timer = null
    const handleVisibilityChange = ()=> {
      if (document.visibilityState === 'hidden') {
        // 页面被隐藏了，暂停计时器
        clearTimeout(timer)
      } else {
        // 页面被显示了，恢复计时器
         timer = setTimeout(()=>{
          setCount(count+1)
        },1000)
      }
    }
    if (document.visibilityState === 'visible') {
      timer = setTimeout(()=>{
        setCount(count+1)
      },1000)
    }
  
    document.addEventListener('visibilitychange',handleVisibilityChange)
    return ()=> {
      if(timer){
        clearTimeout(timer)
      }
      document.removeEventListener('visibilitychange',handleVisibilityChange)
    }
  },[count])

  useEffect(()=>{
    dispath(fetchList())
  },[dispath])  

  return (
    <PageMeta>
      <h1>state 传值的 -- {state?.title ?? '-'}</h1>
      <p className=' text-lg text-blue-400'>currentCount--{count}(切换页面暂停计时器版)</p>
      <div>{t("测试%key%翻译",{ key: '自定义' })}</div>
    </PageMeta>
  )
}
