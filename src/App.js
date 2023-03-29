import React, { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import MyForm from './MyForm';
import './App.css';
import SearchForm from './SearchForm';
import ContactInfo from './ContactInfo';

const App = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabSelect = (index) => {
    setActiveTab(index);
  };

  return (
    <div className="tabs-container">
      <header style={{ backgroundColor: '#f2f2f2', height: '100px' }}>
        <div className="logo">
          <img src="https://www.shutterstock.com/image-vector/go-web-icon-trendy-flat-600w-414685648.jpg" alt="Logo" />
          <h1>Obrt: za prevođenje i lekturu</h1>
        </div>
      </header>
      <Tabs selectedIndex={activeTab} onSelect={handleTabSelect}>
        <TabList>
          <Tab>Unos računa</Tab>
          <Tab>Pretraga</Tab>
          <Tab>O nama</Tab>
        </TabList>
        <TabPanel>
          <MyForm></MyForm>
        </TabPanel>
        <TabPanel>
          <h2>Pretraživanje računa, kupaca i usluga.</h2>
          <SearchForm></SearchForm>
        </TabPanel>
        <TabPanel>
          <ContactInfo></ContactInfo>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default App