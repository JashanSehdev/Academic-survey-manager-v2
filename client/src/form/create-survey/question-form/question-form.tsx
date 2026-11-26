import ControlField from "@/components/form-components/control-field";
import { Control, useFieldArray, useWatch } from "react-hook-form";
import { CreateSurveyInput } from "../create-survey.type";
import { Button, IconButton, Paper, Stack, Typography } from "@mui/material";
import ControlSelect from "@/components/form-components/control-select";
import { EQuestionType } from "@/enum/question.enum";
import ControlSwitch from "@/components/form-components/control-switch";
import style from "./question-form.module.css";
import DeleteIcon from "@mui/icons-material/Delete";
import McqOptionsForm from "./mcq-options-form/mcq-options";
import RatingOptions from "./rating-option-form/rating-options-form";

const questionTypeOptions = [
  {
    label: "Multiple Choice Questins",
    value: EQuestionType.MCQ,
  },
  {
    label: "Rating",
    value: EQuestionType.RATING,
  },
  {
    label: "Text",
    value: EQuestionType.TEXT,
  },
];

const defaultQuestion = {
  title: "",
  question_type: EQuestionType.TEXT,
  is_mandatory: false,
  rating_options:{
    min : "1",
    max : "5"
  }
};

interface QuestionFormField {
  control: Control<CreateSurveyInput>;
}
export function QuestionForm({ control }: QuestionFormField) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "questions",
  });

  const question_data = useWatch({
    control: control,
    name: `questions`,
  });

  console.log(question_data);

  return (
    <Paper sx={{ p: 1 }}>
      <Typography variant="h4">Questions</Typography>
      <Stack spacing={2}>
        {fields.map((field, index) => {
          return (
            <Paper
              key={field.id}
              sx={{ p: 1 }}
              className={style.individualQuestionContainer}
            >
              <Stack spacing={1}>
                <ControlField
                  name={`questions.${index}.title`}
                  control={control}
                  label="Question"
                />

                <ControlSelect
                  name={`questions.${index}.question_type`}
                  options={questionTypeOptions}
                  control={control}
                  label="Question Type"
                />
                <ControlSwitch
                  name={`questions.${index}.is_mandatory`}
                  control={control}
                  label="Is Mandatory"
                />

                {question_data?.[index]?.question_type === EQuestionType.MCQ && (
                  <McqOptionsForm questionIndex={index} control={control} />
                )}

               {question_data?.[index]?.question_type === EQuestionType.RATING && (
                  <RatingOptions questionIndex={index} control={control} />
                )}
              </Stack>
              <IconButton
                onClick={() => remove(index)}
                className={style.removeQuestionButton}
              >
                <DeleteIcon />
              </IconButton>
            </Paper>
          );
        })}
        <Button onClick={() => append(defaultQuestion)}>Add Question</Button>
      </Stack>
    </Paper>
  );
}
