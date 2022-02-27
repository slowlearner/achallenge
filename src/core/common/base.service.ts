import { Types } from 'mongoose';
export class BaseService {
  public toObjectId(id: string): Types.ObjectId {
    return new Types.ObjectId(id);
  }

  owns(id: string, resource: any) {
    return id.toString() === resource.owner.toString();
  }
}
