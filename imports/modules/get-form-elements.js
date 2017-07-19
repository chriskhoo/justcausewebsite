function getFormElementsWithNewButton(type, fields, form){
  const fieldKeys = Object.keys(fields);
  const fieldName = fieldKeys[0];
  const idArray = getIdArray(type, fieldName, form);
  let elementsArray = [];

  idArray.forEach((_id)=>{
    prefix = _id.substring(0,4);
    let element = {};
    element._id = getId(_id);
    let blank = true;
    fieldKeys.forEach((key)=>{
      element[key] = getFormValue(key, fields[key], type, _id, form);
      blank = blank && !element[key];
    })
    if(!blank){elementsArray.push(element)};
  })
  return elementsArray;
}

function getCheckedIdArray(type, form){
  let checkedIdArray = [];
  [...form.getElementsByTagName("input")].filter(element=>element.name.split('-')[0]==type).filter(box=>box.checked).map(boxElement=>checkedIdArray.push(boxElement.name.split('-')[1]));
  return checkedIdArray;
}

function getCheckedFormElements(type, form, fields = {}, listOptions = [], importedFields = []){
  const fieldKeys = Object.keys(fields);
  const checkedIdArray = getCheckedIdArray(type, form);
  let checkedFormElements = [];
  checkedIdArray.forEach((_id)=>{
    let element = {};
    element._id = _id;
    importedFields.map((importedField) => element[importedField] = listOptions.filter(element=>element._id==_id)[0][importedField]);
    fieldKeys.forEach((key)=>{
      element[key] = getFormValue(key, fields[key], type, _id, form);
    })
    checkedFormElements.push(element);
  })
  return checkedFormElements;
}

function scrubObject(obj){
  Object.keys(obj).forEach((key) => (obj[key]) || delete obj[key]);
}

function extract_values(objs, key){
  let array = []
  objs.map((obj)=>array.push(obj[key]))
  return array;
}


export {getFormElementsWithNewButton as getFormElementsWithNewButton};
export {getCheckedFormElements as getCheckedFormElements};
export {scrubObject as scrubObject};
export {getCheckedIdArray as getCheckedIdArray}
export {extract_values as extract_values}

// Private functions for inputs that can add new inputs
function getIdArray(type, fieldName, form){
  let idArray = [];
  [ ...form.getElementsByTagName("input")].filter(elm=> (elm.name.split('-')[0]==type) && (elm.name.split('-')[2]==fieldName) ).map(nameElm=>idArray.push(nameElm.name.split('-')[1]));
  return idArray;
}

function getId(_id){
  const prefix = _id.substring(0,4);
  const index = Number(_id.slice(-1));
  return (prefix == "temp")? (new Date().getTime() + index).toString(36) : _id;
}

function getFormValue(fieldName, fieldType, type, _id, form){
  let formValue = undefined;
  if(fieldType == "string"){
    formValue = form[`${type}-${_id}-${fieldName}`].value.trim()
  } else if (fieldType == "number") {
    formValue = Number(form[`${type}-${_id}-${fieldName}`].value);
  }
  return formValue;
}
