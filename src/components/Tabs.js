import React, { useState } from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import ProductionMovie from '../views/Tmdb/Movies/Production'
import ProductionSerie from '../views/Tmdb/Series/Production'
import AllPosts from '../views/Posts/AllPosts'
import tab from '../styles/components/tab'

const Tabs = ({ id, movie, serie, t, language }) => {
  const [selectedTab, setSelectedTab] = useState('about')

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={styles.tab}
          onPress={() => setSelectedTab('about')}
        >
          <Text
            style={
              selectedTab === 'about' ? styles.selectedTabText : styles.tabText
            }
          >
            {t('about')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tab}
          onPress={() => setSelectedTab('posts')}
        >
          <Text
            style={
              selectedTab === 'posts' ? styles.selectedTabText : styles.tabText
            }
          >
            {t('posts')}
          </Text>
        </TouchableOpacity>
      </View>
      {selectedTab === 'about' &&
        (movie ? (
          <ProductionMovie id={id} movie={movie} language={language} t={t} />
        ) : serie ? (
          <ProductionSerie id={id} serie={serie} language={language} t={t} />
        ) : null)}

      {selectedTab === 'posts' && <AllPosts id={id} movie={movie} serie={serie} />}
    </View>
  )
}

const styles = StyleSheet.create({
  container: tab.container,
  tabContainer: tab.tabContainer,
  tab: tab.tab,
  tabText: tab.tabText,
  selectedTabText: tab.selectedTabText,
})

export default Tabs
