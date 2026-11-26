"use client";
import { Button, Paper, Stack, Typography } from "@mui/material";
import { Control, useFieldArray, useWatch } from "react-hook-form";
import { CreateSurveyInput } from "../../create-survey.type";
import ControlField from "@/components/form-components/control-field";
import { useState } from "react";
import { file } from "zod";

interface McqoptionsFormProp {
  control: Control<CreateSurveyInput>;
  questionIndex: number;
}

export default function RatingOptions({
  control,
  questionIndex,
}: McqoptionsFormProp) {
  return (
    <Paper>
      <Typography>Rating Options</Typography>
      <Stack spacing={1}>
        <ControlField
          name={`questions.${questionIndex}.rating_options.min`}
          control={control}
          label="Minimum_rating"
        />

        <ControlField
          name={`questions.${questionIndex}.rating_options.max`}
          control={control}
          label="Maximum rating"
        />
      </Stack>
    </Paper>
  );
}
