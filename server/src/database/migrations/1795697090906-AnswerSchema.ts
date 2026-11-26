import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class AnswerSchema1795697090906 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'answers',
        columns: [
          {
            name: 'id',
            isGenerated: true,
            isPrimary: true,
            generationStrategy: 'uuid',
            type: 'uuid',
          },
          {
            name: 'response_id',
            type: 'uuid',
          },
          {
            name: 'survey_question_id',
            type: 'uuid',
          },
          {
            name : "answer",
            type : 'varchar',
            length : "1000"
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
            name: 'fk_question_answer',
            columnNames: ['survey_question_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'survey_questions',
          },
          {
            name: 'fk_response_answer',
            columnNames: ['response_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'responses',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('answers')
  }
}
