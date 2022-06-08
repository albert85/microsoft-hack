

export const commaSeparator = (params) => {
  // check if it a number
  if(isNaN(params)){
    return 'Not a number'
  }
  const convertString = params.toString();

  let commasVariable = '';
  let countingVariable = ''

  for(let x=convertString.length-1; x>-1; x--){
    if(countingVariable.length % 3 === 0 && countingVariable.length >0){
      commasVariable = ',' + commasVariable;
    }
    commasVariable = convertString[x] + commasVariable;
    countingVariable += convertString[x];
  }
  return commasVariable;
}