import { Component } from "react";
import axios from 'axios';
import './App.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categorias: [],
      productos: [],
      cat_id: 0
    }
  }

  buscarCategorias() {
    const url = "https://productos.ctpoba.edu.ar/api/categorias" 
    axios.get(url)
    .then((Response) => {
      this.setState({categorias: Response.data.categorias})
    })
    .catch((error) => {
      console.log(error);
    })
  }

  buscarProductos() {
    const url = "https://productos.ctpoba.edu.ar/api/productos" 
    axios.get(url)
    .then((Response) => {
      this.setState({productos: Response.data.productos})
      console.log(Response.data.productos);
    })
    .catch((error) => {
      console.log(error);
    })
  }

  render() {
    return(
      <div>
        <input 
          type="button"
          value="Buscar categorias"
          onClick={() => this.buscarCategorias()}
        />
        <br /><br />
        <select
          value={this.state.cat_id}
          onChange={(e) => this.setState({cat_id:e.target.value})}
        >
          {this.state.categorias.map((cont, index) =>
            <option 
              key={cont.id}
              value={cont.id}
              onChange={(e) => this.setState({cat_id:e.target.value})}
            >{cont.nombre}</option>
          )}
        </select>
        <br /><br />
        <input 
          type="button"
          value="Buscar productos"
          onClick={() => this.buscarProductos()}
        />

        <div className="ListaProductos">
          {this.state.productos.map((cont, index) => 
            <div className="Productos">
              Nombre: {cont.nombre} <br />
              Descripción: {cont.descripcion} <br />
              Precio: {cont.precio} <br />
              Categoria: {cont.categoria} <br /> <br />
              <img src={cont.imagen_url} alt="" className="Imagen" />
            </div>
          )}
        </div>
      </div>
    )
  }
}