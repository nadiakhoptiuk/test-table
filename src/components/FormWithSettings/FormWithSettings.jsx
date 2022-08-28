import short from 'short-uuid';
import { useDispatch } from 'react-redux';
import useFormFields from 'hooks/useFormFields';
import { getRandomAmount } from 'service/utils';
import { setTableData } from 'redux/tableData/tableDataSlice';
import { setOutputData } from 'redux/outputData/outputDataSlice';
import s from './FormWithSettings.module.css';

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
  const maxXValue = getMaxXValue();

  // generate random data for table
  function createDataForTable(evt) {
    evt.preventDefault();

    dispatch(setOutputData({ M: MValue, N: NValue, x: xValue }));
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

  // calculate the largest possible x value for validation in the form input
  function getMaxXValue() {
    if (!MValue || !NValue) {
      return;
    }
    return MValue * NValue - 1;
  }

  // reset form inputs after submit
  function resetForm() {
    setMValue('');
    setNValue('');
    setXValue('');
  }

  return (
    <>
      <div className={s.container}>
        <p className={s.formTitle}>Enter the settings for the matrix please:</p>
        <form onSubmit={createDataForTable} className={s.form}>
          <label className={s.inputLabel}>
            Row number:
            <input
              className={s.input}
              type="number"
              name="M"
              value={MValue}
              onChange={handleMValueChange}
              max="100"
              min="1"
              autoFocus={true}
              title="Name may contain only number from 1 to 100"
              required
            />
          </label>
          <label className={s.inputLabel}>
            Column number:
            <input
              className={s.input}
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
          <label className={s.inputLabel}>
            Closest values number:
            <input
              className={s.input}
              type="number"
              name="x"
              value={xValue}
              onChange={handleXValueChange}
              max={`${maxXValue}`}
              min="1"
              required
            />
          </label>
          <button type="submit" className={s.submitBtn}>
            Generate table
          </button>
        </form>
        <button onClick={resetForm} className={s.clearBtn}>
          Clear all inputs
        </button>
      </div>
    </>
  );
}
