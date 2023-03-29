import { useState, useEffect } from "react";
import axios from "axios";


function UslugeTest(props) {
    const client = axios.create({
        baseURL: "http://localhost:7777/usluge"
    });

    const [usluge, setUsluge] = useState([]);
    const [options, setOption] = useState([]);
    const [selectedOption, setSelectedOption] = useState("");
    const [cijena, setCijena] = useState("");
    const [jedinicaMjere, setJedinicaMjere] = useState("");




    useEffect(() => {
        client.get().then((response) => {
            setOption(response.data);

        }).catch(error => console.log(error))
    }, [client]);



    const addUsluga = () => {

        const novaUsluga = {
            vrstaUsluge: selectedOption,
            cijena: cijena,
            jedinicaMjere: jedinicaMjere,
        };

        setUsluge([...usluge, novaUsluga]);
        // console.log("Usluge: " + usluge[vrstaUsluge);
        setSelectedOption("");
        setCijena("");
        setJedinicaMjere("");

        props.onUslugeChange(usluge);
    };

    const removeUsluga = (index) => {
        const noveUsluge = [...usluge];
        noveUsluge.splice(index, 1);
        setUsluge(noveUsluge);
    };

    return (
        <div>
            <h3>Usluge</h3>
            {usluge.map((usluga, index) => (
                <div className="usluge" key={index}>
                    <h4>Usluga {index + 1}</h4>
                    <div>
                        <label htmlFor="usluge-dropdown">Odaberi nešto:</label>
                        <select
                            value={usluga.vrstaUsluge}
                            onChange={(e) => {
                                const noviUsluga = { ...usluga, vrstaUsluge: e.target.value };
                                const noveUsluge = [...usluge];
                                noveUsluge[index] = noviUsluga;
                                setUsluge(noveUsluge);
                            }}
                            id="usluge-dropdown"
                        >
                            <option value="">-- Odaberi --</option>
                            {options.map((option) => (
                                <option key={option.id} value={option.vrstaUsluge}>
                                    {option.vrstaUsluge + " cijena: " +
                                        option.cijenaPoJedinici + " EUR" +
                                        " po " + option.jedinicaMjere}
                                </option>
                            ))}
                        </select>
                    </div>
                    {/*   <div>
                        <label htmlFor="cijenaPoJedinici">Cijena po jedinici:</label>
                        <input
                            type="number"
                            id="cijenaPoJedinici"
                            value={usluga.cijena}
                            onChange={(e) => {
                                const noviUsluga = { ...usluga, cijena: e.target.value };
                                const noveUsluge = [...usluge];
                                noveUsluge[index] = noviUsluga;
                                setUsluge(noveUsluge);
                            }}
                            required
                        />
                        </div> */}
                    <div>
                        <label htmlFor="jedinicaMjere">Jedinica mjere:</label>
                        <input
                            type="text"
                            id="jedinicaMjere"
                            value={usluga.jedinicaMjere}
                            onChange={(e) => {
                                const noviUsluga = { ...usluga, jedinicaMjere: e.target.value };
                                const noveUsluge = [...usluge];
                                noveUsluge[index] = noviUsluga;
                                setUsluge(noveUsluge);
                            }}
                            required
                        />
                    </div>
                    <button
                        type="button"
                        onClick={() => removeUsluga(index)}
                        className="remove-button"
                    >
                        Ukloni
                    </button>
                </div>
            ))}
            <button type="button" onClick={addUsluga} className="add-button">
                Dodaj uslugu
            </button>
        </div>
    );
}

export default UslugeTest;