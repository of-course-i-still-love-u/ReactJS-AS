import React from 'react'
import './CryptoList.css'



export default class UpdateData extends React.Component {

  greenText(percent_change_24h) {
    return (


      <td style={{ width: '5%', height: 50, color: '#00ff00' }}>
        {

          percent_change_24h.toFixed(2) + ' %'
        }
      </td>


    )
  }

  redText(percent_change_24h) {
    return (


      <td style={{ width: '5%', height: 50, color: '#ff0000' }}>
        {

          percent_change_24h.toFixed(2) + ' %'
        }
      </td>


    )
  }



  render() {

    var {
      name,
      symbol,
      cmc_rank,
      id,
      price,
      percent_change_24h,

    } = this.props.data

    let urlLogo = `https://s2.coinmarketcap.com/static/img/coins/64x64/${id}.png`

    return (



      <tbody style={{ width: '100%', height: 50 }}>
        <tr>

          <td style={{ width: '1%', height: 50 }}>{cmc_rank} <img src={urlLogo} alt="" style={{ width: 45, height: 45, marginLeft: 50 }} />  <br />{symbol}</td>
          <td style={{ width: '5%', height: 50 }}>  {name}</td>
          <td style={{ width: '5%', height: 50 }}>{price >= 1 ? price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " USD" : price.toFixed(4) + " USD"}</td>
          {percent_change_24h < 0 ? this.redText(percent_change_24h) : this.greenText(percent_change_24h)}
        </tr>
      </tbody>



    )

  }


}