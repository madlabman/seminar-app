export default validateEmail = value => {
    let error = null;

    if (!value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) error = 'Неверный адрес электронной почты!';

    return error;
};