import {
  Box,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Switch,
} from "@mui/material";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

interface ControlSwitchProp<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  placeholder?: string;
}

export default function ControlSwitch<T extends FieldValues>({
  control,
  name,
  label,
}: ControlSwitchProp<T>) {
  return (
    <Box>
      <Controller
        control={control}
        name={name}
        render={({ field, fieldState: { error } }) => (
          <Box>
            <FormControlLabel label={label} control={<Switch {...field} />} />

            <FormHelperText error={!!error}>{error?.message}</FormHelperText>
          </Box>
        )}
      />
    </Box>
  );
}
