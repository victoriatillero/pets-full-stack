import './App.css'
import * as petService from './components/services/petService'
import PetList from './components/PetList/PetList'
import PetDetail from './components/PetDetail/PetDetail'
import PetForm from './components/PetForm/PetForm'

import { useState, useEffect } from 'react'

function App() {
  const [pets, setPets] = useState([])
  const [selected, setSelected] = useState(null)
  const [isFormOpen, setIsFormOpen] = useState(false)

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const fetchedPets = await petService.index()
        console.log('fetchedPets:', fetchedPets)
        if (fetchedPets.err) {
          throw new Error(fetchedPets.err)
        }
        setPets(fetchedPets)
      } catch (err) {
        console.log(err)
      }
    }

    fetchPets()
  }, [])
  const handleSelect = (pet) => {
    setSelected(pet)
    setIsFormOpen(false)
  }

  const handleFormView = (pet) => {
    if(!pet._id)setSelected(null)

    setIsFormOpen(!isFormOpen)
  }
  const handleAddPet = async (formData) => {
    try {
      const newPet = await petService.create(formData)
      if(newPet.err) {
        throw new Error(newPet.err)
      }
      setPets([newPet,...pets])
      setIsFormOpen(false)
    } catch (err) {
      console.log("error:", err)
    }
  }
  const handleUpdatePet = async (formData, petId) => {
    try {
      const updatedPet = await petService.update(formData,petId)
      console.log(updatedPet)
      if (updatedPet.error) {
        throw new Error(updatedPet.err)
      }
      const updatedPetList = pets.map((pet) => (
        pet._id !==updatedPet._id ? pet: updatedPet
      ))
      setPets(updatedPetList)
      setSelected(updatedPet)
      setIsFormOpen(false)
    } catch (err) {
      console.log(err)

    }
  }
const handleDeletePet =  async (petId) => {
  try {
    const deletedPet = await petService.deletePet(petId)
    if(deletedPet.err) {
      throw new Error(deletedPet.err)
    }
    setPets(pets.filter((pet)=> pet._id !==deletedPet._id))
    setSelected(null)
    setIsFormOpen(false)
  } catch (error) {
    console.log(error)
  }

}
  return (
    <>
      <PetList pets={pets} handleSelect={handleSelect} handleFormView={handleFormView} isFormOpen={isFormOpen} />
      {isFormOpen ? (
        <PetForm handleAddPet={handleAddPet} selected={selected} handleUpdatePet={handleUpdatePet}/>
      ) : (
        <PetDetail selected={selected} handleFormView={handleFormView} handleDeletePet={handleDeletePet}/>
      )}
    </>
  )
}

export default App
