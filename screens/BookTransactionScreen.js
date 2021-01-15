import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TouchableHighlightComponent, Image } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as Permissions from 'expo-permissions';

export default class BookTransactionScreen extends React.Component{
constructor(){
super();
this.state={
hasCameraPermissions:null,
scanned:false,
scannedData:'',
buttonState:'normal',
}
}

getCameraPermissions=async()=>{
const { status } = await Permissions.askAsync(Permissions.CAMERA);
this.setState({
hasCameraPermissions:status === 'granted'
})
}

handleBarCodeScan=async({type, data})=>{
this.setState({
scanned:true,
scannedData:data,
buttonState:null,
})
}
render(){
const hasCameraPermissions=this.state.hasCameraPermissions;
const scanned=this.state.scanned;
const buttonState=this.state.buttonState;

if(buttonState === 'clicked' && hasCameraPermissions){
return(
<BarCodeScanner
onBarCodeScanned={scanned ? undefined:this.handleBarCodeScan}
style={StyleSheet.absoluteFillObject}/>
)
}

else if(buttonState === "normal"){
return(
<View style={styles.container}>
<Text style={styles.displayText}>
{
hasCameraPermissions === true ? this.state.scannedData:"REQUEST CAMERA PERMMISION"
}
</Text>
<Image style={{width:50, height:40, margin:50}}
source={"Scanner"}/>
<TouchableOpacity
onPress={this.getCameraPermissions}
style={styles.scanButton}
title="Bar Code Scanner">
<Text style={styles.buttonText}> Scan QR Code </Text>
</TouchableOpacity>
</View>
)
}
}
}

const styles=StyleSheet.create({
container:{
flex:1,
justifyContent:'center',
alignItems:'center',
},
displayText:{
fontSize:15,
textDecorationLine:'underline',
},
scanButton:{
backgroundColor:'purple',
padding:10,
margin:10,
},
buttonText:{
fontSize:20,
fontWeight:'bold',
}
})