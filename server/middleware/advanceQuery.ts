import { filter } from '../database/hooks/filter';
import { pagination as paginationHook } from '../database/hooks/pagination';
import { populate } from '../database/hooks/populate';
import { select } from '../database/hooks/select';
import { sort } from '../database/hooks/sort';

export const advanceQuery =
  (Model: any) => async (req: any, res: any, next: any) => {
    const filterQuery = filter(req.query);
    const selectFields = select(req.query);
    const sortFields = sort(req.query);
    const { limit, startIndex, pagination } = paginationHook(
      req.query,
      await Model.countDocuments()
    );
    const populateFields = populate(req.query);

    const data: any[] = await Model.find(filterQuery)
      .select(selectFields)
      .sort(sortFields)
      .skip(startIndex)
      .limit(limit)
      .populate(populateFields);
      
    res.advanceQuery = {
      success: true,
      message: 'Data found',
      data: data,
      pagination,
      total: data.length,
    };

    next();
  };
