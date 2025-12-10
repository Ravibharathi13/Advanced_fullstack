import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'


function App() {
  const [foodname, setFoodname] = useState("")
  const[days, setDays] = useState("")
  const[newFoodnames, setNewFoodnames] = useState({})
  const[foodList, setFoodList] = useState([])


  useEffect(() => {
    axios.get("http://localhost:3000/read").then((response) => {
      setFoodList(response.data)
    }).catch((error) => {
      console.error("Error fetching food list:", error);
    });
  },[])


  const addToList = () => {
    axios.post("http://localhost:3000/insert", {
      foodname: foodname,
      days: days
    }).then(() => {
      // Refresh the list after adding
      axios.get("http://localhost:3000/read").then((response) => {
        setFoodList(response.data);
      });
    }).catch((error) => {
      console.error("Error adding food item:", error);
    });
  }

  const updateFood = (id) => {
    axios.put("http://localhost:3000/update", {
      id: id,
      newFoodname: newFoodnames[id]
    }).then(() => {
      // Refresh the list after updating
      axios.get("http://localhost:3000/read").then((response) => {
        setFoodList(response.data);
      });
    }).catch((error) => {
      console.error("Error updating food item:", error);
    });
  }

  const deleteFood = (id) => {
    axios.delete(`http://localhost:3000/delete/${id}`)
      .then(() => {
        // Refresh the list after deleting
        axios.get("http://localhost:3000/read").then((response) => {
          setFoodList(response.data);
        });
      });
  }

  return (
    <>
      <div className='App'>
        <label>Food Name:</label>
        <input type="text" onChange={(event) => {
          setFoodname(event.target.value)
        }}/>
        <label>Days Since You Ate It:</label>
        <input type="number" onChange={(event) => {
          setDays(event.target.value)
        }}/>
        <button onClick={addToList}>Add to List</button>
        
        <h1>Food List</h1>
        {foodList.map((val, key) => {
          return (
            <div key={key} className="food">
              <h2>{val.foodname}</h2>
              <h3>Days since you ate it: {val.days}</h3>
              <input type="text" placeholder='New Food Name...' onChange={(event) => {
                setNewFoodnames({...newFoodnames, [val._id]: event.target.value})
              }}/>
              <button onClick={() => updateFood(val._id)}>Update</button>
              <button onClick={() => deleteFood(val._id)}>Delete</button>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default App
