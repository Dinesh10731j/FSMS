
import { StyleSheet, Text, View, TextInput, TextInputProps} from 'react-native';

// We extend TextInputProps so our custom component inherits all native TextInput features automatically
interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
}

export const Input = ({ label, error, style, ...props }: InputProps) => {
  return (
    <View style={styles.container}>
      {/* Render label if provided */}
      {label && <Text style={styles.label}>{label}</Text>}
      
      <TextInput
        style={[
          styles.input,
          error ? styles.inputError : null,
          style, // Allows overriding styles from the outside
        ]}
        placeholderTextColor="#9ca3af" // Tailwind gray-400 equivalent
        {...props} // Spreads all native text input props (onChangeText, value, etc.)
      />

      {/* Render error message if provided */}
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151', // gray-700
    marginBottom: 6,
  },
  input: {
    width: '100%',
    height: 48,
    borderWidth: 1,
    borderColor: '#d1d5db', // gray-300
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    color: '#1f2937', // gray-800
    backgroundColor: '#fff',
  },
  inputError: {
    borderColor: '#ef4444', // red-500
  },
  errorText: {
    fontSize: 12,
    color: '#ef4444', // red-500
    marginTop: 4,
  },
});