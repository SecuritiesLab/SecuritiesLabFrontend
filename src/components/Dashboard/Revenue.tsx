import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title'

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

export default function Revenue() {
  return (
    <React.Fragment>
      <Title>Revenue</Title>
      <Typography component="p" variant="h4">
        $47,817.03
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        on 11 September, 2024
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          Revenue details
        </Link>
      </div>
    </React.Fragment>
  );
}