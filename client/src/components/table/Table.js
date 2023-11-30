import {Button, Heading, Pane, Table, ManualIcon } from "evergreen-ui";
import React, { useState, useEffect } from "react";

const Tables = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [showPane, setShowPane] = useState(false);

  const handleDecryptButtonClick = async (dataId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/getContents/${dataId}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch decrypted data');
      }

      const result = await response.json();
      
      console.log(result);
      // Update the data array with decrypted data
      setData((prevData) =>
        prevData.map((edata) =>
          edata.dataId === dataId ? { ...edata, encryptedData: result} : edata
        )
      );
    } catch (error) {
      console.error('Error fetching decrypted data:', error.message);
    }
  };

  useEffect(() => {
    // Fetch data when the component mounts
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/getContents', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const result = await response.json();
      setData(result);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleButtonClick = async () => {
    // Toggle showPane state when the button is clicked
    setShowPane(!showPane);

    // Fetch updated data for the table
    await fetchData();
  };

  return (
    <>
    <br></br>
    
      <Button height={50} marginLeft={760}  display="flex" appearance="primary" iconBefore={ManualIcon} onClick={handleButtonClick}>
        Show/Hide Encrypted Data
      </Button>

      {showPane && (
        <Pane alignItems="center" justifyContent="center" display="flex" paddingTop={50}>
          <Pane width="70%" padding={16} background="skyBlue" borderRadius={3} elevation={4}>
            {error ? (
              <p>Error: {error}</p>
            ) : (
              <Table>
                <Heading size={900} marginTop="10" marginBottom="10">
                  Encrypted Content
                </Heading>
                <Table.Head>
                  
                  <Table.TextHeaderCell>Encrypted Data</Table.TextHeaderCell>
                  <Table.TextHeaderCell>Decrypt Data</Table.TextHeaderCell>
                </Table.Head>
                <Table.Body height={240}>
                  {data.map((edata) => (
                    <Table.Row key={edata.dataId}>
                      
                      <Table.TextCell>{edata.encryptedData}</Table.TextCell>
                      <Table.Cell>
                        <Button 
                          height={24}
                          onClick={() => handleDecryptButtonClick(edata.dataId)}
                        >
                          Decrypt Data
                        </Button>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            )}
          </Pane>
        </Pane>
      )}
    </>
  );
};

export default Tables;
