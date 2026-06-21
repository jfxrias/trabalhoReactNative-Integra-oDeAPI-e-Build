import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  count: {
    fontSize: 14,
    color: '#666',
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 6,
    marginBottom: 20,
  },
  card: {
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  cardText: {
    fontSize: 16,
    color: '#333',
  },
  empty: {
    alignItems: 'center',
    marginTop: 40,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
    marginBottom: 5,
  },
  emptyText: {
    fontSize: 14,
    color: '#888',
    marginBottom: 10,
    textAlign: 'center',
  },
  clearButton: {
    backgroundColor: '#6200ee',
    padding: 10,
    borderRadius: 6,
  },
  clearButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
