import History, { IHistory } from "../models/History";

export const getHistory = async (): Promise<IHistory[]> => {
  return await History.find();
};

export const getHistoryById = async (id: string): Promise<IHistory | null> => {
  return await History.findById(id);
};
