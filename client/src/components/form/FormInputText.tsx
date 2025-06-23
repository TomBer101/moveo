import { Controller, type Control, type FieldValues, type Path, type RegisterOptions } from "react-hook-form";
import TextField from "@mui/material/TextField";
import type { TextFieldProps } from "@mui/material/TextField";

type FormInputTextProps<T extends FieldValues> = {
    name: Path<T>;
    control: Control<T>;
    label: string;
    rules?: Omit<RegisterOptions<T, Path<T>>, "setValueAs" | "disabled" | "valueAsNumber" | "valueAsDate">;
} & Omit<TextFieldProps, "name" | "defaultValue">;

const FormInputText = <T extends FieldValues>({ 
    name, 
    control, 
    label, 
    rules,
    ...props 
}: FormInputTextProps<T>) => {
    return (
        <Controller
            control={control}
            name={name}
            rules={rules}
            render={({ field, fieldState}) => (
                <TextField

                    {...field}
                    {...props}
                    label={label}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                    fullWidth
                />
            )}
        />
    )
}

export default FormInputText;
