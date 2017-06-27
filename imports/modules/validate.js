import $ from 'jquery';
import 'jquery-validation';

export default (form, options) => $(form).validate(options);

$.validator.addMethod("valueNotEquals", function(value, element, arg){
  return arg != value;
 }, "Value must not equal arg.");
