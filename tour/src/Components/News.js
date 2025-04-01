import  { useEffect, useState } from 'react';
import './News.css';

function News(){
  
  const [news,setNews] = useState([]);
  const getNews = ()=>{
    fetch("https://newsapi.org/v2/everything?q=Apple&sortBy=popularity&apiKey=a4e91439dd0e4dd1beb5e36d3011275a")
    .then(res => res.json())
    .then(json => console.log(json.articles))
  }

  useEffect(() => {
    getNews();
  },[])
  
  return (
    <div>
      {news.map(() => {})}
    </div>
  );
}

export default News;