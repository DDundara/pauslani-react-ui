import { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";



function SearchForm() {
    const [customers, setCustomers] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState("");
    const [services, setServices] = useState([]);
    const [selectedService, setSelectedService] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [results, setResults] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:7777/kupci").then((response) => {
            console.log("Tu sam");
            setCustomers(response.data);
        });

        axios.get("http://localhost:7777/usluge").then((response) => {
            setServices(response.data);
        });
    }, []);

    const handleCustomerChange = (event) => {
        setSelectedCustomer(event.target.value);
    };

    const handleServiceChange = (event) => {
        setSelectedService(event.target.value);
    };

    const zamijeniHrvatskeZnakove = (text) => {
        return text
            .replace(/č/g, 'c')
            .replace(/Č/g, 'C')
            .replace(/ć/g, 'c')
            .replace(/Ć/g, 'C')
            .replace(/ž/g, 'z')
            .replace(/Ž/g, 'Z')
            .replace(/đ/g, 'd')
            .replace(/Đ/g, 'D')
            .replace(/Dž/g, 'Dj')
            .replace(/dž/g, 'dj');
    };

    const generirajRacun = (racun) => {
        const doc = new jsPDF();

        // Naslov računa
        doc.setFontSize(20);
        doc.setFont("helvetica", "bold");
        doc.text("RACUN", 80, 20);

        // Broj računa i datum
        doc.setFontSize(12);
        doc.setFont("helvetica", "normal");
        doc.text(`Broj raruna: ${racun.brojRacuna}`, 20, 40);
        doc.text(`Datum: ${racun.datumIzdavanja}`, 140, 40);

        // Podaci o kupcu
        doc.text("Kupac:", 20, 60);
        doc.setFont("helvetica", "bold");
        doc.text(`${zamijeniHrvatskeZnakove(racun.kupac.imePrezime)}`, 20, 70);
        doc.setFont("helvetica", "normal");
        doc.text(`${zamijeniHrvatskeZnakove(racun.kupac.adresa)}`, 20, 80);

        // Stavke računa
        doc.text("Stavke racuna:", 20, 100);
        doc.setFont("helvetica", "bold");
        doc.text("Opis", 20, 110);
        doc.text("Kolicina", 80, 110);
        doc.text("Cijena", 120, 110);
        doc.text("Iznos", 160, 110);
        doc.setFont("helvetica", "normal");
        let y = 120;
        racun.stavkeRacuna.forEach((stavka) => {
            doc.text(`${zamijeniHrvatskeZnakove(stavka.usluga.vrstaUsluge)}`, 20, y);
            doc.text(`${stavka.kolicina}`, 80, y);
            doc.text(`${stavka.usluga.cijenaPoJedinici} EUR`, 120, y);
            doc.text(`${stavka.kolicina * stavka.usluga.cijenaPoJedinici} EUR`, 160, y);
            y += 10;
        });

        // Ukupan iznos
        doc.setFont("helvetica", "bold");
        doc.text(`UKUPNO: ${racun.ukupanIznos} kn`, 120, y + 10);

        doc.save(`racun-${racun.brojRacuna}.pdf`);
    };

    const search = () => {
        console.log("Oznaceni kupac: " + selectedCustomer);
        console.log("Oznaceni usluga: " + selectedService);
        console.log("Pocetak: " + startDate);
        console.log("Kraj: " + endDate);
        const url = `http://localhost:7777/racuni/period/usluga?kupac=${selectedCustomer}&pocetak=${startDate}&kraj=${endDate}&usluga=${selectedService}`;

        console.log("URL za serach: " + url);

        axios.get(url).then((response) => {
            console.log("rezultati: " + response.data);
            setResults(response.data);
        });
    };

    return (
        <div>
            <form className='container'>
                <label>Kupac:</label>
                <select value={selectedCustomer} onChange={handleCustomerChange}>
                    <option value="">Odaberite</option>
                    {customers.map((customer) => (
                        <option key={customer.id} value={customer.id}>
                            {customer.imePrezime}
                        </option>
                    ))}
                </select>

                <br />
                <label>Usluga:</label>
                <select value={selectedService} onChange={handleServiceChange}>
                    <option value="">Odaberite</option>
                    {services.map((service) => (
                        <option key={service.id} value={service.id}>
                            {service.vrstaUsluge}
                        </option>
                    ))}
                </select>

                <br />
                <label>Početak razdoblja:</label>
                <input type="date" value={startDate} onChange={(event) => setStartDate(event.target.value)} />

                <label>Kraj razdoblja:</label>
                <input type="date" value={endDate} onChange={(event) => setEndDate(event.target.value)} />

                <br />
                <button type="button" onClick={search}>
                    Pretraži
                </button>
            </form>
            <br />
            {results.length ? (
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>Broj računa</th>
                                <th>Ime i prezime kupca</th>
                                <th>Adresa kupca</th>
                                <th>Stavke računa</th>
                                <th>Cijena računa</th>
                                <th>Generiraj pdf</th>
                            </tr>
                        </thead>
                        <tbody>
                            {results.map((result) => (
                                <tr key={result.id}>
                                    <td>{result.brojRacuna}</td>
                                    <td>{result.kupac.imePrezime}</td>
                                    <td>{result.kupac.adresa}</td>
                                    <td>
                                        <ul>
                                            {result.stavkeRacuna.map((stavka) => (
                                                <li key={stavka.id}>
                                                    {stavka.usluga.vrstaUsluge}
                                                </li>
                                            ))}
                                        </ul>
                                    </td>
                                    <td>{result.ukupanIznos + " EUR"}</td>
                                    <td><a href="#" onClick={() => generirajRacun(result)}>
                                        Generiraj račun
                                    </a></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div>
                    <p>Nema rezultata za zadane kriterije pretraživanja.</p>
                </div>
            )}
        </div>
    );
}

export default SearchForm;