import { Box, FormLabel, TextField } from "@mui/material";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

interface controlFieldProp<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  placeholder?: string;
  type ?: "email" | "text" | "password" | "datetime-local"
}

export default function ControlField<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  type = "text",
}: controlFieldProp<T>) {
  return (
    <Box>
      <FormLabel>{label}</FormLabel>
      <Controller
        control={control}
        name={name}
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            error={!!error}
            helperText={error?.message}
            placeholder={placeholder}
            type={type}
            fullWidth
            size = "small"
          />
        )}
      />
    </Box>
  );
}
