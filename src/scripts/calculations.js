

const math = {

  multiplyCurrency: (value1, value2) => {

    //recebe 2 string no formato real brasileiro ex: 1.920,53
    var number1 = value1.replace(/([,])/, "").replace(/([.])/, "");
    var number2 = value2.replace(/([.][,])/, "");

    number1 = parseInt(number1);
    number2 = parseInt(number2);

    var result = number1 * number2;

    result = result
      .toString()
      .replace(/\D/g, "")
      .replace(/(\d{2}$)/, ",$1")
      .replace(/(\d+)(\d{3})/, "$1.$2")
      .replace(/(\d+)(\d{3})/, "$1.$2")
      .replace(/^(\d+)(\d{3})/, "$1.$2");

    

    return result;
  },
  somaArray: (array) => {

    
    var resultSoma = 0;

    array.map(async(value) => {
        var number = value.replace(/([,])/, "").replace(/([.])/, "");
        number = parseInt(number)
        resultSoma = resultSoma + number;
    })

    resultSoma = resultSoma
      .toString()
      .replace(/\D/g, "")
      .replace(/(\d{2}$)/, ",$1")
      .replace(/(\d+)(\d{3})/, "$1.$2")
      .replace(/(\d+)(\d{3})/, "$1.$2")
      .replace(/^(\d+)(\d{3})/, "$1.$2");

    

    return resultSoma;

  }
};

export default math;
