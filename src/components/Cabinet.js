import React, { useState, useEffect } from 'react';
import { VStack, Image, Input, Icon, Box, Divider, Center } from 'native-base';
import { Animated, SafeAreaView, Button, Text } from 'react-native';
import axios from 'axios';

// components
import Header from './Header';


const Cabinet = () => {
  const [inputValue, setInputValue] = useState('');
/*   const [scrollYValue, setScrollYValue] = useState(new Animated.Value(0));
 */  const [cabinetItems, setCabinetItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  /* const clampedScroll = Animated.diffClamp(
    Animated.add(
      scrollYValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
        extrapolateLeft: 'clamp',
      }),
      new Animated.Value(0),
    ),
    0,
    50,
  ) */

  const handleSearch = async() => {
    console.log(inputValue);
    try {
      const { data } = await axios.get('http://192.168.178.123:8002/cabinet/items/630f488243702ea0df8bf333');
      setCabinetItems(data);
    } catch (error) {
      console.log(error)
    }finally {
      setIsLoading(false);
    }
    }

  const getIngredients = async() => {
    try {
      const { data } = await axios.get('http://192.168.178.123:8002/cabinet/items/item/630dff86aa1ea3a726d5c230');
      setCabinetItems(data);  
    } catch (error) {
      console.log(error)
    }finally {
      setIsLoading(false);
    }
    }

    useEffect(() => {
      getIngredients();
    }, []);
    console.log(cabinetItems);
  return (
    <Animated.View>


      
      <SafeAreaView>
        <Header header="Cabinet" />
        <Center>
         <VStack my="4" space={5} w="100%" maxW="300px" divider={<Box px="2">
          <Divider />
        </Box>}> 
      
        <Input defaultValue={inputValue} onChangeText={(newText)=> setInputValue(newText)} placeholder="Search" variant="filled" width="100%" borderRadius="10" py="1" px="2" InputLeftElement={<Icon ml="2" size="4" color="gray.400" />} />
       <Button title="Search" onPress={handleSearch} />
       </VStack></Center>
        <Image source={require('../../assets/images/cabinet.jpg')} alt="Kitchen Cabinet" resizeMode="cover" />
        
       {!isLoading && cabinetItems.map(item => <Text key={item._id}>{item.name}</Text>)} 
       
      </SafeAreaView>
    </Animated.View>
  );
};

export default Cabinet;