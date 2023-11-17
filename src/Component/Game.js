import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Game() {
  const [game, setGame] = useState([]);
  const [search, setSearch] = useState([]);
  const [dynamicTitle, setDynamicTitle] = useState('');
  const [inputValue, setInputValue] = useState('');
  const url = 'https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=15';

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => setGame(data))
      .catch((err) => {
        alert(err);
      });
  }, []); 

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    setDynamicTitle(`Your search for "${event.target.value}"`);
  };

  const handleSearch = async (event) => {
    event.preventDefault();

   try {
      const response = await fetch(`https://www.cheapshark.com/api/1.0/games?title=${inputValue}`);
      const data = await response.json();
      setGame(data);
    } catch (err) {
      alert(err);
    }  
    
  };
//console.log(game);


  return (
    <div className="bg-black">
      <nav className="navbar bg-dark bg-gradient">
        <div className="container-fluid">
          <a className="navbar-brand  text-white"><b>Game Store</b></a>
          <form className="d-flex" onSubmit={handleSearch}>
            <input
              className="form-control me-2 bg-dark text-white rounded-5"
              type="search"
              value={inputValue}
              onChange={handleInputChange}
              aria-label="Search"
            />
            <button className="btn btn-light rounded-4" type="submit">
              Search
            </button>
          </form>
        </div>
      </nav>

      <br></br>
      {
  dynamicTitle ? (
    <h1 className="text-center text-white  m-5">Your Search on " {inputValue} "</h1>
  ) : (
    <h1 className="text-center text-white m-5">Check out the latest game deals <br/> exclusively on <b>Game Store</b></h1>
  )
}

      <div className="container">
        <div className="row">
          {game.map((g,n) => {
            const dealID = `https://www.cheapshark.com/redirect?dealID=${g.dealID}`;
            
            return (
              <div key={g.id} className="col-15 col-sm-6 col-md-4 col-lg-4 p-3">
                <div className="card h-100 rounded-5 bg-dark text-white">
                 <a href={dealID ? dealID : `${g.cheapestDealID}`} target="blank" ><img src={g.thumb} className="card-img-top p-3 rounded-5" alt={g.title} /></a>
                  <div className="card-body border border-light-subtle m-3 rounded-5 p-4">
                    <h2 className="card-title">{
                      g.title ? g.title : g.external
                     } 
                     </h2>
                     <br/>
                    <h5 className="opacity-75">
                      { g.dealRating ?  `${g.dealRating} / 10  ( ${g.steamRatingCount} reviews )`  : null }
                    </h5>
                    <h5 className="card-text opacity-75">{g.steamRatingText}</h5>
                    <h4 className="bg-warning  p-3 text-center m-4 rounded-5"><del className = "p-2">  {  g.normalPrice ?  `$ ${ g.normalPrice}` : null}</del>$ {g.salePrice ? g.salePrice : g.cheapest}</h4>
                    
                    <p>{g.savings ?  `You save ${g.savings}` : null }</p>
                    <p>{g.steamAppID ? `Stream App ID : ${g.steamAppID}` : null}</p>
                    <a href={dealID ? dealID : `${g.cheapestDealID}`} target="blank" className="btn btn-secondary rounded-5 p-3 m-3">
                      Buy now
                    </a>
                  </div>
                </div>
              </div>
              );
            }
          )}
        </div>
      </div>
    </div>
  );
}
