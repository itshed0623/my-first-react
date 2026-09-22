import { onLog } from "firebase/app";
import {useState, useEffect} from 'react'


export default function Student() {
    const [ product, setProduct ] = useState([]);
    const [ name, setName ] = useState('');
    const [ price, setPrice ] = useState('');
    const product_url = 'http://localhost:8080/api/product';

    useEffect(() => {
        fetch(product_url)
            .then((response) => response.json())
            .then((data) => {
                setProduct(data);
                console.log(data)   
            })
            .catch((err)=> console.log('Error in', err))
    }, []);
    
    async function submitName(e) {
        e.preventDefault();
        try {
            const response = await fetch(product_url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                price: price
            })
            })

            const data = await response.json();

            setProduct((prod)=> [...prod, data])
        }
        catch (err) {
            console.log(err);
        }
        
    }
    return (
        <>
            <h1>Studsvfevbefvent</h1>
            <form onSubmit={submitName}>
                <label htmlFor="firstName">First Name</label>
                <input type="text" name="firstName" id="firstName" onChange={(e)=> setName(e.target.value)} />

                <label htmlFor="lastName">Last Name</label>
                <input type="number" name="lastName" id="lastName" onChange={(e)=> setPrice(e.target.value)}/>

                <input type="submit" />

            </form>
            <table>
                <tr>
                    <td>name</td>
                    <td>price</td>
                </tr>
                {
                    product.map((products) => (
                        <tr>
                            <td>{ products.name }</td>
                            <td>{ products.price }</td>
                        </tr>
                    ))
                }
            </table>
        </>
    );
}