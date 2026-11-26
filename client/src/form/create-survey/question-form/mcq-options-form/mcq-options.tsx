"use client";
import { Button, FormHelperText, Paper, Stack, Typography } from "@mui/material";
import { Control, useFieldArray, useWatch } from "react-hook-form";
import { CreateSurveyInput } from "../../create-survey.type";
import ControlField from "@/components/form-components/control-field";

interface McqoptionsFormProp {
  control: Control<CreateSurveyInput>;
  questionIndex: number;
}

export default function McqOptionsForm({
  control,
  questionIndex,
}: McqoptionsFormProp) {
  const { fields, append } = useFieldArray({
    name: `questions.${questionIndex}.mcq_options`,
    control,
  });

  return (
    <Paper>
      <Typography>MCQ Options</Typography>
      <Stack spacing={1} sx={{ margin: " 20 0" }}>
        {fields.map((field, index) => (
          <Paper key={field.id}>
            {
              <ControlField
                name={`questions.${questionIndex}.mcq_options.${index}.value`}
                control={control}
                label={`option ${index + 1}`}
              />
            }
          </Paper>
        ))}
      </Stack>
      <Button
        onClick={() =>
          append({
            value: "",
          })
        }
      >
        Add options
      </Button>
    </Paper>
  );
}
