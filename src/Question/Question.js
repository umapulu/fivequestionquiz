import React from 'react';
import  './Question.css';

//initializes a question arrow function
const question = ( props ) => {

    var questionFormat = null;

//this is what's displayed if the question is a number input
    if (props.qType === "ni"){
        questionFormat = 
            (<div className={'question'}  >
            <p >{props.question} </p>
            <input type="text" onChange={props.changedInput} value = {props.options} />
            </div>);
    }
//this is what is displayed if the question is a dropdown
    else if (props.qType === "dd") {
        questionFormat = 
        (
        <div className={'question'} >
                <p >{props.question} </p>
                <div className="dropdown">
                    <button className="dropbtn">Dropdown</button>
                    <div className="dropdown-content">
                        {props.options.map((option, index) => {
                            return <div >
                                <input type= "radio" onChange={props.selected} name = {props.id + 89} id = {props.id + index} value = {option}/>
                                <label htmlFor= {props.id + index} >{option}</label>
                                </div>
                        })}
                    </div>
                </div>
        </div>);
    }
    //this is what is displayed if the question is a multiple choice or true false
    else  {
        questionFormat = 
            (<div className={'question'} >
            <p >{props.question} </p>
                {props.options.map((option, index) => {
                    return <div align = 'left'>
                        <input type="radio" onChange={props.selected} name = {props.id} value = {option} />
                        <label >{option}</label>
                        
                    </div>
            })}
            
            </div>);
    }

//this is what is exported in "export default question"
//this is what is returned for each individual
//question object
    return (
        <div>
            
            <div>
                {questionFormat}
            </div>
        </div>
    )
};

export default question;