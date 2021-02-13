import EmailValidator from "email-validator";

export const validEmail = (value) => {
    if (!value) {
        return "Required";
    }
    return value && !EmailValidator.validate(value)
        ? "Please enter a valid Email"
        : undefined;
}

export const validName = (value) => {
    if (!value) {
        return "Required";
    }
    return value && value.length < 3
        ? "Please enter a name with min 3 char long"
        : undefined;
}

export const validPassword = (value) => {
    const reNum = /^(?=.*\d).{6,}$/;
    const re = /^(?=.*[A-Z]).{6,}$/;
    const containNumber = reNum.exec(value);
    const containsUcase = re.exec(value);
    if (!value) {
        return "Required";
    }
    if (value.length < 6) {
        return "Password must be min 6 charcter long";
    }
    if (!containNumber) {
        return "Passowrd must contains atleast 1 numeric digit";
    }
    if (!containsUcase) {
        return "Passowrd must contains atleast 1 capital letter";
    }
    return undefined;
};