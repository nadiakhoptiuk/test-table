import { tableDataSelector } from 'redux/tableSelectors';
import { useSelector, useDispatch } from 'react-redux';
import s from './Table.module.css';
import { deleteRow } from '../../redux';

export default function Table() {
  const tableData = useSelector(tableDataSelector);
  const dispatch = useDispatch();
  console.log(tableData);

  return tableData ? (
    <>
      {tableData ? (
        <ul>
          {tableData?.map(row => {
            return (
              <li key={row.M}>
                <button onClick={() => dispatch(deleteRow(row.M))}>
                  Delete row
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}

      <table className={s.table}>
        <caption>Your matrix</caption>
        <tbody>
          {tableData &&
            tableData?.map(({ M, columns }) => {
              return (
                <tr key={M}>
                  {columns.map(column => (
                    <td key={column.id}>{column.amount}</td>
                  ))}
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  ) : null;
}
