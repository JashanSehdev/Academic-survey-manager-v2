import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { UsersModule } from './users/users.module.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SurveyModule } from './survey/survey.module.js';
import { QuestionsModule } from './questions/questions.module.js';
import { SurveyQuestionsModule } from './survey_questions/survey_questions.module.js';
import { QuestionOptionsModule } from './question_options/question_options.module.js';
import { QuestionRatingsModule } from './question_ratings/question_ratings.module.js';
import { ResponsesModule } from './responses/responses.module.js';
import { ResponseOptionsModule } from './response_options/response_options.module.js';
import { addTransactionalDataSource, getDataSourceByName } from 'typeorm-transactional';
import { DataSource } from 'typeorm';

@Module({
  imports: [UsersModule,
    ConfigModule.forRoot({
      envFilePath :'../..development.env',
      isGlobal : true 
    }),
    TypeOrmModule.forRootAsync({
      imports : [ConfigModule],
      inject : [ConfigService],
      useFactory : (config : ConfigService) => {
         return {
          type: 'postgres',
          host: config.get<string>('DB_HOST'),
          port: config.get<number>('DB_PORT'),
          username: config.get<string>('DB_USERNAME'),
          password: config.get<string>('DB_PASSWORD'),
          database: config.get<string>('DB_NAME'),
          autoLoadEntities: true,
          synchronize: false,
        };
      },
      dataSourceFactory: async (options) => {
        if (!options){
          throw new Error('Invalid options passed')
        }
      return getDataSourceByName('default') || addTransactionalDataSource(new DataSource(options));
    },

    }),
    SurveyModule,
    QuestionsModule,
    SurveyQuestionsModule,
    QuestionOptionsModule,
    QuestionRatingsModule,
    ResponsesModule,
    ResponseOptionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
