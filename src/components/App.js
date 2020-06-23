import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  onChangeType = (e) => {
    this.setState({
      filters: {
        type: e.target.value
      }
    })
  }

  onFindPetsClick = () => {
    if (this.state.filters.type !== 'all') {
    fetch(`/api/pets?type=${this.state.filters.type}`)
    .then(res => res.json())
    .then(data => this.setState({
      pets: data
    }))
    } else {
      fetch('/api/pets')
    .then(res => res.json())
    .then(data => this.setState({
      pets: data
    }))
    }
  }

  onAdoptPet = (e, id) => {
    let updatedPet = this.state.pets.find(pet => pet.id === id)
    let index = this.state.pets.indexOf(updatedPet)
    updatedPet.isAdopted = true;
    let newPets = this.state.pets
    newPets[index] = updatedPet
    this.setState({pets: newPets})

  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.onChangeType} onFindPetsClick={this.onFindPetsClick} />
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.onAdoptPet} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
