import {useState} from 'react';


// function handleSubmit(e) {
//     e.preventDefault();
//     console.log(document.getElementById('name').value);
//     // async (e) => {
//     //     await fetch('http://localhost:8080', {
//     //         method: 'POST',
//     //         headers: {
//     //             'Content-Type': 'application/json'
//     //         },
//     //     });

//     // }
// }




function Body() {

    const [name, setName] = useState('');
    
    async function handleSubmit(e) {
        e.preventDefault();

        const response = await fetch('http://localhost:8080/api/store', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: name})
        }, [])
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name</label>
                <input type="text" name="name" id="name" onChange={(e) => setName(e.target.value)} />

                 <label htmlFor="name">Price</label>
                <input type="number" name="price" id="price" />
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
}

export default Body;