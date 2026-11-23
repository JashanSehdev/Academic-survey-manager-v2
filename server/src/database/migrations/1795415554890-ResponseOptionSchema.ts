import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class ResponseOptionSchema1795415554890 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
                      new Table({
                        name: 'response_options',
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
                            name: 'question_option_id',
                            type: 'uuid',
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
                            name: 'fk_response_options',
                            columnNames: ['response_id'],
                            referencedColumnNames: ['id'],
                            referencedTableName: 'responses',
                          },
                          {
                            name: 'fk_question_option_id',
                            columnNames: ['question_option_id'],
                            referencedColumnNames: ['id'],
                            referencedTableName: 'question_options',
                          },
                        ],
                      }),
                    );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('response_options');
    }

}
