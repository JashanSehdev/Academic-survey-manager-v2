import ControlField from "@/components/form-components/control-field";
import { Paper, Stack, Typography } from "@mui/material";
import { Control } from "react-hook-form";
import { CreateSurveyInput } from "../create-survey.type";
import ControlSwitch from "@/components/form-components/control-switch";
import ControlSelect from "@/components/form-components/control-select";
import { EProgram } from "@/enum/program.enum";

interface SurveyFormProp {
  control: Control<CreateSurveyInput>;
}

const programOptions = [
  {
    label: "MTECH",
    value: EProgram.MTECH,
  },
  {
    label: "BTECH",
    value: EProgram.BTECH,
  },
];

export default function SurveyForm({ control }: SurveyFormProp) {
  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h4">Survey Details</Typography>
      <Stack>
        <ControlField
          control={control}
          name="title"
          label="Title"
          placeholder="Entry Survey Title"
        />

        <ControlField
          control={control}
          name="description"
          label="description"
          placeholder="Entry Survey Description"
        />

        <ControlSelect
          control={control}
          options={programOptions}
          name="program"
          label="Program"
        />

        <ControlField
          control={control}
          name="activation_date"
          label="Activation Date"
          placeholder="Entry activation date"
          type={"datetime-local"}
        />

        <ControlField
          control={control}
          name="expiration_date"
          label="Expiration date"
          placeholder="Entry expiration date"
          type={"datetime-local"}
        />

        <ControlSwitch
          name="is_activated"
          control={control}
          label="activate?"
        />
      </Stack>
    </Paper>
  );
}
