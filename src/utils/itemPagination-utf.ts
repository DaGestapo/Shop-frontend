import { getItems } from '../http/itemAPI';

interface PaginationI {
    typeId?: number;
    page?: number;
}

export const itemsPagination = async ({
    typeId,
    page, 
}: PaginationI) => {

  const data = await getItems({typeId, page});

  return data;
}