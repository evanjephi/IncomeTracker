const tintColorLight = '#0a7ea4';  // Accent color for light mode
const tintColorDark = '#0a7ea4';   // Accent color for dark mode (you could change this if desired)

export const Colors = {
  light: {
    text: '#11181C',                // Dark text for readability
    background: '#FFFFFF',          // Light background
    tint: tintColorLight,           // Accent color for light mode
    icon: '#687076',                // Neutral icon color
    tabIconDefault: '#687076',      // Default tab icon color
    tabIconSelected: tintColorLight, // Selected tab icon color
    placeholder: '#B0B0B0', 
  },
  dark: {
    text: '#ECEDEE',                // Light text for dark mode
    background: '#1E1E1E',          // Dark background for contrast
    tint: tintColorDark,            // Accent color for dark mode
    icon: '#9BA1A6',                // Lighter icon color for dark mode
    tabIconDefault: '#9BA1A6',      // Default tab icon color for dark mode
    tabIconSelected: tintColorDark, // Selected tab icon color for dark mode
    placeholder: '#A1A1A1',
  },
};
