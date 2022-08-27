import { tableDataSelector } from 'redux/tableSelectors';
import { useSelector, useDispatch } from 'react-redux';
import s from './Table.module.css';
import { deleteRow, incrementAmount } from '../../redux';
import { useEffect, useState } from 'react';

export default function Table() {
  const [averagesByColumns, setAveragesByColumns] = useState([]);
  const [totalAmountByRows, setTotalAmountByRows] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const tableData = useSelector(tableDataSelector);
  const dispatch = useDispatch();
  const rowCount = tableData.length;

  // function getTotalRow() {
  //   if (tableData) {
  //     const res = tableData[0].columns.reduce((sum, td) => sum + td.amount, 0);
  //     console.log(res);
  //   }
  // }

  function getArrayOfTds() {
    if (!tableData || tableData.length === 0) {
      return;
    }
    const arrayOfTds = tableData.reduce((sum, row) => {
      return [...sum, ...row.columns];
    }, []);
    findClosestEl(2, arrayOfTds);
  }

  getArrayOfTds();

  function findClosestEl(x, array) {
    const differenceDataForEach = array.map(el => {
      const arrayOfAnotherTds = array.reduce((arr, td) => {
        if (td.id === el.id) {
          return arr;
        } else {
          const diff = Math.abs(td.amount - el.amount);
          const newTd = { ...td, different: diff };
          delete newTd.amount;
          delete newTd.N;
          return [...arr, newTd];
        }
      }, []);

      const closestTd = [...arrayOfAnotherTds]
        .sort((a, b) => {
          return a.different - b.different;
        })
        .slice(0, x);
      return { id: el.id, tds: closestTd };
    });

    console.log(differenceDataForEach);
  }

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

  useEffect(() => {
    if (!tableData || tableData.length === 0) {
      return;
    } else {
      const columnCount = tableData[0]?.columns?.length;
      const averagesArr = [];
      for (let i = 0; i < columnCount; i++) {
        const total = tableData.reduce((sum, td) => {
          return sum + td.columns[i].amount;
        }, 0);
        averagesArr.push((total / rowCount).toFixed(2));
      }
      setAveragesByColumns(averagesArr);
    }
  }, [rowCount, tableData]);

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
          <tr>
            <th colSpan={tableData[0].columns.length}></th>
            <th>Total by rows:</th>
          </tr>
          {tableData &&
            tableData?.map(({ M, columns }, index) => {
              return (
                <tr key={M}>
                  {columns.map(column => (
                    <td
                      key={column.id}
                      onClick={() =>
                        dispatch(
                          incrementAmount({ row: M, idToFind: column.id })
                        )
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
              return <td key={index}>{td}</td>;
            })}
            <th>Average by columns:</th>
          </tr>
        </tbody>
      </table>
    </>
  ) : null;
}
