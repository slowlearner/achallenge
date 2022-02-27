import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should return null when the api key does not exist', () => {
    expect(service).toBeDefined();
    const user = service.getByApiKey('key');
    expect(user).toBe(null);
  });

  it('should return the correct user when the api key exists', () => {
    expect(service).toBeDefined();
    const user = service.getByApiKey('xxxyyy');
    expect(user.name).toBe('Erwin Atuli');
  });
});
