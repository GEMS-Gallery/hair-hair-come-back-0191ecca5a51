import React from 'react';
import { Typography, Box } from '@mui/material';

const HairLossStages: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Hair Loss Stages
      </Typography>
      <Box
        component="svg"
        viewBox="0 0 500 200"
        sx={{ width: '100%', height: 'auto', maxWidth: 600, margin: 'auto', display: 'block' }}
      >
        <rect x="0" y="0" width="500" height="200" fill="#f0f0f0" />
        <circle cx="100" cy="100" r="80" fill="#d4e6f1" stroke="#3498db" strokeWidth="2" />
        <circle cx="250" cy="100" r="80" fill="#d4e6f1" stroke="#3498db" strokeWidth="2" />
        <circle cx="400" cy="100" r="80" fill="#d4e6f1" stroke="#3498db" strokeWidth="2" />
        <path d="M 50 100 Q 100 20 150 100" stroke="#2c3e50" strokeWidth="2" fill="none" />
        <path d="M 200 100 Q 250 40 300 100" stroke="#2c3e50" strokeWidth="2" fill="none" />
        <path d="M 350 100 Q 400 60 450 100" stroke="#2c3e50" strokeWidth="2" fill="none" />
        <text x="100" y="190" textAnchor="middle" fill="#2c3e50">Stage 1</text>
        <text x="250" y="190" textAnchor="middle" fill="#2c3e50">Stage 2</text>
        <text x="400" y="190" textAnchor="middle" fill="#2c3e50">Stage 3</text>
      </Box>
      <Typography variant="body1" paragraph sx={{ mt: 2 }}>
        Hair loss typically progresses through several stages. In the early stage, you might notice
        slight thinning. As it progresses, the hairline may recede and the crown area may become
        more visible. In advanced stages, hair loss becomes more pronounced, potentially leading
        to significant baldness.
      </Typography>
    </Box>
  );
};

export default HairLossStages;
