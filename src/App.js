import React, { useState, useEffect,useCallback } from "react";
import Table from "./tables/Table";
import EditForm from "./forms/EditForm";
import './styles.css'
import Modal from './Modales/Modal'

const App = () => {

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
  const filterIt = (arr, searchKey) => {
    if ("" === searchKey) return arr;
    var list = [];
    for (var i = 0; i < arr.length; i++) {
      var curr = arr[i];
      // eslint-disable-next-line
      Object.keys(curr).some(function (key) {

        if (typeof curr[key] === "string" && curr[key].includes(searchKey)) {
          list.push(curr);
        }

      });
    }
    return list;
  };
  const filterIt2 = (arr, searchKey) => {
    if ("" === searchKey) return arr;
    var list = [];
    for (var i = 0; i < arr.length; i++) {
      var curr = arr[i];
      // eslint-disable-next-line
      Object.keys(curr).some(function (key) {

        if (key === "type" && searchKey === curr.type && searchKey !== "TODOS") {

          list.push(curr);

        }
        if (key === "type" && searchKey === "TODOS") {
          list.push(curr);

        }


      });
    }
    return list;


  };

  const initialBusca = { busca: "" };
  const initialBusca2 = { type: "" };
  const [esta, setEsta] = useState(initialBusca);
  const [esta2, setEsta2] = useState(initialBusca2);
  const [items, setItems] = useState([]);




  const cosasData = [];
  const initialFormState = { id: null, name: "", cash: "", type: "" };
  const [cosas, setCosas] = useState(cosasData);
  const [editing, setEditing] = useState(false);
  const [currentCosa, setCurrentCosa] = useState(initialFormState);


  const [cant, updatecant] = useState(0);
  const [saldofinal, updatesaldofinal] = useState(0);

  const initialSaldos = { saldoi: 0 };
  const [saldos, setSaldos] = useState(initialSaldos);

  const filterList = event => {



    const { name, value } = event.target;
    setEsta({ ...esta, [name]: value });


    const searchQuery = value.toLowerCase();

    const updatedList = filterIt(cosas, searchQuery);
    //console.log(updatedList)
    setItems(updatedList);



  };
  const filterList2 = event => {

    const { name, value } = event.target;
    setEsta2({ ...esta2, [name]: value });

    const searchQuery = value;

    const updatedList = filterIt2(cosas, searchQuery);
    //console.log(updatedList)
    setItems(updatedList);
  };

  const calculateCantidad = useCallback(() => {
    let cant = 0;

    cosas.map(() =>
      cant = cant + 1


    );

    updatecant(cant);

  }, [cosas]);
  const calculateSaldoFinal = useCallback(() => {
    let cant = Number(saldos.saldoi) || 0;
    let exp = 0;
    let inc = 0;



    cosas.map((payload) =>


      payload.type === "EXPENSE"
        ? (exp = exp + Number(payload.cash))
        : (inc = inc + Number(payload.cash))


    );

    cant += inc - exp;

    /*console.log(saldofinal)
    console.log(inc)
    console.log(exp)*/

    updatesaldofinal(cant);

  },[cosas, saldos]);
  useEffect(() => {
    if (esta.busca !== "" || esta2.type !== "") {
      setItems(items.length > 0 ? items : cosas)
    } else {
      setItems(cosas)
    }

  }, [items, cosas, esta, esta2])

  useEffect(() => calculateCantidad() , [calculateCantidad]);
  useEffect(() => calculateSaldoFinal(), [calculateSaldoFinal]);
  const handleInputChange = event => {

    const { name, value } = event.target;
    setSaldos({ ...saldos, [name]: value });



  };

  const addCosa = (cosa) => {
    cosa.id = cosas.length + 1;
    setCosas([...cosas, cosa]);
  };

  const deleteCosa = (id) => {
    ///

    let cant = Number(saldos.saldoi) || 0;
    let exp = 0;
    let inc = 0;
    let dato = 0;

    cosas.map((payload) =>
      payload.type === "EXPENSE" && payload.id !== id
        ? (exp = exp + Number(payload.cash))
        : (inc = inc + Number(payload.cash))
    );
    cosas.map((payload) =>
      payload.id === id
        ? (dato = payload.cash)
        : (false)
    );

    cant += inc - exp;


    if (cant >= dato) {

      setEditing(false);
      setCosas(cosas.filter((dato) => dato.id !== id));
    } else {
      setTitle("error")
      setMessage("intento borrar un item que haria saldofinal negativo")
      openModal()
    }

  };

  const editRow = (row) => {
    setEditing(true);

    setCurrentCosa(row);
  };

  const updateCosa = (id, updatedCosa) => {
    let cant = Number(saldos.saldoi) || 0;
    let exp = 0;
    let inc = 0;
    cosas.map((payload) =>
      payload.type === "EXPENSE"
        ? (exp = exp + Number(payload.cash))
        : (inc = inc + Number(payload.cash))
    );

    updatedCosa.type === "EXPENSE"
      ? (exp = exp + Number(updatedCosa.cash))
      : (inc = inc + Number(updatedCosa.cash))
    cant += inc - exp;

    if (cant >= updatedCosa.cash) {
      setEditing(false);
      setCosas(cosas.map((dato) => (dato.id === id ? updatedCosa : dato)));

    } else {
      setTitle("error")
      setMessage("intento modificar un item que haria saldofinal negativo")
      openModal()
    }
  };

  return (
    <div className="container">
      <div>

        <Modal title={title} message={message} isOpen={isModalOpen} onClose={closeModal} />
      </div>
      <header className="header-fixed">

        <div className="header-limiter">

          <h6><p>Wilmer Andres Perez Garcia <span>[♥][♦][♣][♠]</span></p></h6>

          <nav className="flex-row">
            <div >
              <label>Saldo inicial</label>
              <input style={{ backgroundColor: "white" }}
                type="number"
                name="saldoi"
                value={saldos.saldoi}
                onChange={handleInputChange}
                onKeyPress={(e) => onKeyPress(e)}

              />
            </div>
            <div  >
              <label>Saldo final</label>
              <input style={{ backgroundColor: "white" }}
                type="number"
                name="saldofinal"
                value={saldofinal}
                readOnly="readOnly"


              />
            </div>

          </nav>

        </div>

      </header>

      <div className="header-fixed-placeholder"></div>

      <h4>Construccion de Software 4 Taller(1) |
        {editing ? "Edit" : "Add"} |
        Cantidad: {cant}</h4>


      <div className="flex-row" >
        <div className="flex-large">


          <EditForm
            editing={editing}
            setEditing={setEditing}
            currentCosa={currentCosa}
            setCurrentCosa={setCurrentCosa}
            updateCosa={updateCosa}
            addCosa={addCosa}
            saldofinal={saldofinal}
          />

        </div>
        <div className="flex-large">


          <fieldset style={{ display: "flex" }}>
            <legend>
              filter
            </legend>
            <div className="flex-large">

              <label htmlFor="expense">Gastos</label>
              <input
                type="radio"
                id="expense"
                name="type"
                value="EXPENSE"
                checked={esta2.type === "EXPENSE"}
                onChange={filterList2}
              />
            </div>
            <div className="flex-large">

              <label htmlFor="Expense">Ingresos</label>
              <input
                type="radio"
                id="income"
                name="type"
                value="INCOME"
                checked={esta2.type === "INCOME"}
                onChange={filterList2}

              />

            </div>
            <div className="flex-large">

              <label htmlFor="Expense">Todos</label>
              <input
                type="radio"
                id="income"
                name="type"
                value="TODOS"
                checked={esta2.type === "TODOS"}
                onChange={filterList2}

              />

            </div>
            <input
              type="text"
              name="busca"
              value={esta.busca}
              placeholder="Search" onChange={filterList} />
          </fieldset>



          <Table cosas={items} editRow={editRow} deleteCosa={deleteCosa} />



        </div>
      </div>
    </div>
  );
};

export default App;
