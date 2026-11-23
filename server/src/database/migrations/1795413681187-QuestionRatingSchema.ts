import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class QuestionRatingSchema1795413681187 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'question_rating',
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
            name: 'min',
            type: 'integer',
          },
          {
            name: 'max',
            type: 'integer',
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
        ],
        checks :[
          {
            name : 'ck_validate_min_max',
            columnNames:['min', 'max'],
            expression : 'max > min'
          }
        ]
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('question_rating');
  }
}
