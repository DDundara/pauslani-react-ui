import React, { useState, useEffect, useMemo } from 'react';
import './ContactInfo.css';

const ContactInfo = () => {
    const [contactInfo, setContactInfo] = useState({});

    useEffect(() => {
        fetch('http://localhost:7777/obrt')
            .then(response => response.json())
            .then(data => setContactInfo(data[0]))
            .catch(error => console.error(error));
    }, []);

    const handlePhoneClick = () => {
        window.location.href = `tel:${contactInfo.kontaktBroj}`;
    };

    const handleWebClick = () => {
        window.open(`http://${contactInfo.url}`, '_blank');
    };

    const memoizedContactInfo = useMemo(() => contactInfo, [contactInfo]);

    return (
        <div className="contact-info">
            <h2>Kontakt informacije</h2>
            <p><strong>Naziv: </strong>{memoizedContactInfo.naziv}</p>
            <p><strong>Adresa: </strong>{memoizedContactInfo.adresa}</p>
            <p><strong>Web: </strong>
                <a href={`http://${memoizedContactInfo.url}`} target="_blank" rel="noopener noreferrer">{memoizedContactInfo.url}</a>
            </p>
            <p><strong>Kontakt broj: </strong>
                <a href={`tel:${memoizedContactInfo.kontaktBroj}`} onClick={handlePhoneClick}>{memoizedContactInfo.kontaktBroj}</a>
            </p>
            <p><strong>Vlasnik: </strong>{memoizedContactInfo.vlasnik}</p>
        </div>
    );
};

export default ContactInfo;