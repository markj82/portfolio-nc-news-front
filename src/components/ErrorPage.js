import React from 'react';

const ErrorPage = (props) => {
    
    const { status } = props.details.response;
    let message = ''
    
        if (status === 400) {
            message = '400: bad request'
        } else if (status === 404) {
            message = '404: not found'
        }

    return (
        <div className="main-error">
            <h5>Something went wrong</h5>
            <p>{message}</p>
        </div>
     );
}
 
export default ErrorPage;