import { connect } from "nats.ws";

const NATS_SERVER_URL = "ws://192.168.0.24:8080";

let natsConnection = null;


export const initializeNATS = async () => {
    try{
        if(!natsConnection){
            natsConnection = await connect({
                servers:[NATS_SERVER_URL]
            });
            console.log('Nats server connected');
    
            const jetStreamManger = await natsConnection.jetstreamManager();
            console.log('jetStream connected');
    
            const stream = 'jet_stream';
            const streamConfig = {name:stream,subjects:['jet.stream.*']}
            await jetStreamManger.streams.add(streamConfig);
            console.log('Stream created');
    
        }
        return natsConnection;
    }
    catch(err){
        console.log('error while connecting to nats',err);
    }

}