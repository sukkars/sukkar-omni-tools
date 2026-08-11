import React from 'react';
import { Box, Stack, Typography, Link, Divider } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        mt: 6,
        py: 3,
        px: 2,
        borderTop: 1,
        borderColor: 'divider',
        textAlign: 'center'
      }}
    >
      <Stack
        direction="row"
        spacing={1.5}
        justifyContent="center"
        alignItems="center"
        flexWrap="wrap"
        sx={{ mb: 1 }}
      >
        <Link
          component={RouterLink}
          to="/"
          underline="hover"
          color="text.primary"
          sx={{ '&:hover': { color: 'primary.main' } }}
        >
          🛠️ Tools
        </Link>
        <Divider orientation="vertical" flexItem />
        <Link
          href="https://sukkarshop.com"
          target="_blank"
          rel="noopener"
          underline="hover"
          color="text.primary"
          sx={{ '&:hover': { color: 'primary.main' } }}
        >
          🏠 Homepage
        </Link>
      </Stack>

      <Typography variant="body2" color="text.secondary">
        <strong>Sukkar Toolbox</strong> — Powered by{' '}
        <Link
          href="https://sukkarshop.com"
          target="_blank"
          rel="noopener"
          underline="hover"
          color="inherit"
        >
          sukkarshop.com
        </Link>
      </Typography>

      <Typography
        variant="caption"
        color="text.secondary"
        sx={{ display: 'block', mt: 0.5, opacity: 0.7 }}
      >
        All tools run entirely in your browser — we do not collect any personal
        data. Use at your own responsibility.
      </Typography>
    </Box>
  );
};

export default Footer;
