import short from 'short-uuid';
import useFormFields from 'hooks/useFormFields';
import { min, max } from 'service/constants';

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

  const resetForm = () => {
    setMValue('');
    setNValue('');
    setXValue('');
  };

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
        console.log(newObject);
      }
      mainArr.push({ M: i, rows: innerArr });
    }
    console.log(mainArr);
    // resetForm();
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
    </>
  );
}
