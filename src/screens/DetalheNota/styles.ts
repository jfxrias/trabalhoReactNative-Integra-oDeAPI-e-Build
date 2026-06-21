import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  noteCard: {
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  noteCategory: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 5,
  },
  noteTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  noteDate: {
    fontSize: 12,
    color: '#666',
    marginBottom: 10,
  },
  noteContent: {
    fontSize: 16,
    color: '#333',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  actionBtn: {
    padding: 10,
    backgroundColor: '#6200ee',
    borderRadius: 6,
  },
  actionBtnText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
