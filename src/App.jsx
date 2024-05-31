import { Component } from "react";
import axios from 'axios';
// import Categorias from './componentes/Categorias'
import Boton from './componentes/Boton'
// import Productos from './componentes/Productos'
import './App.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categorias: [],
      productos: [],
      categoria_id: 1,
      error: ""
    }
  }

  componentDidMount() {
    this.buscarCategorias();
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

  buscarProductos(categoria_id) {
    this.state.productos = []
    this.state.error = ""
    const url = "https://productos.ctpoba.edu.ar/api/productos"
    const config = {
      params: {categoria_id}
    }

    axios.get(url, config)
    .then((Response) => {
      if (Response.data.productos != "") {
        this.setState({productos: Response.data.productos})
      } else {
        this.setState({error: "No hay productos disponibles en esta categoria."})
      }
      
    })
    .catch((error) => {
      console.log(error);
    })
  }

  render() {
    return(
      <div className="Cuerpo">
        <select
          className="styled-select"
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

        <Boton 
          accion={()=> this.buscarProductos(this.state.categoria_id)} 
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
          <h2 className="Error">{this.state.error}</h2>
        </div>
      </div>
    )
  }
}