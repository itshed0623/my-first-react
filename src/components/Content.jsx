import reactLogo from '../assets/react.svg';

export default function Content() {
    // const food = 'Burger';
    // const food2 = 'Pizza';
    let food = ['Burger', 'Pizza'];


    return (
        <div className='d-flex justify-content-center pb-3'>
            <div className="card shadow-sm border-1" style={{ width: '18rem' }}>
                <div className="card-body text-center p-4">
                    <div className='d-flex justify-content-center'>
                        <div className="bg-primary text-white d-flex align-items-center justify-content-center mb-3 " style={{width: '50px', height: '50px'}} >
                            HM
                        </div>        
                    </div>

                    <h5 className="card-title fw-bold text-dark mb-1">Hedrian Mendoza</h5>
                    <p className="text-muted small mb-3">Frontend Developer</p>
                    
                   
                    <ul className='text-start'>
                        <li>React</li>
                        <li>Bootstrap</li>
                        <li>CSS</li>
                    </ul>

                    {/* Status Badge */}
                    <p className="card-text mb-3">
                    <div className="text-white px-1 bg-success">Available for Hire</div>
                    </p>

                    {/* Action Button */}
                    <button className="btn btn-outline-primary btn-sm w-100">
                    View Profile
                    </button>
                </div>
            </div>
        </div>
        
    );
}
