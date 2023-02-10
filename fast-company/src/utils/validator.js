export function validator(inputData, config) {
    const errors = {};
    function validate(
        validationMethod, // название метода валидации (ключ) для данного поля с именем "fieldName"
        inputDataField, // данные введенные в поле ввода с именем "fieldName"
        config // метод валидации, получаемый из config
    ) {
        let statusValidate; // Запишем условие валидации в переменную
        switch (validationMethod) {
        case "isRequired":
            // if (inputDataField.trim() === "") return config.message;
            statusValidate = inputDataField.trim() === ""; // запишем условие в переменную statusValidate
            break;
        case "isEmail": {
            const emailRegExp = /^\S+@\S+\.\S+$/g; // Регулярное выражение проверки Email
            // if (!emailRegExp.test(inputDataField)) return config.message;
            statusValidate = !emailRegExp.test(inputDataField);
            break;
        }
        case "isCapitalSymbol": {
            const capitalRegExp = /[A-Z]+/g; // Проверка на наличие заглавных букв
            statusValidate = !capitalRegExp.test(inputDataField);
            break;
        }
        case "isConteinDigit": {
            const digitRegExp = /\d+/g; // Проверка на наличие цифр
            statusValidate = !digitRegExp.test(inputDataField);
            break;
        }
        case "min": {
            statusValidate = inputDataField.length < config.value; // количество символов вводимой строки д/б больше заданного мин. колл-ва символов
            break;
        }
        default:
            break;
        }
        if (statusValidate) return config.message; // Если в результате цикла в "statusValidate" записаны данные об ошибке, то
        // выводим сообщение об ошибке
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
