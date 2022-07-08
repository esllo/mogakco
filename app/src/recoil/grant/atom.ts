import { SearchItemPosition } from '@/components/Search/SearchItem';
import { atom, selector, atomFamily } from 'recoil';

export interface Role {
  id: string;
  name: string;
  color: number;
  visible?: boolean;
  selected?: boolean;
}

export const guildState = atom<string>({
  key: 'guild',
  default: '',
});

export const rolesState = atom<Role[]>({
  key: 'roleState',
  default: [],
});

export const queryState = atom<string>({
  key: 'query',
  default: '',
});

export const roleIdSelected = atom<string[]>({
  key: 'roleIdSelected',
  default: [],
});

export const rolesSelected = selector<Role[]>({
  key: 'rolesSelected',
  get: ({ get }) => {
    const roles = get(rolesState) || [];
    const selected = get(roleIdSelected) || [];
    const rolesFiltered = roles.filter(({ id }) => selected.includes(id));
    return rolesFiltered;
  },
});

export const rolesWithQueryState = selector<Role[]>({
  key: 'roleWithQuery',
  get: ({ get }) => {
    const query = get(queryState) || '';
    return get(rolesState).map((role) => {
      const copied = { ...role };
      copied.visible = copied.name.includes(query);

      return copied;
    });
  },
});

export const rolePositionFamily = atomFamily<SearchItemPosition, string>({
  key: 'rolePositionFamily',
  default: (id) => ({ left: 0, top: 0, id }),
});
