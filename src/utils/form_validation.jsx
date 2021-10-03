
/* * BASE TEMPLATE FOR A CLASSIC FORM VALIDATION
* ------------------------------------------------------
* Only 2 types of fields are in use in the current app : 
* userName & Password  (SIGN IN component)
* Which only require not to be empty
* 
* A form component will use the following by using
* @type {Object} 'VALIDATE'  as a PROP
* and (optionally)
* @type {Object} 'initialValues' as a PROP 
*/

const error = { type: ['emptyField','invalidChars','length', 'unsafePw']};

/*  Currently used in : SignIn feature  */
const userNameValidation = userName => {
    if (userName.trim() === '') {
        return `userName is required`;
    }
    return null;
}

const passwordValidation = userPassword => {
    if (userPassword.trim() === '') {
        return error.type[0];
        // return `userPassword is required`;
    }
    return null;
}

// fake validator for checkbox ---- to review
const rememberMeValidation = rememberMe => {
    return null;
}



/*  Currently used in : Edit UserName feature  */
const nameValidation = (fieldName, fieldValue) => {

    if (fieldValue.trim() === '') {
        console.log( `${fieldName} is required`);
        //return error.type = 'emptyField';
    }
    if (/[^a-zA-Z -]/.test(fieldValue)) {
        console.log('Invalid characters');
        //return error.type = 'invalidChars';
    }
    if (fieldValue.trim().length < 3) {
        console.log(`${fieldName} needs to be at least three characters`);
        //return error.type = 'length';
    }
    else return null;
};




/*  Currently unused  fields validations */
const emailValidation = email => {
    if (/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email,)) {
        return null;
    }
    if (email.trim() === '') {
        return 'Email is required';
    }
    return 'Please enter a valid email';
};

const ageValidation = age => {
    if (!age) {
        return 'Age is required';
    }
    if (age < 18) {
        return 'Age must be at least 18';
    }
    return null;
};

const createPasswordValidation = password => {
    if (!password) {
        return 'password is required';
    }
    if (password.length < 6) {
        return 'Password must be at least 6 characters long';
    }
    return null;
};


/** 
* @Object Validate
* with:
* @property {userName} : is a @method : 
*       * taking as @param name  ( = fieldName)
*       * and @calls @function userNameValidation(@param fieldName, @param fieldValue)
*
*   @example validate[userName]('someName')
*/
export const validate = {

    userName: userNameValidation,
    userPassword: passwordValidation,
    rememberMe: rememberMeValidation

/*  Currently unused fields validations  */
/*  firstName: name => nameValidation('First Name', name),
    lastName: name => nameValidation('Last Name', name),
    email: emailValidation,
    age: ageValidation 
*/
};

export const validateEdit = {
    firstName: name => nameValidation('First Name', name),
    lastName: name => nameValidation('Last Name', name)
}


export const initialValues = {
    age: 10,
    email: 'no@email',
    firstName: 'Mary',
    lastName: 'Jane'
};
