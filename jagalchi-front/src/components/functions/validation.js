export const checkEmail = (email) => {
    if(email.length === 0) return false;
    const pattern = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    return pattern.test(email);
}

export const checkPhone = (number) => {
    if(number.length === 0) return false;
    const pattern = /^[0-9]{2,3}[0-9]{3,4}[0-9]{4}/;
    return pattern.test(number);
}

export const checkBirth = (day) => {
    if(day.length === 0) return false;
    const pattern = /^(19[0-9][0-9]|20\d{2})-(0[0-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/;
    return pattern.test(day)
}

