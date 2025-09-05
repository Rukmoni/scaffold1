import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Button } from '../Button';

describe('Button', () => {
  const mockOnPress = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('rendering', () => {
    it('should render with title', () => {
      const { getByText } = render(
        <Button title="Test Button" onPress={mockOnPress} />
      );

      expect(getByText('Test Button')).toBeTruthy();
    });

    it('should render with custom accessibility label', () => {
      const { getByLabelText } = render(
        <Button 
          title="Test Button" 
          onPress={mockOnPress} 
          accessibilityLabel="Custom Label"
        />
      );

      expect(getByLabelText('Custom Label')).toBeTruthy();
    });

    it('should have button accessibility role', () => {
      const { getByRole } = render(
        <Button title="Test Button" onPress={mockOnPress} />
      );

      expect(getByRole('button')).toBeTruthy();
    });
  });

  describe('variants', () => {
    it('should render primary variant by default', () => {
      const { getByRole } = render(
        <Button title="Primary Button" onPress={mockOnPress} />
      );

      const button = getByRole('button');
      expect(button).toHaveStyle({
        backgroundColor: '#22c55e', // colors.success
      });
    });

    it('should render secondary variant', () => {
      const { getByRole } = render(
        <Button title="Secondary Button" onPress={mockOnPress} variant="secondary" />
      );

      const button = getByRole('button');
      expect(button).toHaveStyle({
        backgroundColor: '#f3f4f6', // colors.grayLighter
      });
    });

    it('should render outline variant', () => {
      const { getByRole } = render(
        <Button title="Outline Button" onPress={mockOnPress} variant="outline" />
      );

      const button = getByRole('button');
      expect(button).toHaveStyle({
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '#e5e7eb', // colors.grayLight
      });
    });
  });

  describe('sizes', () => {
    it('should render medium size by default', () => {
      const { getByRole } = render(
        <Button title="Medium Button" onPress={mockOnPress} />
      );

      const button = getByRole('button');
      expect(button).toHaveStyle({
        paddingHorizontal: 24, // spacing.lg
        paddingVertical: 16, // spacing.md
      });
    });

    it('should render small size', () => {
      const { getByRole } = render(
        <Button title="Small Button" onPress={mockOnPress} size="sm" />
      );

      const button = getByRole('button');
      expect(button).toHaveStyle({
        paddingHorizontal: 16, // spacing.md
        paddingVertical: 8, // spacing.sm
      });
    });

    it('should render large size', () => {
      const { getByRole } = render(
        <Button title="Large Button" onPress={mockOnPress} size="lg" />
      );

      const button = getByRole('button');
      expect(button).toHaveStyle({
        paddingHorizontal: 32, // spacing.xl
        paddingVertical: 24, // spacing.lg
      });
    });
  });

  describe('interactions', () => {
    it('should call onPress when pressed', () => {
      const { getByRole } = render(
        <Button title="Test Button" onPress={mockOnPress} />
      );

      fireEvent.press(getByRole('button'));
      expect(mockOnPress).toHaveBeenCalledTimes(1);
    });

    it('should not call onPress when disabled', () => {
      const { getByRole } = render(
        <Button title="Disabled Button" onPress={mockOnPress} disabled />
      );

      fireEvent.press(getByRole('button'));
      expect(mockOnPress).not.toHaveBeenCalled();
    });

    it('should apply disabled styles when disabled', () => {
      const { getByRole } = render(
        <Button title="Disabled Button" onPress={mockOnPress} disabled />
      );

      const button = getByRole('button');
      expect(button).toHaveStyle({
        opacity: 0.5,
      });
    });
  });

  describe('custom styling', () => {
    it('should apply custom button style', () => {
      const customStyle = { backgroundColor: 'red' };
      const { getByRole } = render(
        <Button title="Custom Button" onPress={mockOnPress} style={customStyle} />
      );

      const button = getByRole('button');
      expect(button).toHaveStyle(customStyle);
    });

    it('should apply custom text style', () => {
      const customTextStyle = { fontSize: 20 };
      const { getByText } = render(
        <Button 
          title="Custom Text" 
          onPress={mockOnPress} 
          textStyle={customTextStyle} 
        />
      );

      const text = getByText('Custom Text');
      expect(text).toHaveStyle(customTextStyle);
    });
  });

  describe('text styling by variant', () => {
    it('should have white text for primary variant', () => {
      const { getByText } = render(
        <Button title="Primary" onPress={mockOnPress} variant="primary" />
      );

      expect(getByText('Primary')).toHaveStyle({
        color: '#ffffff', // colors.white
      });
    });

    it('should have dark text for secondary variant', () => {
      const { getByText } = render(
        <Button title="Secondary" onPress={mockOnPress} variant="secondary" />
      );

      expect(getByText('Secondary')).toHaveStyle({
        color: '#4b5563', // colors.grayDark
      });
    });

    it('should have dark text for outline variant', () => {
      const { getByText } = render(
        <Button title="Outline" onPress={mockOnPress} variant="outline" />
      );

      expect(getByText('Outline')).toHaveStyle({
        color: '#4b5563', // colors.grayDark
      });
    });
  });

  describe('accessibility', () => {
    it('should be accessible when enabled', () => {
      const { getByRole } = render(
        <Button title="Accessible Button" onPress={mockOnPress} />
      );

      const button = getByRole('button');
      expect(button).toHaveProp('accessible', true);
      expect(button).toHaveProp('accessibilityRole', 'button');
    });

    it('should maintain accessibility when disabled', () => {
      const { getByRole } = render(
        <Button title="Disabled Button" onPress={mockOnPress} disabled />
      );

      const button = getByRole('button');
      expect(button).toHaveProp('accessible', true);
      expect(button).toHaveProp('accessibilityRole', 'button');
    });
  });
});