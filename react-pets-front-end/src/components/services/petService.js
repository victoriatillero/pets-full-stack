const BASE_URL =`${import.meta.env.VITE_BACK_END_SERVER_URL}/pets`;

const index = async () => {
    try {
    const res = await fetch(BASE_URL)
    return res.json()
    } catch (err){
    console.log(err)
    }
};
  console.log("BASE_URL:", BASE_URL)
const create = async (formData) => {
  try {
    const res = await fetch(BASE_URL,{
      method:'POST',
      headers: { 'content-type':'application/json'},
      body: JSON.stringify(formData),
    })
    return res.json()
  } catch (err) {
    console.log(err)
  }y
}
const update = async (formData, petId) => {
  try {
    const res = await fetch(`${BASE_URL}/${petId}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json'
      },
      body:JSON.stringify(formData)
    })
    return res.json()
  } catch (error) {
    console.log(error)
  }
}
const deletePet = async (petId) => {
try {
  const res = await fetch(`${BASE_URL}/${petId}`, {
    method: "DELETE",
    headers:{
    'content-type': 'application/json'
  },
    })
    return res.json()
} catch (error) {
  console.log(error)
}
}
export {
    index, create, update, deletePet
}
