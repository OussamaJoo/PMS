import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';


const TestForm = (props) => {
    const { commande } = props.location.state;

    return(
            <div>
                {JSON.stringify(commande)}
            </div>
        );

};



export default TestForm;