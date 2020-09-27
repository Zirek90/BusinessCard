const nameValidator = (data) => {
    const error = [];
    if (data) {
        if (data.length < 3) error.push("Nazwa musi mieć co najmniej 3 znaki");
    }
    else error.push("Prosze wpisac nazwe")

    return error
}

const postalCodeValidator = (data) => {
    const error = [];
    const postal = /^[0-9-]*$/
    if (data) {
        if (data.length !== 5 && data.length !== 6) error.push("Kod pocztowy musi mieć pomiędzy 5 a 6 znaków");
        if (!postal.test(data)) error.push("Kod pocztowy powinien zawierać tylko liczby i myślnik");
    }

    return error
}

const phoneValidator = (data) => {
    const error = [];
    const isNumber = /^\d+$/;
    if (data) {
        if (data.length < 5) error.push("Numer telefonu musi mieć co najmniej 6 znaków");
        if (!isNumber.test(data)) error.push("Numer telefonu musi zawierać tylko cyfry");
    }

    return error
}

const websiteValidator = (data) => {
    const error = [];
    if (data) {
        const startOfUrl = data.substring(0,3);
        if (startOfUrl.toLowerCase() === "htt" || startOfUrl.toLowerCase() === "www") error.push("Wpisz strone internetowa z pominięciem http/https/www");
    }
    
    return error
}

const emailValidator = (data) => {
    const error = [];
    const isEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (data) {
        if (!isEmail.test(data)) error.push("Email nie ma poprawnego formatu");
    }

    return error
}

const taxNumberValidator = (data) => {
    const error = [];
    if (data) {
        if (data.length < 10) error.push("NIP musi mieć co najmniej 10 znaki");
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