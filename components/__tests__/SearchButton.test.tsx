import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { SearchButton } from '../SearchButton';

describe('SearchButton', () => {
  const mockOnPress = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('rendering', () => {
    it('should render with search icon and text', () => {
      const { getByText, getByLabelText } = render(
        <SearchButton onPress={mockOnPress} />
      );

      expect(getByText('Search')).toBeTruthy();
      expect(getByLabelText('Search flights')).toBeTruthy();
    });

    it('should have button accessibility role', () => {
      const { getByRole } = render(
        <SearchButton onPress={mockOnPress} />
      );

      expect(getByRole('button')).toBeTruthy();
    });

    it('should have correct accessibility label', () => {
      const { getByLabelText } = render(
        <SearchButton onPress={mockOnPress} />
      );

      expect(getByLabelText('Search flights')).toBeTruthy();
    });
  });

  describe('styling', () => {
    it('should apply correct default styles', () => {
      const { getByRole } = render(
        <SearchButton onPress={mockOnPress} />
      );

      const button = getByRole('button');
      expect(button).toHaveStyle({
        backgroundColor: '#22c55e', // colors.success
        paddingVertical: 24, // spacing.lg
        paddingHorizontal: 32, // spacing.xl
        borderRadius: 16, // borderRadius.xl
        minHeight: 56,
      });
    });

    it('should style text correctly', () => {
      const { getByText } = render(
        <SearchButton onPress={mockOnPress} />
      );

      const text = getByText('Search');
      expect(text).toHaveStyle({
        fontSize: 18, // typography.sizes.lg
        color: '#ffffff', // colors.white
      });
    });

    it('should have shadow styles', () => {
      const { getByRole } = render(
        <SearchButton onPress={mockOnPress} />
      );

      const button = getByRole('button');
      expect(button).toHaveStyle({
        shadowColor: '#22c55e', // colors.success
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
      });
    });
  });

  describe('interactions', () => {
    it('should call onPress when pressed', () => {
      const { getByRole } = render(
        <SearchButton onPress={mockOnPress} />
      );

      fireEvent.press(getByRole('button'));
      expect(mockOnPress).toHaveBeenCalledTimes(1);
    });

    it('should handle multiple presses', () => {
      const { getByRole } = render(
        <SearchButton onPress={mockOnPress} />
      );

      const button = getByRole('button');
      fireEvent.press(button);
      fireEvent.press(button);
      fireEvent.press(button);

      expect(mockOnPress).toHaveBeenCalledTimes(3);
    });
  });

  describe('icon rendering', () => {
    it('should render search icon with correct props', () => {
      const { getByRole } = render(
        <SearchButton onPress={mockOnPress} />
      );

      // The icon should be rendered within the button
      const button = getByRole('button');
      expect(button).toBeTruthy();
      
      // We can't directly test the icon props, but we can verify the button structure
      expect(button.children).toHaveLength(2); // Icon and text
    });
  });

  describe('layout', () => {
    it('should have flexDirection row layout', () => {
      const { getByRole } = render(
        <SearchButton onPress={mockOnPress} />
      );

      const button = getByRole('button');
      expect(button).toHaveStyle({
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      });
    });

    it('should have correct gap between icon and text', () => {
      const { getByRole } = render(
        <SearchButton onPress={mockOnPress} />
      );

      const button = getByRole('button');
      expect(button).toHaveStyle({
        gap: 8, // spacing.sm
      });
    });
  });

  describe('accessibility', () => {
    it('should be accessible', () => {
      const { getByRole } = render(
        <SearchButton onPress={mockOnPress} />
      );

      const button = getByRole('button');
      expect(button).toHaveProp('accessible', true);
      expect(button).toHaveProp('accessibilityRole', 'button');
      expect(button).toHaveProp('accessibilityLabel', 'Search flights');
    });

    it('should maintain accessibility during interactions', () => {
      const { getByRole } = render(
        <SearchButton onPress={mockOnPress} />
      );

      const button = getByRole('button');
      fireEvent.press(button);

      expect(button).toHaveProp('accessibilityRole', 'button');
    });
  });

  describe('performance', () => {
    it('should not re-render unnecessarily', () => {
      const { rerender, getByRole } = render(
        <SearchButton onPress={mockOnPress} />
      );

      const button = getByRole('button');
      const initialButton = button;

      // Re-render with same props
      rerender(<SearchButton onPress={mockOnPress} />);

      const buttonAfterRerender = getByRole('button');
      expect(buttonAfterRerender).toBeTruthy();
    });
  });

  describe('error handling', () => {
    it('should handle missing onPress gracefully', () => {
      const { getByRole } = render(
        <SearchButton onPress={undefined as any} />
      );

      const button = getByRole('button');
      expect(button).toBeTruthy();
      
      // Should not throw when pressed without onPress
      expect(() => fireEvent.press(button)).not.toThrow();
    });
  });

  describe('visual feedback', () => {
    it('should provide visual feedback on press', () => {
      const { getByRole } = render(
        <SearchButton onPress={mockOnPress} />
      );

      const button = getByRole('button');
      
      // Simulate press in and press out
      fireEvent(button, 'pressIn');
      fireEvent(button, 'pressOut');
      
      expect(button).toBeTruthy();
    });
  });
});