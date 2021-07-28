import React, { useState } from "react";

export const Context = React.createContext();


export const Provider = ({ children }) => {
  
  const [remetente,setProviderRemetente] = useState(null);
  const [destinatario, setProviderDestinatario] = useState(null);
  const [produtos,setProviderProdutos] = useState(null)
  const [sumTotal, setSumTotal] = useState([]);
  const [checkDados,setCheckDados] = useState(false)

  return (
    <Context.Provider
      value={{checkDados,setCheckDados,sumTotal, setSumTotal,remetente,setProviderRemetente,destinatario,setProviderDestinatario,produtos,setProviderProdutos}}
    >
      {children}
    </Context.Provider>
  );
};
