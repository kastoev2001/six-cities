import { BaseController, HttpError } from '../../libs/rest/index.js';
import { injectable, inject } from 'inversify';
import { Component } from '../../types/component.enum.js';
import { Logger } from '../../libs/logger/index.js';
import { HttpMethod } from '../../libs/rest/index.js';
import { OfferService } from './offer-service.interface.js';
import { NextFunction, Request, Response } from 'express';
import { CreateOfferRequest, UpdateOfferRequest } from './types/index.js';
import { StatusCodes } from 'http-status-codes';

@injectable()
export class OfferController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.OfferService) private readonly offerService: OfferService,
  ) {
    super(logger);

    this.logger.info('Register route for OfferController...');

    this.addRoute({ path: 'offers', method: HttpMethod.Get, handler: this.list });
    this.addRoute({ path: 'offers', method: HttpMethod.Post, handler: this.create });
    this.addRoute({ path: 'offers:id', method: HttpMethod.Get, handler: this.details });
    this.addRoute({ path: 'offers:id', method: HttpMethod.Patch, handler: this.update });
    this.addRoute({ path: 'offers:id', method: HttpMethod.Delete, handler: this.delete });
  }

  private create = async (
    {
      body,
    }: CreateOfferRequest,
    res: Response,
    _next: NextFunction,
  ) => {
    const result = await this.offerService.create(body);

    this.created(res, result);
  };

  private update = async (
    {
      body,
      params
    }: UpdateOfferRequest,
    res: Response,
    _next: NextFunction,
  ) => {
    const offerId = String(params.id);
    const isExistOffer = !!await this.offerService.findById(offerId);

    if (!isExistOffer) {
      throw new HttpError(
        StatusCodes.CONFLICT,
        `Offer with id ${offerId} not found.`,
        'OfferController',
      );
    }

    const result = await this.offerService.updateById(offerId, body);

    this.ok(res, result);
  };

  private delete = async ({
    params
  }: UpdateOfferRequest,
  res: Response,
  _next: NextFunction,
  ) => {
    const offerId = String(params.id);
    const isExistOffer = !!await this.offerService.findById(offerId);

    if (!isExistOffer) {
      throw new HttpError(
        StatusCodes.CONFLICT,
        `Offer with id ${offerId} not found.`,
        'OfferController',
      );
    }

    const result = await this.offerService.deleteById(offerId);

    this.ok(res, result);
  };

  private list = async (_req: Request, res: Response, _next: NextFunction) => {
    const offers = await this.offerService.find();

    this.ok(res, offers);
  };

  private details = async (
    {
      params
    }: Request,
    res: Response,
    _next: NextFunction
  ) => {
    const offerId = String(params.id);

    const result = await this.offerService.findById(offerId);

    this.ok(res, result);
  };

  private listPremium = async (_req: Request, _res: Response, _next: NextFunction) => {
    throw new HttpError(
      StatusCodes.NOT_IMPLEMENTED,
      'Not implemented',
      'UserController',
    );
  };

  private listFavorite = async () => {
    throw new HttpError(
      StatusCodes.NOT_ACCEPTABLE,
      'Not implemented',
      'UserController',
    );
  };

  private addFavorite = async () => {
    throw new HttpError(
      StatusCodes.NOT_IMPLEMENTED,
      'Not implemented',
      'UserController',
    );
  };

  private removeFavorite = async () => {
    throw new HttpError(
      StatusCodes.NOT_IMPLEMENTED,
      'Not implemented',
      'UserController',
    );
  };
}
