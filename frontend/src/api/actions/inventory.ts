import type {
  AddStockPayload,
  AddStockResponse,
  RemoveStockPayload,
  RemoveStockResponse,
  TransferStockPayload,
  TransferStockResponse,
} from 'src/api/types/inventory';

import axios from 'src/utils/axios';

import { ENDPOINTS } from 'src/constants/endpoints';

// ----------------------------------------------------------------------

export async function addStockAction(data: AddStockPayload) {
  const res = await axios.post<AddStockResponse>(ENDPOINTS.inventory.add, data);
  return res.data.data;
}

export async function removeStockAction(data: RemoveStockPayload) {
  const res = await axios.post<RemoveStockResponse>(ENDPOINTS.inventory.remove, data);
  return res.data.data;
}

export async function transferStockAction(data: TransferStockPayload) {
  const res = await axios.post<TransferStockResponse>(ENDPOINTS.inventory.transfer, data);
  return res.data.data;
}
