import { Todo, UsersState } from '../usersState/usersTypes';

export const mockData: UsersState = {
  profile: null,
  isAllUsersSelected: false,
  editMode: false,
  users: [
    {
      _id: '625a89ef8e3031cf45cf1561',
      name: 'Sylvester',
      surname: 'Stallone',
      email: 'myevrop1@gmail.com',
      password: '123123123',
      selected: false,
      phone: '+420776544634',
      registration: '2021-12-31T22:00:00.000Z',
      address: 'Karlovy Vary',
      role: 'admin',
      img: 'data:image/jpeg;base64,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',
      birth: '1982-12-31T22:00:00.000Z',
      disabled: false,
    },
    {
      _id: '625a8a7d8e3031cf45cf1563',
      name: 'Arnold',
      surname: 'Schwarzenegger',
      email: 'myevrop1@gmail.com',
      password: '123123123',
      selected: false,
      phone: '+420776544634',
      registration: '2021-12-31T22:00:00.000Z',
      address: 'Karlovy Vary',
      role: 'admin',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQo572GfpqrKsCCBcMIPNp_wLDVeFzd-IlydA&usqp=CAU',
      birth: '1982-12-31T22:00:00.000Z',
      disabled: false,
    },
    {
      _id: '625a8a868e3031cf45cf1564',
      name: 'Jean-Claude',
      surname: 'Van Damme',
      email: 'myevrop1@gmail.com',
      password: '123123123',
      selected: false,
      phone: '+420776544634',
      registration: '2021-12-31T22:00:00.000Z',
      address: 'Karlovy Vary',
      role: 'admin',
      img: 'https://www.kinobox.cz/data/clanky/640x400x1/jean-claude-van-damme-odchazi-do-akcniho-duchodu-a-ve-svem-poslednim-velkem-filmu-nabidne-opravdove-hody-pro-fanousky.jpg',
      birth: '1982-12-31T22:00:00.000Z',
      disabled: false,
    },
  ],
  dropList: [
    {
      _id: '625a8ba08e3031cf45cf1565',
      todo: Todo.New,
      disabled: false,
      always: true,
    },
    {
      _id: '625a8c5a8e3031cf45cf1566',
      todo: Todo.Edit,
      disabled: false,
      always: true,
    },
    {
      _id: '625a8caf8e3031cf45cf1567',
      todo: Todo.Copy,
      disabled: true,
      single: true,
    },
    {
      _id: '625a8cbb8e3031cf45cf1568',
      todo: Todo.Delete,
      disabled: true,
      single: true,
      bulk: true,
    },
  ],
};
