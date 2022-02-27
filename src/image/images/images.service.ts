// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
// eslint-disable-next-line @typescript-eslint/no-var-requires
const cloudinary = require('cloudinary').v2;
import { Injectable } from '@nestjs/common';
import * as pexels from 'pexels';

import * as Bluebird from 'bluebird';
import * as uuid from 'uuid';
import { tmpdir } from 'os';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { Image } from '../images/models/image.model';
import { Account } from 'src/core/accounts/account.model';

cloudinary.config({
  cloud_name: 'erwin-atuli',
  api_key: '989766496399891',
  api_secret: '0lq5scOGZaogfdk7yo0YTADLjeg',
});

@Injectable()
export class ImagesService {
  constructor(
    @InjectModel(Image)
    private readonly imageModel: ReturnModelType<typeof Image>,
  ) {}

  async getRandomPhotos(account: Account, perPage: number) {
    const client = pexels.createClient(process.env.PEXEL_API_KEY);
    const photos: any = await client.photos.curated({
      query: 'People',
      per_page: perPage,
    });

    const totalResults = photos.total_results;
    const totalPages = Math.ceil(totalResults / perPage);

    const rand = Math.floor(Math.random() * totalPages);

    // make another request
    const randomPhotos: any = await client.photos.curated({
      query: 'People',
      per_page: perPage,
      page: rand,
    });

    const images = await Bluebird.map(randomPhotos.photos, async (p) => {
      const url = p.src.medium;
      const id = uuid.v4();
      const dest = `${tmpdir()}/${id}`;
      try {
        console.log(`downloading ${url} -> ${dest} `, dest);
        const result = await this.upload(url);
        return this.create({
          owner: <any>account._id,
          hits: 1,
          uri: result.secure_url,
        });
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (e) {
        console.log(e);
      }
    });

    return images;
  }

  async create(image: Image): Promise<Image> {
    const createdImage = new this.imageModel(image);
    return await createdImage.save();
  }

  async upload(url: string): Promise<any> {
    return new Promise<string>((resolve, reject) => {
      cloudinary.uploader.upload(
        url,
        { public_id: uuid.v4() },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            console.log(result);
            resolve(result);
          }
        },
      );
    });
  }
}
