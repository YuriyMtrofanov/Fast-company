export function validator(inputData, config) {
    const errors = {};
    function validate(
        validationMethod, // название метода валидации (ключ) для данного поля с именем "fieldName"
        inputData, // данные введенные в поле ввода с именем "fieldName"
        config // метод валидации, получаемый из config
    ) {
        let statusValidate; // Запишем условие валидации в переменную
        switch (validationMethod) {
        case "isRequired": {
            if (typeof inputData === "boolean") { // для <CheckBoxField> проверяем данные по типу "boolean"
                statusValidate = !inputData; // сообщение об ошибке выводится в случае выполнения данного тождества
            } else {
                statusValidate = inputData.trim() === ""; // То есть если вводимые данные = пустой строке, то выводится сообщение об ошибке
            }
            break;
        }
        case "isEmail": {
            const emailRegExp = /^\S+@\S+\.\S+$/g; // Регулярное выражение проверки Email
            // if (!emailRegExp.test(inputData)) return config.message;
            statusValidate = !emailRegExp.test(inputData); // Если ре. выражение не выполняется, то выводится сообщение об ошибке
            break;
        }
        case "isCapitalSymbol": {
            const capitalRegExp = /[A-Z]+/g; // Проверка на наличие заглавных букв
            statusValidate = !capitalRegExp.test(inputData);
            break;
        }
        case "isConteinDigit": {
            const digitRegExp = /\d+/g; // Проверка на наличие цифр
            statusValidate = !digitRegExp.test(inputData);
            break;
        }
        case "min": {
            statusValidate = inputData.length < config.value; // количество символов вводимой строки д/б больше заданного мин. колл-ва символов
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
