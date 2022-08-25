const tableData = [
  {
    M: 1,
    rows: [
      { N: 1, id: 'bujXciEMBw9TE3p7iAzmiC', amount: 710 },
      { N: 2, id: 'h688HiwudjRa44DJBCJPa2', amount: 771 },
    ],
  },
  {
    M: 2,
    rows: [
      { N: 1, id: '4SoENvAX76n64nDdpsXs24', amount: 282 },
      { N: 2, id: 'tknFVHTTba17fGgNtvD6Dv', amount: 490 },
    ],
  },
  {
    M: 3,
    rows: [
      { N: 1, id: 'p7XjpJjwG8QcXByt8xT9fB', amount: 548 },
      { N: 2, id: '85ftGJ4LrtunDEavgTWARh', amount: 771 },
    ],
  },
];

export default function Table() {
  return (
    <table>
      <tbody>
        {tableData.map(({ M, rows }) => {
          return (
            <tr key={M}>
              {rows.map(row => (
                <td key={row.id}>{row.amount}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
