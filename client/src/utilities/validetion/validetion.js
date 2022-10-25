
const nameRegexp = /^[a-zA-Z ]{2,30}$/;
const emailRegexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const passwordRegexp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/;

const nameValid = (name) => { return nameRegexp.test(name) }
const emailValid = (email) => { return emailRegexp.test(email) }
const passwordValid = (password) => { return passwordRegexp.test(password) }

export{nameValid,emailValid,passwordValid}