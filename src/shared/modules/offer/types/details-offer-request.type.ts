import { Request } from 'express';
import { RequestBody, RequestParams } from '../../../libs/rest/index.js';

export type DetailsOfferRequest = Request<RequestBody, RequestParams, void>;
 