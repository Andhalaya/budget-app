import React from 'react'
import './settings.css'

function Settings() {
    return (
        <div className='monthly-budget'>
            <div className='title'>
                <h1>MARCH</h1>
                <h2>Monthly budget</h2>
            </div>
            <div className='summary'>
                <div className='s-list'>
                  <h2>Summary</h2>
                  <div className='summary-container'>
                    <div className="summary-box">
                        <h3>Income</h3>
                        <div className='list-element'>
                            <p>Personal</p>
                            <p>400$</p>
                        </div>
                        <div className='list-element'>
                            <p>Personal</p>
                            <p>400$</p>
                        </div>
                        <div className='list-element'>
                            <p>Personal</p>
                            <p>400$</p>
                        </div>
                    </div>
                    <div className="summary-box">
                        <h3>Expenses</h3>
                        <div className='list-element'>
                            <p>Personal</p>
                            <p>400$</p>
                        </div>
                        <div className='list-element'>
                            <p>Personal</p>
                            <p>400$</p>
                        </div>
                        <div className='list-element'>
                            <p>Personal</p>
                            <p>400$</p>
                        </div>
                        <div className='list-element'>
                            <p>Personal</p>
                            <p>400$</p>
                        </div>
                        <div className='list-element'>
                            <p>Personal</p>
                            <p>400$</p>
                        </div>
                    </div>
                    <div className="summary-box">
                        <h3>Savings</h3>
                        <div className='list-element'>
                            <p>Personal</p>
                            <p>400$</p>
                        </div>
                    </div>
                    </div>  
                </div>
                <div className='chart'></div>
            </div>
            <div className="expenses-boxes">
                <div className="e-box">
                    <h3>Personal</h3>
                    <div className='list'>
                        <div className="cat-box">
                            <div className="cat-box-title">Suplies</div>
                            200$
                        </div>
                        <div className="list-element">
                            <p>Groceries</p>
                            <p>30$</p>
                        </div>
                        <div className="list-element">
                            <p>Groceries</p>
                            <p>30$</p>
                        </div>
                        <div className="list-element">
                            <p>Groceries</p>
                            <p>30$</p>
                        </div>
                        <div className="cat-box">
                            <div className="cat-box-title">Suplies</div>
                            200$
                        </div>
                        <div className="list-element">
                            <p>Groceries</p>
                            <p>30$</p>
                        </div>
                        <div className="list-element">
                            <p>Groceries</p>
                            <p>30$</p>
                        </div>
                        <div className="list-element">
                            <p>Groceries</p>
                            <p>30$</p>
                        </div>
                        <div className="cat-box">
                            <div className="cat-box-title">Suplies</div>
                            200$
                        </div>
                        <div className="list-element">
                            <p>Groceries</p>
                            <p>30$</p>
                        </div>
                        <div className="list-element">
                            <p>Groceries</p>
                            <p>30$</p>
                        </div>
                        <div className="list-element">
                            <p>Groceries</p>
                            <p>30$</p>
                        </div>
                        <div className="cat-box">
                            <div className="cat-box-title">Suplies</div>
                            200$
                        </div>
                        <div className="list-element">
                            <p>Groceries</p>
                            <p>30$</p>
                        </div>
                        <div className="list-element">
                            <p>Groceries</p>
                            <p>30$</p>
                        </div>
                        <div className="list-element">
                            <p>Groceries</p>
                            <p>30$</p>
                        </div>
                    </div>
                    
                    <div className='total'>
                        <h3>Total</h3> 
                        <h3>400$</h3>
                    </div>

                </div>
                <div className="e-box">
                    <h3>Dog</h3>
                </div>
                <div className="e-box">
                    <h3>School</h3>
                </div>
                <div className="e-box">
                    <h3>House</h3>
                </div>
                <div className="e-box">
                    <h3>Investment</h3>
                </div>
            </div>
        </div>
    )
}

export default Settings