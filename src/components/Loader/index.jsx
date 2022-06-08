import React from 'react';
import { View, ActivityIndicator } from 'react-native';

const Loading = ({ children, loading }) => {
  return loading ? (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator color="green" size={32} />
    </View>
  ) : (
    children
  );
};

export default Loading;
