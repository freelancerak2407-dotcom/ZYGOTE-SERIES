import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Button } from '../components/Button';
import { colors } from '../theme/colors';
import { useUserStore } from '../store/useStore';

export const OnboardingScreen = () => {
  const completeOnboarding = useUserStore((state) => state.completeOnboarding);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Welcome to Zygote Series</Text>
        <Text style={styles.subtitle}>Master MBBS with premium notes, mind maps, and quizzes.</Text>
      </View>
      <View style={styles.footer}>
        <Button title="Get Started" onPress={completeOnboarding} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    justifyContent: 'space-between',
    padding: 24,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.secondary,
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    color: colors.text.inverted,
    textAlign: 'center',
    opacity: 0.9,
  },
  footer: {
    paddingBottom: 32,
  },
});
