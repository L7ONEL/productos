import { Component } from 'react'

export default class Productos extends Component {
  render() {
    return (
        <div className="ListaProductos">
            {this.props.productos.map((cont, index) => 
            <div key={index} className="Productos">
                Nombre: {cont.nombre} <br />
                Descripción: {cont.descripcion} <br />
                Precio: {cont.precio} <br />
                Categoria: {cont.categoria} <br /> <br />
                <img src={cont.imagen_url} alt="ERROR" className="Imagen" />
            </div>
            )}

            <h2 className="Error">{this.props.error}</h2>
        </div>
    )
  }
}
