import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from "react"
import axios from "axios"


const App = () => {

  const [newMake, setNewMake] = useState("")
  const [newModel, setNewModel] = useState("")
  const [newColor, setNewColor] = useState("")
  const [newYear, setNewYear] = useState("")
  const [newDoors, setNewDoors] = useState("")
  const [newImage, setNewImage] = useState("")
  const [newOnSale, setNewOnSale] = useState(true)
  const [cars, setCars] = useState([])

  useEffect(() => {
    axios
      .get("http://localhost:3000/cars")
      .then((response) => {
        setCars(response.data)
      })
  }, [])

  const handleNewMake = (event) => {
    setNewMake(event.target.value)
  }

  const handleNewModel = (event) => {
    setNewModel(event.target.value)
  }

  const handleNewColor = (event) => {
    setNewColor(event.target.value)
  }

  const handleNewYear = (event) => {
    setNewYear(event.target.value)
  }

  const handleNewDoors = (event) => {
    setNewDoors(event.target.value)
  }

  const handleNewImage = (event) => {
    setNewImage(event.target.value)
  }

  const handleNewOnSale = (event) => {
    setNewOnSale(event.target.checked)
  }

  const handleNewCarFormSubmit = (event) => {
    event.preventDefault()
    axios.post(
      "http://localhost:3000/cars",
      {
        make: newMake,
        model: newModel,
        image: newImage,
        color: newColor,
        year: newYear,
        doors: newDoors,
        onSale: newOnSale
      }
    ).then(() => {
      axios
      .get("http://localhost:3000/cars")
      .then((response) => {
        setCars(response.data)
      })
    })
  }

  const handleDelete = (carsData) => {
    axios
      .delete(`http://localhost:3000/cars/${carsData._id}`)
      .then(() => {
        axios
          .get("http://localhost:3000/cars")
          .then((response) => {
            setCars(response.data)
          })
      })
  }

  const handleCarEdit = (carsData) => {
    axios.put(
      `http://localhost:3000/cars/${carsData._id}`,
      {
        make: newMake,
        model: newModel,
        image: newImage,
        color: newColor,
        year: newYear,
        doors: newDoors,
        onSale: newOnSale
      }
    ).then(() => {
        axios
          .get("http://localhost:3000/cars")
          .then((response) => {
            setCars(response.data)
          })
    })
  }


  return(
    <>
      <h1>CARS</h1>
      <form onSubmit={handleNewCarFormSubmit}>
        Make: <input type="text" onChange={handleNewMake}/><br/>
        Model: <input type="text" onChange={handleNewModel}/><br/>
        Image: <input type="text" onChange={handleNewImage}/><br/>
        Color: <input type="text" onChange={handleNewColor}/><br/>
        Year: <input type="text" onChange={handleNewYear}/><br/>
        Doors: <input type="text" onChange={handleNewDoors}/><br/>
        <input type="submit" value="New Car"/>
      </form>
      <div className="main">
      {
        cars.map((car) => {
          return<>
            <div className="container">
              <h2>{car.make}</h2>
              <h3>{car.model}</h3>
              <img src={car.image} />
              <li>Color: {car.color}</li>
              <li>Year: {car.year}</li>
              <li>Doors: {car.doors}</li>
              <li> On Sale:<input type="checkbox" onChange={car.onSale}/></li>
              <li><button onClick={() =>
                {handleDelete(car)}}>SOLD!</button></li><br/>
              <summary>
                <details>
                <form onSubmit={(event) => {handleCarEdit(car)}}>
                  Make: <input type="text" name="make" onChange={handleNewMake}/><br/>
                  Model: <input type="text" name="model" onChange={handleNewModel}/><br/>
                  Image: <input type="text" name="image" onChange={handleNewImage}/><br/>
                  Color: <input type="text" name="color" onChange={handleNewColor}/><br/>
                  Year: <input type="text" name="year" onChange={handleNewYear}/><br/>
                  Doors: <input type="text" name="doors" onChange={handleNewDoors}/><br/>
                  <input type="submit" value="Edit Car"/>
                </form>
                </details>
              </summary>
            </div>

          </>
        })
      }
      </div> 
    </>
  )


}

export default App;
