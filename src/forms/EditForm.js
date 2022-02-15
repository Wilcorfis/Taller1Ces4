import React, { useState, useEffect } from "react";
import '../styles.css'
import Modal from '../Modales/Modal'
const EditForm = props => {
  function onKeyPress(event) {
    const keyCode = event.keyCode || event.which;
    const keyValue = String.fromCharCode(keyCode);
    if (/\+|-|e|E/.test(keyValue))
      event.preventDefault();
  }


  const [isModalOpen, setModal] = useState(false)
  const [title, setTitle] = useState("")
  const [message, setMessage] = useState("")
  const openModal = () => {
    setModal(true)
  }

  const closeModal = () => {
    setModal(false)
  }
  const initialFormState = { id: null, name: "", cash: "", type: ""};
  const [cosa, setCosa] = useState(
    props.editing ? props.currentCosa : initialFormState
  );




  const handleInputChange = event => {

    const { name, value } = event.target;

    setCosa({ ...cosa, [name]: value });

  };

  useEffect(() => {
    setCosa(props.currentCosa);
  }, [props]);

  const resetAddCosa = () => {

    props.setEditing(false);
    setCosa(initialFormState);
    props.setCurrentCosa(initialFormState);
  };

  return (
    <div>
      <div>

        <Modal title={title} message={message} isOpen={isModalOpen} onClose={closeModal} />
      </div>
      <form
        onSubmit={event => {
          event.preventDefault();
          if (!cosa.name || !cosa.cash || !cosa.type) return;



          if (props.saldofinal - cosa.cash < 0 && cosa.type === "EXPENSE") {
            setTitle("error")
            setMessage("no cuenta con saldo suficiente para realizar este movimiento")
            openModal()
            return;
          }
          if (cosa.cash <= 0) {
            return
          }
          if (props.saldofinal === 0 && cosa.type === "INCOME") {
            setTitle("Registro exitoso")
            setMessage("INGRESO agregado con exito")
            openModal()

          }
          if (props.saldofinal - cosa.cash > 0 && cosa.type === "EXPENSE" && !props.editing) {
            setTitle("Registro exitoso")
            setMessage("GASTO agregado con exito")
            openModal()

          }
          if (props.saldofinal - cosa.cash > 0 && cosa.type === "INCOME" && !props.editing) {
            setTitle("Registro exitoso")
            setMessage("INGRESO agregado con exito")
            openModal()


          }

          props.editing ? props.updateCosa(cosa.id, cosa) : props.addCosa(cosa);
          resetAddCosa();
        }}
      >
        <div className="flex-row" style={{ border: " 5px solid black" }}>
          <div className="flex-large">

            <label htmlFor="expense">Gastos</label>
            <input
              type="radio"
              id="expense"
              name="type"
              value="EXPENSE"
              checked={cosa.type === "EXPENSE"}
              onChange={handleInputChange}
            />


          </div>
          <div className="flex-large">

            <label htmlFor="Expense">Ingresos</label>
            <input
              type="radio"
              id="income"
              name="type"
              value="INCOME"
              checked={cosa.type === "INCOME"}
              onChange={handleInputChange}
            />

          </div>

        </div>


        <label>Name</label>
        <input
          type="text"
          name="name"
          value={cosa.name}
          onChange={handleInputChange}
        />
        <label>Cash</label>
        <input
          type="number"
          name="cash"
          value={cosa.cash}
          onChange={handleInputChange}
          onKeyPress={(e) => onKeyPress(e)}



        />




        <button>{props.editing ? "Update" : "Add"}</button>
        {props.editing && (
          <button onClick={resetAddCosa} className="button muted-button">
            Cancel
          </button>
        )}

      </form>

    </div>

  );
};

export default EditForm;
