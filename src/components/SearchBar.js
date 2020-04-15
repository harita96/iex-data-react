import React from 'react';
import styled from 'styled-components'
const SearchButton = styled.button`
    background: black;
    width: 250px;
    border-radius: 15px;
    
    border: 1px solid #008b00;
    color: #afd91a;
    margin: 0;
    padding: 0.5em 1em;

  margin-right: auto;
    &:focus {
    outline: none;
    border-color: #008b00;
    box-shadow: 0 0 5px #008b00;
  }
  `;
  const SearchInput = styled.input`
    background: white;
    border-radius: 15px;
    width:250px;
    border: 1px solid #008b00;
     color: #333;
    margin-left: auto;
   
    
    padding: 0.5em 1em;
    &:focus {
    outline: none;
    border-color: #008b00;
    box-shadow: 0 0 5px #008b00;
  }
  `;
 const SearchWrapper = styled.div`
    display: flex;
    flex-wrap: nowrap;
    margin-left: auto;
    margin-right: auto;
    /* background-color: #abdca7; */
    
    `

const SearchBar =(props)=> {
    
   
    const { value, onChange, onSubmit } = props;
        return (
        <div>
            <center>
            <form onSubmit={onSubmit} className="ui form">
                <div className="field">
                <label><b>Track the Company Here!!</b><br/> </label><br/>
                <center><SearchWrapper>
                <br/>
                <SearchInput type="text" placeholder="SYMBOL"
                value={value}
                onChange={onChange}
                /><SearchButton type="submit">
                <b>SEARCH</b>
                </SearchButton></SearchWrapper></center>
                </div>
            </form>
            </center>
        </div>
        )
    }


export default SearchBar;