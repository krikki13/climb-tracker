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
        setCragList(response.data.map(item => {
          item.simplifiedName = item.name.replaceAll(/[ /\-,()]+/g, " ").replaceAll("'", "");
          return item;
        }));
      }).catch(response => {
        if(response.response.status == 404) {
          history.push("crags");
        }
      });
    } 
  }, [params['c']]);

  var filter1 = filter.trim().replace("c", "[cčć]").replace("s", "[sš]").replace("z", "[zž]").replace("d", "[dđ]").replaceAll(/[ /\-,()]+/g, " ").replaceAll("'", "");
  var re = new RegExp("(?:^|\\W)" + filter1, "i");
  return (
  <React.Fragment>
  <TextField
        autoFocus={true}
        size="small"
        type="search"
        label={"Filter"}
        value={filter}
        onChange={event => setFilter(event.target.value)}
        />
    <DataGrid
      rows={cragList.filter(item => !filter1 || item.simplifiedName && re.test(item.simplifiedName))}
      columns={tableColumns}
      pagination={false} />
  </React.Fragment>
  );
}

const tableColumns = [
  { field: 'name', headerName: 'Name', flex: 1},
  { field: 'num_of_routes', headerName: 'Number of routes', flex: 1 }
];

export default CragListView;
