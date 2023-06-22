import React from 'react';
import OccupantForm from './OccupantForm';

const RoomSelection = () => {
  const roomTypes = [
    { type: 'Single Room', capacity: 1 },
    { type: 'Double Room', capacity: 2 },
    { type: 'Family Room', capacity: 4 }
  ];

  return (
    <div>
      <h2>Room Selection</h2>
      {roomTypes.map((roomType, index) => (
        <OccupantForm
          key={index}
          roomType={roomType.type}
          capacity={roomType.capacity}
          qte={2}
        />
      ))}
    </div>
  );
};

export default RoomSelection;