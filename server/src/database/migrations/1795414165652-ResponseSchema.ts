import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class ResponseSchema1795414165652 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
              new Table({
                name: 'responses',
                columns: [
                  {
                    name: 'id',
                    isGenerated: true,
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    type: 'uuid',
                  },
                  {
                    name: 'survey_question_id',
                    type: 'uuid',
                  },
                  {
                    name: 'user_id',
                    type: 'uuid',
                  },
                  {
                    name: 'answer',
                    type: 'text',
                    isNullable : true
                  },
        
                  {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                  },
                  {
                    name: 'updated_at',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                  },
                ],
                foreignKeys: [
                  {
                    name: 'fk_survey_question_id',
                    columnNames: ['survey_question_id'],
                    referencedColumnNames: ['id'],
                    referencedTableName: 'survey_questions',
                  },
                  {
                    name: 'fk_respondend_id',
                    columnNames: ['user_id'],
                    referencedColumnNames: ['id'],
                    referencedTableName: 'users',
                  },
                ],
              }),
            );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('responses');
    }

}
