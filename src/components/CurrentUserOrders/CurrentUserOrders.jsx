import "./CurrentUserOrders.css";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../pages/contexts/authContext.js";
import { getAllTicketsByUserID } from "../../services/productData.js";
import Ticket from "../Categories/Ticket.js";

const CurrentUserOrders = () => {

    const {user} = useAuth();
    const [usersTickets, setUsersTickets] = useState([]);

    useEffect(()=>{
        const fetchUserTickets = async () => {
            try{
                const tickets = await getAllTicketsByUserID(user._id);
                const filteredTickets = tickets.filter((ticket,index)=> ticket.active === false);
                setUsersTickets(filteredTickets);
            }
            catch(error){
                console.log("Error fetching user tickets:", error);
                setUsersTickets([]);
            }
        };
        if(user){
            fetchUserTickets();
        }
    }, [user]);



    return (
        <div className="sell-form-container">
            {user ? (
                usersTickets.map((ticket, index) => (
                    <Ticket
                        key={ticket._id}
                        id={ticket._id}
                        title={ticket.title}
                        description={ticket.description}
                        image={ticket.image}
                        price={ticket.price}
                        
                    />
                ))
            ) : (
                <h5>Please Login To View Your Tickets</h5>
            )}
        </div>
    );
};
export default CurrentUserOrders;
