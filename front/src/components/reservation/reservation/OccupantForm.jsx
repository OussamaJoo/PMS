import React, { useState } from 'react';
import Button from '@mui/material/Button';

const OccupantForm = ({ roomType, capacity , qte ,id,setlistOccupants}) => {
  const [occupants, setOccupants] = useState([]);
  const [resa,setresa] = useState({
    lignesCommande: [
            
    ],
  })
  

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const newOccupants = [...occupants];
    newOccupants[index] = {
      ...newOccupants[index],
      [name]: value
    };
    setOccupants(newOccupants);
    setlistOccupants(newOccupants)
  };

  
  

  const addOccupant = () => {
    setOccupants([...occupants, {}]);
  };

  const removeOccupant = (index) => {
    const newOccupants = [...occupants];
    newOccupants.splice(index, 1);
    setOccupants(newOccupants);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   
    setlistOccupants(occupants)

  
  };

  const commande = JSON.parse(localStorage.getItem('commande'))



    const [cmd, setcmd] = useState(

        commande




    )

  return (
    <div>
      <hr></hr>
      <h3>Occupant(s) de typologie : {roomType}</h3>
      {occupants.map((occupant, index) => (
        <div >
        <div key={index} className='row'>
          <div key={index} className="col-4">
        <label htmlFor={`nom-${index}`}>CIN</label>
          <input
            className="form-control form-control-border"
            type="text"
            id={`cin-${index}`}
            name="cin"
            value={occupant.cin || ''}
            onChange={(e) => handleInputChange(index, e)}
          />
          </div>
          <div key={index} className="col-4">
          
          <label htmlFor={`nom-${index}`}>Nom</label>
          <input
            className="form-control form-control-border"
            type="text"
            id={`nom-${index}`}
            name="nom"
            value={occupant.nom || ''}
            onChange={(e) => handleInputChange(index, e)}
          />
          </div>
      
          <div key={index} className='col-4'>
           <label htmlFor={`prenom-${index}`}>Prenom</label>
          <input
            className="form-control form-control-border"
            type="text"
            id={`prenom-${index}`}
            name="prenom"
            value={occupant.prenom || ''}
            onChange={(e) => handleInputChange(index, e)}
          />
          </div>
          </div>
          <br></br>
          <div key={index} className='row'>
          <div key={index} className='col-4'>
          <label htmlFor={`naissance-${index}`}>Date Naissance</label>
          <input
            className="form-control form-control-border"
            type="text"
            id={`naissance-${index}`}
            name="naissance"
            value={occupant.naissance || ''}
            onChange={(e) => handleInputChange(index, e)}
          />
          </div>
   
         
          <div key={index} className='col-4'>
           <label htmlFor={`tel-${index}`}>Telephone</label>
          <input
            className="form-control form-control-border"
            type="text"
            id={`tel-${index}`}
            name="tel"
            value={occupant.tel || ''}
            onChange={(e) => handleInputChange(index, e)}
          />
          </div>
          <div key={index} className='col-4'>
          <label htmlFor={`tel-${index}`}>Email</label>
          <input
            className="form-control form-control-border"
            type="text"
            id={`email-${index}`}
            name="email"
            value={occupant.email || ''}
            onChange={(e) => handleInputChange(index, e)}
          />
          <br></br>
          <button type="button" className='btn bg-red' onClick={() => removeOccupant(index)}>
            Remove Occupant
          </button>
      
        </div>
        </div>
        <hr></hr>
        </div>
      ))}
      {occupants.length < capacity * qte && (
        <button type="button" className='btn bg-olive' onClick={addOccupant}>
          Add Occupant
        </button>
      )}  
      

     
      
    </div>

  
 
    
  );
  
 
};

export default OccupantForm;