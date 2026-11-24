import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateSurveyQuestionDto } from './dto/create-survey_question.dto.js';
import { UpdateSurveyQuestionDto } from './dto/update-survey_question.dto.js';
import { DataSource, Repository } from 'typeorm';
import { Transactional } from 'typeorm-transactional';
import { Survey } from '../survey/entities/survey.entity.js';
import { Question } from '../questions/entities/question.entity.js';
import { SurveyQuestion } from './entities/survey_question.entity.js';
import { QuestionOption } from '../question_options/entities/question_option.entity.js';
import { QuestionRating } from '../question_ratings/entities/question_rating.entity.js';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '../common/services/base.service.js';
import { EQuestionType } from './enum/question-type.enum.js';

@Injectable()
export class SurveyQuestionsService extends BaseService<SurveyQuestion> {

  constructor( 
    private readonly datasource : DataSource,
    @InjectRepository(SurveyQuestion)
    private readonly surveyQuestionRepository : Repository<SurveyQuestion>
  ){
    super(surveyQuestionRepository)
  }

  @Transactional()
  async createSurvey(createSurveyQuestionDto: CreateSurveyQuestionDto) {

    const {questions, ...survey_data} = createSurveyQuestionDto

    const surveyRepo = this.datasource.getRepository(Survey);
    const questionRepo = this.datasource.getRepository(Question);
    const questionOptionRepo = this.datasource.getRepository(QuestionOption);
    const questionRatingRepo = this.datasource.getRepository(QuestionRating);

    const survey = surveyRepo.create({...survey_data, created_by: '337d05f7-7949-41e1-a7ff-82c71c2f92be'});

    const saved_survey = await surveyRepo.save(survey); // bug is here


    //saving questions
    for(const q of questions) {

      let saved_question = await questionRepo.findOneBy({title : q.title});
      
      if (!saved_question) {
        const question = questionRepo.create({title: q.title});
        saved_question = await questionRepo.save(question);
      }

      const savedSurveyQuestion = await this.create({question_id: saved_question.id, question_type: q.question_type, survey_id : saved_survey.id})
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
