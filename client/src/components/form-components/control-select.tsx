import { Box, FormLabel, MenuItem, TextField } from "@mui/material";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

interface SelectOptions {
  label: string;
  value: string;
}

interface controlSelectProp<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  placeholder?: string;
  type?: "email" | "text" | "password" | "datetime-local";
  options: SelectOptions[];
}

export default function ControlSelect<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  options,
  type = "text",
}: controlSelectProp<T>) {
  return (
    <Box>
      <FormLabel>{label}</FormLabel>
      <Controller
        control={control}
        name={name}
        render={({ field, fieldState: { error } }) => (
          <TextField
            select
            {...field}
            error={!!error}
            helperText={error?.message}
            placeholder={placeholder}
            type={type}
            fullWidth
            size="small"
          >
            <MenuItem value="">Select an option</MenuItem>
            {options.map((o) => (
              <MenuItem key={o.label} value={o.value}>
                {o.label}
              </MenuItem>
            ))}
          </TextField>
        )}
      />
    </Box>
  );
}
