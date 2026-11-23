import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class SurveyQuestionSchema1795354570383 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
                                    new Table({
                                        name: 'survey_questions',
                                        columns:[
                                            {
                                                name : 'id',
                                                isGenerated: true,
                                                isPrimary: true,
                                                generationStrategy:'uuid',
                                                type : 'uuid'
                                            },
                                            {
                                                name : 'survey_id',
                                                type: 'uuid',
                                            },
                                            {
                                                name : 'question_id',
                                                type : 'uuid',
                                            },
                                            {
                                                name : 'question_type',
                                                enum : ['mcq', 'text', 'rating'],
                                                type : 'enum'
                                            },
                                            {
                                                name : 'is_mandatory',
                                                type : 'boolean',
                                                default: false
                                            },
                                            {
                                                name : 'created_at',
                                                type : 'timestamp',
                                                default : 'CURRENT_TIMESTAMP'
                                            },
                                            {
                                                name : 'updated_at',
                                                type : 'timestamp',
                                                default : 'CURRENT_TIMESTAMP'
                                            }
                                        ],
        
                                        foreignKeys: [
                                            {
                                                name : 'fk_survey',
                                                columnNames: ['survey_id'],
                                                referencedColumnNames : ['id'],
                                                referencedTableName : 'surveys'
                                            },
                                            {
                                                name : 'fk_question',
                                                columnNames: ['question_id'],
                                                referencedColumnNames : ['id'],
                                                referencedTableName : 'questions'
                                            }
                                        ],
                                        uniques: [
                                            {
                                                name : 'uq_survey_question',
                                                columnNames : ['survey_id', 'question_id']
                                            }
                                        ]
                                    })
                                )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
         await queryRunner.dropTable('survey_questions')
    }

}
