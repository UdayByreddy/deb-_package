import React, { useState } from 'react'
import { Button,View,Text, TextInput } from 'react-native'
import { initializeNATS } from './NatsServer';
import { StringCodec } from 'nats.ws';

function Publisher() {

    const [message,setMessage] = useState('');

    const publishTheMessage = async()=>{
        try{
            const nats = await initializeNATS();
            const jetStream = await nats.jetstream();
            const sc = StringCodec();
            const subject = 'jet.stream.point';

            await jetStream.publish(subject,message);
            console.log('message publish',message);
            setMessage('');
        }
        catch(err){
            console.log('Error occured at publishing',err);
        }

    }
  return (
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <Text>Click to publish the message</Text>
        <TextInput placeholder='Enter the message' value={message} onChangeText={setMessage} style={{padding:20,borderRadius:10,borderColor:'black'}} />
        <Button title='Click to publish' onPress={publishTheMessage} />
    </View>
  )
}

export default Publisher