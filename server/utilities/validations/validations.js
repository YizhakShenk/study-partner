

const nameRegex = /^[a-zA-Z ]{2,30}$/;
const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/;
const countryRegex = /^[a-zA-Z ]{3,30}$/
const languagesRegex = /^[a-zA-Z ]{3,20}$/
const phoneNumberRegex = /^[+ 0-9]{7,14}$/
const ageRangeRegex = /^[0-9]$/



const nameValid = (name) => { return nameRegex.test(name) }
const emailValid = (email) => { return emailRegex.test(email) }
const passwordValid = (password) => { return passwordRegex.test(password) }
const countryValid = (country) => { return countryRegex.test(country) }
const languagesValid = (languages) => { return languagesRegex.test(languages) }
const phone_numberValid = (phone_number) => { return phoneNumberRegex.test(phone_number) }
const age_rangeValid = (age_range) => { return ageRangeRegex.test(age_range) }


module.exports = {
    nameValid,
    emailValid,
    passwordValid,
    countryValid,
    languagesValid,
    phone_numberValid,
    age_rangeValid,
}