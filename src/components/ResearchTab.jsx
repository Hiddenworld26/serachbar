import React, { useState, useEffect } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import SchoolIcon from '@mui/icons-material/School'; 
import WorkIcon from '@mui/icons-material/Work'; 
import axios from 'axios';
import './Style.css';

export function ResearchTab() {
  const [activeTab, setActiveTab] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [academic, setAcademic] = useState(true);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleTabChange = (event, newTab) => {
    setActiveTab(newTab);
  };

  const handleSearch = async () => {
    if (searchTerm.trim()) {
      setLoading(true);

      try {
        const response = await axios.post('https://api.gyanibooks.com/search_publication/', {
          keyword: searchTerm,
          limit: 10,
          isAcademic: academic,
        });

        setSearchResults(response.data);
      } catch (error) {
        console.error('Error fetching data from the API:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div>
      <Tabs 
        value={activeTab}
        onChange={handleTabChange}
        centered
      >
        <Tab classname="tabpanel" label="Research" value={0} />
        <Tab classname="tabpanel"label="Summarize" value={1} />
        <Tab classname="tabpanel" label="Chat with PDF" value={2} />
        <Tab  classname="tabpanel"label="Publish" value={3} />
      </Tabs>

      {activeTab === 0 && (
        <div>
          <div classname="toggle">
          <ToggleButtonGroup
            value={academic ? 'academic' : 'non-academic'}
            exclusive
            onChange={() => setAcademic(!academic)}
            style={{ marginBottom: '20px' }}
          >
            <ToggleButton value="academic" aria-label="academic">
              <SchoolIcon /> Academic
            </ToggleButton>
            <ToggleButton value="non-academic" aria-label="non-academic">
              <WorkIcon /> Non-Academic
            </ToggleButton>
          </ToggleButtonGroup>
          </div>

          <TextField
            label="Search Material"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            fullWidth
            InputProps={{
              endAdornment: (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSearch}
                  startIcon={<SearchIcon />}
                >
                 
                </Button>
              ),
            }}
          />

          {loading && <p>Loading...</p>}

          {searchResults.map((result, index) => (
            <div key={index}>{result.title}</div>
          ))}
        </div>
      )}

      
    </div>
  );
}

export default ResearchTab;
