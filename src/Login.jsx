function Login({onLogin}) {
    return (
        <div className="d-flex align-items-center justify-content-center" style={{height: '700px'}}>
            <div class="text-center d-flex justify-content-center align-items-center" style={{ width: '100 %', height: '500px'}}>
                <div class="card py-5 bg-light shadow-lg mx-4" style={{width: '500px'}}>
                    <h1 class="card-title text-secondary fw-bold text-uppercase justify-content-center">
                        <img style={{width: '50px', borderRadius: '50%'}} class="mx-2" alt=""/>Hello,
                        Bootstrap 5!
                    </h1>
                    <h6 class="text-secondary text-start ms-3 mt-4">Username</h6>
                    <div class="mx-3">
                        <input class="form-control" type="text"/>
                    </div>
                    <h6 class="text-secondary text-start ms-3 mt-4">Password</h6>
                    <div class="mx-3">
                        <input class="form-control" type="text"/>
                    </div>
                    <div class="pt-2">
                        <button class="btn btn-outline-primary btn-lg px-5 py-2 mx-2">Login</button>
                        <button class="btn btn-outline-danger btn-lg px-5 py-2 mx-2">Cancel</button>
                </div>
                <h6>------- or --------</h6>
                <div className='d-flex justify-content-center my-2'>
                <button type="button" onClick={onLogin} class="btn btn-outline-secondary d-flex align-items-center justify-content-center gap-2 w-75 ">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 48 48">
                    <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"/>
                    <path fill="#FF3D00" d="m6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z"/>
                    <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"/>
                    <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"/>
                    </svg>
                    <span class="fw-medium text-dark">Sign in with Google</span>
                </button>
                </div>
                
                {/* <button onClick={handleLogin}>Sign in with Google</button> */}
            
                </div>
            </div>
        </div>
        
    );
}

export default Login;