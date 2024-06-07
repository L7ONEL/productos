import React, { Component } from 'react';

export default class Categorias extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoria_id: this.props.valor
    };
  }

  cambiar = (e) => {
    const nuevaCategoria = Number(e.target.value);
    this.setState({ categoria_id: nuevaCategoria }, () => {
      this.props.actualizarCategoria(this.state.categoria_id);
    });
  }
  
  render() {
    return (
      <select
        className='styled-select'
        value={this.state.categoria_id}
        onChange={this.cambiar}
      >
        {this.props.categorias.map((cont) =>
          <option 
            key={cont.id}
            value={cont.id}
          >
            {cont.nombre}
          </option>
        )}
      </select>
    );
  }
}
