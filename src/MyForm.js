import { useState } from 'react';
import UslugeTest from './UslugeTest';
import './MyForm.css';


function MyForm(props) {
    /* const [imePrezime, setName] = useState("");
     const [adresa, setAdresa] = useState("");
     const [oib, setOib] = useState("");
     const [email, setEmail] = useState("");
     const [mob, setMob] = useState(""); */
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = ("0" + (currentDate.getMonth() + 1)).slice(-2);
    const day = ("0" + currentDate.getDate()).slice(-2);
    const hours = ("0" + currentDate.getHours()).slice(-2);
    const minutes = ("0" + currentDate.getMinutes()).slice(-2);
    const seconds = ("0" + currentDate.getSeconds()).slice(-2);

    const brojRacuna = "RAC-" + year + "-" + month + "-" + day + "-" + hours + "-" + minutes + "-" + seconds;
    const [inputs, setInputs] = useState({});
    const [usluge, setUsluge] = useState([]);

    const handleUslugeChange = (newUsluge) => {
        setUsluge(newUsluge);
    };


    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }


    const handleSubmit = (event) => {
        event.preventDefault();
        /*    console.log(`The name you entered was: ${imePrezime}`);
            console.log(`The adresa you entered was: ${adresa}`);
            console.log(`OIB was: ${oib}`);
            console.log(`EMAIL was: ${email}`);
            console.log(`MOB was: ${mob}`); */

        const body = {
            brojRacuna: brojRacuna,
            datumIzdavanja: currentDate,
            ukupanIznos: 0,
            jir: "JIR",
            nacinPlacanja: inputs.nacin,
            ukupanIznosNaknadeIPoreza: 0,
            kupac: {
                imePrezime: inputs.imePrezime,
                adresa: inputs.adresa,
                oib: inputs.oib,
                email: inputs.email,
                brojTelefona: inputs.mob,
            },
            stavkeRacuna: usluge.map((usluga) => ({
                kolicina: usluga.jedinicaMjere,
                vrstaUsluge: usluga.vrstaUsluge,
                racunId: 4,
            })
            ),
        };

        console.log("Uneseni podaci s forme " + inputs.mob);
        console.log("Objekt za POST zahtjev: ", body);

        fetch("http://localhost:7777/racuni", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Uspješno poslan POST zahtjev:", data);
                alert("Uspješno ste unijeli račun!"); // prikazivanje alerta
                window.location.href = "http://localhost:3000/";

            })
            .catch((error) => {
                alert("Greška u komunikacijsi s  apijem: " + error); // prikazivanje alerta    
                console.error("Greška pri slanju POST zahtjeva:", error)
            });;
    }


    return (
        <form id="myForm" className='container' onSubmit={handleSubmit}>
            <h2>Kupac</h2>
            <label>Unesite ime i prezime:
                <input
                    type="text"
                    required
                    name='imePrezime'
                    value={inputs.imePrezime || ""}
                    onChange={handleChange}
                />
            </label>
            <br></br>
            <label>Unesite adresu:
                <input
                    type="text"
                    required
                    name='adresa'
                    value={inputs.adresa || ""}
                    onChange={handleChange}
                />
            </label>
            <br></br>
            <label>OIB:
                <input
                    type="number"
                    required
                    name='oib'
                    value={inputs.oib || ""}
                    onChange={handleChange}
                />
            </label>
            <br></br>
            <label>Email:
                <input
                    type="text"
                    name='email'
                    value={inputs.email || ""}
                    onChange={handleChange}
                />
            </label>
            <br></br>
            <label>Mob:
                <input
                    type="text"
                    required
                    name='mob'
                    value={inputs.mob || ""}
                    onChange={handleChange}
                />
            </label>
            <br></br>
            <label>Način plaćanja:
                <input
                    type="text"
                    required
                    name='nacin'
                    value={inputs.nacin || ""}
                    onChange={handleChange}
                />
            </label>
            <br></br>
            <h2>Usluga</h2>
            <UslugeTest onUslugeChange={handleUslugeChange} />
            <ul>
                {usluge.map((usluga, index) => (
                    <li key={index}>
                        {usluga.vrstaUsluge} - {usluga.cijena} - {usluga.uslugaId}
                    </li>
                ))}
            </ul>

            <br></br>
            <br></br>
            <input type="submit" />
        </form>
    )
}

export default MyForm;