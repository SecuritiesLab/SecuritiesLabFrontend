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
        pb: { xs: 8, sm: 12 },
        maxWidth: '100%', // Set max width to 100% of parent
        maxHeight: '100vh', // Set max height to 100vh (adjust to your needs)
    }}
>
    <Box
        id="image"
        sx={(theme) => ({
            alignSelf: 'center',
            width: '100%', // Set width to 100% of container
            height: 'auto', // Set height to auto, so it adapts to image size
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
    >
        <img
            src={process.env.PUBLIC_URL + '/SecuritiesLabFlow.png'}
            alt="Image"
            style={{
                width: '100%',
                height: 'auto',
                borderRadius: '10px',
            }}
        />
    </Box>
</Container>
    );
}
