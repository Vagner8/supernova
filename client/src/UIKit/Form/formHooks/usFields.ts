import { useMemo } from 'react';
import { ValidatedFields } from '../../../../../common/src/commonTypes';
import { ProductSettingsType } from '../../../../../common/src/productTypes';
import { UserStatus } from '../../../../../common/src/userTypes';

type Fields = Partial<keyof ValidatedFields>[] & string[];

export function useFields() {
  return useMemo(
    () => ({
      get requiredFields() {
        return [
          'login',
          'password',
          'email',
          'name',
          'surname',
          'phone',
          'price',
        ] as Fields;
      },

      getSelectList(field: 'rule' | 'category') {
        const selectList: {
          rule: UserStatus[];
          category: ProductSettingsType['category'][];
        } = {
          rule: [
            'Admin',
            'Developer',
            'Fired',
            'New',
            'Owner',
            'User',
            'Viewer',
          ],
          category: ['New', 'Dress', 'Trips', 'Devices'],
        };
        return selectList[field];
      },

      isTextareaField(field: Partial<keyof ValidatedFields>) {
        if (field === 'description') return true;
        return false;
      },

      isPasswordField(field: Partial<keyof ValidatedFields>) {
        if (field === 'password') return 'password'
        return 'text'
      },

      isLabelPartialValidatedFieldsType(
        label: string,
      ): label is Partial<keyof ValidatedFields> {
        return true;
      },
    }),
    [],
  );
}
