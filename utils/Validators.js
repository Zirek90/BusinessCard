const nameValidator = (data, language) => {
    const error = [];
    if (data) {
        if (data.length < 3) error.push(language.name.no_enough_of_characters);
    }
    else error.push(language.name.no_name)

    return error
}

const postalCodeValidator = (data, language) => {
    const error = [];
    const postal = /^[0-9-]*$/
    if (data) {
        if (data.length !== 5 && data.length !== 6) error.push(language.postal_code.no_enough_of_characters);
        if (!postal.test(data)) error.push(language.postal_code.wrong_character);
    }

    return error
}

const phoneValidator = (data, language) => {
    const error = [];
    const isNumber = /^\d+$/;
    if (data) {
        if (data.length < 5) error.push(language.phone.no_enough_of_characters);
        if (!isNumber.test(data)) error.push(language.phone.wrong_character);
    }

    return error
}

const websiteValidator = (data, language) => {
    const error = [];
    if (data) {
        const startOfUrl = data.substring(0,3);
        if (startOfUrl.toLowerCase() === "htt" || startOfUrl.toLowerCase() === "www") error.push(language.website.wrong_character);
    }
    
    return error
}

const emailValidator = (data, language) => {
    const error = [];
    const isEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (data) {
        if (!isEmail.test(data)) error.push(language.email.wrong_character);
    }

    return error
}

const taxNumberValidator = (data, language) => {
    const error = [];
    if (data) {
        if (data.length < 10) error.push(language.tax_number.no_enough_of_characters);
    }
    
    return error
}

export const Validators = {
    nameValidator,
    postalCodeValidator,
    phoneValidator,
    websiteValidator,
    emailValidator,
    taxNumberValidator
}