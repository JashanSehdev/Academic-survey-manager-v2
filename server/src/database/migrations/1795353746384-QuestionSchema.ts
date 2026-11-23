import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class QuestionSchema1795353746384 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
                                    new Table({
                                        name: 'questions',
                                        columns:[
                                            {
                                                name : 'id',
                                                isGenerated: true,
                                                isPrimary: true,
                                                generationStrategy:'uuid',
                                                type : 'uuid'
                                            },
                                            {
                                                name : 'title',
                                                type: 'text',
                                                isNullable: true,
                                                isUnique: true
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

                                    })
                                )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('questions')
    }

}
