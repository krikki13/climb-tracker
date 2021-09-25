import axios from 'axios';
import { useEffect, useState } from 'react';
import Link from 'react-router-dom/es/Link';
import '../index.css';
import queryString from 'query-string';
import { useHistory } from 'react-router-dom';
import { Box, List, ListItem, ListItemText, TextField, ListItemButton } from '@mui/material';


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
    <div style={{marginLeft: "10px", height: "500px", width: "400px"}}>
      <List dense>
        {countryList.map(item => <ListItemButton><ListItemText key={item.code} primary={item.slovenian_name} /></ListItemButton>)}
      </List>
    </div>
  );
}
