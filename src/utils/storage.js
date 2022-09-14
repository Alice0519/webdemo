const ws = window.localStorage

let storage = {
    set:(key,value)=>{
      ws.setItem(key,JSON.stringify(value))
    },
    get:(key)=>{
      return ws.getItem(key)
    },
    remove:(key)=>{
      ws.removeItem(key)
    }
}

export default storage