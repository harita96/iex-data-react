import React, { Component } from 'react'
import axios from 'axios'
import styled from 'styled-components'

import SearchBar from './components/SearchBar'
import Table from './components/Table'
import IexInfo from './components/IexInfo'
import './App.css'

const TITLE = 'IEX DATA'
const DEFAULT_QUERY = 'AAPL'

const TitleStyle = styled.h1`
  font-family:  arial
  `
const NotFound = styled.div`
   font-style: italic;
   color: blue;
   display: inline;
   font-family:  arial
`
const NotFoundTerm = styled.div`
   font-style: italic;
   color: yellow;
   display: inline;
   font-family:  arial
`
const Wrapper = styled.div`

width:'100%';
   
   color:#323232;
   
   max-width: 100%;
   max-height: 100%;
   border: 1px solid #CAEAD8;
   border-radius: 3px;
   font-family: arial;
   font-size: 20px;
   
  background-color:#abdca7;
   display: flex;
   flex-direction: column;
   font-family:  arial 
   `



class App extends Component {
    constructor(){
        super()
        this.state = {
            searchTerm: DEFAULT_QUERY,
            loading: false,
            error: null,
            table: true,
            infoHidden: true,
            quote: {
              symbol:'',
              companyName: '',
              latestPrice:'',
              latestTime:'',
              change:'',
              changePercent:''
              
            },
            news:[],
            logoInfo:{
              url: ''
            },
            labels:[],
           datasets:[
            {
              label:"",
              data:[]
            }
          ],
          mostActive:[]
          
        }
        this.onSearchChange = this.onSearchChange.bind(this);
        this.onSearchSubmit = this.onSearchSubmit.bind(this);
        this.toggleHidden = this.toggleHidden.bind(this);
        this.fetchInfo = this.fetchInfo.bind(this);
        this.fetchMostActive = this.fetchMostActive.bind(this);
        this.fetchHistoricalPrices = this.fetchHistoricalPrices.bind(this);
 
        this.fetchNews = this.fetchNews.bind(this);
    }

    onSearchSubmit(event) {
      event.preventDefault();
     
      const { searchTerm } = this.state;
      
      this.fetchInfo(searchTerm);
      this.fetchMostActive();
      this.fetchHistoricalPrices(searchTerm);

      this.fetchNews(searchTerm);
      
      }  

      

   onSearchChange(event) {
        
        this.setState({ searchTerm: event.target.value });
        this.setState({error:null});
     
       this.setState({table:false});
        event.preventDefault();
      }  

    toggleHidden(event) {
    
        this.setState({
          infoHidden: !this.state.infoHidden
        })
        event.preventDefault(); 
      } 
      
    fetchNews(symbol){
      axios.get(`https://cloud.iexapis.com/stable/stock/${symbol}/news?token=pk_46225c54f32f4642a3e478e9d01450c7`)
        .then(result => {
          var i;
          var a = [];
          for(i=0;i<5;i++){

              a.push({headline : result.data[i].headline,
              summary : result.data[i].summary,
              url : result.data[i].url,
              image : result.data[i].image});

            
          }
          this.setState({error:null});
            this.setState({table:true});
            this.setState({infoHidden:true});
          this.setState({
            news:a
          });
          //console.log(this.state.news);
        })
        .catch(error => 
          {
            // Error
            if (error.response) {
              // The request was made and the server responded with a status code
              // that falls out of the range of 2xx
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
              this.setState({error});
           } else if (error.request) {
              // The request was made but no response was received
              // `error.request` is an instance of XMLHttpRequest in the 
              // browser and an instance of
              // http.ClientRequest in node.js
              console.log("Response error ", error.request);
           } else {
              // Something happened in setting up the request that triggered an Error
              console.log('Error - 3rd type', error.message);
              this.setState({error});
          }
        
          });
    }

   
    fetchHistoricalPrices(symbol){
      axios.get(`https://cloud.iexapis.com/stable/stock/${symbol}/chart/1m?token=pk_46225c54f32f4642a3e478e9d01450c7`)
        .then(result=>{
          var i;
          var a = [],b = [];
          for(i in result.data){
              a.push(result.data[i].close);
              b.push(result.data[i].date);
            
          }
          this.setState({error:null});
            this.setState({table:true});
            this.setState({infoHidden:true});
          this.setState({
            
            labels:b,
            datasets:[
              {
                label:symbol.toUpperCase(),
                data:a
              }
            ]
          })
          //console.log(result.data)
        })
          .catch(error => 
            {
              // Error
              if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
                this.setState({error});
             } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the 
                // browser and an instance of
                // http.ClientRequest in node.js
                console.log("Response error ", error.request);
             } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error - 3rd type', error.message);
                this.setState({error});
            }
          
            });
    }

     fetchMostActive(search){
      axios.get(`https://cloud.iexapis.com/stable/stock/market/list/mostactive?token=pk_46225c54f32f4642a3e478e9d01450c7`)
        .then(result => {
          //console.log(" mostactive stocks: " + result)
          var i;
          var a = [];
          for(i in result.data){

              a.push({symbol : result.data[i].symbol,
              latestPrice : result.data[i].latestPrice,
              change : result.data[i].change,
              changePercent : result.data[i].changePercent});

            
          }
          this.setState({error:null});
            this.setState({table:true});
            this.setState({infoHidden:true});
          this.setState({
            mostActive:a
          });
          
          
        })
        .catch(error => 
          {
            // Error
            if (error.response) {
              // The request was made and the server responded with a status code
              // that falls out of the range of 2xx
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
              this.setState({error});
           } else if (error.request) {
              // The request was made but no response was received
              // `error.request` is an instance of XMLHttpRequest in the 
              // browser and an instance of
              // http.ClientRequest in node.js
              console.log("Response error ", error.request);
           } else {
              // Something happened in setting up the request that triggered an Error
              console.log('Error - 3rd type', error.message);
              this.setState({error});
          }
        
          });
    } 

    

  fetchInfo(symbol){
   
     axios.get(`https://cloud.iexapis.com/stable/stock/${symbol}/quote?token=pk_46225c54f32f4642a3e478e9d01450c7`)
          .then(result => {
          //console.log(result.data);
          this.setState({error:null});
            this.setState({table:true});
            this.setState({infoHidden:true});
          this.setState({
            quote: {
              symbol:result.data.symbol,
              companyName: result.data.companyName,
              latestPrice:result.data.latestPrice,
              latestTime:result.data.latestTime,
              change:result.data.change,
              changePercent:result.data.changePercent
               }
            })
          })
          .catch(error2 => 
            {
              // Error
              if (error2.response) {
                  // The request was made and the server responded with a status code
                  // that falls out of the range of 2xx
                   console.log(error2.response.data);
                   console.log(error2.response.status);
                   console.log(error2.response.headers);
                   
              } else if (error2.request) {
                  // The request was made but no response was received
                  // `error.request` is an instance of XMLHttpRequest in the 
                  // browser and an instance of
                  // http.ClientRequest in node.js
                  console.log("Response error ", error2.request);
              } else {
                  // Something happened in setting up the request that triggered an Error
                  console.log('Error', error2.message);
                 
                }
              })
            }    

  // doReset                 
  
  componentDidMount(){
      this.setState({loading: true})
      let search = this.state.searchTerm
      this.fetchInfo(search)
       this.fetchHistoricalPrices(search)
      this.fetchNews(search) 
      this.fetchMostActive()
      
    
  }  

    

  render() {
    let result;
    const {
      searchTerm,
      quote,
      logoInfo,
      infoHidden,
      table,
      news,
      labels,
      datasets,
      error,
      mostActive
      } = this.state;
   
    if (error) {
        console.log('inside Render function ', error );
        let piece = `${searchTerm}`
       
        result = (
          <NotFound>Sorry, <NotFoundTerm>{piece}</NotFoundTerm> not found! Try again</NotFound>
        )
        }  
       else if(table)
        {
          result = 
          <Table 
            searchTerm = {searchTerm}
            symbol = {quote.symbol}
            companyName = {quote.companyName}
            latestPrice = {quote.latestPrice}
            latestTime = {quote.latestTime}
            change = {quote.change}
            changePercent = {quote.changePercent}
            url = {logoInfo.url}
            labels = {labels}
            label = {datasets.label}
            data = {datasets.data}
           news = {news}
            data = {this.state}
            mostActive = {mostActive}
          />
          
                  
        }

    return (
      <Wrapper>
        <center><TitleStyle>{TITLE}</TitleStyle></center>
        <SearchBar 
          value={searchTerm}
          onChange={this.onSearchChange}
          onSubmit={this.onSearchSubmit}
          
        /><br/><br/>
        {result}
        <div>
       
      </div>
      <IexInfo 
      toggle={this.toggleHidden}
      info={infoHidden}  
      /> 
      
      </Wrapper>
      
    )
  }
}

export default App
