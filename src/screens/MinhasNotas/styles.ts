import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: "900", // Peso extra na fonte
    marginBottom: 25,
    letterSpacing: -0.5,
  },
  input: {
    borderRadius: 14, // Cantos mais arredondados
    padding: 16,
    fontSize: 16,
    marginBottom: 10,
  },
  noteCard: {
    padding: 22,
    borderRadius: 20, // Card bem arredondado estilo iOS
    marginBottom: 18,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 0, // Tiramos a borda para ficar mais "limpo"
  },
  noteText: {
    fontSize: 17,
    lineHeight: 26,
    marginBottom: 18,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 20,
  },
  primaryBtn: {
    padding: 18,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 10,
  },
  primaryBtnText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 16,
    letterSpacing: 0.5,
  },
  actionText: {
    fontWeight: '700',
    fontSize: 15,
  }
});

export default styles;