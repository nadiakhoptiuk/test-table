import short from 'short-uuid';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  deleteRow,
  incrementAmount,
  addRow,
} from 'redux/tableData/tableDataSlice';
import { getRandomAmount } from 'service/utils';
import { tableDataSelector } from 'redux/tableData/tableSelectors';
import { outputDataSelector } from 'redux/outputData/outputDataSelectors';
import s from './Table.module.css';

export default function Table() {
  const [averagesByColumns, setAveragesByColumns] = useState([]);
  const [totalAmountByRows, setTotalAmountByRows] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [closestTd, setClosestTd] = useState(null);
  const [headers, setHeaders] = useState('');

  const { N, x } = useSelector(outputDataSelector);
  const tableData = useSelector(tableDataSelector);
  const dispatch = useDispatch();

  // handled hover on table elements
  function handleHoverTd(evt) {
    const id = evt.target.id;
    getArrayOfTds(id);
  }

  // handled hover on titles
  function handleHoverHeader(evt) {
    evt.target.id === 'average' && setHeaders('average');
  }

  // get array of elements with closest values
  function getArrayOfTds(id) {
    if (!tableData || tableData.length === 0) {
      return;
    }
    const arrayOfTds = tableData.reduce((sum, row) => {
      return [...sum, ...row.columns];
    }, []);
    const closestEl = findClosestEl(arrayOfTds, id);
    setClosestTd(closestEl);
  }

  // find elements with closest values
  function findClosestEl(array, id) {
    const neededTd = array.find(el => el.id === id);

    const arrayOfAnotherTds = array.reduce((arr, td) => {
      if (td.id === id) {
        return arr;
      } else {
        const diff = Math.abs(td.amount - neededTd.amount);
        const newTd = { ...td, different: diff };
        delete newTd.amount;
        delete newTd.N;
        return [...arr, newTd];
      }
    }, []);

    return [...arrayOfAnotherTds]
      .sort((a, b) => {
        return a.different - b.different;
      })
      .slice(0, x);
  }

  // generate data for new row
  function createNewRow() {
    const newRowArray = {
      M: tableData[tableData.length - 1].M + 1,
      columns: [],
    };
    for (let i = 1; i <= N; i++) {
      const id = short.generate();
      const amount = getRandomAmount();

      const newObject = { N: i, id, amount };
      newRowArray.columns.push(newObject);
    }
    dispatch(addRow(newRowArray));
  }

  // calculate total by rows and total amount
  useEffect(() => {
    if (!tableData || tableData.length === 0) {
      return;
    } else {
      const totalByRows = tableData?.map(({ columns }) => {
        return columns.reduce((sum, td) => sum + td.amount, 0);
      });
      setTotalAmountByRows(totalByRows);

      const totalAmount = totalByRows.reduce((sum, el) => {
        return sum + el;
      });
      setTotalAmount(totalAmount);
    }
  }, [tableData]);

  // calculate average by columns
  useEffect(() => {
    if (!tableData || tableData.length === 0) {
      return;
    } else {
      const averagesArr = [];
      for (let i = 0; i < N; i++) {
        const total = tableData.reduce((sum, td) => {
          return sum + td.columns[i].amount;
        }, 0);
        averagesArr.push((total / tableData.length).toFixed(2));
      }
      setAveragesByColumns(averagesArr);
    }
  }, [N, tableData]);

  return tableData ? (
    <div className={s.mainWrapper}>
      <div>
        <ul className={s.btnsList}>
          <li>
            <button onClick={createNewRow} className={s.addRowBtn}>
              Add new row
            </button>
          </li>
          {tableData?.map(row => {
            return (
              <li key={row.M}>
                <button
                  onClick={() => dispatch(deleteRow(row.M))}
                  className={s.deleteRowBtn}
                >
                  Delete row
                </button>
              </li>
            );
          })}
        </ul>
        <p
          className={s.tableHeaderAverage}
          onMouseEnter={handleHoverHeader}
          onMouseLeave={() => setHeaders('')}
          id="average"
        >
          Average by columns:
        </p>
      </div>

      <table className={s.table}>
        <caption className={s.tableCaption}>Your matrix</caption>
        <tbody>
          <tr>
            <th colSpan={tableData[0].columns.length}></th>
            <th className={s.tableHeader}>Total by rows:</th>
          </tr>
          {tableData &&
            tableData?.map(({ M, columns }, index) => {
              return (
                <tr key={index}>
                  {columns.map(column => (
                    <td
                      key={column.id}
                      id={column.id}
                      onClick={() =>
                        dispatch(
                          incrementAmount({ row: M, idToFind: column.id })
                        )
                      }
                      onMouseEnter={handleHoverTd}
                      onMouseLeave={() => setClosestTd(null)}
                      className={
                        closestTd?.find(({ id }) => id === column.id)
                          ? s.activeTd
                          : s.baseTd
                      }
                    >
                      {column.amount}
                    </td>
                  ))}
                  <td
                    key={`totalByRow{M}`}
                    className={s.totalAmountByRow}
                    style={{ width: '155px' }}
                  >
                    <div className={s.totalAmountByRowCount}>
                      {totalAmountByRows[index]}
                    </div>
                    <div
                      className={s.totalAmountByRowChart}
                      style={{
                        width: `calc(${totalAmountByRows[index]}% / ${totalAmount} * 100)`,
                      }}
                    ></div>
                    <div className={s.totalAmountByRowPercentage}>
                      {Math.floor(
                        (totalAmountByRows[index] / totalAmount) * 100
                      )}
                      %
                    </div>
                  </td>
                </tr>
              );
            })}
          <tr>
            {averagesByColumns.map((td, index) => {
              return (
                <td
                  key={index}
                  className={
                    headers === 'average' ? s.activeHeader : s.tableHeader
                  }
                >
                  {td}
                </td>
              );
            })}
            <td className={s.tableHeaderTotal}>
              Total amount: <br />
              {totalAmount}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  ) : null;
}
