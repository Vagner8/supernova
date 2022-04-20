import { DropItemTypes, UsersState } from '../usersTypes';

interface ReturnDropListByType {
  (state: UsersState, ...types: string[]): UsersState;
}

const returnDropListByType: ReturnDropListByType = (state, ...types) => {
  return {
    ...state,
    dropList: state.dropList.map((item) => {
      if (types.some((type) => Object.keys(item).includes(type))) {
        return {
          ...item,
          disabled: false,
        };
      }
      return {
        ...item,
        disabled: true,
      };
    }),
    editMode: false,
  };
};

interface AdjustDropList {
  (state: UsersState, numberSelectedUsers: number): UsersState;
}

export const adjustDropList: AdjustDropList = (state, numberSelectedUsers) => {
  if (numberSelectedUsers === 0) {
    return returnDropListByType(state, DropItemTypes.Always);
  }
  if (numberSelectedUsers === 1) {
    return returnDropListByType(
      state,
      DropItemTypes.Always,
      DropItemTypes.Single,
    );
  }
  if (numberSelectedUsers > 1) {
    return returnDropListByType(
      state,
      DropItemTypes.Always,
      DropItemTypes.Bulk,
    );
  }
  return state;
};
