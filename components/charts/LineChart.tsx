import { View, Text, StyleSheet, Dimensions } from "react-native";
import { LineChart } from "react-native-gifted-charts";
import { Colors } from "../../theme/colors";


const screenWidth = Dimensions.get("window").width;


type Props = {
  title: string;
  data: {
    value:number;
    label:string;
  }[];
};


export default function UsageLineChart({
  title,
  data,
}:Props) {


return (

<View style={styles.card}>


<Text style={styles.title}>
 {title}
</Text>



<LineChart

data={data}

height={220}

width={screenWidth - 70}


spacing={35}


thickness={3}

color={Colors.primary}


curved


isAnimated

animationDuration={1200}



hideRules

hideYAxisText


yAxisThickness={0}

xAxisThickness={0}



dataPointsColor={Colors.primary}

dataPointsRadius={5}



areaChart


startFillColor={Colors.primary}

endFillColor={Colors.primary}

startOpacity={0.25}

endOpacity={0.05}



pointerConfig={{

pointerStripHeight:160,

pointerStripWidth:2,

pointerStripColor:Colors.primary,


pointerColor:Colors.primary,


radius:7,


pointerLabelWidth:90,

pointerLabelHeight:50,


pointerLabelComponent:(items:any)=>{


return (

<View style={styles.tooltip}>


<Text style={styles.tooltipText}>

{items[0].value} Used

</Text>


<Text style={styles.dateText}>

{items[0].label}

</Text>


</View>

)

}

}}


/>

</View>

)

}



const styles = StyleSheet.create({

card:{
backgroundColor:Colors.card,
borderRadius:16,
padding:15,
marginTop:12,
elevation:4,

// Important
overflow:"visible",
},


title:{
fontSize:16,
fontWeight:"700",
color:Colors.text,
marginBottom:15,
},



tooltip:{
backgroundColor:"#222",
paddingHorizontal:10,
paddingVertical:8,
borderRadius:8,
alignItems:"center",

// prevents clipping
minWidth:80,

},


tooltipText:{
color:"#fff",
fontSize:13,
fontWeight:"700",
},


dateText:{
color:"#ddd",
fontSize:11,
marginTop:3,
}


});