import type { ApiResponse } from 'src/types/api-response';
import type { AddStockDto, RemoveStockDto, TransferStockDto } from 'src/types/inventory';

export interface AddStockPayload extends AddStockDto {}

export interface RemoveStockPayload extends RemoveStockDto {}

export interface TransferStockPayload extends TransferStockDto {}

export interface AddStockResponse extends ApiResponse<any> {}

export interface RemoveStockResponse extends ApiResponse<any> {}

export interface TransferStockResponse extends ApiResponse<{ success: true }> {}
