import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useContentStore } from '../store/useStore';
import { colors } from '../theme/colors';
import { BookOpen, ChevronRight } from 'lucide-react-native';

export const HomeScreen = ({ navigation }: any) => {
  const subjects = useContentStore((state) => state.subjects);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Hello, Dr. Student</Text>
        <Text style={styles.subtitle}>Continue your learning journey</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Your Subjects</Text>
        {subjects.map((subject) => (
          <TouchableOpacity 
            key={subject.id} 
            style={styles.card}
            onPress={() => navigation.navigate('SubjectDetails', { subjectId: subject.id })}
          >
            <View style={styles.cardIcon}>
              <BookOpen color={colors.secondary} size={24} />
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{subject.title}</Text>
              <Text style={styles.cardSubtitle}>{subject.year} • {subject.progress}% Complete</Text>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: `${subject.progress}%` }]} />
              </View>
            </View>
            <ChevronRight color={colors.text.muted} size={20} />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: 24,
    backgroundColor: colors.primary,
    paddingTop: 60,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.surface,
  },
  subtitle: {
    fontSize: 16,
    color: colors.secondary,
    marginTop: 4,
  },
  section: {
    padding: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 16,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  cardContent: {
    flex: 1,
    marginRight: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
  },
  cardSubtitle: {
    fontSize: 12,
    color: colors.text.muted,
    marginTop: 4,
  },
  progressBar: {
    height: 4,
    backgroundColor: colors.border,
    borderRadius: 2,
    marginTop: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.success,
    borderRadius: 2,
  },
});
