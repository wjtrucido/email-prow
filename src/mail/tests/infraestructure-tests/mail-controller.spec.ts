import { Test, TestingModule } from '@nestjs/testing';
import { MailController } from '../../infrastructure/mail.controller';
import { EmailService } from '../../application/mail.service';
import { Response } from 'express';
import { HttpException } from '@nestjs/common';

describe('MailController', () => {
  let mailController: MailController;
  let emailService: EmailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MailController],
      providers: [
        {
          provide: EmailService,
          useValue: {
            processEmail: jest.fn(),
          },
        },
      ],
    }).compile();

    mailController = module.get<MailController>(MailController);
    emailService = module.get<EmailService>(EmailService);
  });

  describe('processEmail', () => {
    it('should throw HttpException when emailService.processEmail throws an error', async () => {
      const filePath = './eml/testmail3.eml';
      const errorMessage = 'An error occurred';
      const error = new Error(errorMessage);
      (
        emailService.processEmail as jest.MockedFunction<
          typeof emailService.processEmail
        >
      ).mockRejectedValue(error);

      const res = {
        set: jest.fn(),
        send: jest.fn(),
      } as unknown as Response;

      try {
        await mailController.processEmail(filePath, res);
      } catch (err) {
        expect(err).toBeInstanceOf(HttpException);
        expect(err.message).toBe(errorMessage);
      }

      expect(res.set).not.toHaveBeenCalled();
      expect(res.send).not.toHaveBeenCalled();
    });
  });
});
