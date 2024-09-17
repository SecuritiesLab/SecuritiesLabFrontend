import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title'
import { useTranslation } from 'react-i18next';

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

export default function Yield() {
  const { t } = useTranslation();

  return (
    <React.Fragment>
      <Title>{t('yieldGenerated.title')}</Title>
      <Typography component="p" variant="h4">{t('yieldGenerated.amount')}</Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>{t('yieldGenerated.date')}</Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>{t('yieldGenerated.viewDetails')}</Link>
      </div>
    </React.Fragment>
  );
}