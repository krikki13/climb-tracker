import { Table, TableRow, TableCell } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function CragRouteListView(props) {
  const [cragDetails, setCragDetails] = useState({});

  useEffect(() => {
    let cragId = props.match.params.id;
    axios.get(`api/crags/${cragId}/routes`)
    .then(response => {
      setCragDetails(response.data);
    });

  }, []);

  const renderTable = (cragDetails) => {
    if(!cragDetails || !cragDetails.name) {
      return "";
    }

    return (
      <Table aria-label="collapsible table">
        {cragDetails.sectors.map(sector => 
          <React.Fragment>
            <TableRow>
              <TableCell>{sector.name}</TableCell>
              <TableCell>{sector.routes.length} routes</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
              <Table size="small">
                {sector.routes.map(route =>
                  <TableRow>
                    <TableCell>{route.name}</TableCell>
                    <TableCell>{route.grade}</TableCell>
                    <TableCell>{route.length} m</TableCell>
                  </TableRow>
                )}
              </Table>
              </TableCell>
            </TableRow>
          </React.Fragment>
        )}
      </Table>);
  };

  return(
    <div>
      <h2>{cragDetails.name}</h2>
      Number of routes: {cragDetails.numOfRoutes}

      {renderTable(cragDetails)}
    </div>
  );
}