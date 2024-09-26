import { defaultClasses, prop, modelOptions, getModelForClass, Ref } from '@typegoose/typegoose';
import { OfferImages, OfferValueType, HousingType } from '../../types/index.js';
import { UserEntity } from '../user/user.entity.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface OfferEntity extends defaultClasses.Base { }

@modelOptions({
  schemaOptions: {
    collection: 'offers',
    timestamps: true,
  }
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class OfferEntity extends defaultClasses.TimeStamps {

  @prop({
    required: true,
    default: '',
  })
    title!: string;

  @prop({
    required: true,
    default: '',
  })
    description!: string;

  @prop({
    required: true,
    default: '',
  })
    postDate!: Date;

  @prop({
    required: true,
    default: '',
  })
    city!: string;

  @prop({
    required: true,
    default: '',
  })
    previewImage!: string;

  @prop({
    type: () => String,
    required: true,
    default: [],
  })
    offerImages!: OfferImages;

  @prop({
    required: true,
  })
    isPremium!: boolean;

  @prop({
    required: true,
  })
    isFavorite!: boolean;

  @prop({
    type: () => String,
    enum: Object.values(HousingType),
    required: true,
  })
    housingType!: OfferValueType;

  @prop({
    required: true,
  })
    rootsCount!: number;

  @prop({
    required: true,
  })
    guestsCount!: number;

  @prop({
    required: true,
    default: '',
  })
    price!: number;

  @prop({
    type: () => String,
    required: true,
    default: '',
  })
    facilities!: string[];

  @prop({
    required: true,
    default: 0,
  })
    commentCount!: number;

  @prop({
    type: () => String,
    required: true,
    default: '',
  })
    coordinates!: string[];

  @prop({
    ref: UserEntity,
    required: true,
  })
    userId!: Ref<UserEntity>;

}

export const OfferModel = getModelForClass(OfferEntity);
