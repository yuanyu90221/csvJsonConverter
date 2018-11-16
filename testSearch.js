const jsonFile = require('jsonfile');
const mnemonicMap = jsonFile.readFileSync('./result/mnemonic.json');
const search = (keyWord) => {
  let result = mnemonicMap.find((element)=>{
    // console.log(element);
    return Object.keys(element)[0] === keyWord; 
  });
  if (result === undefined) {
    throw new Error('seed not in dictionary');
  }
  return result[`${keyWord}`];
}

// console.log(search("0"));
try {
  let currentResult = search("00001");
  console.log(currentResult);
}
catch(e) {
  console.log(e.message);
}