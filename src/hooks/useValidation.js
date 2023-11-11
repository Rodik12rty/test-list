import { useState, useEffect } from "react";


// value это текущее значение инпута
// validations это набор каких то валидаторов по которым будем валидировать наши поля инпуты
export const useValidation = (value, validations) => {
    // Для каждого типа валидации создаём состояние
    const [minLengthError, setMinLengthError] = useState(false);
    const [isEmpty, setEmpty] = useState(true);
    const [maxLengthError, setMaxLengthError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [inputValid, setInputValid] = useState(false);

    useEffect(() => {
        for (const validation in validations) {
            switch (validation) {
                // Если длинна текущего value в инпуте меньше чем значение хранящегося в обьекте validations по ключу validation
                case 'minLength':
                    value.length < validations[validation] ? setMinLengthError(true) : setMinLengthError(false)
                    break;
                case 'isEmpty':
                    // Если есть в ипуте value, то setEmpty делаем false, то есть инпут не пустой
                    value ? setEmpty(false) : setEmpty(true)
                    break;
                case 'maxLength':
                    value.length > validations[validation] ? setMaxLengthError(true) : setMaxLengthError(false)
                    break;
                case 'isEmail':
                    const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
                    re.test(String(value).toLowerCase()) ? setEmailError(false) : setEmailError(true)
                    break;
            }
        }
    }, [value]);

    useEffect(() => {
        if (minLengthError || isEmpty || maxLengthError || emailError) {
            setInputValid(false);
        } else {
            setInputValid(true);
        }
    }, [minLengthError, isEmpty, maxLengthError, emailError]);

    return {
        minLengthError,
        isEmpty,
        maxLengthError,
        emailError,
        inputValid
    }
}
