const mask = {
  Cep: (e) => {
    e.currentTarget.maxLength = 9;
  
    let value = e.currentTarget.value;
    value = value.replace(/\D/g, "");
    value = value.replace(/^(\d{5})(\d)/, "$1-$2");
    e.currentTarget.value = value;
  },
  Cpf : (e) => {
    //414.226.508-39
    e.currentTarget.maxLength = 14;
    var value = e.currentTarget.value;
    value = value
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})/, "$1-$2")
      .replace(/(-\d{2})\d+?$/, "$1");
    e.currentTarget.value = value;
  },
  Cnpj : (e) => {
    //00.000.000/0001-00
    e.currentTarget.maxLength = 18;
    var value = e.currentTarget.value;
    value = value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/,"$1.$2")
      .replace(/(\d{3})(\d)/,"$1.$2")
      .replace(/(\d{3})(\d)/,"$1/$2")
      .replace(/(\d{4})(\d{1,2})/,"$1-$2")
      .replace(/(-\d{2})\d+?$/,"$1")
    e.currentTarget.value = value;
  },
  Currency : (e) => {
    //00,00 / 000,00 / 0.000,00 / 00.000,00 / 000.000,00 / 1.000.000.000,00
    var value =  e.currentTarget.value;
    value = value
      .replace(/\D/g,"")
      .replace(/(\d{2}$)/,",$1")
      .replace(/(\d+)(\d{3})/,"$1.$2")
      .replace(/(\d+)(\d{3})/,"$1.$2")
      .replace(/^(\d+)(\d{3})/,"$1.$2")

    e.currentTarget.value = value;
  },
  Number : (e) => {
   //e.currentTarget.maxLength = 18; //limitar quantidade de digitos
     var value = e.currentTarget.value;
    value = value
      .replace(/\D/g,"")

    e.currentTarget.value = value;  
  },
  Estado : (e) => {
    /// ex: SP
    e.currentTarget.maxLength = 2;
    var value =  e.currentTarget.value;
    value = value
      .replace(/\d/g,"")
      .replace(/([A-Z]{2})/,"$1")
    
    e.currentTarget.value = value.toUpperCase();
  },
  CpfCnpj : (e) => {
    var value = e.currentTarget.value;
    e.currentTarget.maxLength = 18;

    if(value.length <= 14){
      value = value
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})/, "$1-$2")
      .replace(/(-\d{2})\d+?$/, "$1");
      e.currentTarget.value = value;
    }else if(value.length > 14){
      value = value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/,"$1.$2")
      .replace(/(\d{3})(\d)/,"$1.$2")
      .replace(/(\d{3})(\d)/,"$1/$2")
      .replace(/(\d{4})(\d{1,2})/,"$1-$2")
      .replace(/(-\d{2})\d+?$/,"$1")
    e.currentTarget.value = value;
    }

  }

}



export default mask;
