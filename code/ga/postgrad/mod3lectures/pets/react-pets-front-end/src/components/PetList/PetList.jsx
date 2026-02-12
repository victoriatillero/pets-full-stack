const PetList = (props) => {
    return (
        <>
            <h1>Pet List</h1>
            <div>
                {!props.pets.length ? (
                    <h2>No pets yet</h2>
                ): (
                <ul>
                    {props.pets.map((pet)=> (
                        <li key ={pet._id} style={{cursor:'pointer', color:'#646CFF'}}onClick={()=>props.handleSelect(pet)}>{pet.name}</li>
                    ))}
                </ul>
                )}
                <button onClick={props.handleFormView}>{props.isFormOpen? 'close form':'New Pet' }</button>
            </div>
        </>
    )
}
export default PetList;
