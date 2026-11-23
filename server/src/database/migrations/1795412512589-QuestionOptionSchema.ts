import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class QuestionOptionSchema1795412512589 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
                                            new Table({
                                                name: 'question_options',
                                                columns:[
                                                    {
                                                        name : 'id',
                                                        isGenerated: true,
                                                        isPrimary: true,
                                                        generationStrategy:'uuid',
                                                        type : 'uuid'
                                                    },
                                                    {
                                                        name : 'survey_question_id',
                                                        type : 'uuid'
                                                    },
                                                    {
                                                        name : 'title',
                                                        type: 'varchar',
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
                                                foreignKeys:[
                                                    {
                                                        name : 'fk_survey_question_id',
                                                        columnNames : ['survey_question_id'],
                                                        referencedColumnNames: ['id'],
                                                        referencedTableName:'survey_questions',
                                                    }
                                                ],
                                                uniques:[
                                                    {
                                                        name : 'uq_options',
                                                        columnNames: ['survey_question_id', 'title']
                                                    }
                                                ]
        
                                            })
                                        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('question_options')
    }

}
