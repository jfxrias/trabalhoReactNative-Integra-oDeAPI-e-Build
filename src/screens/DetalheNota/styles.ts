import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  backBtn: {
    marginBottom: 20,
  },
  backBtnText: {
    fontSize: 16,
    fontWeight: '500',
  },
  noteCard: {
    padding: 22,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 20,
  },
  noteCategory: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 5,
  },
  noteTitle: {
    fontSize: 20,
    fontWeight: "bold",
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
    justifyContent: 'flex-start',
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
});
