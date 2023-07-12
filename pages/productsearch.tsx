import React, { useState } from 'react'

export default function productsearch({}) {
    const [prodsearch, setProdsearch] = useState([]);
    let [searchkey, setSearchkey] = useState("");
  
    const getProdsearch = async (event: any) => {
        event.preventDefault();                  
        let response = await fetch(`http://localhost:3000/api/product/search?search=${searchkey}`);
        let data = await response.json();     
        setProdsearch(data.product);            
        }
     
  return (
    <div className="container mb-4">
        <h2>Search Product</h2>

        <form className="row g-3" onSubmit={getProdsearch} autoComplete='off'>
            <div className="col-auto">
              <input type="text" required className="form-control-sm" value={searchkey} onChange={e => setSearchkey(e.target.value)} placeholder="enter Product keyword"/>
            </div>
            <div className="col-auto">
              <button type="submit" className="btn btn-primary btn-sm mb-3">search</button>
            </div>
        </form>
        
        <div className="card-group mb-4">
        {prodsearch.map((item) => {
                return (
                  <div className="card">
                    <img src={item['prod_pic']} className="card-img-top product-size" alt="..."/>
                    <div className="card-body">
                      <h5 className="card-title">Descriptions</h5>
                      <p className="card-text">{item['descriptions']}</p>
                    </div>
                    <div className="card-footer">
                      <p className="card-text text-danger"><span className="text-dark">PRICE :</span>&nbsp;<strong>
                        &#8369;{item['sell_price']}</strong></p>
                    </div>   
                  </div>
                );
        })}
        </div>    
      
    </div>
  )
}
