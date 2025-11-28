import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { colors } from '../theme/colors';
import { MOCK_MCQS } from '../data/mockData';

// Simple Tab Implementation for Reader
const TABS = ['Notes', 'Summary', 'Mindmap', 'MCQs'];

export const ReaderScreen = ({ route }: any) => {
  const [activeTab, setActiveTab] = useState('Notes');
  const { subtopicId } = route.params || { subtopicId: 'demo' };

  const renderContent = () => {
    switch (activeTab) {
      case 'Notes':
        return (
          <ScrollView style={styles.contentContainer}>
            <Text style={styles.heading}>Pectoral Region</Text>
            <Text style={styles.paragraph}>
              The pectoral region is located on the anterior chest wall. It contains the pectoral muscles, which are essential for upper limb movement.
            </Text>
            <Text style={styles.subheading}>Muscles</Text>
            <Text style={styles.paragraph}>
              1. Pectoralis Major{'\n'}
              2. Pectoralis Minor{'\n'}
              3. Subclavius
            </Text>
          </ScrollView>
        );
      case 'MCQs':
        return (
          <ScrollView style={styles.contentContainer}>
            {MOCK_MCQS.map((mcq, index) => (
              <View key={mcq.id} style={styles.mcqCard}>
                <Text style={styles.mcqQuestion}>{index + 1}. {mcq.question}</Text>
                {mcq.options.map((opt, i) => (
                  <TouchableOpacity key={i} style={styles.option}>
                    <Text>{opt}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            ))}
          </ScrollView>
        );
      default:
        return (
          <View style={styles.center}>
            <Text>Content coming soon for {activeTab}</Text>
          </View>
        );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabBar}>
        {TABS.map((tab) => (
          <TouchableOpacity 
            key={tab} 
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {renderContent()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    elevation: 2,
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: colors.primary,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text.muted,
  },
  activeTabText: {
    color: colors.primary,
  },
  contentContainer: {
    padding: 24,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 16,
  },
  subheading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginTop: 16,
    marginBottom: 8,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.text.secondary,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mcqCard: {
    backgroundColor: colors.surface,
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  mcqQuestion: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  option: {
    padding: 12,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    marginBottom: 8,
  },
});
