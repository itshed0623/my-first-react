import { useState, useEffect } from 'react';





function Content() {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        fetch('http://localhost:8081/api/sample') //to get the raw data coming from our server (json)
            .then((response) => response.json() )  //turn json into a readable array
            .then((data) => {
                console.log(data);
                setProducts(data);
            })
            .catch((error) => { console.log(error) })
    }, []);
        
    return (
        <div className='text-center'>
            <h1>This are the products</h1>
                <ul>
            {products.map((data) => (
                    <li>{ data.name }</li>
            ))}
            </ul>
            <div className='d-flex justify-content-center'>
                <table>
                    <tr>
                        <th>id</th>
                        <th>Name</th>
                    </tr>
                    {products.map((data) => (
                        <tr>
                            
                            <td>{data.id}</td>
                            <td>{data.name}</td>
                        </tr>
                    ))}
                        
                </table>
            </div>
            
        </div>
    );

}

export default Content;