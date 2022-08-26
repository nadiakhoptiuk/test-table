import short from 'short-uuid';
import useFormFields from 'hooks/useFormFields';
import { min, max } from 'service/constants';
import { addRow, setTableData } from '../../redux/';
import { useDispatch, useSelector } from 'react-redux';
import { tableDataSelector } from 'redux/tableSelectors';

export default function FormWithSettings() {
  const {
    state: MValue,
    setState: setMValue,
    handleChange: handleMValueChange,
  } = useFormFields('');
  const {
    state: NValue,
    setState: setNValue,
    handleChange: handleNValueChange,
  } = useFormFields('');
  const {
    state: xValue,
    setState: setXValue,
    handleChange: handleXValueChange,
  } = useFormFields('');
  const dispatch = useDispatch();
  const tableData = useSelector(tableDataSelector);

  const resetForm = () => {
    setMValue('');
    setNValue('');
    setXValue('');
  };

  function createNewRow() {
    const newRowArray = { M: tableData.length + 1, columns: [] };

    for (let i = 1; i <= tableData[0].columns.length; i++) {
      const id = short.generate();
      const amount = getRandomAmount();

      const newObject = { N: i, id, amount };
      newRowArray.columns.push(newObject);
    }
    dispatch(addRow(newRowArray));
  }

  function createDataForTable(evt) {
    evt.preventDefault();
    const mainArr = [];

    for (let i = 1; i <= MValue; i++) {
      const innerArr = [];
      for (let j = 1; j <= NValue; j++) {
        const id = short.generate();
        const amount = getRandomAmount();

        const newObject = { N: j, id, amount };
        innerArr.push(newObject);
      }
      mainArr.push({ M: i, columns: innerArr });
    }
    dispatch(setTableData(mainArr));
    resetForm();
  }

  function getRandomAmount() {
    return Math.floor(Math.random() * (max - min) + min);
  }

  return (
    <>
      <form onSubmit={createDataForTable}>
        <label>
          Enter M:
          <input
            // className={s.input}
            type="number"
            name="M"
            value={MValue}
            onChange={handleMValueChange}
            max="100"
            min="1"
            title="Name may contain only number from 1 to 100"
            required
          />
        </label>
        <label>
          Enter N:
          <input
            // className={s.input}
            type="number"
            name="N"
            value={NValue}
            onChange={handleNValueChange}
            max="100"
            min="1"
            title="Name may contain only number from 1 to 100"
            required
          />
        </label>
        <label>
          Enter x:
          <input
            // className={s.input}
            type="number"
            name="x"
            value={xValue}
            onChange={handleXValueChange}
            max={`${MValue} * ${NValue}`}
            min="1"
            title="Name may contain only number from 1 to {M*N}"
            required
          />
        </label>
        <button type="submit">Generate table</button>
      </form>
      <button onClick={resetForm}>Clear all inputs</button>
      {tableData ? <button onClick={createNewRow}>Add row</button> : null}
    </>
  );
}
