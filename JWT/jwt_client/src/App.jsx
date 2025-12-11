import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [loginUsername, setLoginUsername] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [registerUsername, setRegisterUsername] = useState('')
  const [registerPassword, setRegisterPassword] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [food, setFood] = useState([])
  const [updatefood, setUpdateFood] = useState(null)
  const [foodName, setFoodName] = useState('')
  const [daysSinceIAte, setDaysSinceIAte] = useState('')


  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      fetchFoodItems();   // no args
    }
  }, []);


  const fetchFoodItems = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const response = await axios.get('http://localhost:5000/api/readfood', {
        headers: { Authorization: `Bearer ${token}` }
      });

      setFood(response.data);
    } catch (error) {
      console.error('Error fetching food items:', error);
    }
  }


  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/register', {
        username: registerUsername,
        password: registerPassword
      });

      localStorage.setItem('token', response.data.token);
      setIsLoggedIn(true);
      fetchFoodItems();    
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };


  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        username: loginUsername,
        password: loginPassword
      });

      localStorage.setItem('token', response.data.token);
      setIsLoggedIn(true);
      fetchFoodItems();  

    } catch (error) {
      console.error('Login failed:', error);
    }
  };


  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setFood([]);
  };


  const handleAddFood = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');

      await axios.post(
        'http://localhost:5000/api/food',
        { name: foodName, daysSinceIAte },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setFoodName('');
      setDaysSinceIAte('');
      setUpdateFood(null);

      fetchFoodItems();
    } catch (error) {
      console.error('Adding food item failed:', error);
    }
  };


  const handleUpdateFood = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');

      await axios.put(
        `http://localhost:5000/api/updatefood/${updatefood._id}`,
        { name: updatefood.name, daysSinceIAte: updatefood.daysSinceIAte },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setUpdateFood(null);
      fetchFoodItems();

    } catch (error) {
      console.error('Updating food item failed:', error);
    }
  };


  const handleDeleteFood = async (id) => {
    try {
      const token = localStorage.getItem('token');

      await axios.delete(
        `http://localhost:5000/api/deletefood/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      fetchFoodItems();

    } catch (error) {
      console.error('Deleting food item failed:', error);
    }
  };


  // ============================ UI ============================

  if (isLoggedIn) {
    return (
      <div className="App">
        <h2>Food Tracker</h2>
        <button onClick={handleLogout}>Logout</button>

        <h2>Add new Food</h2>

        <form onSubmit={handleAddFood}>
          <input type="text" placeholder="Food Name" value={foodName}
            onChange={(e) => setFoodName(e.target.value)} required />
          <input type="number" placeholder="Days Since I Ate"
            value={daysSinceIAte}
            onChange={(e) => setDaysSinceIAte(e.target.value)} required />
          <button type="submit">Add Food</button>
        </form>

        <h2>Your Foods</h2>
        <ul>
          {food.map((food) => (
            <li key={food._id}>
              {food.name} - {food.daysSinceIAte} days ago
              <button onClick={() => setUpdateFood(food)}>Update</button>
              <button onClick={() => handleDeleteFood(food._id)}>Delete</button>
            </li>
          ))}
        </ul>

        {updatefood && (
          <div>
            <h2>Update Food</h2>
            <form onSubmit={handleUpdateFood}>
              <input type="text"
                value={updatefood.name}
                onChange={(e) => setUpdateFood({ ...updatefood, name: e.target.value })}
                required />

              <input type="number"
                value={updatefood.daysSinceIAte}
                onChange={(e) => setUpdateFood({ ...updatefood, daysSinceIAte: e.target.value })}
                required />

              <button type="submit">Update Food</button>
            </form>
          </div>
        )}
      </div>
    )
  }


  return (
    <>
      <div>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input type="text" placeholder="Username"
            value={loginUsername} onChange={(e) => setLoginUsername(e.target.value)} required />

          <input type="password" placeholder="Password"
            value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} required />

          <button type="submit">Login</button>
        </form>

        <h2>Register</h2>
        <form onSubmit={handleRegister}>
          <input type="text" placeholder="Username"
            value={registerUsername} onChange={(e) => setRegisterUsername(e.target.value)} required />

          <input type="password" placeholder="Password"
            value={registerPassword} onChange={(e) => setRegisterPassword(e.target.value)} required />

          <button type="submit">Register</button>
        </form>
      </div>
    </>
  )
}

export default App;
