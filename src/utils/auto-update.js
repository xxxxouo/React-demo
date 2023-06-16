let lastSrcs; // 上一次获取到的script 值

const scriptReg = /\<script.*src=["'](?<src>[^"']+)/gm; // 正则表达式，用于在 HTML 中提取 script 标签的 src 属性值
const duration = 2000  // 检查更新的时间间隔

// 获取最新页面中的script 链接
async function extractNewScript(){
  const html = await fetch('/?_timestamp=' + Date.now()).then(res => res.text()) // 通过 fetch 请求当前页面的 HTML 加上时间戳避免浏览器缓存
  scriptReg.lastIndex = 0 // 重置正则表达式的 lastIndex，以确保从头开始搜索
  let result = [] // 存储匹配结果的数组
  let match
  while ((match = scriptReg.exec(html))) { // 循环匹配正则表达式
    result.push(match.groups.src)   // 将匹配到的 script 链接添加到结果数组中
  }
  return result
}

async function needUpdate(){
  const newScripts = await extractNewScript() 
  if(!lastSrcs){  // 如果 lastSrcs 为空，说明是第一次获取，不需要更新
    lastSrcs = newScripts 
    return false
  }
  let result = false  // 定义一个变量用于存储是否需要更新的结果
  if(lastSrcs.length !== newScripts.length){ // 如果上一次获取到的 script 链接数量与这次不同，说明需要更新
    result = true
  }
  for(let i = 0;i< lastSrcs.length; i++){
    if(lastSrcs[i] !== newScripts[i]){ // 如果相同索引的 script 链接有变化，说明需要更新
      result = true
      break;
    }
  }
  lastSrcs = newScripts; // 将最新的 script 链接存储到 lastSrcs 中，用于下一次比较
  return result
}

function autoRefresh(){
  setTimeout(async()=>{
    const willUpdate = await needUpdate()
    if(willUpdate){
      const result = confirm('页面有更新,点击确定刷新页面')
      if(result) location.reload()
    }
    autoRefresh()
  },duration)
}
import.meta.env.MODE == 'production' && autoRefresh()