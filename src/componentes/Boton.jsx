import { Component } from "react";

export default class Boton extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <input 
                className="Boton"
                type="button"
                value="Buscar Productos"
                onClick={() => this.props.accion()}
            />
        )
    }

}