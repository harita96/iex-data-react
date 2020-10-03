import React from 'react'
import styled from 'styled-components'

import {Line} from 'react-chartjs-2';

const greater = {
  color : 'green'
};

const IMAGE = {
  width : '500px',
  height : '250px'

};
const lesser = {
  color : 'red'
};

const rowC = {
  display:'flex',
   flexDirection:'row',
};



const col1 = {
  flex : '3',
  width:'100%',
  padding:'20px',
  marginLeft: '10px',
  borderColor:'#323232',
  border: '2px solid #008b00',
      borderRadius:'15px',
    background:'#DCDCDC',
    color: '#323232'
};


const col2 = {
  flex : '1',
  padding:'15px',
  marginLeft:'10px',
  marginRight:'10px',
  borderColor:'#323232',
  width:'100%',
  border: '2px solid #008b00',
      borderRadius:'15px',
    background:'#DCDCDC',
    color: '#323232',
    boxSizing: 'border-box'
};
const A = {
  justifyContent: 'center'
};
const TD = styled.td`
    align-top:0px;
    width:65%;
    `
const P = styled.p`
    color:blue;
    font-size:35px
`
const TR = styled.tr`
    display: block;
    width:100%;
    
    `
const TABLE = styled.table`
   
    display:'flex',
   flexDirection:'column'
      
    `
const Table = (props) => {
 
 

 
 
  let change = Number(props.change);
  let changed = '';
  if(change > 0){
    changed = <p style={greater}><b>Change: </b>{change}</p>
  }
  else if(change < 0)
{
  changed = <p style={lesser}><b>Change: </b>{change}</p> 
}  
else{
  changed = <p><b>Change: </b>{change}</p>
}

  let newsData = props.news;
  let a = newsData.length > 0 && <h2> ARTICLES: </h2>
  const news = newsData.length > 0 && newsData.map((newsData) =>
    <div style={A}>
      <h4><a href={newsData.url}>{newsData.headline}</a></h4>
      <p>{newsData.summary}</p>
      <img src={newsData.image} alt = "" style={IMAGE}></img>
    </div>
  );
  
  let mostActive = props.mostActive;
  
//console.log("MA" + mostActive.change)
  let b = mostActive.length > 0 && <h2> MostActive Stocks: </h2>
  const ma = mostActive.length > 0 && mostActive.map((mostActive) =>
    <div>
      <p><b>Symbol:</b> {mostActive.symbol}</p>
      <p><b>Price: </b>{mostActive.latestPrice}</p>
      <p><b>Change: </b>{mostActive.change != null ? mostActive.change : 0}</p>
        
          <br/>
    </div>
    
  );

  //console.log(newsData)
 // console.log(headline);

  return (
    
    <div style = {rowC}>
      
      
      <div style = {col1}> 
      <TABLE>
        
        <TR>

          <TD>
          <P><b>Price: </b> {props.latestPrice}</P>
          {changed}
          <p><b>Symbol:</b> {props.symbol}</p>
          <p><b>CompanyName:</b> {props.companyName}</p>
          <p><b>When: </b>{props.latestTime}</p>
          
          
          </TD>
          
        </TR>
        <br/>
      </TABLE>
      <Line
          data = {props.data}
          options = {
            {
              title:{
                display:true,
                text:'Monthly stock analysis',
                fontsize:1
              },
              legend:{
                display:true,
                position:'right'
              }
            }
          }
          />
        <br/>
        <div>
        {a} 
        {news}
         
        </div>
      </div>
      
        <div style = {col2}>
        {b}
          <br/>
          {ma}
      </div>
        
    </div>
  )
}

export default Table
