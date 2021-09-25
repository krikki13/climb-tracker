import axios from 'axios';
import { useEffect, useState } from 'react';
import Link from 'react-router-dom/es/Link';
import '../index.css';
import queryString from 'query-string';
import { useHistory } from 'react-router-dom';


export default function CountryListView(props) {
  const [countryList, setCountryList] = useState([]);
  let history = useHistory();

  useEffect(() => {
      axios.get('api/countries')
      .then(response => {
        setCountryList(response.data);
      }).catch(response => {

      });
    
  }, []);

  
  
  return (
  <div>

    {countryList.map(item => <div><Link to={"crags?c="+item.code}>{item.slovenian_name}</Link></div>)}
  </div>
  );
}
