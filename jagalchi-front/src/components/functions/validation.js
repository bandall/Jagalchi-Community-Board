export const checkEmail = (email) => {
    if(email.length === 0) return false;
    const pattern = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    return (email.value.match(pattern)!=null)
}

export const checkPhone = (number) => {
    if(number.length === 0) return false;
    const pattern = /^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}/;
    return (number.value.match(pattern)!=null)
}

export const checkbirth = (day) => {
    if(day.length === 0) return false;
    const pattern = /^(19[0-9][0-9]|20\d{2})-(0[0-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/;
    return (day.value.match(pattern)!=null)
}

