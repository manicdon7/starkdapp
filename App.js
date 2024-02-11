import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { connect, disconnect } from "starknetkit";
import './global'

function App() {
  const [connection, setConnection] = useState(null);
  const [account, setAccount] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    const connectToStarknet = async () => {
      try {
        const connection = await connect({
          modalMode: 'neverAsk',
          webWalletUrl: 'https://web.argent.xyz',
          argentMobileOptions: {
            projectId: '25a2434c0acd0dd7b8e25e76c44cf3e3',
            dappName: 'Element Market'
          }
        });

        if (connection && connection.isConnected) {
          setConnection(connection);
          setAccount(connection.account);
          setAddress(connection.selectedAddress);
        }
      } catch (error) {
        console.error('Error connecting to Starknet:', error);
      }
    };

    connectToStarknet(); // Call the function
  }, []);

  const connectWallet = async () => {
    try {
      const connection = await connect({
        webWalletUrl: 'https://web.argent.xyz',
        argentMobileOptions: {
          projectId: '25a2434c0acd0dd7b8e25e76c44cf3e3',
          dappName: 'Element Market'
        }
      });

      if (connection && connection.isConnected) {
        setConnection(connection);
        setAccount(connection.account);
        setAddress(connection.selectedAddress);
      }
    } catch (error) {
      console.error('Error connecting to Starknet:', error);
    }
  };

  const disconnectWallet = async () => {
    try {
      await disconnect();
      setConnection(null);
      setAccount('');
      setAddress('');
    } catch (error) {
      console.error('Error disconnecting from Starknet:', error);
    }
  };

  return (
    <View>
      {!connection ? (
        <TouchableOpacity onPress={connectWallet}>
          <Text>Connect</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={disconnectWallet}>
          <Text>{`${address.slice(0, 5)}...${address.slice(60, 66)}`}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

export default App;
