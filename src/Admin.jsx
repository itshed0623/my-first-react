import { onLog } from "firebase/app";
import { CallerSdkTypeEnum } from "firebase/data-connect";
import { useState, useEffect } from 'react'


export default function Student() {
    const [product, setProduct] = useState([]);
    const [firstName, setFirstname] = useState('');
    const [lastName, setLastname] = useState('');

    const API_URL = 'http://localhost:8080/api/example';


    useEffect( () => {
        fetch(API_URL)
            .then((response) => response.json())
            .then((data) => {
                setProduct(data);
            })
            .catch((err) => console.log('Error', err))
    }, []);

    async function submitName(e) {

        e.preventDefault();
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    firstName: firstName,
                    lastName: lastName
                })

            });

            const data = await response.json();
            setProduct((prevProducts) => [...prevProducts, data]);

        }
        catch (err){
            console.log(err);
        }

    }
    return (
        <>
            <h1>Admin</h1>
            
            <form onSubmit={submitName}>
                <label htmlFor="firstName">First Name</label>
                <input type="text" name="firstName" id="firstName" onChange={(e)=> setFirstname(e.target.value)} />

                <label htmlFor="lastName">Last Name</label>
                <input type="text" name="lastName" id="lastName" onChange={(e)=> setLastname(e.target.value)}/>

                <input type="submit" />

            </form>

            <table>
                <tr>
                    <td>First Name</td>
                    <td>Last Name</td>
                </tr>    
                {
                    product.map((products) => (
                        <tr>
                            <td>{ products.firstName }</td>
                            <td>{ products.lastName }</td>
                        </tr>   
                    ))
                }
                    
            </table>
        </>
    );
}