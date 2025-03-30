import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { sharedStyles } from './sharedStyles';

type CollapsibleSectionProps = {
  title: string;
  children: React.ReactNode;
};

const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({ title, children }) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <View>
      <TouchableOpacity onPress={toggleVisibility} style={sharedStyles.collapsibleHeader}>
        <ThemedText style={sharedStyles.collapsibleHeaderText}>{title}</ThemedText>
      </TouchableOpacity>
      {isVisible && <ThemedView style={sharedStyles.collapsibleContent}>{children}</ThemedView>}
    </View>
  );
};

export default CollapsibleSection;
