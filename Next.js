import { useState } from 'react';
import './styles.css'; // Import the CSS file

export default function Home() {
    const [numGuests, setNumGuests] = useState(0);
    const [guests, setGuests] = useState([]);
    const [ticketId, setTicketId] = useState(1);
    const [tickets, setTickets] = useState([]);

    const handleGuestChange = (index, field, value) => {
        const updatedGuests = [...guests];
        updatedGuests[index] = { ...updatedGuests[index], [field]: value };
        setGuests(updatedGuests);
    };

    const handleAddGuests = () => {
        const newTicket = {
            id: ticketId,
            guests,
            total: calculateTotal(guests),
        };
        setTickets([...tickets, newTicket]);
        setTicketId(ticketId + 1);
        setGuests([]);
        setNumGuests(0);
    };

    const calculateTotal = (guests) => {
        return guests.reduce((total, guest) => {
            const age = parseInt(guest.age);
            if (age <= 2) return total;
            if (age > 2 && age < 18) return total + 100;
            if (age >= 18 && age < 60) return total + 500;
            return total + 300;
        }, 0);
    };
}
    return (
        <div id="ticket-booking">
            <h1>Book Your Tickets</h1>
            <div>
                <label htmlFor="numGuests">Number of Guests:</label>
                <input
                    type="number"
                    id="numGuests"
                    value={numGuests}
                    onChange={(e) => {
                        const value = parseInt(e.target.value);
                        setNumGuests(value);
                        setGuests(Array(value).fill({ name: '', age: '' }));
                    }}
                />
            </div>
    
            {guests.map((guest, index) => (
                <div key={index} className="guest-input">
                    <label htmlFor={`guestName${index}`}>Guest {index + 1} Name:</label>
                    <input
                        type="text"
                        id={`guestName${index}`}
                        value={guest.name}
                        onChange={(e) => handleGuestChange(index, 'name', e.target.value)}
                    />
                    <label htmlFor={`guestAge${index}`}>Age:</label>
                    <input
                        type="number"
                        id={`guestAge${index}`}
                        value={guest.age}
                        onChange={(e) => handleGuestChange(index, 'age', e.target.value)}
                    />
                </div>
            ))}
    
            {guests.length > 0 && (
                <button id="addGuestsBtn" onClick={handleAddGuests}>
                    Add Guests
                </button>
            )}
    
            <h2>Tickets</h2>
            <div>
                {tickets.map((ticket) => (
                    <div key={ticket.id} className="ticket-card">
                        <p>Ticket ID: {ticket.id}</p>
                        <p>Total Guests: {ticket.guests.length}</p>
                        <p>Total Price: INR {ticket.total}</p>
                        <details>
                            <summary className="details-summary">View Guests</summary>
                            <div className="details-content">
                                {ticket.guests.map((guest, index) => (
                                    <p key={index}>Name: {guest.name}, Age: {guest.age}</p>
                                ))}
                            </div>
                        </details>
                    </div>
                ))}
            </div>
        </div>
    );