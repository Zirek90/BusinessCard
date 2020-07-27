
const nameValidator = (data) => {
    const error = [];
    if (data) {
        if (data.length < 3) error.push("Nazwa musi mieć co najmniej 3 znaki");
    }
    else error.push("Prosze wpisac nazwe")

    return error
}

const phoneValidator = (data) => {
    const error = [];
    const isNumber = /^\d+$/;
    if (data) {
        if (data.length < 6) error.push("Numer telefonu musi mieć co najmniej 6 znaki");
        if (!isNumber.test(data)) error.push("Numer telefonu musi zawierac tylko cyfry");
    }
    else error.push("Prosze wpisac numer telefonu")

    return error
}

const emailValidator = (data) => {
    const error = [];
    const isEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (data) {
        if (data.length < 5) error.push("Email musi mieć co najmniej 6 znaki");
        if (!isEmail.test(data)) error.push("Email nie ma poprawnego formatu");
    }
    else error.push("Prosze wpisac email")

    return error
}

const taxNumberValidator = (data) => {
    const error = [];
    if (data) {
        if (data.length < 6) error.push("NIP musi mieć co najmniej 6 znaki");
    }
    else error.push("Prosze wpisac NIP")
    
    return error
}

export const Validators = {
    nameValidator,
    phoneValidator,
    emailValidator,
    taxNumberValidator
}