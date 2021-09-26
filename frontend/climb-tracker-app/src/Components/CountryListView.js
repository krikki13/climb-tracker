import axios from 'axios';
import { useEffect, useState } from 'react';
import '../index.css';
import { useHistory } from 'react-router-dom';
import { List, ListItemText, ListItemButton } from '@mui/material';


export default function CountryListView(props) {
  const [countryList, setCountryList] = useState([]);

  let history = useHistory();

  useEffect(() => {
      axios.get('api/countries')
      .then(response => {
        setCountryList(response.data);
      });
  }, []);

  
  return (
    <div style={{marginLeft: "10px", height: "500px", width: "400px"}}>
      <List dense>
        {countryList.map(item => 
          <ListItemButton onClick={() => history.push("crags?c=" + item.code)}>
            <ListItemText key={item.code} primary={item.slovenian_name} />
          </ListItemButton>)}
      </List>
    </div>
  );
}
