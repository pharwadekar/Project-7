import React from 'react';
import { useTable } from 'react-table';

function CrewmatesTable({ data, updateCrewmate, deleteCrewmate }) {
  const columns = React.useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Category',
        accessor: 'category',
      },
      {
        Header: 'Color',
        accessor: 'color',
      },
      {
        Header: 'Accessory',
        accessor: 'accessory',
      },
      {
        Header: 'Actions',
        accessor: 'actions',
        Cell: ({ row }) => (
          <div>
            <button onClick={() => deleteCrewmate(row.original.id)}>Delete</button>
            <button onClick={() => updateCrewmate(row.original.id, { name: 'Updated Name', category: 'Updated Category', color: 'blue', accessory: 'hat' })}>Update</button>
          </div>
        ),
      },
    ],
    [deleteCrewmate, updateCrewmate]
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => (
                <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default CrewmatesTable;