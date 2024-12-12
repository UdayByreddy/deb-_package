import React, { useState } from 'react'
import { View,Text,Button } from 'react-native'
import { initializeNATS } from './NatsServer';
import { consumerOpts, StringCodec } from 'nats.ws';

export default function Subscriber() {
    const [recived,setRecived] = useState([]);

    const SubscribeData = async()=>{

        try{
            const natsConnection  = await initializeNATS();
            const jetStream = await natsConnection.jetstream();
            console.log('jetStream intlized');
            const subject = 'jet.stream.point';
            const durableName = "durable_subscriber";
            const sc = StringCodec();
    
            const opts = consumerOpts();
            opts.deliverTo(durableName);
            opts.ackNone();
            opts.deliverAll();
            
            const subscription = await jetStream.subscribe(subject,opts);
            console.log('subscribe the message',subject);
            (async () => {
                for await (const message of subscription) {
                  const data = sc.decode(message.data);
                  console.log(`Received message: ${data}`);
                  setRecived((preMessage)=>[...preMessage,data]);
                  message.ack();
                }
              })();
              console.log('Subscriber closed');

        }
        catch(err){
            console.log('error occured at subcribe part',err);
        }
    }
  return (
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <Text>Message Recived</Text>
        {
            recived.map((data,index)=>(
                <Text key={index}>{data}</Text>
            ))
        }
        <Button title='click to get the messages' onPress={SubscribeData} />
        
    </View>
  )
}
