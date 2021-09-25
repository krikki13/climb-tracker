import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Link from 'react-router-dom/es/Link';
import '../index.css';
import queryString from 'query-string';
import { useHistory } from 'react-router';
import { TableBody, TableCell, TableRow, TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';


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
  <React.Fragment>
  <TextField
        size="small"
        label={"Filter"}
        value={filter}
        onChange={value => setFilter(value)}
        />
    <DataGrid
    rows={cragList}
    columns={tableColumns} />
  </React.Fragment>
  
  );
}

const tableColumns = [
  { field: 'name', width: 250}
];

export default CragListView;
