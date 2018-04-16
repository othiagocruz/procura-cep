import React, { Component } from 'react';
import InputMask from 'react-input-mask';

import './App.css';

let _input;

class App extends Component {

  state = {
    cep: '',
    loading: false
  }

  render() {
    const { cep, logradouro, complemento, bairro, localidade, uf } = this.state

    const parseJson = response => {
      const obj = JSON.parse(response)

      if(obj.erro) {
        alert('CEP não encontrado.')
      }

      this.setState({...obj, loading: !!obj.erro})
    }

    const handleSubmit = e => {
      e.preventDefault();

      if(_input.value.replace(/_/gi, '').length < 9) {
        alert('Preencha o CEP corretamente.')
        return
      }

      this.setState({cep: '', loading: true}, () =>
        fetch(`https://viacep.com.br/ws/${_input.value.replace(/-/, '')}/json/`)
          .then(response => response.text())
          .then(parseJson)
          .catch(ex => console.error('fetch error', ex))
      )
    }

    return (
      <div className="App">
        <header>
          <h1>Consulta de endereço</h1>
        </header>
        <form onSubmit={handleSubmit}>
          <h2>Consultar</h2>
          <label htmlFor="cep">CEP</label>
          <InputMask inputRef={node => _input = node} mask="99999-999" maskChar="_" placeholder="Preencha o CEP" />
          <button>Buscar</button>
        </form>
        {cep && (
          <section className="result">
            <h3>{logradouro} {complemento} <button onClick={() => this.setState({cep: ''})}>&times;</button></h3>
            <p>{bairro}</p>
            <p>{localidade} - {uf}</p>
            <p>{cep}</p>
            <iframe src={`http://maps.google.com/maps?q=${cep}&z=15&output=embed`} width="100%" height="370" title="mapa" frameBorder="0"></iframe>
          </section>
        )}
      </div>
    );
  }
}

export default App;
