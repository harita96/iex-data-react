import React from 'react'
import styled from 'styled-components'

const About = styled.div`
    margin-top: auto;
    font-size:11px;
    `
const AboutMore = styled.button`
    display: inline;
    border-radius: 15px;
    font-size:9px;
    text-decoration: underline;
    border: none;
    color: blue;
    &:focus {
        outline: none;
        border-color: none;
        box-shadow: none;
            }
    ${''}
    }
    `    

const IexInfo = (props) => {
    const {toggle, info } = props;  
    const Teach = () => (
        <About>
        <div>
        <p>Type a Ticker Symbol into the search box and the press the button 'SEARCH'. <br/>
        Ticker symbols are usually three letters, although some are two or one. <br/>
        The information is shown in four categories: <br/>
        1) The latest price, time, Symbol and company Name from IEX DATA.  <br/>
        2)The company's progress in stocks represented in Line chart of 1 month duration.<br/>
        3)Top 5 articles of the company.<br/>
        4)Most Active trades going on at that time.<br/>
        <AboutMore onClick={toggle}>Hide how to use.</AboutMore></p></div></About>
    ) 
  return (
    <About>
      <hr />
        <div>The  Investors Exchange (IEX) is a stock exchange for U.S. equities that is built for investors and companies.<br/>
        <AboutMore onClick={toggle}> How to use to this app.</AboutMore></div>
        {!info && <Teach />}
    </About>
  )
}

export default IexInfo
