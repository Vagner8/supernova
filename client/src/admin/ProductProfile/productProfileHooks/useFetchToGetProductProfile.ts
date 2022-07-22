import { AdminReducerActions, useAdminDispatch } from 'admin/adminState';
import { EventsReducerActions, useEventsDispatch } from 'admin/Events/eventsState';
import { Projection } from 'admin/UserProfile/userProfileHooks/useFetchToGetUserProfile';
import { fetcher, GoTo } from 'api/fetcher';
import { Dispatch, useEffect } from 'react';
import { ProductType } from '../../../../../common/src/productTypes';

export type ProductProfileResponse = Omit<ProductType, 'selected'>;

const projection: Omit<Projection<ProductProfileResponse>, '_id'> = {
  itemId: '$itemId',
  created: '$created',
  card: '$card',
  profile: '$profile',
  settings: '$settings',
  imgs: '$imgs',
};

interface UseProductProfile {
  itemId: string | undefined;
  eventsDispatch: Dispatch<EventsReducerActions>;
  adminDispatch: Dispatch<AdminReducerActions>;
}

export function useFetchToGetProductProfile({
  itemId,
  eventsDispatch,
  adminDispatch,
}: UseProductProfile) {
  const eventsAction = useEventsDispatch(eventsDispatch);
  const adminAction = useAdminDispatch(adminDispatch);
  useEffect(() => {
    const asyncer = async () => {
      const profile = await fetcher<ProductProfileResponse[]>({
        method: 'GET',
        url: `${GoTo.ProductAggregate}/?projection=${JSON.stringify(
          projection,
        )}&itemId=${itemId}`,
        saveOperationResult: adminAction.saveOperationResult,
        setAdminState: adminAction.setAdminState,
      });
      if (!profile) return;
      eventsAction.setEventsState({ profile: profile[0] });
    };
    asyncer();
  }, [adminAction, eventsAction, itemId]);
}
