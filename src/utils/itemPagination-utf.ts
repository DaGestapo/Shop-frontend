import itemApi from '../http/itemAPI';

interface PaginationI {
    typeId?: number;
    page?: number;
}

export const itemsPagination = async ({
    typeId,
    page, 
}: PaginationI) => {

  const data = await itemApi.getAllitems.bind(itemApi)({typeId, page});

  return data;
}