import Box from '@mui/material/Box';
import { alpha } from '@mui/material';
import Container from '@mui/material/Container';

export default function AddFullSizeImage() {
    return (
        <Container
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                pt: { xs: 14, sm: 20 },
                pb: { xs: 8, sm: 12 },
            }}
        >
            <Box
                id="image"
                sx={(theme) => ({
                    mt: { xs: 8, sm: 10 },
                    alignSelf: 'center',
                    height: { xs: 200, sm: 700 },
                    width: '100%',
                    backgroundImage:
                        theme.palette.mode === 'light'
                            ? `url(${process.env.PUBLIC_URL}/SecuritiesLabFlow.png)`
                            : `url(${process.env.PUBLIC_URL}/SecuritiesLabFlow.png)`,
                    backgroundSize: 'cover',
                    borderRadius: '10px',
                    outline: '1px solid',
                    outlineColor:
                        theme.palette.mode === 'light'
                            ? alpha('#BFCCD9', 0.5)
                            : alpha('#9CCCFC', 0.1),
                    boxShadow:
                        theme.palette.mode === 'light'
                            ? `0 0 12px 8px ${alpha('#9CCCFC', 0.2)}`
                            : `0 0 24px 12px ${alpha('#033363', 0.2)}`,
                })}
            />
        </Container>
    );
}
