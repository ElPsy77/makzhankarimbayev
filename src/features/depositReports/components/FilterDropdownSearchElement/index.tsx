import { Button, Input, Space } from 'antd';
import { FilterConfirmProps, Key } from 'antd/lib/table/interface';
import { ReactElement } from 'react';

type FilterDropdownSearchElementProps = {
   setSelectedKeys: (selectedKeys: Key[]) => void;
   selectedKeys: Key[];
   confirm: (param?: FilterConfirmProps) => void;
   clearFilters?: () => void;
   close: () => void;
};

const FilterDropdownSearchElement = ({
   setSelectedKeys,
   selectedKeys,
   confirm,
   clearFilters,
   close,
}: FilterDropdownSearchElementProps): ReactElement<FilterDropdownSearchElementProps> => {
   const searchInput = (
      <Input
         placeholder={'Wyszukaj'}
         value={selectedKeys[0]}
         onChange={(e) => {
            setSelectedKeys(e.target.value ? [e.target.value] : []);
            confirm({ closeDropdown: false });
         }}
         onPressEnter={close}
         style={{ marginBottom: 8, display: 'block' }}
      />
   );

   const resetButtonElement = (
      <Button
         size='small'
         onClick={() => {
            if (clearFilters) {
               clearFilters();
               confirm({ closeDropdown: false });
               close();
            }
         }}
      >
         Reset
      </Button>
   );

   const closeButtonElement = (
      <Button
         size='small'
         onClick={() => {
            close();
         }}
      >
         Zamknij
      </Button>
   );

   return (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
         {searchInput}

         <Space className='flex justify-end'>
            {resetButtonElement}
            {closeButtonElement}
         </Space>
      </div>
   );
};

export default FilterDropdownSearchElement;
