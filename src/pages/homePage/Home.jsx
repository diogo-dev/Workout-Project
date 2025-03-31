import React, { useState } from 'react';
import './Home.css'
import { IoReload } from "react-icons/io5";
import { useNinjaAPI } from '../../hooks/useNinjaAPI.jsx';;

const Home = () => {
  const url = "https://api.api-ninjas.com/v1/quotes";
  const { data: quoteObjct, loading, error, getAPIResponse: getQuote } = useNinjaAPI(url);

  return (
    <div className='home-page-conteiner'>
      <div className="home-page-quote-conteiner">
        {loading && <p className='home-page-loading-text'>Loading quote...</p>}
        {!loading && quoteObjct && (
          <div>
            <p className='home-page-quote-text'>{quoteObjct.quote}</p>
            <br />
            <p className='home-page-author-text'>By {quoteObjct.author}</p>
            <button className='home-page-quote-button' onClick={getQuote}><IoReload /></button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home