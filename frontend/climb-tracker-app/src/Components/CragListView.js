import axios from 'axios';
import { useEffect, useState } from 'react';
import Link from 'react-router-dom/es/Link';
import '../index.css';
import queryString from 'query-string';
import { useHistory } from 'react-router';
import { TextField } from '@mui/material';


function CragListView(props) {
  const [cragList, setCragList] = useState([]);
  const [filter, setFilter] = useState('');
  let history = useHistory();
  let params = queryString.parse(props.location.search);

  useEffect(() => {
    
    if(Object.keys(params).length !== 0) {
      if(!params['c']) {
        history.push("crags");
        return;
      }

      axios.get('api/crags/' + params['c'])
      .then(response => {
        setCragList(response.data);
      }).catch(response => {
        if(response.response.status == 404) {
          history.push("crags");
        }
      });
    } 
  }, [params['c']]);

  
  
  return (
  <div>
  <TextField
        label={"Filter"}
        value={filter}
        onChange={value => setFilter(value)}
        />
    {cragList.map(item => <div>{item.name}</div>)}
  </div>
  );
}

export default CragListView;
