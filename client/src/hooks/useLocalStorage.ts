import { useEffect, useState } from "react"

const useLocalStorage = (key: string, initialValue: string | null = null ) => {
   const [value, setValue] = useState(()=>{
    const jsonValue = localStorage.getItem(key)
    if (jsonValue !== null && jsonValue !== undefined) {
        return JSON.parse(jsonValue )
    } 
    return initialValue
   })
   useEffect(()=>{
    localStorage.setItem(key, JSON.stringify(value))
   },[key, value])

   return [value, setValue]
}
export default useLocalStorage