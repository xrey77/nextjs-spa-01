import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'

export default function productcatalog({}) {

    let [page, setPage] = useState(1);
    let [prods, setProds] = useState([]);
    let [totpage, setTotpage] = useState(null);

    const fetchProducts = async (pg: any) => {
       let response = await fetch(`http://localhost:3000/api/product/list?page=${page}`);
       let data = await response.json();
       setProds(data.products);
       setTotpage(data.totpages);
       setPage(data.page);
    }

    useEffect(() => {
        fetchProducts(page);
    },[]);

    const firstPage = (event: any) => {
        event.preventDefault();    
        page = 1;
        setPage(page);
        fetchProducts(page);
        return;    
      }
    
      const nextPage = (event: any) => {
        event.preventDefault();    
        if (page === totpage) {
            return;
        }
        setPage(page++);
        fetchProducts(page);
        return;
      }
    
      const prevPage = (event: any) => {
        event.preventDefault();    
        if (page === 1) {
          return;
          }
          setPage(page--);
          fetchProducts(page);
          return;    
      }
    
      const lastPage = (event: any) => {
        event.preventDefault();
        page = totpage;
        setPage(page);
        fetchProducts(page);
        return;    
      }


    return(
    <div className="container mb-9">
            <h3 className='text-center'>Product Catalog</h3>

            <div className="card-group mb-3">
            {prods.map((item) => {
                    return (
                    <div className="card">
                        <img src={item['prod_pic']} className="card-img-top" alt=""/>
                        <div className="card-body">
                            <h5 className="card-title">Descriptions</h5>
                            <p className="card-text">{item['descriptions']}</p>
                        </div>
                        <div className="card-footer">
                            <p className="card-text text-danger"><span className="text-dark">PRICE :</span>&nbsp;<strong>&#8369;{item['sell_price']}</strong></p>
                        </div>  
                    </div>
                );
            })}
          </div>    

        <div className='container'>
        <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item"><a onClick={lastPage} className="page-link" href="/#">Last</a></li>
          <li className="page-item"><a onClick={prevPage} className="page-link" href="/#">Previous</a></li>
          <li className="page-item"><a onClick={nextPage} className="page-link" href="/#">Next</a></li>
          <li className="page-item"><a onClick={firstPage} className="page-link" href="/#">First</a></li>
          <li className="page-item page-link text-danger">Page&nbsp;{page} of&nbsp;{totpage}</li>
        </ul>
      </nav>
      <br/><br/>
      </div>


    </div>
    )
}