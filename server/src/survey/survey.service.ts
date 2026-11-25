import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateSurveyDto } from './dto/create-survey.dto.js';
import { UpdateSurveyDto } from './dto/update-survey.dto.js';
import { DataSource, Repository } from 'typeorm';
import { Survey } from './entities/survey.entity.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Transactional } from 'typeorm-transactional';
import { BaseService } from '../common/services/base.service.js';
import { EQuestionType } from '../survey_questions/enum/question-type.enum.js';
import { Question } from '../questions/entities/question.entity.js';
import { QuestionOption } from '../question_options/entities/question_option.entity.js';
import { QuestionRating } from '../question_ratings/entities/question_rating.entity.js';
import { SurveyQuestion } from '../survey_questions/entities/survey_question.entity.js';

@Injectable()
export class SurveyService extends BaseService<Survey> {
  
  constructor( 
      private readonly datasource : DataSource,
      @InjectRepository(Survey)
      private readonly surveyQuestionRepository : Repository<Survey>
    ){
      super(surveyQuestionRepository)
    }
  
    @Transactional()
    async createSurvey(createSurveyDto: CreateSurveyDto, userId : string) {
  
      const {questions, ...survey_data} = createSurveyDto
  
      const surveyRepo = this.datasource.getRepository(Survey);
      const surveyQuestionRepo = this.datasource.getRepository(SurveyQuestion)
      const questionRepo = this.datasource.getRepository(Question);
      const questionOptionRepo = this.datasource.getRepository(QuestionOption);
      const questionRatingRepo = this.datasource.getRepository(QuestionRating);
  
      const survey = surveyRepo.create({...survey_data, created_by: userId});
  
      const saved_survey = await surveyRepo.save(survey); 
  
  
      //saving questions
      for(const q of questions) {
  
        let saved_question = await questionRepo.findOneBy({title : q.title});
        
        if (!saved_question) {
          const question = questionRepo.create({title: q.title});
          saved_question = await questionRepo.save(question);
        }
  
        const surveyQuestion =  surveyQuestionRepo.create({question_id: saved_question.id, question_type: q.question_type, survey_id : saved_survey.id})
        const savedSurveyQuestion = await surveyQuestionRepo.save(surveyQuestion)
        if (q.question_type === EQuestionType.MCQ) {
          // if mcq have no options
          if (! (!!q.mcq_options)) throw new BadRequestException({
            question : q.title,
            message : 'MCQ required options'
          })
  
          const options = q.mcq_options.map((o) => (questionOptionRepo.create({survey_question_id: savedSurveyQuestion.id, title: o})))
  
  
          await questionOptionRepo.save(options);
  
        }
  
  
        console.log("options -- saved")
        if (q.question_type === EQuestionType.RATING) {
          console.log("survey_rating begin")
          const rating = questionRatingRepo.create({
            survey_question_id : savedSurveyQuestion.id,
            min : q.rating_options.min,
            max : q.rating_options.max
          })
  
          console.log("rating: ",rating)
  
          await questionRatingRepo.save(rating);
          console.log("survey rating -- end")
        }
      }
  
      return {
        message : `Your Survey has been saved with ${saved_survey.id}`
      }
  
  
    }
}
