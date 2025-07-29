export const useTypeUnitArabic = ({type_unit}: {type_unit: string | null}) => {
    const unitTypes = [
        { name: 'م', id: 'm' },
        { name: 'سم', id: 'cm' },
        { name: 'مم', id: 'mm' },
        { name: 'إنش', id: 'in' },
        { name: 'م²', id: 'm2' },
        { name: 'قدم²', id: 'ft2' },
        { name: 'سم³', id: 'oz' },
        { name: 'م³', id: 'm3' },
        { name: 'لتر', id: 'ltr' },
        { name: 'مل', id: 'ml' },
        { name: 'طن', id: 'ton' },
        { name: 'كجم', id: 'kg' },
        { name: 'جم', id: 'g' },
        { name: 'م.ط', id: 'm4' },
        { name: 'قدم', id: 'ft' },
        { name: 'باوند', id: 'lb' },
      ];
      const unitType = unitTypes.find(unit => unit.id === type_unit);
      return unitType?.name || '';
};