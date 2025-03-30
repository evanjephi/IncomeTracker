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
    color: '#ffffff', // White text color
    marginBottom: 20,
  },
  subHeader: {
    fontSize: 18,
    fontWeight: '600',
    color: '#b0b0b0', // Slightly lighter text color
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
    color: '#ffffff', 
  },
  total: {
    fontSize: 18,
    color: '#ffffff', // White text color
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
    color: '#ffffff', // Black text color
  },
  collapsibleContent: {
    padding: 13,
    marginVertical: 5,
    borderRadius: 8,
    backgroundColor: '#000000', // Black background color for content
  },
  allocationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
    backgroundColor: '#000000', // Black background color for content
  },
});
