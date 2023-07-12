import { useEffect, useState } from 'react'

export default function productlist({}) {

    let [page, setPage] = useState(1);
    let [products, setProducts] = useState([]);
    let [totpage, setTotpage] = useState(null);

    const fetchProducts = async (pg: any) => {
       let response = await fetch(`http://localhost:3000/api/product/list?page=${page}`);
       let data = await response.json();
       console.log(data);
       setProducts(data.products);
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
        if (page === totpage) {
          page = totpage;
        }
        setPage(page);
        fetchProducts(page);
        return;    
      }

    return(
    <div className="container">
            <h1>Product Page</h1>

            <table className="table">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Descriptions</th>
                <th scope="col">Qty</th>
                <th scope="col">Unit</th>
                <th scope="col">Price</th>
                </tr>
            </thead>
            <tbody>

            {products.map((item) => {
            return (
              <tr>
                 <td>{String(item['id']).substring(20,24)}</td>
                 <td>{item['descriptions']}</td>
                 <td>{item['qty']}</td>
                 <td>{item['unit']}</td>
                 <td>&#8369;{item['sell_price']}</td>
               </tr>
              );
        })}


            </tbody>
            </table>

            <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item"><a onClick={lastPage} className="page-link" href="/#">Last</a></li>
          <li className="page-item"><a onClick={prevPage} className="page-link" href="/#">Previous</a></li>
          <li className="page-item"><a onClick={nextPage} className="page-link" href="/#">Next</a></li>
          <li className="page-item"><a onClick={firstPage} className="page-link" href="/#">First</a></li>
          <li className="page-item page-link text-danger">Page&nbsp;{page} of&nbsp;{totpage}</li>

        </ul>
      </nav>

  </div>
  )
}