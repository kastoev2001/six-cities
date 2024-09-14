import { defaultClasses, prop, modelOptions, getModelForClass } from '@typegoose/typegoose';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface CommentEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'comments',
    timestamps: true,
  },
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class CommentEntity extends defaultClasses.TimeStamps {

  @prop({
    default: '',
    required: true,
  })
  description!: string;

  @prop({
    default: 0,
    required: true,
  })
  rating!: number
}

export const CommentModel = getModelForClass(CommentEntity);