const VALIDATOR_TYPE_REQUIRE = 'REQUIRE';
const VALIDATOR_TYPE_MINLENGTH = 'MINLENGTH';
const VALIDATOR_TYPE_FILE = 'FILE';
//SOME BASIC VALIDATION LOGIC FOR FORM INPUTS
//PLEASE NOTE ****   RESOURCED FROM MAXIMILLIAN SHWARZMULLER, THE MERN FULLSTACK GUIDE 
export const VALIDATOR_REQUIRE = () => ({ type: VALIDATOR_TYPE_REQUIRE });
export const VALIDATOR_MINLENGTH = val => ({
  type: VALIDATOR_TYPE_MINLENGTH,
  val: val
});

export const validate = (value, validators) => {
  let isValid = true;
  for (const validator of validators) {
    if (validator.type === VALIDATOR_TYPE_REQUIRE) {
      isValid = value.trim().length > 0;
    }
    if (validator.type === VALIDATOR_TYPE_MINLENGTH) {
      isValid = value.trim().length >= validator.val;    //trim the value and check its length for comparison to minimum value 
    }
  }
  return isValid;
};