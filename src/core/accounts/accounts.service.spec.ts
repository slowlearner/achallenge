// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
import { Test, TestingModule } from '@nestjs/testing';
import { TypegooseModule } from 'nestjs-typegoose';
import { Account } from './models/account.model';
import { AccountsService } from './accounts.service';

describe('AccountsService', () => {
  let service: AccountsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypegooseModule.forFeature([Account])],
      providers: [AccountsService],
    }).compile();

    service = module.get<AccountsService>(AccountsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('it should create an account', async () => {
    expect(service).toBeDefined();
    const account = await service.create({
      email: 'erwin@erwin.com',
      password: '1234454',
    });
    expect(account).toBeDefined();
  });
});
