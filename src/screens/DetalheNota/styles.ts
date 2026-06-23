import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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
    borderWidth: 1,
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
    marginBottom: 10,
  },
  noteContent: {
    fontSize: 16,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  shareBtn: {
    padding: 12,
    borderRadius: 8,
    minWidth: 120,
    alignItems: 'center',
  },
  shareBtnText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  backBtn: {
    marginBottom: 20,
  },
  backBtnText: {
    fontSize: 16,
    fontWeight: '500',
  }
});