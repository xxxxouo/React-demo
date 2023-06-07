let lastSrcs; // 上一次获取到的script 值

const scriptReg = /\<script.*src=["'](?<src>[^"']+)/gm;
const duration = 2000

// 获取最新页面中的script 链接
async function extractNewScript(){
  const html = await fetch('/?_timestamp=' + Date.now()).then(res => res.text())
  scriptReg.lastIndex = 0
  let result = []
  let match
  while ((match = scriptReg.exec(html))) {
    result.push(match.groups.src)
  }
  console.log(import.meta.env.MODE,'import.meta.env.MODE');
  return result
}

async function needUpdate(){
  const newScripts = await extractNewScript()
  if(!lastSrcs){
    lastSrcs = newScripts
    return false
  }
  let result = false
  if(lastSrcs.length !== newScripts.length){
    result = true
  }
  for(let i = 0;i< lastSrcs.length; i++){
    if(lastSrcs[i] !== newScripts[i]){
      result = true
      break;
    }
  }
  lastSrcs = newScripts;
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