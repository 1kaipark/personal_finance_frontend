import { saveAs } from 'file-saver';

const convertToCSV = (data: any) => {
  const array = [Object.keys(data[Object.keys(data)[0]])].concat(
    Object.values(data)
  );

  return array
    .map((row) => {
      return Object.values(row)
        .map((value) => {
          return typeof value === 'string' ? `"${value.replace(/"/g, '""')}"` : value;
        })
        .join(',');
    })
    .join('\n');
};

export const downloadDataAsCSV = (data: any, fileName: string) => {
  const csv = convertToCSV(data);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  saveAs(blob, `${fileName}.csv`);
};
