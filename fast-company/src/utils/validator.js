export function validator(inputData, config) {
    const errors = {};
    function validate(
        validationMethod, // название метода валидации (ключ) для данного поля с именем "fieldName"
        inputDataField, // данные введенные в поле ввода с именем "fieldName"
        config // метод валидации, получаемый из config
    ) {
        switch (validationMethod) {
        case "isRequired":
            if (inputDataField.trim() === "") return config.message;
            break;
        case "isEmail": {
            const emailRegExp = /^\S+@\S+\.\S+$/g; // Регулярное выражение проверки Email
            if (!emailRegExp.test(inputDataField)) return config.message;
            break;
        }
        default:
            break;
        }
    };
    for (const fieldName in inputData) {
        for (const validationMethod in config[fieldName]) {
            const error = validate(
                validationMethod, // название метода валидации (ключ) для данного поля с именем "fieldName"
                inputData[fieldName], // данные введенные в поле ввода с именем "fieldName"
                config[fieldName][validationMethod] // соообщение об ошибке, соответствующее данному методу
            );
            if (error && !errors[fieldName]) {
                // Если ошибка существует, и в объекте errors еще нет записей, тогда записываем ошибку
                errors[fieldName] = error;
                console.log(errors); // errors = {email: "сообщение об ошибке", password: "сообщение об ошибке"}
            }
        };
    };
    return errors;
};
