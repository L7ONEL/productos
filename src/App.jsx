import { Component } from "react";
import axios from 'axios';
import Categorias from './componentes/Categorias';
import Boton from './componentes/Boton';
import Productos from "./componentes/Productos";
import './App.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categorias: [],
      productos: [],
      categoria_id: 0,
      error: ""
    };
  }

  componentDidMount() {
    this.buscarCategorias();
  }

  buscarCategorias() {
    const url = "https://productos.ctpoba.edu.ar/api/categorias";
    axios.get(url)
      .then((response) => {
        this.setState({ categorias: response.data.categorias });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  buscarProductos = (categoria_id) => {
    this.setState({ productos: [], error: "" });
    const url = "https://productos.ctpoba.edu.ar/api/productos";
    const config = {
      params: { categoria_id }
    };

    axios.get(url, config)
      .then((response) => {
        if (response.data.productos.length > 0) {
          this.setState({ productos: response.data.productos });
        } else {
          this.setState({ error: "No hay productos disponibles en esta categoría." });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  actualizarCategoria = (categoria_id) => {
    this.setState({ categoria_id });
  }

  render() {
    return (
      <div className="Cuerpo">
        <Categorias
          categorias={this.state.categorias}
          valor={this.state.categoria_id}
          actualizarCategoria={this.actualizarCategoria}
          buscarProductos={this.buscarProductos}
        />

        <br /><br />

        <Boton 
          accion={() => this.buscarProductos(this.state.categoria_id)} 
        />

        <Productos 
          productos={this.state.productos}
          error={this.state.error}
        />
      </div>
    );
  }
}
