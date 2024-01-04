import { useEffect, useState } from "react";
import dollarBill from "./images/icon-dollar.svg";
import person from "./images/icon-person.svg";
function App() {
    const [bill, setBill] = useState("");
    const [people, setPeople] = useState("");
    const [personTip, setPersonTip] = useState("");
    const [personTotal, setPersonTotal] = useState("");
    const [tip, setTip] = useState("");
    const [error, setError] = useState(false);

    const tipValues = [5, 10, 15, 25, 50];

    var percent = (tip / 100) * bill;
    var tipPP = Math.floor((percent / people) * 100) / 100;
    var totalPP = Math.floor((bill / people + tipPP) * 100) / 100;

    const reset = bill && people && people !== "0";

    useEffect(() => {
        if ([people, bill].every(Boolean)) {
            setPersonTip(tipPP);
            setPersonTotal(totalPP);
        }
    }, [people, bill, tip, tipPP, totalPP]);

    const checkNumOfPeople = (e) => {
        setPeople(e.target.value);
        if (e.target.value === "0") {
            setError(true);
        } else {
            setError(false);
        }
    };

    const deselectTip = () => {
        const buttons = document.querySelectorAll(".tip-button");

        buttons.forEach((button) => {
            button.classList.remove("active");
        });
    };

    const activeTip = (e) => {
        setTip(e.target.value);
        const buttons = document.querySelectorAll(".tip-button");

        buttons.forEach((button) => {
            if (button.classList.contains("active")) {
                button.classList.remove("active");
            }

            e.target.classList.add("active");
            document.getElementById("custom-tip").value = "";
        });
    };

    const resetCalculator = () => {
        setTip("");
        setBill("");
        setPeople("");
        setPersonTip("");
        setPersonTotal("");
        deselectTip();
    };

    return (
        <main>
            <h1 id="heading">
                <span>spli</span>
                <span>tter</span>
            </h1>
            <section id="calculator-container">
                <section id="calculator">
                    <section className="input-container">
                        <p id="bill_label">Bill</p>
                        <span id="bill-input-container">
                            <img src={dollarBill} alt="dollar bill icon" />
                            <input
                                type="number"
                                id="bill"
                                name="tip"
                                onChange={(e) => setBill(e.target.value)}
                                value={bill}
                                placeholder="0"
                            />
                        </span>
                    </section>

                    <section>
                        <p id="selectTip">Select tip %</p>
                        <section id="tipContainer">
                            {tipValues.map((tip) => (
                                <button
                                    className="tip-button"
                                    key={`tip-${tip}`}
                                    value={tip}
                                    onClick={activeTip}
                                >
                                    {tip}%
                                </button>
                            ))}
                            <input
                                type="number"
                                id="custom-tip"
                                name="tip"
                                onChange={(e) => setTip(e.target.value)}
                                placeholder="CUSTOM"
                                onClick={deselectTip}
                            ></input>
                        </section>
                    </section>

                    <section className="input-container">
                        <span id="error-container">
                            <p id="people_label">Number of people</p>
                            <p id="error-message" className={error ? "error" : "no-error"}>
                                can&apos;t be zero
                            </p>
                        </span>
                        <span id="people-input-container">
                            <img src={person} alt="dollar bill icon" />
                            <input
                                type="number"
                                id="people"
                                value={people}
                                onChange={checkNumOfPeople}
                                placeholder="0"
                            />
                        </span>
                    </section>
                </section>
                <section id="results">
                    <section id="container">
                        <aside id="results-text-tip">
                            <p>
                                Tip amount <sub>/ person</sub>
                            </p>
                            <span>{personTip ? `$${personTip}` : "$0.00"}</span>
                        </aside>
                        <aside id="results-text-total">
                            <p>
                                Total <sub>/ person</sub>
                            </p>
                            <span>{personTotal ? `$${personTotal}` : "$0.00"}</span>
                        </aside>
                    </section>
                    <button id="reset-button" onClick={resetCalculator} disabled={!reset}>
                        Reset
                    </button>
                </section>
            </section>
        </main>
    );
}

export default App;
