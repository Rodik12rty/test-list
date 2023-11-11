import { useState } from "react";
import { useValidation } from "./useValidation";


export const useInput = (initialValue, validations) => {

    const [value, setValue] = useState(initialValue);

    // Выполнился onBlur или нет
    const [isDirty, setIsDirty] = useState(false);

    const valid = useValidation(value, validations);

    const onChange = (e) => {
        setValue(e.target.value);
    }

    const onBlur = (e) => {
        setIsDirty(true);
    }

    return {
        value,
        setValue,
        onChange,
        onBlur,
        isDirty,
        ...valid
    }
}
