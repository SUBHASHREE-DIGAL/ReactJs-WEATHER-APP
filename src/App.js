import {React,useState} from 'react';
import './App.css';
import axios from 'axios';
import moment from 'moment';


function App() {
  const[city,setCity]=useState(''); 
  const[data,setData]=useState({
    name:"",
    temp:"",
    main:"",
    description:''
  });


  const[loading,setLoading]=useState(false);

  const handleChange=(e)=>{
      setCity(e.target.value);

};

const handleClick=(e)=>{
e.preventDefault();
  axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=3fe897fd269ef770b3d7f772ced58a27`).then((res)=>{
console.log(res);
setData({
  name:res.data.name,
    temp:(res.data.main.temp-273.15).toFixed(2) ,
    main:res.data.weather[0].main,
    description:res.data.weather[0].description
});
setLoading(true);
}).catch((err)=>{
console.log(err);
})

};


 
  return (
    <div className="App" >
      
      <header className="App-header">
      <h1>
            Welcome To My Weather App
        </h1>

        <h2>{moment().format('ddd')} | {moment().format('LL')}</h2>
        <img src="https://irimiaionut.github.io/Animated-Icons-SVG/resources/weather/cloudy.svg" className="App-logo" alt="logo" />
      
        
        <p>Know about Weather Details Of Your City</p>
        <form>
       
       <div className='input-group'>
       <input className='form-control'
  type='text' 
    placeholder='Search...' value={city} onChange={handleChange}
  /> 
  <button className='btn btn-sm bg-info' type='submit' onClick={handleClick} color='black'>
        Go
      </button>
       </div>
       </form>
        
      
      {
loading && true? <h1>{data.name} | {data.temp}&deg;C, {data.main}</h1> 

: null
      }
        
      </header>
   
      
    </div>
  );
}

export default App;
