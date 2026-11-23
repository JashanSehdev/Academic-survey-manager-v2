import { Test, TestingModule } from '@nestjs/testing';
import { QuestionOptionsController } from './question_options.controller.js';
import { QuestionOptionsService } from './question_options.service.js';

describe('QuestionOptionsController', () => {
  let controller: QuestionOptionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuestionOptionsController],
      providers: [QuestionOptionsService],
    }).compile();

    controller = module.get<QuestionOptionsController>(QuestionOptionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
