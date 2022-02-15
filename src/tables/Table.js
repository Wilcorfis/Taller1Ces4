import React from "react";
import "../styles.css"
/*import styled from "styled-components";
const Cell = styled.tr`
td:nth-child(2){
  background-color: ${(props) => (props.isExpense ? "red" : "green")};
  border-radius:20px
}
`;*/

const Table = props => {

  return(
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Cash</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {props.cosas.length > 0 ? (
        props.cosas.map(cosa => (
          <tr className={` ${cosa?.type==="EXPENSE"? 'redClass':'greenClass'}`}  key={cosa.id} >
            <td><p>{cosa.name}</p></td>
            <td><p>{cosa.cash}</p></td>
            <td><p>
              <button
                className="button muted-button"
                onClick={() => {
                  props.editRow(cosa);
                }}
              >
                Edit
              </button>
              <button
                className="button muted-button"
                onClick={() => props.deleteCosa(cosa.id)}
              >
                Delete
              </button>
              </p>
            </td>
          </tr >
        ))
      ) : (
        <tr>
          <td colSpan={3}>No hay nada</td>
        </tr>
      )}
    </tbody>
  </table>
  )};

export default Table;
