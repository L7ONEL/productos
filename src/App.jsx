import { Component } from "react";
import axios from 'axios';
import './App.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categorias: [],
      productos: [],
      categoria_id: ""
    }
  }

  componentDidMount() {
    this.buscarCategorias();
  }

  buscarCategorias() {
    const url = "http://10.0.4.103:3000/api/categorias" 
    axios.get(url)
    .then((Response) => {
      this.setState({categorias: Response.data.categorias})
    })
    .catch((error) => {
      console.log(error);
    })
  }

  buscarProductos(categoria_id) {
    this.state.productos = []
    const url = "http://10.0.4.103:3000/api/productos"
    const config = {
      params: {categoria_id}
    }

    axios.get(url, config)
    .then((Response) => {
      this.setState({productos: Response.data.productos})
    })
    .catch((error) => {
      console.log(error);
    })
  }

  render() {
    return(
      <div className="Cuerpo">
        <select
          value={this.state.cat_id}
          onChange={(e) => this.setState({categoria_id:e.target.value})}
        >
          {this.state.categorias.map((cont, index) =>
            <option 
              key={cont.id}
              value={cont.id}
              onChange={(e) => this.setState({categoria_id:e.target.value})}
            >{cont.nombre}</option>
          )}
        </select>
        <br /><br />
        <input 
          type="button"
          value="Buscar productos"
          onClick={() => this.buscarProductos(this.state.categoria_id)}
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