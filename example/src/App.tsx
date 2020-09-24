import * as React from 'react'
import { View, Button } from 'react-native'
import TestOffline from './TestOffline'
import TestApi from './TestApi'
import TestMap from './TestMap'

export default function App() {
  const [demo, setDemo] = React.useState<string>('Offline')

  return (
    <View style={{ flex: 1, flexDirection: 'column' }}>
      <View style={{ flexDirection: 'row' }}>
        <View style={{ flex: 1 }}>
          <Button title="Offline demo" onPress={() => setDemo('Offline')} />
        </View>
        <View style={{ flex: 1 }}>
          <Button
            color="#446"
            title="Api demo"
            onPress={() => setDemo('Api')}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Button title="Map demo" onPress={() => setDemo('Map')} />
        </View>
      </View>
      {demo === 'Offline' && <TestOffline />}
      {demo === 'Api' && <TestApi />}
      {demo === 'Map' && <TestMap />}
    </View>
  )
}
