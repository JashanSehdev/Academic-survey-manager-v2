import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class SurveySchema1795352181418 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
                            new Table({
                                name: 'surveys',
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
                                        type: 'varchar',
                                        isUnique: true
                
                                    },
                                    {
                                        name : 'description',
                                        type : 'text',
                                        isNullable : true
                                    },
                                    {
                                        name : 'created_by',
                                        type : 'uuid',
                                    },
                                    {
                                        name : 'activation_date',
                                        type : 'timestamp'
                                    },
                                    {
                                        name : 'expiration_date',
                                        type : 'timestamp',
                                  
                                    },
                                    {
                                        name : 'is_activated',
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
                                        columnNames: ['created_by'],
                                        referencedColumnNames : ['id'],
                                        referencedTableName : 'users'
                                    }
                                ],
                                uniques:[
                                    {
                                        name : 'uq_unique_title',
                                        columnNames: ['title', 'created_by']
                                    }
                                ]
                            })
                        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('surveys')
    }

}
