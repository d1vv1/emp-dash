import { useState, useEffect } from 'react';
import './Dashboard.css';

function Dashboard() {
    const [greeting, setGreeting] = useState('');

    useEffect(() => {
        const updateGreeting = () => {
            const now = new Date();
            const hour = now.getHours();

            if (hour >= 5 && hour < 12) {
                setGreeting('Good Morning');
            } else if (hour >= 12 && hour < 17) {
                setGreeting('Good Afternoon');
            } else {
                setGreeting('Good Evening');
            }
        };

        updateGreeting();
        const intervalId = setInterval(updateGreeting, 60000);


        return () => {
            clearInterval(intervalId);
        };
    }, []);

    return (
        <div className="dashboard">

            <div className="cover"/>

            <div className="text-box">
                <h1>{greeting}, User</h1>
            </div>

            <div className="cover"/>

        </div>
    );
}

export default Dashboard;