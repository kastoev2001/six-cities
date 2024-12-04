import { Expose } from 'class-transformer';

export class CommentRdo {
  @Expose()
    text!: string;

  @Expose()
    rating!: number;
}
