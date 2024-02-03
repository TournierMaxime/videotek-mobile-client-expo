import React, { useState } from 'react';
import { ScrollView, RefreshControl } from 'react-native';

const Refresh = ({ children, onRefresh, styles }) => {
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    await onRefresh();
    setRefreshing(false);
  };

  return (
    <ScrollView style={styles ? styles : null} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}>
      {children}
    </ScrollView>
  );
};

export default Refresh;
