//imports
import React, { useState, useEffect } from 'react'
import './App.css'

//main app
function App() {
    //declare variable to hold response data
    const [stock, setStock] = useState('Not loaded yet');
    //make counter for buttons
    const [counter, setCounter] = useState(0);
    //make word button that can change text
    const [word, setWord] = useState('Btn has not been pressed yet');
    //make getPrice boolean for fetch requests
    const [getPrice, setGetPrice] = useState(false);
    //we need to track input state to do things
    const [inputform, setInputform] = useState('TSLA');
    //lets make stock name lastval so it doesnt reply input form live
    const [lastValue, setLastValue] = useState('TSLA');

    //submit form event
    const handleSubmit = (e) => {
        //dont refresh site on submit
        e.preventDefault()
    }

    //radio onchange event
    const onChange = (e) => {
        //update value on click
        setInputform(e.target.value)
    }

    useEffect(() => {
        if (getPrice === true) {
            //send http request get to backend /stock
            fetch("/stock/" + inputform, {
                //set http request parameters
                method: 'GET',
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                },
                redirect: 'follow',
                referrerPolicy: 'no-referrer',
                })
            .then(
                //parse response in json()
                res => res.json()
            )
            .then(
                stock => {
                    //write into var
                    setStock(stock)
                    //print to console
                    console.log(stock)
                    //reset bool
                    setGetPrice(false)
                }
            )
            .catch((error) => {
                console.log(error)
            })
        }
    //empty array to only fetch once [] or trigger on value
    }, [getPrice])

    //begin JSX session
    return (
        <div className="App">
            <h1>Stockprice</h1>
                <form onChange={onChange}>
                    <h4>Suggestions</h4>
                    <label>
                        <td align="left">
                        TSLA
                        <input type="radio"
                            value="TSLA"
                            checked={inputform === 'TSLA'}
                            />
                        </td>
                    </label>
                    <label>
                        AMZN
                        <input type="radio"
                            value="AMZN"
                            checked={inputform === 'AMZN'}
                            />
                    </label>
                    <label>
                        GME
                        <input type="radio"
                            value="GME"
                            checked={inputform === 'GME'}
                            />
                    </label>
                    <label>
                        GOOGL
                        <input type="radio"
                            value="GOOGL"
                            checked={inputform === 'GOOGL'}
                            />
                    </label>
                </form>
                {/*btn + input field-->*/}
                <form onSubmit={handleSubmit}>
                    <label>
                        Stock tag:
                        {/*inputform which displays value and gets input to update*/}
                        <input
                            type="text"
                            name="inputform"
                            value={inputform}
                            onChange={(e) => setInputform(e.target.value)} />
                    </label>
                </form>
                <button onClick={() => {
                        //set last stock tag displayed
                        setLastValue(inputform)
                        setCounter(counter + 1);
                        //trigger fetch
                        setGetPrice(true);
                        //display loading so we dont give ghost value
                        setStock('Loading...')

                }}>Fetch price</button>

                {/*check that price has some sort of value*/}
                {(typeof stock === 'undefined') ? (
                    //err msg
                    <p>
                        waiting for Flask backend response Stock...
                    </p>
                ) : (
                    //"print" value of response.json
                    <p>
                        <br /><br />
                        regularMarketPrice of stock {lastValue}: { JSON.stringify(stock) } USD<br />
                        *according to yahoo finance
                        <br /><br />
                    </p>
                )}

                {/*btn -->*/}
                <button onClick={() => {
                    setWord('Btn has been pressed');
                    setCounter(counter + 1)
                }}>Change text</button>
                <br /><br />
                {word}
                <br /><br />
                You have clicked the buttons {counter} times.
        </div>
    )
    //end JSC session
}

//?
export default App


