import { AdminReducerActions, useAdminDispatch } from 'admin/adminState';
import { EventsReducerActions, useEventsDispatch } from 'admin/Events/eventsState';
import { Projection } from 'admin/UserProfile/userProfileHooks/useFetchToGetUserProfile';
import { GoTo, fetcher } from 'api/fetcher';
import { Dispatch, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ProductType } from '../../../../../common/src/productTypes';

export interface ProductForTableResponse {
  _id: string;
  itemId: ProductType['itemId'];
  name: ProductType['card']['name'];
  price: ProductType['card']['price'];
  avatar: ProductType['imgs']['avatar'];
  disabled: ProductType['settings']['disabled'];
  category: ProductType['settings']['category']
  selected?: ProductType['selected'];
}

const projection: Omit<Projection<ProductForTableResponse>, '_id'> = {
  itemId: '$itemId',
  name: '$card.name',
  price: '$card.price',
  avatar: '$imgs.avatar',
  disabled: '$settings.disabled',
  category: '$settings.category'
};

export function useFetchToGetProductsForTable(
  eventsDispatch: Dispatch<EventsReducerActions>,
  adminDispatch: Dispatch<AdminReducerActions>,
) {
  const eventsAction = useEventsDispatch(eventsDispatch);
  const adminAction = useAdminDispatch(adminDispatch);
  const location = useLocation()
  useEffect(() => {
    const asyncer = async () => {
      const tableRows = await fetcher<ProductForTableResponse[]>({
        method: 'GET',
        url: `${GoTo.ProductAggregate}/?projection=${JSON.stringify(
          projection,
        )}`,
        saveOperationResult: adminAction.saveOperationResult,
        setAdminState: adminAction.setAdminState,
      });
      if (!tableRows) return;
      eventsAction.setEventsState({ tableRows });
    };
    asyncer();
  }, [eventsAction, adminAction, location]);
}
