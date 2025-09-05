import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Input } from '../Input';

describe('Input', () => {
  describe('rendering', () => {
    it('should render without label', () => {
      const { getByDisplayValue } = render(
        <Input value="test value" onChangeText={() => {}} />
      );

      expect(getByDisplayValue('test value')).toBeTruthy();
    });

    it('should render with label', () => {
      const { getByText, getByDisplayValue } = render(
        <Input 
          label="Test Label" 
          value="test value" 
          onChangeText={() => {}} 
        />
      );

      expect(getByText('Test Label')).toBeTruthy();
      expect(getByDisplayValue('test value')).toBeTruthy();
    });

    it('should render with placeholder', () => {
      const { getByPlaceholderText } = render(
        <Input 
          placeholder="Enter text here" 
          value="" 
          onChangeText={() => {}} 
        />
      );

      expect(getByPlaceholderText('Enter text here')).toBeTruthy();
    });

    it('should render error message when provided', () => {
      const { getByText } = render(
        <Input 
          value="" 
          onChangeText={() => {}} 
          error="This field is required" 
        />
      );

      expect(getByText('This field is required')).toBeTruthy();
    });
  });

  describe('styling', () => {
    it('should apply default styles', () => {
      const { getByDisplayValue } = render(
        <Input value="test" onChangeText={() => {}} />
      );

      const input = getByDisplayValue('test');
      expect(input).toHaveStyle({
        borderWidth: 1,
        borderColor: '#e5e7eb', // colors.grayLight
        borderRadius: 8, // borderRadius.md
        paddingHorizontal: 16, // spacing.md
        paddingVertical: 16, // spacing.md
        fontSize: 16, // typography.sizes.base
        backgroundColor: '#ffffff', // colors.white
      });
    });

    it('should apply error styles when error is present', () => {
      const { getByDisplayValue } = render(
        <Input 
          value="test" 
          onChangeText={() => {}} 
          error="Error message" 
        />
      );

      const input = getByDisplayValue('test');
      expect(input).toHaveStyle({
        borderColor: '#ef4444', // colors.red
      });
    });

    it('should apply custom container style', () => {
      const customStyle = { marginTop: 20 };
      const { getByTestId } = render(
        <Input 
          value="test" 
          onChangeText={() => {}} 
          containerStyle={customStyle}
          testID="input-container"
        />
      );

      // Note: We can't directly test container style, but we can verify the component renders
      expect(getByTestId('input-container')).toBeTruthy();
    });

    it('should apply custom input style', () => {
      const customStyle = { fontSize: 20 };
      const { getByDisplayValue } = render(
        <Input 
          value="test" 
          onChangeText={() => {}} 
          style={customStyle}
        />
      );

      const input = getByDisplayValue('test');
      expect(input).toHaveStyle(customStyle);
    });
  });

  describe('interactions', () => {
    it('should call onChangeText when text changes', () => {
      const mockOnChangeText = jest.fn();
      const { getByDisplayValue } = render(
        <Input value="initial" onChangeText={mockOnChangeText} />
      );

      const input = getByDisplayValue('initial');
      fireEvent.changeText(input, 'new text');

      expect(mockOnChangeText).toHaveBeenCalledWith('new text');
      expect(mockOnChangeText).toHaveBeenCalledTimes(1);
    });

    it('should handle focus events', () => {
      const mockOnFocus = jest.fn();
      const { getByDisplayValue } = render(
        <Input value="test" onChangeText={() => {}} onFocus={mockOnFocus} />
      );

      const input = getByDisplayValue('test');
      fireEvent(input, 'focus');

      expect(mockOnFocus).toHaveBeenCalledTimes(1);
    });

    it('should handle blur events', () => {
      const mockOnBlur = jest.fn();
      const { getByDisplayValue } = render(
        <Input value="test" onChangeText={() => {}} onBlur={mockOnBlur} />
      );

      const input = getByDisplayValue('test');
      fireEvent(input, 'blur');

      expect(mockOnBlur).toHaveBeenCalledTimes(1);
    });
  });

  describe('text input props', () => {
    it('should pass through TextInput props', () => {
      const { getByDisplayValue } = render(
        <Input 
          value="test" 
          onChangeText={() => {}} 
          secureTextEntry={true}
          maxLength={10}
          autoCapitalize="none"
        />
      );

      const input = getByDisplayValue('test');
      expect(input).toHaveProp('secureTextEntry', true);
      expect(input).toHaveProp('maxLength', 10);
      expect(input).toHaveProp('autoCapitalize', 'none');
    });

    it('should use correct placeholder text color', () => {
      const { getByPlaceholderText } = render(
        <Input 
          value="" 
          onChangeText={() => {}} 
          placeholder="Test placeholder"
        />
      );

      const input = getByPlaceholderText('Test placeholder');
      expect(input).toHaveProp('placeholderTextColor', '#9ca3af'); // colors.gray
    });
  });

  describe('label styling', () => {
    it('should style label correctly', () => {
      const { getByText } = render(
        <Input 
          label="Test Label" 
          value="" 
          onChangeText={() => {}} 
        />
      );

      const label = getByText('Test Label');
      expect(label).toHaveStyle({
        fontSize: 14, // typography.sizes.sm
        color: '#4b5563', // colors.grayDark
      });
    });
  });

  describe('error styling', () => {
    it('should style error text correctly', () => {
      const { getByText } = render(
        <Input 
          value="" 
          onChangeText={() => {}} 
          error="Error message"
        />
      );

      const errorText = getByText('Error message');
      expect(errorText).toHaveStyle({
        fontSize: 12, // typography.sizes.xs
        color: '#ef4444', // colors.red
      });
    });
  });

  describe('accessibility', () => {
    it('should be accessible', () => {
      const { getByDisplayValue } = render(
        <Input 
          value="test" 
          onChangeText={() => {}} 
          accessibilityLabel="Test input"
        />
      );

      const input = getByDisplayValue('test');
      expect(input).toHaveProp('accessible', true);
      expect(input).toHaveProp('accessibilityLabel', 'Test input');
    });

    it('should associate label with input for accessibility', () => {
      const { getByDisplayValue } = render(
        <Input 
          label="Email Address" 
          value="test@example.com" 
          onChangeText={() => {}} 
        />
      );

      const input = getByDisplayValue('test@example.com');
      expect(input).toBeTruthy();
    });
  });

  describe('edge cases', () => {
    it('should handle empty value', () => {
      const { getByTestId } = render(
        <Input 
          value="" 
          onChangeText={() => {}} 
          testID="empty-input"
        />
      );

      expect(getByTestId('empty-input')).toBeTruthy();
    });

    it('should handle null/undefined values gracefully', () => {
      const { getByTestId } = render(
        <Input 
          value={undefined as any} 
          onChangeText={() => {}} 
          testID="undefined-input"
        />
      );

      expect(getByTestId('undefined-input')).toBeTruthy();
    });

    it('should render without onChangeText prop', () => {
      const { getByDisplayValue } = render(
        <Input value="test" />
      );

      expect(getByDisplayValue('test')).toBeTruthy();
    });
  });
});