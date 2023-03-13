import React, {useCallback, useReducer} from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {getList} from './api/picsum';
import PhotoGrid from './components/photo-grid';
import {actionCreators, initialState, reducer} from './reducers/photos';

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [photos, nextPage, loading, error] = state;

  const fetchPhotos = useCallback(async () => {
    dispatch(actionCreators.loading());

    try {
      const nextPhotos = await getList(nextPage);
      dispatch(actionCreators.success(nextPhotos, nextPage));
    } catch (error) {
      dispatch(actionCreators.failure());
    }
  }, [nextPage]);

  useEffect(() => {
    fetchPhotos();
  }, []);

  // We will show an error only if the first page fails to load
  if (photos.length === 0) {
    if (loading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator animating={true} />
        </View>
      );
    }

    if (error) {
      return (
        <View style={styles.container}>
          <Text>Failed to load photos!</Text>
        </View>
      );
    }
  }

  return <PhotoGrid numColumns={3} photos={photos} />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
