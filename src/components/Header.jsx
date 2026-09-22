import { useState, useEffect } from 'react';

function Header({ onLogout, userName }) {

    const [text, setText] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/api/product')
            .then((response) => response.json())
            .then((text) => {
                setText(text);
            })
            .catch((error) => console.log('Fetch error, ', error));
    }, []);


    

    return (
        <header className="bg-primary text-white text-center py-4 mb-4">
            <h1 className="fw-bold">Developer Profile -- {userName}</h1>
            {/* {text.map((text) => (
            <p key={text.id} className="mb-0">Built with React & Bootstrap 5 {text.name}</p>
            ))}             */}
            <p key={text.id} className="mb-0">Built with React & Bootstrap 5 </p>

            <div className="d-flex justify-content-end me-3">
                <button className="btn btn-danger" onClick={onLogout}>Sign Out</button>
            </div>

        </header>
    );
}

export default Header;