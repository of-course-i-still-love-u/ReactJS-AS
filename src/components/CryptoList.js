import React from 'react'
import './CryptoList.css'
import UpdateData from './UpdateData'
import axios from 'axios'
const localData = require('../AllData.json')





export default class CryptoList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

      Data: [],
      CapData: [],
      BTC_D:[],
      ETH_D:[],
      DataHC_total_market_cap: [],
      DataHC_total_volume_24h:[],
      Data2: localData

    }



  }


  fetchData() {


    // let nodeAPI = "http://10.72.16.148:8082/getapi/data"
    let fromServerAPI = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?limit=100"
    let getCap = "https://pro-api.coinmarketcap.com/v1/global-metrics/quotes/latest"

    axios.get(fromServerAPI,
      {
        headers: {

          'X-CMC_PRO_API_KEY': '631cf6a4-cd39-4359-8a31-c8142aac780a',

        },

      })
      .then(response => {


        let data = response.data.data


        for (let i = 0; i <= 99; i++) {

          data.splice(i, 1, {

            "id": data[i].id,
            "name": data[i].name,
            "symbol": data[i].symbol,
            "cmc_rank": data[i].cmc_rank,
            "price": data[i].quote.USD.price,
            "percent_change_24h": data[i].quote.USD.percent_change_24h

          })


        }

        this.setState({
          Data: data,

        })

        //console.log(this.state.Data)


      })
      .catch(err => console.log(err))

    axios.get(getCap,
      {
        headers: {
          'X-CMC_PRO_API_KEY': '631cf6a4-cd39-4359-8a31-c8142aac780a',
        },

      })
      .then(response => {

        let data = response.data.data
        let btc_d = data.btc_dominance.toFixed(1)
        let eth_d = data.eth_dominance.toFixed(1)
        let total_market_cap = data.quote.USD.total_market_cap
        let total_volume_24h =  data.quote.USD.total_volume_24h

        this.setState({
          CapData: data,
          BTC_D:btc_d,
          ETH_D:eth_d,
          DataHC_total_market_cap: total_market_cap.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          DataHC_total_volume_24h: total_volume_24h.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        })

      
      })
      .catch(err => console.log(err))


  }




  componentDidMount() {

    this.fetchData()

  }



  render() {


    var coins = this.state.Data.map((currency) =>

      <UpdateData data={currency} key={currency.id} />

    )


    return (

      <div >

        <table className="container" >
          <thead>
            <tr>
              <th ><h1 style={{color:"#ffa500"}}>BTC Dominance :{' '+this.state.BTC_D+'%'}</h1></th>
              <th><h1 style={{color:"#ffa500"}}>ETH Dominance :{' '+this.state.ETH_D+'%'}</h1></th>
              <th><h1 style={{color:"#ffa500"}}>Total Market Cap :{' $'+this.state.DataHC_total_market_cap}</h1></th>
              <th ><h1 style={{color:"#ffa500"}}>Total Volume 24H :{' $'+this.state.DataHC_total_volume_24h}</h1></th>
            </tr>
            <tr>
              <th style={{ width: '4%', height: 50 }}><h1>Rank</h1></th>
              <th style={{ width: '5%', height: 50 }}><h1>Coins</h1></th>
              <th style={{ width: '5%', height: 50 }}><h1>Price</h1></th>
              <th style={{ width: '5%', height: 50 }}><h1>Change (24h)	</h1></th>
            </tr>
          </thead>

          {coins}

        </table>

      </div>

    )


  }


}










