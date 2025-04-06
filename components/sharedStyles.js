import { StyleSheet } from 'react-native';

export const sharedStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 40, // Ensure top content is visible
    backgroundColor: '#000000', // Black background color
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#d9d9d9', // Dark white text color for titles
    marginBottom: 20,
  },
  subHeader: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff', // White text color for sub-fonts
    marginBottom: 10,
  },
  input: {
    borderColor: '#ced4da', // Light border color
    padding: 10,
    marginBottom: 12,
    borderRadius: 8,
    backgroundColor: '#ffffff', // White background color
    fontSize: 16,
    color: '#000000', // Black text color
  },
  button: {
    marginVertical: 8,
    borderRadius: 8,
    backgroundColor: '#0075be', // Cyan button color
    paddingVertical: 10, // Consistent button size
    paddingHorizontal: 20, // Consistent button size
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff', // White text color for button text
  },
  total: {
    fontSize: 18,
    color: '#ffffff', // White text color for totals
    marginVertical: 5,
  },
  collapsibleHeader: {
    padding: 11,
    marginVertical: 5,
    borderRadius: 8,
    backgroundColor: '#0075be', // Cyan collapsible header color
    alignItems: 'center',
  },
  collapsibleHeaderText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff', // White text color for collapsible headers
  },
  collapsibleContent: {
    padding: 13,
    marginVertical: 5,
    borderRadius: 8,
    backgroundColor: '#000000', // Black background color
  },
  allocationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
    backgroundColor: '#000000', // Black background color
  },
  contentBackground: {
    padding: 15,
    borderRadius: 8,
    backgroundColor: '#000000', // Black background color
    marginBottom: 10,
  },
});