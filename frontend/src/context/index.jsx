import { createContext, useState } from "react";


export const GlobalContext = createContext(null)

export default function GlobalState({children}){
  const [formData, setFormData] = useState({
    title:"",
    description:""
  })

  const [blogList, setBlogList] = useState([]);
  const [isEdit, setIsEdit] = useState(false)

  return <GlobalContext.Provider value={{isEdit, setIsEdit,formData, setFormData,blogList, setBlogList}}>
    {children}
  </GlobalContext.Provider>
}